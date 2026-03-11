"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignOutButton } from "@clerk/nextjs";
import {
    LayoutDashboard,
    FileText,
    FileEdit,
    History,
    User,
    LogOut,
    Send,
    BookOpen,
} from "lucide-react";

export function Sidebar() {
    const pathname = usePathname();

    const navItems = [
        { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { name: "Browse Schemes", href: "/dashboard/schemes", icon: BookOpen },
        { name: "Policy Details", href: "/dashboard/policy-details", icon: FileText },
        { name: "Apply to Policy", href: "/dashboard/apply", icon: FileEdit },
        { name: "History", href: "/dashboard/history", icon: History },
        { name: "Your Profile", href: "/dashboard/profile", icon: User },
    ];

    return (
        <aside className="w-64 bg-primary text-primary-foreground min-h-screen fixed left-0 top-0 flex flex-col shadow-soft z-20">
            <div className="p-6 flex items-center gap-2 font-bold text-2xl">
                <Send className="w-6 h-6" />
                <span>PolicyPilot</span>
            </div>

            <nav className="flex-1 px-4 space-y-2 mt-4">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${isActive
                                ? "bg-white/20 font-semibold"
                                : "hover:bg-white/10"
                                }`}
                        >
                            <Icon className="w-5 h-5" />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 mb-4">
                <SignOutButton redirectUrl="/">
                    <button className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-md hover:bg-white/10 transition-colors cursor-pointer">
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </SignOutButton>
            </div>
        </aside>
    );
}
