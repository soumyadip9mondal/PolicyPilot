import { PolicyUpload } from "@/components/policy-details/PolicyUpload";
import { PolicySummary } from "@/components/policy-details/PolicySummary";
import { RequiredDocuments } from "@/components/policy-details/RequiredDocuments";
import { PolicyAssistantChat } from "@/components/policy-details/PolicyAssistantChat";
import { HiddenClauses } from "@/components/policy-details/HiddenClauses";

export default function PolicyDetails() {
    return (
        <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
            <div className="mb-2">
                <h1 className="text-3xl font-bold tracking-tight mb-2">Policy Analysis</h1>
                <p className="text-muted-foreground">Upload a document or link to evaluate eligibility and requirements.</p>
            </div>

            <PolicyUpload />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <PolicySummary />
                    <HiddenClauses />
                    <RequiredDocuments />
                </div>
                <div className="lg:col-span-1">
                    <PolicyAssistantChat />
                </div>
            </div>
        </div>
    );
}
