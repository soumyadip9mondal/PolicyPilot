"use client";

import { useState } from "react";
import { Link2, Search, ListChecks } from "lucide-react";

export function FormAnalysis() {
    const [url, setUrl] = useState("");

    const detectedFields = [
        "Full Name",
        "Date of Birth",
        "Category",
        "Annual Income",
        "Permanent Address",
        "Bank Account Number",
        "IFSC Code"
    ];

    return (
        <div className="bg-card rounded-2xl p-6 shadow-soft border border-border h-full flex flex-col">
            <div className="mb-6">
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Link2 size={18} className="text-primary" /> Paste Application Website Link
                </h3>
                <div className="flex gap-2">
                    <input
                        type="url"
                        placeholder="https://scholarships.gov.in/apply"
                        className="flex-1 bg-muted/30 border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                    <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2">
                        Analyze Form <Search size={16} />
                    </button>
                </div>
            </div>

            <div className="flex-1 bg-muted/10 border border-border rounded-xl p-5">
                <h4 className="font-semibold text-sm mb-4 flex items-center gap-2">
                    <ListChecks size={16} className="text-primary" /> Detected Form Fields
                </h4>
                <div className="flex flex-wrap gap-2">
                    {detectedFields.map((field, i) => (
                        <span key={i} className="px-3 py-1.5 bg-background border border-border rounded-md text-xs font-medium text-muted-foreground flex items-center gap-1.5 before:content-[''] before:w-1.5 before:h-1.5 before:bg-primary/50 before:rounded-full">
                            {field}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
