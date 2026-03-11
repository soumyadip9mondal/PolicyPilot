"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ExternalLink, CheckCircle2, AlertTriangle, Loader2 } from "lucide-react";

interface Scheme {
    _id: string;
    title: string;
    shortDescription: string;
    category: string;
    deadline?: string;
}

interface MatchResult {
    scheme: Scheme;
    matchScore: number;
    eligible: boolean;
}

export function EligibleSchemes() {
    const [results, setResults] = useState<MatchResult[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            try {
                let profile = {};
                try {
                    const raw = localStorage.getItem("policypilot_profile");
                    if (raw) profile = JSON.parse(raw);
                } catch { /* ignore */ }

                const res = await fetch("/api/schemes/eligible", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ profile }),
                });
                const data = await res.json();
                setResults((data.results || []).slice(0, 5)); // top 5 on dashboard
            } catch {
                setError("Failed to load schemes");
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    return (
        <div className="bg-card rounded-2xl p-6 shadow-soft border border-border">
            <div className="flex items-center justify-between mb-5">
                <h3 className="font-semibold text-foreground">Eligible Schemes</h3>
                <Link href="/dashboard/schemes" className="text-xs text-primary hover:underline font-medium">
                    View all →
                </Link>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-8 text-muted-foreground gap-2">
                    <Loader2 size={20} className="animate-spin text-primary" /> Loading...
                </div>
            ) : error ? (
                <p className="text-sm text-muted-foreground text-center py-6">{error}</p>
            ) : results.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                    <p className="text-sm font-medium">No schemes available yet</p>
                    <p className="text-xs mt-1">An admin needs to add schemes first.</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {results.map(({ scheme, matchScore, eligible }) => (
                        <div key={scheme._id} className={`p-4 rounded-xl border transition-colors ${eligible ? "border-green-200 dark:border-green-900/50 bg-green-50/30 dark:bg-green-950/10" : "border-border bg-muted/20"}`}>
                            <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                                        <span className="text-xs font-bold uppercase tracking-wider text-primary">{scheme.category}</span>
                                        {eligible ? (
                                            <span className="text-xs font-semibold text-green-600 dark:text-green-400 flex items-center gap-1">
                                                <CheckCircle2 size={11} /> Eligible
                                            </span>
                                        ) : (
                                            <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                                                <AlertTriangle size={11} /> {matchScore}% Match
                                            </span>
                                        )}
                                    </div>
                                    <p className="font-semibold text-foreground text-sm leading-snug">{scheme.title}</p>
                                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{scheme.shortDescription}</p>
                                    {scheme.deadline && (
                                        <p className="text-xs text-amber-600 dark:text-amber-400 mt-1 font-medium">
                                            Deadline: {new Date(scheme.deadline).toLocaleDateString("en-IN")}
                                        </p>
                                    )}
                                </div>
                                <Link
                                    href="/dashboard/schemes"
                                    className="shrink-0 text-xs px-3 py-1.5 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center gap-1"
                                >
                                    View <ExternalLink size={11} />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
