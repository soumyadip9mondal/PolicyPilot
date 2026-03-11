import { Upload, FileSearch, Send, ArrowRight } from "lucide-react";
import Link from "next/link";

export function QuickActions() {
    const actions = [
        { label: "Upload Policy", icon: Upload, href: "/dashboard/policy-details" },
        { label: "Check Eligibility", icon: FileSearch, href: "/dashboard/policy-details" },
        { label: "Apply to Scheme", icon: Send, href: "/dashboard/apply" },
    ];

    return (
        <div className="bg-card rounded-2xl p-6 shadow-soft border border-border h-full flex flex-col">
            <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
            <div className="flex flex-col gap-3 flex-1 justify-center">
                {actions.map((action, i) => (
                    <Link
                        key={i}
                        href={action.href}
                        className="flex items-center gap-3 p-3 rounded-xl border border-border hover:bg-muted transition-colors group"
                    >
                        <div className="p-2 bg-primary/10 text-primary rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            <action.icon size={18} />
                        </div>
                        <span className="font-medium flex-1 text-sm">{action.label}</span>
                        <ArrowRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                    </Link>
                ))}
            </div>
        </div>
    );
}
