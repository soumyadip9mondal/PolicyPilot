"use client";

import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Bell, Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { UserButton } from "@clerk/nextjs";

export function Navbar() {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const getPageTitle = () => {
        switch (pathname) {
            case "/dashboard":
                return "Dashboard";
            case "/dashboard/policy-details":
                return "Policy Details";
            case "/dashboard/apply":
                return "Apply to Policy";
            case "/dashboard/history":
                return "History";
            case "/dashboard/profile":
                return "Your Profile";
            case "/dashboard/schemes":
                return "Browse Schemes";
            default:
                return "PolicyPilot";
        }
    };

    return (
        <header className="h-20 bg-card border-b border-border flex items-center justify-between px-8 sticky top-0 z-10 w-full">
            <h1 className="text-2xl font-semibold text-foreground">
                {getPageTitle()}
            </h1>
            <div className="flex items-center gap-6">
                <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground"
                    aria-label="Toggle theme"
                >
                    {mounted && theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <button className="relative p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground" aria-label="Notifications">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full"></span>
                </button>
                <div className="flex items-center gap-3 pl-4 border-l border-border h-8">
                    <UserButton />
                </div>
            </div>
        </header>
    );
}
