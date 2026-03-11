import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { DashboardPreviewSection } from "@/components/landing/DashboardPreviewSection";
import { CtaSection } from "@/components/landing/CtaSection";
import { LandingFooter } from "@/components/landing/LandingFooter";

export default async function LandingPage() {
  const { userId } = await auth();

  // If user is already signed in, redirect them straight to the dashboard
  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="bg-slate-950 min-h-screen font-sans" style={{ scrollBehavior: "smooth" }}>
      <LandingNavbar />
      <HeroSection />
      <ProblemSection />
      <HowItWorksSection />
      <FeaturesSection />
      <DashboardPreviewSection />
      <CtaSection />
      <LandingFooter />
    </div>
  );
}
