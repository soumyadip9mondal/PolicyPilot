"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, FileText, XCircle, AlertTriangle } from "lucide-react";

const POLICY_CONTEXT_KEY = "policypilot_policy_context";

interface EligibilityCriterion {
    criterion: string;
    userMet: boolean | null;
    detail: string;
}

interface PolicyResult {
    policyName: string;
    summary: string;
    eligibilityCriteria: EligibilityCriterion[];
    overallEligibility: "eligible" | "not_eligible" | "possibly_eligible";
    eligibilityScore: number;
    source?: string;
}

export function PolicySummary() {
    const [result, setResult] = useState<PolicyResult | null>(null);

    const loadResult = () => {
        try {
            const raw = localStorage.getItem(POLICY_CONTEXT_KEY);
            if (raw) setResult(JSON.parse(raw));
        } catch { /* ignore */ }
    };

    useEffect(() => {
        loadResult();
        window.addEventListener("policy-analyzed", loadResult);
        return () => window.removeEventListener("policy-analyzed", loadResult);
    }, []);


    // Empty state
    if (!result) {
        return (
            <div className="bg-card rounded-2xl p-6 shadow-soft border border-border h-full">
                <div className="flex items-center gap-2 mb-4">
                    <FileText className="text-primary" size={20} />
                    <h3 className="font-semibold text-foreground">Analysis Summary</h3>
                </div>
                <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground gap-3">
                    <div className="w-14 h-14 bg-muted/30 rounded-2xl flex items-center justify-center">
                        <FileText size={28} className="opacity-40" />
                    </div>
                    <p className="text-sm font-medium">No policy analyzed yet</p>
                    <p className="text-xs max-w-xs">Upload a policy document or paste a URL above and click Analyze</p>
                </div>
            </div>
        );
    }

    const eligibilityConfig = {
        eligible: { color: "green", label: "Eligible", Icon: CheckCircle2, bg: "bg-green-50/50 dark:bg-green-950/20", border: "border-green-200 dark:border-green-900/50", text: "text-green-700 dark:text-green-400" },
        not_eligible: { color: "red", label: "Not Eligible", Icon: XCircle, bg: "bg-red-50/50 dark:bg-red-950/20", border: "border-red-200 dark:border-red-900/50", text: "text-red-700 dark:text-red-400" },
        possibly_eligible: { color: "amber", label: "Possibly Eligible", Icon: AlertTriangle, bg: "bg-amber-50/50 dark:bg-amber-950/20", border: "border-amber-200 dark:border-amber-900/50", text: "text-amber-700 dark:text-amber-400" },
    }[result.overallEligibility];

    const { Icon } = eligibilityConfig;

    return (
        <div className="bg-card rounded-2xl p-6 shadow-soft border border-border h-full">
            <div className="flex items-center gap-2 mb-4">
                <FileText className="text-primary" size={20} />
                <h3 className="font-semibold text-foreground">Analysis Summary</h3>
            </div>

            <h4 className="text-lg font-bold mb-2">{result.policyName}</h4>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{result.summary}</p>

            {/* Eligibility Score Bar */}
            <div className="mb-4">
                <div className="flex justify-between text-xs font-medium text-muted-foreground mb-1.5">
                    <span>Eligibility Score</span>
                    <span className="font-bold text-foreground">{result.eligibilityScore}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                        className={`h-full rounded-full transition-all duration-1000 ${result.eligibilityScore >= 70 ? "bg-green-500" : result.eligibilityScore >= 40 ? "bg-amber-500" : "bg-red-500"
                            }`}
                        style={{ width: `${result.eligibilityScore}%` }}
                    />
                </div>
            </div>

            {/* Eligibility Result */}
            <div className={`${eligibilityConfig.bg} border ${eligibilityConfig.border} rounded-xl p-4`}>
                <div className={`flex items-center gap-2 ${eligibilityConfig.text} font-semibold mb-3`}>
                    <Icon size={18} />
                    {eligibilityConfig.label}
                </div>
                {result.eligibilityCriteria.length > 0 && (
                    <ul className="space-y-2 text-sm">
                        {result.eligibilityCriteria.map((c, i) => (
                            <li key={i} className="flex items-start gap-2">
                                {c.userMet === true && <CheckCircle2 size={14} className="text-green-500 shrink-0 mt-0.5" />}
                                {c.userMet === false && <XCircle size={14} className="text-red-500 shrink-0 mt-0.5" />}
                                {c.userMet === null && <AlertTriangle size={14} className="text-amber-500 shrink-0 mt-0.5" />}
                                <div>
                                    <span className="font-medium">{c.criterion}</span>
                                    {c.detail && <span className="text-muted-foreground"> — {c.detail}</span>}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
