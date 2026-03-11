"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, File, Link2, ArrowRight, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { logEvent } from "@/lib/history";

const POLICY_CONTEXT_KEY = "policypilot_policy_context";

export function PolicyUpload() {
    const [linkInput, setLinkInput] = useState("");
    const [files, setFiles] = useState<File[]>([]);
    const [analyzing, setAnalyzing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [done, setDone] = useState(false);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles(acceptedFiles);
        setDone(false);
        setError(null);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "application/pdf": [".pdf"],
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
            "text/plain": [".txt"],
        },
    });

    const readFileAsText = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsText(file);
        });

    const runAnalysis = async (policyText: string, sourceName: string) => {
        setAnalyzing(true);
        setError(null);
        setDone(false);

        // Load user profile from localStorage (saved there by profile page)
        let userProfile = {};
        try {
            const raw = localStorage.getItem("policypilot_profile");
            if (raw) userProfile = JSON.parse(raw);
        } catch { /* ignore */ }

        try {
            const res = await fetch("/api/analyze-policy", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ policyText, userProfile }),
            });

            const data = await res.json();
            if (data.error) {
                setError(data.error);
            } else {
                // Store results in localStorage so sibling components can read them
                localStorage.setItem(POLICY_CONTEXT_KEY, JSON.stringify({
                    ...data.result,
                    rawText: policyText.slice(0, 6000),
                    source: sourceName,
                    analyzedAt: Date.now(),
                }));
                setDone(true);
                logEvent("Policy Analysis", sourceName, `${data.result.overallEligibility} — Score: ${data.result.eligibilityScore}%`, "success");
                // Trigger components to re-read
                window.dispatchEvent(new Event("policy-analyzed"));
            }
        } catch {
            setError("Failed to connect to AI server. Make sure start-llama-server.bat is running.");
        } finally {
            setAnalyzing(false);
        }
    };

    const handleFileAnalyze = async () => {
        if (!files[0]) return;
        const text = await readFileAsText(files[0]);
        await runAnalysis(text, files[0].name);
    };

    const handleUrlFetch = async () => {
        if (!linkInput.trim()) return;
        setAnalyzing(true);
        setError(null);
        try {
            // Use our proxy to fetch the URL text
            const res = await fetch(`/api/fetch-url?url=${encodeURIComponent(linkInput)}`);
            if (!res.ok) throw new Error("Could not fetch URL");
            const { text } = await res.json();
            await runAnalysis(text, linkInput);
        } catch {
            // Fallback: analyze the URL as a hint
            await runAnalysis(`Policy from URL: ${linkInput}`, linkInput);
        }
    };

    return (
        <div className="bg-card rounded-2xl p-6 shadow-soft border border-border">
            <h2 className="text-xl font-bold text-foreground mb-6">Upload Policy for Analysis</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* File Upload */}
                <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                        <UploadCloud size={16} /> Upload Policy Document
                    </h3>
                    <div
                        {...getRootProps()}
                        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${isDragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-muted/50"
                            }`}
                    >
                        <input {...getInputProps()} />
                        <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                            <UploadCloud size={24} />
                        </div>
                        <p className="font-medium text-foreground mb-1">
                            {isDragActive ? "Drop the files here" : "Drag & drop files here, or click to browse"}
                        </p>
                        <p className="text-xs text-muted-foreground">Supports PDF, DOCX, TXT</p>
                    </div>

                    {files.length > 0 && (
                        <div className="mt-4 p-3 bg-muted rounded-lg border border-border flex items-center gap-3">
                            <File size={20} className="text-primary" />
                            <span className="text-sm font-medium flex-1 truncate">{files[0].name}</span>
                            <button
                                onClick={handleFileAnalyze}
                                disabled={analyzing}
                                className="text-sm px-4 py-1.5 bg-primary text-primary-foreground rounded-md font-semibold flex items-center gap-1.5 hover:bg-primary/90 disabled:opacity-50 transition-colors"
                            >
                                {analyzing ? <><Loader2 size={14} className="animate-spin" /> Analyzing...</> : "Analyze"}
                            </button>
                        </div>
                    )}
                </div>

                {/* URL Input */}
                <div className="flex flex-col">
                    <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                        <Link2 size={16} /> Or Paste Policy Website Link
                    </h3>
                    <div className="flex-1 flex flex-col justify-center bg-muted/30 rounded-xl p-6 border border-border">
                        <div className="flex gap-2">
                            <input
                                type="url"
                                placeholder="https://example.gov/policy"
                                className="flex-1 bg-background border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                value={linkInput}
                                onChange={(e) => setLinkInput(e.target.value)}
                                disabled={analyzing}
                            />
                            <button
                                onClick={handleUrlFetch}
                                disabled={analyzing || !linkInput.trim()}
                                className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 disabled:opacity-50"
                            >
                                {analyzing ? <Loader2 size={16} className="animate-spin" /> : <><span>Fetch</span><ArrowRight size={16} /></>}
                            </button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-3">
                            We will automatically extract and analyze the policy from the provided URL.
                        </p>
                    </div>
                </div>
            </div>

            {/* Status */}
            {done && !error && (
                <div className="mt-4 p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/50 rounded-xl flex items-center gap-2 text-sm text-green-700 dark:text-green-400 font-medium">
                    <CheckCircle2 size={18} /> Policy analyzed successfully! Scroll down to see results.
                </div>
            )}
            {error && (
                <div className="mt-4 p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-xl flex items-start gap-2 text-sm text-red-700 dark:text-red-400">
                    <AlertCircle size={18} className="shrink-0 mt-0.5" />
                    <span>{error}</span>
                </div>
            )}
        </div>
    );
}
