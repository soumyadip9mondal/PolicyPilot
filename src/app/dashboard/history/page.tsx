"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { FileSearch, Send, Upload, Bot, CheckCircle, XCircle, Clock, RefreshCw } from "lucide-react";
import { getHistory, type HistoryEvent, type HistoryEventType } from "@/lib/history";

const TYPE_CONFIG: Record<HistoryEventType, { icon: typeof FileSearch; color: string; bg: string }> = {
    "Policy Analysis": { icon: FileSearch, color: "text-purple-500", bg: "bg-purple-100 dark:bg-purple-900/30" },
    "Applications": { icon: Send, color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-900/30" },
    "Documents": { icon: Upload, color: "text-green-500", bg: "bg-green-100 dark:bg-green-900/30" },
    "AI Help": { icon: Bot, color: "text-orange-500", bg: "bg-orange-100 dark:bg-orange-900/30" },
    "Eligibility Check": { icon: CheckCircle, color: "text-teal-500", bg: "bg-teal-100 dark:bg-teal-900/30" },
    "Profile Update": { icon: FileSearch, color: "text-pink-500", bg: "bg-pink-100 dark:bg-pink-900/30" },
};

const STATUS_CONFIG: Record<string, { icon: typeof CheckCircle; color: string }> = {
    success: { icon: CheckCircle, color: "text-green-500" },
    resolved: { icon: CheckCircle, color: "text-green-500" },
    in_progress: { icon: Clock, color: "text-amber-500" },
    failed: { icon: XCircle, color: "text-red-500" },
};

const ALL_FILTERS = ["All", "Policy Analysis", "Applications", "Documents", "AI Help", "Eligibility Check", "Profile Update"];

export default function History() {
    const [filter, setFilter] = useState("All");
    const [history, setHistory] = useState<HistoryEvent[]>([]);

    const loadHistory = () => setHistory(getHistory());

    useEffect(() => {
        loadHistory();
    }, []);

    const filteredData = filter === "All" ? history : history.filter((d) => d.type === filter);

    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-end mb-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Activity History</h1>
                    <p className="text-muted-foreground">Track your policy analyses, applications, and document uploads.</p>
                </div>
                <button
                    onClick={loadHistory}
                    className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-muted rounded-lg"
                    title="Refresh"
                >
                    <RefreshCw size={16} /> Refresh
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-8">
                {ALL_FILTERS.map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${filter === f
                                ? "bg-primary text-primary-foreground shadow-sm font-semibold"
                                : "bg-card text-foreground border border-border hover:bg-muted"
                            }`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Timeline */}
            {filteredData.length === 0 ? (
                <div className="text-center py-16 text-muted-foreground bg-card rounded-2xl border border-border border-dashed">
                    <div className="w-14 h-14 bg-muted/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Clock size={28} className="opacity-40" />
                    </div>
                    <p className="font-medium mb-1">
                        {history.length === 0 ? "No activity yet" : `No ${filter.toLowerCase()} events`}
                    </p>
                    <p className="text-xs max-w-xs mx-auto">
                        {history.length === 0
                            ? "Start by analyzing a policy or filling out your profile — your activity will appear here."
                            : "Try a different filter to see other events."}
                    </p>
                </div>
            ) : (
                <div className="relative border-l-2 border-border/70 ml-6 pl-8 space-y-8 mt-4">
                    {filteredData.map((item) => {
                        const cfg = TYPE_CONFIG[item.type] || TYPE_CONFIG["AI Help"];
                        const statusCfg = STATUS_CONFIG[item.status] || STATUS_CONFIG.success;
                        const Icon = cfg.icon;
                        const StatusIcon = statusCfg.icon;

                        return (
                            <div key={item.id} className="relative">
                                <div className={`absolute -left-[45px] top-1 p-2 rounded-full border-[3px] border-background ${cfg.bg} ${cfg.color} z-10 shadow-sm`}>
                                    <Icon size={16} />
                                </div>
                                <div className="bg-card rounded-2xl p-5 shadow-soft border border-border group hover:border-primary/30 transition-colors">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                                        <div className="flex items-center gap-3">
                                            <span className="text-[10px] font-bold px-2 py-1 bg-muted rounded-md text-muted-foreground tracking-widest uppercase">
                                                {item.type}
                                            </span>
                                            <span className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
                                                {format(new Date(item.time), "h:mm a • MMM d, yyyy")}
                                            </span>
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-bold text-foreground mb-3">{item.title}</h3>
                                    <div className="flex items-center gap-2 text-sm font-medium bg-muted/30 w-max px-3 py-2 rounded-lg border border-border/50">
                                        <StatusIcon size={16} className={statusCfg.color} strokeWidth={2.5} />
                                        {item.result}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
