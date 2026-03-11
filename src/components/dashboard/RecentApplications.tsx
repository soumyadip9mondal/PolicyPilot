"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, X, Clock, History } from "lucide-react";
import { getHistory, type HistoryEvent } from "@/lib/history";
import { format } from "date-fns";



const STATUS_STYLES = {
    success: { color: "text-green-600 dark:text-green-400", bg: "bg-green-100 dark:bg-green-900/30", dot: "bg-green-500", Icon: Check },
    resolved: { color: "text-green-600 dark:text-green-400", bg: "bg-green-100 dark:bg-green-900/30", dot: "bg-green-500", Icon: Check },
    in_progress: { color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-100 dark:bg-amber-900/30", dot: "bg-amber-500", Icon: Clock },
    failed: { color: "text-red-600 dark:text-red-400", bg: "bg-red-100 dark:bg-red-900/30", dot: "bg-red-500", Icon: X },
};

export function RecentApplications() {
    const [history, setHistory] = useState<HistoryEvent[]>([]);

    useEffect(() => {
        setHistory(getHistory().slice(0, 5));
    }, []);

    return (
        <div className="bg-card rounded-2xl p-6 shadow-soft border border-border h-full">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Recent Activity</h3>
                <Link href="/dashboard/history" className="text-xs text-primary hover:underline font-medium">
                    View all →
                </Link>
            </div>

            {history.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-muted-foreground gap-3">
                    <div className="w-12 h-12 bg-muted/30 rounded-xl flex items-center justify-center">
                        <History size={22} className="opacity-40" />
                    </div>
                    <p className="text-sm font-medium">No activity yet</p>
                    <p className="text-xs text-center max-w-xs">
                        Analyze a policy or fill out your profile to see activity here.
                    </p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-muted-foreground font-medium border-b border-border">
                            <tr>
                                <th className="pb-3 font-normal">Activity</th>
                                <th className="pb-3 font-normal">Status</th>
                                <th className="pb-3 font-normal">Date</th>
                                <th className="pb-3 font-normal text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map((item) => {
                                const style = STATUS_STYLES[item.status] || STATUS_STYLES.success;
                                const { Icon } = style;
                                return (
                                    <tr key={item.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                                        <td className="py-3.5 flex items-center gap-3 font-medium">
                                            <span className={`w-2 h-2 rounded-full shrink-0 ${style.dot}`} />
                                            <div>
                                                <p className="font-medium">{item.title}</p>
                                                <p className="text-xs text-muted-foreground">{item.type}</p>
                                            </div>
                                        </td>
                                        <td className="py-3.5">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 w-max ${style.color} ${style.bg}`}>
                                                <Icon size={12} strokeWidth={3} />
                                                {item.status.replace("_", " ")}
                                            </span>
                                        </td>
                                        <td className="py-3.5 text-muted-foreground whitespace-nowrap">
                                            {format(new Date(item.time), "dd MMM")}
                                        </td>
                                        <td className="py-3.5 text-right">
                                            <Link href="/dashboard/history" className="text-primary hover:underline font-medium text-xs">
                                                Details
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
