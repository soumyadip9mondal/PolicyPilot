"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, AlertTriangle, ExternalLink, Tag, CalendarClock, Building2, FileText, Loader2, Search } from "lucide-react";

interface Scheme {
    _id: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    category: string;
    ministry: string;
    deadline?: string;
    benefits: string;
    applicationLink?: string;
    tags: string[];
    eligibilityCriteria: { field: string; operator: string; value: string; label: string }[];
    requiredDocuments: { name: string; mandatory: boolean; note?: string }[];
    isActive: boolean;
}

interface MatchResult {
    scheme: Scheme;
    matchScore: number;
    metCriteria: number;
    totalCriteria: number;
    eligible: boolean;
}

const CATEGORY_COLORS: Record<string, string> = {
    Scholarship: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
    Insurance: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    "Government Aid": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    Subsidy: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
    Loan: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300",
    Pension: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
    Other: "bg-muted text-foreground",
};

function SchemeCard({ result }: { result: MatchResult }) {
    const { scheme, matchScore, eligible, metCriteria, totalCriteria } = result;
    const [expanded, setExpanded] = useState(false);

    return (
        <div className={`bg-card border rounded-2xl overflow-hidden shadow-soft transition-all ${eligible ? "border-green-200 dark:border-green-900/50" : matchScore >= 50 ? "border-amber-200 dark:border-amber-900/50" : "border-border"}`}>
            <div className="p-5">
                <div className="flex items-start gap-4">
                    <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap gap-2 mb-2 items-center">
                            <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${CATEGORY_COLORS[scheme.category] || CATEGORY_COLORS.Other}`}>
                                {scheme.category}
                            </span>
                            {eligible && (
                                <span className="text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 rounded-full flex items-center gap-1">
                                    <CheckCircle2 size={11} /> You&apos;re Eligible
                                </span>
                            )}
                            {!eligible && matchScore >= 50 && (
                                <span className="text-xs font-semibold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 px-2 py-0.5 rounded-full flex items-center gap-1">
                                    <AlertTriangle size={11} /> Partially Eligible
                                </span>
                            )}
                        </div>
                        <h3 className="font-bold text-foreground text-lg leading-snug mb-1">{scheme.title}</h3>
                        <p className="text-sm text-muted-foreground">{scheme.shortDescription}</p>

                        {/* Match Score Bar */}
                        {totalCriteria > 0 && (
                            <div className="mt-3">
                                <div className="flex justify-between text-xs font-medium text-muted-foreground mb-1">
                                    <span>Eligibility Match ({metCriteria}/{totalCriteria} criteria met)</span>
                                    <span className="font-bold text-foreground">{matchScore}%</span>
                                </div>
                                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full ${eligible ? "bg-green-500" : matchScore >= 50 ? "bg-amber-500" : "bg-red-400"}`}
                                        style={{ width: `${matchScore}%` }}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="flex flex-wrap gap-4 mt-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1.5"><Building2 size={13} /> {scheme.ministry}</span>
                            {scheme.deadline && <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400"><CalendarClock size={13} /> Deadline: {new Date(scheme.deadline).toLocaleDateString("en-IN")}</span>}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 shrink-0">
                        {scheme.applicationLink && (
                            <a href={scheme.applicationLink} target="_blank" rel="noreferrer"
                                className="px-3 py-2 bg-primary text-primary-foreground text-xs font-semibold rounded-lg flex items-center gap-1.5 hover:bg-primary/90 transition-colors whitespace-nowrap">
                                Apply <ExternalLink size={13} />
                            </a>
                        )}
                        <button onClick={() => setExpanded(!expanded)} className="px-3 py-2 border border-border text-xs font-semibold rounded-lg hover:bg-muted transition-colors">
                            {expanded ? "Less" : "Details"}
                        </button>
                    </div>
                </div>
            </div>

            {expanded && (
                <div className="border-t border-border/50 p-5 space-y-4 text-sm bg-muted/20">
                    <div>
                        <p className="font-semibold mb-1 text-foreground">About this scheme</p>
                        <p className="text-muted-foreground leading-relaxed">{scheme.fullDescription}</p>
                    </div>
                    <div>
                        <p className="font-semibold mb-1 text-foreground">Benefits</p>
                        <p className="text-muted-foreground">{scheme.benefits}</p>
                    </div>
                    {scheme.eligibilityCriteria?.length > 0 && (
                        <div>
                            <p className="font-semibold mb-2 text-foreground">Eligibility Criteria</p>
                            <ul className="space-y-1.5">
                                {scheme.eligibilityCriteria.map((c, i) => (
                                    <li key={i} className="flex items-center gap-2 text-muted-foreground">
                                        <CheckCircle2 size={13} className="text-green-500 shrink-0" /> {c.label}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {scheme.requiredDocuments?.length > 0 && (
                        <div>
                            <p className="font-semibold mb-2 text-foreground">Required Documents</p>
                            <ul className="space-y-1.5">
                                {scheme.requiredDocuments.map((d, i) => (
                                    <li key={i} className="flex items-center gap-2 text-muted-foreground">
                                        <FileText size={13} className="text-primary shrink-0" />
                                        {d.name} {d.mandatory ? <span className="text-xs text-red-500">(Mandatory)</span> : <span className="text-xs">(Optional)</span>}
                                        {d.note && <span className="text-xs opacity-60">— {d.note}</span>}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {scheme.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {scheme.tags.map((tag) => (
                                <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                                    <Tag size={11} /> {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

const CATEGORIES = ["All", "Scholarship", "Insurance", "Government Aid", "Subsidy", "Loan", "Pension", "Other"];

export default function SchemesPage() {
    const [results, setResults] = useState<MatchResult[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("All");
    const [search, setSearch] = useState("");
    const [onlyEligible, setOnlyEligible] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSchemes = async () => {
            setLoading(true);
            setError(null);
            try {
                // Load user profile from localStorage
                let profile = {};
                try { const raw = localStorage.getItem("policypilot_profile"); if (raw) profile = JSON.parse(raw); } catch { /* ignore */ }

                const res = await fetch("/api/schemes/eligible", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ profile }),
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || "Failed to load");
                setResults(data.results || []);
            } catch (e) {
                setError(e instanceof Error ? e.message : "Failed to load schemes");
            } finally {
                setLoading(false);
            }
        };
        fetchSchemes();
    }, []);

    const filtered = results.filter((r) => {
        const matchCat = filter === "All" || r.scheme.category === filter;
        const matchSearch = !search || r.scheme.title.toLowerCase().includes(search.toLowerCase()) || r.scheme.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
        const matchEligible = !onlyEligible || r.eligible;
        return matchCat && matchSearch && matchEligible;
    });

    const eligibleCount = results.filter((r) => r.eligible).length;

    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
            <div className="mb-2">
                <h1 className="text-3xl font-bold tracking-tight mb-2">Browse Schemes</h1>
                <p className="text-muted-foreground">
                    {loading ? "Loading..." : `${results.length} schemes found — ${eligibleCount} match your profile.`}
                </p>
            </div>

            {/* Filters */}
            <div className="bg-card border border-border rounded-2xl p-4 space-y-3 shadow-soft">
                <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search schemes by name or tag..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                </div>
                <div className="flex flex-wrap gap-2 items-center">
                    {CATEGORIES.map((c) => (
                        <button
                            key={c}
                            onClick={() => setFilter(c)}
                            className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${filter === c ? "bg-primary text-primary-foreground font-semibold" : "bg-muted text-foreground hover:bg-muted/80"}`}
                        >
                            {c}
                        </button>
                    ))}
                    <label className="flex items-center gap-2 text-xs font-medium cursor-pointer ml-auto">
                        <input type="checkbox" checked={onlyEligible} onChange={(e) => setOnlyEligible(e.target.checked)} className="rounded" />
                        Eligible only
                    </label>
                </div>
            </div>

            {/* Content */}
            {loading ? (
                <div className="flex items-center justify-center py-20 text-muted-foreground gap-3">
                    <Loader2 size={28} className="animate-spin text-primary" /> Loading schemes...
                </div>
            ) : error ? (
                <div className="text-center py-16 text-red-500 bg-card border border-border rounded-2xl">
                    <XCircle size={32} className="mx-auto mb-3 opacity-60" />
                    <p className="font-medium">{error}</p>
                    <p className="text-xs mt-1 text-muted-foreground">Make sure MongoDB is connected and dev server is running.</p>
                </div>
            ) : filtered.length === 0 ? (
                <div className="text-center py-20 text-muted-foreground bg-card border border-dashed border-border rounded-2xl">
                    <FileText size={32} className="mx-auto mb-3 opacity-40" />
                    <p className="font-medium">No schemes found</p>
                    <p className="text-xs mt-1">Try removing some filters or ask an admin to create schemes.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filtered.map((r) => <SchemeCard key={r.scheme._id} result={r} />)}
                </div>
            )}
        </div>
    );
}
