"use client";

import { useEffect, useState } from "react";
import { FileSearch, BookOpen, CheckCircle, Bot } from "lucide-react";
import { getHistoryStats } from "@/lib/history";

export function StatsCards() {
    const [stats, setStats] = useState({
        policyAnalyzed: 0,
        aiConversations: 0,
        eligibilityChecked: 0,
        documentsUploaded: 0,
    });
    const [eligibleCount, setEligibleCount] = useState<number | null>(null);

    useEffect(() => {
        // Real stats from localStorage history
        setStats(getHistoryStats());

        // Real eligible schemes count from MongoDB
        const fetchEligible = async () => {
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
                const eligible = (data.results || []).filter((r: { eligible: boolean }) => r.eligible).length;
                setEligibleCount(eligible);
            } catch {
                setEligibleCount(0);
            }
        };
        fetchEligible();
    }, []);

    const cards = [
        {
            label: "Policies Analyzed",
            value: stats.policyAnalyzed,
            icon: FileSearch,
            color: "text-purple-500",
            bg: "bg-purple-100 dark:bg-purple-900/30",
        },
        {
            label: "Eligible Schemes",
            value: eligibleCount === null ? "—" : eligibleCount,
            icon: BookOpen,
            color: "text-green-500",
            bg: "bg-green-100 dark:bg-green-900/30",
        },
        {
            label: "Eligibility Checks",
            value: stats.eligibilityChecked,
            icon: CheckCircle,
            color: "text-blue-500",
            bg: "bg-blue-100 dark:bg-blue-900/30",
        },
        {
            label: "AI Conversations",
            value: stats.aiConversations,
            icon: Bot,
            color: "text-orange-500",
            bg: "bg-orange-100 dark:bg-orange-900/30",
        },
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {cards.map((card) => {
                const Icon = card.icon;
                return (
                    <div key={card.label} className="bg-card rounded-2xl p-5 shadow-soft border border-border">
                        <div className={`w-10 h-10 ${card.bg} ${card.color} rounded-xl flex items-center justify-center mb-3`}>
                            <Icon size={20} />
                        </div>
                        <p className="text-3xl font-bold text-foreground mb-1">{card.value}</p>
                        <p className="text-sm text-muted-foreground">{card.label}</p>
                    </div>
                );
            })}
        </div>
    );
}
