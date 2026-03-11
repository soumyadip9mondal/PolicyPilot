import { Sidebar } from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-background text-foreground">
            <Sidebar />
            <div className="flex-1 flex flex-col pl-64 w-full">
                <Navbar />
                <main className="flex-1 p-8 bg-secondary/30">{children}</main>
            </div>
        </div>
    );
}
