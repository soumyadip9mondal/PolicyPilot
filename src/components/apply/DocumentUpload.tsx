"use client";

import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import { Upload, AlertTriangle, CheckCircle, FileWarning } from "lucide-react";

export function DocumentUploadAndIssues() {
    const [, setFiles] = useState<File[]>([]);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles(acceptedFiles);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
            'image/*': ['.jpeg', '.jpg', '.png']
        }
    });

    const documents = [
        { name: "Aadhaar Card", status: "uploaded", warning: null, file: "aadhaar_mask_9012.pdf" },
        { name: "Income Certificate", status: "warning", warning: "Issued over 12 months ago", file: "income_cert_2024.pdf" },
        { name: "Student ID", status: "missing", warning: "Not Uploaded", file: null },
    ];

    return (
        <div className="bg-card rounded-2xl p-6 shadow-soft border border-border h-full flex flex-col">
            <h3 className="font-semibold text-foreground mb-4">Required Document Verification</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {documents.map((doc, i) => (
                    <div key={i} className={`p-4 rounded-xl border flex flex-col gap-2 ${doc.status === "uploaded" ? "bg-green-50/30 border-green-100 dark:bg-green-950/10 dark:border-green-900/30" :
                        doc.status === "warning" ? "bg-amber-50/50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-900/50" :
                            "bg-red-50/30 border-red-100 dark:bg-red-950/10 dark:border-red-900/30"
                        }`}>
                        <div className="flex items-center gap-2">
                            {doc.status === "uploaded" && <CheckCircle size={16} className="text-green-500" />}
                            {doc.status === "warning" && <AlertTriangle size={16} className="text-amber-500" />}
                            {doc.status === "missing" && <FileWarning size={16} className="text-red-500" />}
                            <p className={`font-semibold text-sm ${doc.status === "uploaded" ? "text-green-900 dark:text-green-200" :
                                doc.status === "warning" ? "text-amber-900 dark:text-amber-200" :
                                    "text-red-900 dark:text-red-200"
                                }`}>
                                {doc.name}
                            </p>
                        </div>

                        <p className={`text-xs ${doc.status === "warning" ? "text-amber-700 dark:text-amber-400 font-medium" :
                            doc.status === "missing" ? "text-red-600 dark:text-red-400 font-medium" :
                                "text-green-700/80 dark:text-green-300/80"
                            }`}>
                            {doc.warning || "Verified"}
                        </p>
                    </div>
                ))}
            </div>

            <div className="mt-auto">
                <h4 className="font-semibold text-sm mb-3">Upload Missing Documents</h4>
                <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${isDragActive ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50 hover:bg-muted/50'}`}
                >
                    <input {...getInputProps()} />
                    <Upload size={20} className="text-primary mx-auto mb-2" />
                    <p className="font-medium text-sm text-foreground mb-1">
                        {isDragActive ? "Drop the files here" : "Drag & drop to upload"}
                    </p>
                </div>
            </div>
        </div>
    );
}
