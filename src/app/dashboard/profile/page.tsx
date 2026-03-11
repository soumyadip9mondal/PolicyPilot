"use client";

import { useUser } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { User, MapPin, UploadCloud, Save, CheckCircle, Loader2, Briefcase, BanknoteIcon } from "lucide-react";
import { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { logEvent } from "@/lib/history";

interface ProfileData {
    fullName: string;
    fatherName: string;
    motherName: string;
    dob: string;
    gender: string;
    category: string;
    village: string;
    postOffice: string;
    district: string;
    state: string;
    pincode: string;
    annualIncome: string;
    occupation: string;
    parentOccupation: string;
    accountNumber: string;
    bankName: string;
    ifsc: string;
}

const DEFAULT_PROFILE: ProfileData = {
    fullName: "", fatherName: "", motherName: "",
    dob: "", gender: "Male",
    category: "General", village: "", postOffice: "",
    district: "", state: "", pincode: "",
    annualIncome: "", occupation: "", parentOccupation: "",
    accountNumber: "", bankName: "", ifsc: "",
};

export default function Profile() {
    const { user, isLoaded } = useUser();
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [files, setFiles] = useState<{ name: string; type: string }[]>([]);

    const { register, handleSubmit, reset } = useForm<ProfileData>({ defaultValues: DEFAULT_PROFILE });

    useEffect(() => {
        if (isLoaded && user) {
            const meta = (user.unsafeMetadata?.profile as ProfileData) || {};
            reset({
                fullName: user.fullName || meta.fullName || "",
                fatherName: meta.fatherName || "",
                motherName: meta.motherName || "",
                dob: meta.dob || "",
                gender: meta.gender || "Male",
                category: meta.category || "General",
                village: meta.village || "",
                postOffice: meta.postOffice || "",
                district: meta.district || "",
                state: meta.state || "",
                pincode: meta.pincode || "",
                annualIncome: meta.annualIncome || "",
                occupation: meta.occupation || "",
                parentOccupation: meta.parentOccupation || "",
                accountNumber: meta.accountNumber || "",
                bankName: meta.bankName || "",
                ifsc: meta.ifsc || "",
            });
            // Load saved files list
            const savedFiles = (user.unsafeMetadata?.uploadedDocs as string[]) || [];
            setFiles(savedFiles.map((name: string) => ({ name, type: "saved" })));
        }
    }, [isLoaded, user, reset]);

    const onSubmit = async (data: ProfileData) => {
        if (!user) return;
        setSaving(true);
        setSaved(false);
        try {
            const nameParts = data.fullName.trim().split(/\s+/);
            await user.update({
                firstName: nameParts[0] || "",
                lastName: nameParts.slice(1).join(" ") || "",
                unsafeMetadata: {
                    ...user.unsafeMetadata,
                    profile: data,
                    uploadedDocs: files.map((f) => f.name),
                },
            });
            // Also save to localStorage for other components
            localStorage.setItem("policypilot_profile", JSON.stringify({ ...data, uploadedDocs: files.map((f) => f.name) }));
            setSaved(true);
            logEvent("Profile Update", "Profile Saved", "Profile information updated", "success");
            setTimeout(() => setSaved(false), 3000);
        } catch (err) {
            console.error("Failed to save profile:", err);
            alert("Failed to save profile. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles((prev) => [
            ...prev,
            ...acceptedFiles.map((f) => ({ name: f.name, type: f.type })),
        ]);
        logEvent("Documents", "Documents Uploaded", `${acceptedFiles.length} file(s) uploaded`, "success");
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    if (!isLoaded) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    const inputClass = "w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50";
    const selectClass = inputClass;

    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500 pb-12">
            <div className="flex justify-between items-end mb-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Your Profile</h1>
                    <p className="text-muted-foreground">Manage your personal information and documents.</p>
                </div>
                <button
                    onClick={handleSubmit(onSubmit)}
                    disabled={saving}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 shadow-sm disabled:opacity-50"
                >
                    {saving ? (<><Loader2 size={16} className="animate-spin" /> Saving...</>) :
                        saved ? (<><CheckCircle size={16} /> Saved!</>) :
                            (<><Save size={16} /> Save Changes</>)}
                </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Personal Information */}
                <div className="bg-card rounded-2xl p-6 shadow-soft border border-border">
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2 border-b border-border pb-3">
                        <User size={18} className="text-primary" /> Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                            <input type="text" {...register("fullName")} className={inputClass} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground">Date of Birth</label>
                            <input type="date" {...register("dob")} className={inputClass} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground">Father&apos;s Name</label>
                            <input type="text" {...register("fatherName")} className={inputClass} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground">Mother&apos;s Name</label>
                            <input type="text" {...register("motherName")} className={inputClass} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground">Gender</label>
                            <select {...register("gender")} className={selectClass}>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                                <option value="Prefer not to say">Prefer not to say</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground">Category</label>
                            <select {...register("category")} className={selectClass}>
                                <option value="General">General</option>
                                <option value="OBC">OBC</option>
                                <option value="SC">SC</option>
                                <option value="ST">ST</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Address Information */}
                <div className="bg-card rounded-2xl p-6 shadow-soft border border-border">
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2 border-b border-border pb-3">
                        <MapPin size={18} className="text-primary" /> Address Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {[
                            { label: "Village / City", field: "village" as const },
                            { label: "Post Office", field: "postOffice" as const },
                            { label: "District", field: "district" as const },
                            { label: "State", field: "state" as const },
                            { label: "PIN Code", field: "pincode" as const },
                        ].map(({ label, field }) => (
                            <div key={field} className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">{label}</label>
                                <input type="text" {...register(field)} className={inputClass} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Economic / Occupation */}
                <div className="bg-card rounded-2xl p-6 shadow-soft border border-border">
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2 border-b border-border pb-3">
                        <Briefcase size={18} className="text-primary" /> Economic & Occupation
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground">Annual Family Income (₹)</label>
                            <input type="number" placeholder="e.g. 380000" {...register("annualIncome")} className={inputClass} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground">Occupation</label>
                            <input type="text" placeholder="e.g. Student, Farmer, Salaried" {...register("occupation")} className={inputClass} />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-medium text-muted-foreground">Parent&apos;s / Guardian&apos;s Occupation</label>
                            <input type="text" placeholder="e.g. Farmer, Daily Wage Worker" {...register("parentOccupation")} className={inputClass} />
                        </div>
                    </div>
                </div>

                {/* Bank Information */}
                <div className="bg-card rounded-2xl p-6 shadow-soft border border-border">
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2 border-b border-border pb-3">
                        <BanknoteIcon size={18} className="text-primary" /> Bank Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {[
                            { label: "Account Number", field: "accountNumber" as const },
                            { label: "Bank Name", field: "bankName" as const },
                            { label: "IFSC Code", field: "ifsc" as const },
                        ].map(({ label, field }) => (
                            <div key={field} className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">{label}</label>
                                <input type="text" {...register(field)} className={inputClass} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Document Upload */}
                <div className="bg-card rounded-2xl p-6 shadow-soft border border-border">
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2 border-b border-border pb-3">
                        <UploadCloud size={18} className="text-primary" /> Document Upload
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        Upload your Aadhaar Card, Income Certificate, Student ID, Bank Passbook, and Category Certificate.
                    </p>
                    <div
                        {...getRootProps()}
                        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${isDragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-muted/50"
                            }`}
                    >
                        <input {...getInputProps()} />
                        <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                            <UploadCloud size={24} />
                        </div>
                        <p className="font-medium text-foreground mb-1">
                            {isDragActive ? "Drop the files here" : "Drag & drop files here, or click to browse"}
                        </p>
                        <p className="text-xs text-muted-foreground">PDF, PNG, JPG accepted</p>
                    </div>
                    {files.length > 0 && (
                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 bg-muted/30 rounded-lg border border-border p-3 gap-2">
                            {files.map((file, i) => (
                                <div key={i} className="flex items-center gap-2 bg-background p-2 rounded border border-border shadow-sm">
                                    <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
                                    <span className="text-sm font-medium flex-1 truncate">{file.name}</span>
                                    <button
                                        type="button"
                                        onClick={() => setFiles((prev) => prev.filter((_, j) => j !== i))}
                                        className="text-muted-foreground hover:text-red-500 text-xs"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
}
