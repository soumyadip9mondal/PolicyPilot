"use client";

import { useEffect, useState } from "react";
import { ShieldAlert, AlertTriangle, Info, ShieldCheck } from "lucide-react";

const POLICY_CONTEXT_KEY = "policypilot_policy_context";

type Severity = "high" | "medium" | "low";

interface HiddenClause {
    severity: Severity;
    title: string;
    detail: string;
}

const SEVERITY_CONFIG: Record<Severity, { icon: typeof ShieldAlert; bg: string; border: string; text: string; badge: string; label: string }> = {
    high: {
        icon: ShieldAlert,
        bg: "bg-red-50/60 dark:bg-red-950/20",
        border: "border-red-200 dark:border-red-900/50",
        text: "text-red-700 dark:text-red-400",
        badge: "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300",
        label: "High Risk",
    },
    medium: {
        icon: AlertTriangle,
        bg: "bg-amber-50/60 dark:bg-amber-950/20",
        border: "border-amber-200 dark:border-amber-900/50",
        text: "text-amber-700 dark:text-amber-400",
        badge: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300",
        label: "Caution",
    },
    low: {
        icon: Info,
        bg: "bg-blue-50/60 dark:bg-blue-950/20",
        border: "border-blue-200 dark:border-blue-900/50",
        text: "text-blue-700 dark:text-blue-400",
        badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300",
        label: "Note",
    },
};

export function HiddenClauses() {
    const [clauses, setClauses] = useState<HiddenClause[]>([]);

    const loadClauses = () => {
        try {
            const raw = localStorage.getItem(POLICY_CONTEXT_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                setClauses(parsed.hiddenClauses || []);
            }
        } catch { /* ignore */ }
    };

    useEffect(() => {
        loadClauses();
        window.addEventListener("policy-analyzed", loadClauses);
        return () => window.removeEventListener("policy-analyzed", loadClauses);
    }, []);

    if (clauses.length === 0) {
        return (
            <div className="bg-card rounded-2xl p-6 shadow-soft border border-border">
                <div className="flex items-center gap-2 mb-4">
                    <ShieldAlert className="text-amber-500" size={20} />
                    <h3 className="font-semibold text-foreground">Hidden Clause Detection</h3>
                </div>
                <div className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground gap-3">
                    <div className="w-14 h-14 bg-muted/30 rounded-2xl flex items-center justify-center">
                        <ShieldCheck size={28} className="opacity-40" />
                    </div>
                    <p className="text-sm font-medium">No hidden clauses detected yet</p>
                    <p className="text-xs max-w-xs">Analyze a policy document above to scan for hidden restrictions, age limits, and exclusions</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-card rounded-2xl p-6 shadow-soft border border-border">
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                    <ShieldAlert className="text-amber-500" size={20} />
                    <h3 className="font-semibold text-foreground">Hidden Clause Detection</h3>
                </div>
                <span className="text-xs font-semibold bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 px-2.5 py-1 rounded-full">
                    {clauses.length} clause{clauses.length > 1 ? "s" : ""} found
                </span>
            </div>

            <div className="space-y-3">
                {clauses.map((clause, i) => {
                    const cfg = SEVERITY_CONFIG[clause.severity] || SEVERITY_CONFIG.low;
                    const Icon = cfg.icon;
                    return (
                        <div key={i} className={`${cfg.bg} border ${cfg.border} rounded-xl p-4`}>
                            <div className="flex items-start gap-3">
                                <Icon size={18} className={`${cfg.text} shrink-0 mt-0.5`} />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap mb-1">
                                        <span className="font-semibold text-sm text-foreground">{clause.title}</span>
                                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${cfg.badge}`}>
                                            {cfg.label}
                                        </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{clause.detail}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
