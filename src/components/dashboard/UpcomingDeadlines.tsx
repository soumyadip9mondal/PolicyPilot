"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarClock, BookOpen } from "lucide-react";

interface Scheme {
    _id: string;
    title: string;
    category: string;
    deadline: string;
}

export function UpcomingDeadlines() {
    const [schemes, setSchemes] = useState<Scheme[]>([]);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await fetch("/api/schemes");
                const data = await res.json();
                const now = new Date();
                const upcoming = (data.schemes || [])
                    .filter((s: Scheme) => s.deadline && new Date(s.deadline) > now)
                    .sort((a: Scheme, b: Scheme) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
                    .slice(0, 1); // closest deadline
                setSchemes(upcoming);
            } catch { /* ignore */ }
        };
        load();
    }, []);

    if (schemes.length === 0) {
        return (
            <div className="bg-card border border-border rounded-2xl p-6 shadow-soft h-full flex flex-col justify-center items-center text-center gap-3">
                <div className="w-12 h-12 bg-muted/30 rounded-xl flex items-center justify-center">
                    <CalendarClock size={22} className="opacity-40" />
                </div>
                <p className="text-sm font-medium text-foreground">No upcoming deadlines</p>
                <p className="text-xs text-muted-foreground">Scheme deadlines from admin will appear here.</p>
            </div>
        );
    }

    const s = schemes[0];
    const deadline = new Date(s.deadline);
    const daysLeft = Math.ceil((deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24));

    return (
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 border border-orange-100 dark:border-orange-900/50 rounded-2xl p-6 shadow-soft h-full flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <CalendarClock size={120} />
            </div>
            <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 font-semibold mb-2">
                <CalendarClock size={18} /> Upcoming Deadline
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-orange-500 mb-1">{s.category}</span>
            <h3 className="text-base font-bold text-foreground mb-1 leading-snug">{s.title}</h3>
            <p className={`font-semibold mb-4 text-sm ${daysLeft <= 3 ? "text-red-600 dark:text-red-400" : "text-orange-700/80 dark:text-orange-300/80"}`}>
                {daysLeft === 1 ? "1 day left!" : `${daysLeft} days left`}
            </p>
            <Link href="/dashboard/schemes" className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-sm w-max relative z-10 inline-flex items-center gap-2">
                <BookOpen size={14} /> View Scheme
            </Link>
        </div>
    );
}
