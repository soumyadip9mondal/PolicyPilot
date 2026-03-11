"use client";

import { useEffect, useState } from "react";
import { Upload, AlertTriangle, CheckCircle, FileWarning } from "lucide-react";

const POLICY_CONTEXT_KEY = "policypilot_policy_context";
const PROFILE_KEY = "policypilot_profile";

interface RequiredDoc {
    name: string;
    mandatory: boolean;
    note: string;
}

type DocStatus = "uploaded" | "warning" | "missing";

interface DocWithStatus extends RequiredDoc {
    status: DocStatus;
    warning: string | null;
}

function getDocStatus(docName: string, uploadedDocs: string[]): DocStatus {
    const lower = docName.toLowerCase();
    const uploaded = uploadedDocs.some((u) => u.toLowerCase().includes(lower.split(" ")[0]));
    return uploaded ? "uploaded" : "missing";
}

const FALLBACK_DOCS: RequiredDoc[] = [
    { name: "Aadhaar Card", mandatory: true, note: "Identity proof" },
    { name: "Income Certificate", mandatory: true, note: "Issued within the last 12 months" },
    { name: "Bank Passbook", mandatory: true, note: "For direct benefit transfer" },
];

export function RequiredDocuments() {
    const [documents, setDocuments] = useState<DocWithStatus[]>([]);

    const loadDocs = () => {
        try {
            const policyRaw = localStorage.getItem(POLICY_CONTEXT_KEY);
            const profileRaw = localStorage.getItem(PROFILE_KEY);
            const profile = profileRaw ? JSON.parse(profileRaw) : {};
            const uploadedDocs: string[] = profile.uploadedDocs || [];

            const policyDocs: RequiredDoc[] = policyRaw
                ? (JSON.parse(policyRaw).requiredDocuments || FALLBACK_DOCS)
                : FALLBACK_DOCS;

            setDocuments(
                policyDocs.map((doc) => {
                    const status = getDocStatus(doc.name, uploadedDocs);
                    return {
                        ...doc,
                        status,
                        warning: status === "missing" ? doc.note || "Not uploaded" : null,
                    };
                })
            );
        } catch {
            setDocuments(FALLBACK_DOCS.map((d) => ({ ...d, status: "missing" as DocStatus, warning: d.note })));
        }
    };

    useEffect(() => {
        loadDocs();
        window.addEventListener("policy-analyzed", loadDocs);
        return () => window.removeEventListener("policy-analyzed", loadDocs);
    }, []);

    return (
        <div className="bg-card rounded-2xl p-6 shadow-soft border border-border">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Upload size={18} className="text-primary" />
                Required Documents & Warnings
            </h3>

            <div className="space-y-3">
                {documents.map((doc, i) => (
                    <div
                        key={i}
                        className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${doc.status === "uploaded"
                                ? "bg-green-50/30 border-green-100 dark:bg-green-950/10 dark:border-green-900/30"
                                : doc.status === "warning"
                                    ? "bg-amber-50/50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-900/50"
                                    : "bg-red-50/30 border-red-100 dark:bg-red-950/10 dark:border-red-900/30"
                            }`}
                    >
                        <div className="flex items-start sm:items-center gap-3">
                            {doc.status === "uploaded" && <CheckCircle size={18} className="text-green-500 mt-0.5 sm:mt-0" />}
                            {doc.status === "warning" && <AlertTriangle size={18} className="text-amber-500 mt-0.5 sm:mt-0" />}
                            {doc.status === "missing" && <FileWarning size={18} className="text-red-500 mt-0.5 sm:mt-0" />}
                            <div>
                                <p
                                    className={`font-medium text-sm ${doc.status === "uploaded"
                                            ? "text-green-900 dark:text-green-200"
                                            : doc.status === "warning"
                                                ? "text-amber-900 dark:text-amber-200"
                                                : "text-red-900 dark:text-red-200"
                                        }`}
                                >
                                    {doc.name}
                                    {doc.mandatory && (
                                        <span className="ml-1.5 text-[10px] font-bold uppercase text-muted-foreground">(Required)</span>
                                    )}
                                </p>
                                {doc.warning && (
                                    <p
                                        className={`text-xs mt-0.5 ${doc.status === "warning" ? "text-amber-700 dark:text-amber-400" : "text-red-600 dark:text-red-400"
                                            }`}
                                    >
                                        {doc.warning}
                                    </p>
                                )}
                            </div>
                        </div>

                        {doc.status !== "uploaded" && (
                            <button
                                className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold self-start sm:self-auto ${doc.status === "warning"
                                        ? "bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-900/50 dark:text-amber-300 transition-colors"
                                        : "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/50 dark:text-red-300 transition-colors"
                                    }`}
                            >
                                Upload
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
