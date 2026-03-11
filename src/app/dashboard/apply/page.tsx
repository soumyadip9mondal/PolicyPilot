import { FormAnalysis } from "@/components/apply/FormAnalysis";
import { AutoFillPreview } from "@/components/apply/AutoFillPreview";
import { DocumentUploadAndIssues } from "@/components/apply/DocumentUpload";
import { FormAssistant } from "@/components/apply/FormAssistant";

export default function ApplyToPolicy() {
    return (
        <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
            <div className="mb-2">
                <h1 className="text-3xl font-bold tracking-tight mb-2">Apply to Policy</h1>
                <p className="text-muted-foreground">We&apos;ll help you auto-fill the application form and verify your documents.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <FormAnalysis />
                    <AutoFillPreview />
                    <DocumentUploadAndIssues />
                </div>
                <div className="lg:col-span-1">
                    <FormAssistant />
                </div>
            </div>
        </div>
    );
}
