"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Check, Edit3, Wand2, User } from "lucide-react";

interface ProfileData {
    fullName?: string;
    dob?: string;
    category?: string;
    annualIncome?: string;
    village?: string;
    district?: string;
    state?: string;
    pincode?: string;
    accountNumber?: string;
    bankName?: string;
    ifsc?: string;
    fatherName?: string;
    motherName?: string;
    gender?: string;
    postOffice?: string;
    occupation?: string;
    parentOccupation?: string;
}

const FIELD_MAP: { field: keyof ProfileData; label: string }[] = [
    { field: "fullName", label: "Full Name" },
    { field: "dob", label: "Date of Birth" },
    { field: "category", label: "Category" },
    { field: "annualIncome", label: "Annual Income" },
    { field: "village", label: "Address" },
    { field: "accountNumber", label: "Bank Account Number" },
    { field: "ifsc", label: "IFSC Code" },
];

export function AutoFillPreview() {
    const { user, isLoaded } = useUser();
    const [profile, setProfile] = useState<ProfileData>({});

    useEffect(() => {
        if (isLoaded && user) {
            const meta = (user.unsafeMetadata?.profile as ProfileData) || {};
            setProfile({
                fullName: user.fullName || meta.fullName || "",
                ...meta,
            });
        }
    }, [isLoaded, user]);

    const previewRows = FIELD_MAP.map(({ field, label }) => ({
        field: label,
        value: profile[field] || "—",
        status: profile[field] ? "matched" : "missing",
    }));

    return (
        <div className="bg-card rounded-2xl p-6 shadow-soft border border-border h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <Wand2 size={18} className="text-primary" /> Auto-Fill Preview
                </h3>
                <div className="flex gap-2">
                    <button className="text-xs bg-muted hover:bg-muted/80 text-foreground px-3 py-1.5 rounded-md font-medium transition-colors flex items-center gap-1.5">
                        <Edit3 size={14} /> Edit Before Fill
                    </button>
                    <button className="text-xs bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-md font-semibold transition-colors flex items-center gap-1.5 shadow-sm">
                        <Wand2 size={14} /> Auto Fill Form
                    </button>
                </div>
            </div>

            {!isLoaded || !user ? (
                <div className="flex items-center justify-center flex-1 gap-2 text-muted-foreground text-sm">
                    <User size={18} /> Sign in to see auto-fill preview
                </div>
            ) : (
                <div className="flex-1 overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-muted/30 text-muted-foreground font-medium border-y border-border">
                            <tr>
                                <th className="py-2.5 px-4 font-normal rounded-tl-lg">Form Field</th>
                                <th className="py-2.5 px-4 font-normal">Profile Data</th>
                                <th className="py-2.5 px-4 font-normal text-right rounded-tr-lg">Match Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {previewRows.map((row, i) => (
                                <tr key={i} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                                    <td className="py-3 px-4 font-medium text-muted-foreground">{row.field}</td>
                                    <td className="py-3 px-4 font-semibold text-foreground">{row.value}</td>
                                    <td className="py-3 px-4 text-right">
                                        {row.status === "matched" ? (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                                <Check size={12} strokeWidth={3} /> Matched
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-muted text-muted-foreground">
                                                Missing
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {previewRows.every((r) => r.status === "missing") && (
                        <div className="mt-4 p-3 bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-xl text-sm text-amber-700 dark:text-amber-400 text-center">
                            Complete your <a href="/dashboard/profile" className="underline font-semibold">profile</a> to enable auto-fill
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
