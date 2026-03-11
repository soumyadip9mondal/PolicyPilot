"use client";

import { useUser } from "@clerk/nextjs";
import { EligibleSchemes } from "@/components/dashboard/EligibleSchemes";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { RecentApplications } from "@/components/dashboard/RecentApplications";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { UpcomingDeadlines } from "@/components/dashboard/UpcomingDeadlines";

export default function Dashboard() {
    const { user, isLoaded } = useUser();

    // Show the user's name. Priority: fullName > firstName > username > email > "User"
    const displayName = isLoaded && user
        ? user.fullName || user.firstName || user.username || user.primaryEmailAddress?.emailAddress || "User"
        : "...";

    return (
        <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
            <div className="mb-2">
                <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome back, {displayName}</h1>
                <p className="text-muted-foreground">Here&apos;s what&apos;s happening with your applications today.</p>
            </div>

            <EligibleSchemes />
            <StatsCards />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <RecentApplications />
                </div>
                <div className="flex flex-col gap-6">
                    <QuickActions />
                    <div className="flex-1 min-h-[160px]">
                        <UpcomingDeadlines />
                    </div>
                </div>
            </div>
        </div>
    );
}
