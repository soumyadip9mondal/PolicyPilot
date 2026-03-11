"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SignUpButton, Show } from "@clerk/nextjs";

// Pre-computed stable values — avoids SSR/client Math.random() hydration mismatch
const floatingParticles = [
    { id: 0, x: 52.79, y: 33.79, size: 5.96, duration: 11.2, delay: 1.3 },
    { id: 1, x: 17.99, y: 88.33, size: 5.48, duration: 8.7, delay: 3.1 },
    { id: 2, x: 70.78, y: 79.29, size: 5.20, duration: 12.4, delay: 0.5 },
    { id: 3, x: 44.29, y: 91.02, size: 4.43, duration: 9.8, delay: 2.7 },
    { id: 4, x: 60.18, y: 83.00, size: 4.61, duration: 7.3, delay: 0.9 },
    { id: 5, x: 52.92, y: 63.51, size: 5.15, duration: 10.6, delay: 3.8 },
    { id: 6, x: 65.25, y: 22.24, size: 5.22, duration: 6.5, delay: 1.7 },
    { id: 7, x: 54.06, y: 82.12, size: 4.13, duration: 13.1, delay: 2.2 },
    { id: 8, x: 27.21, y: 36.78, size: 4.29, duration: 8.4, delay: 0.3 },
    { id: 9, x: 85.26, y: 63.72, size: 4.13, duration: 11.9, delay: 3.5 },
    { id: 10, x: 11.70, y: 56.88, size: 5.34, duration: 9.2, delay: 1.1 },
    { id: 11, x: 57.16, y: 34.44, size: 3.89, duration: 7.8, delay: 2.9 },
    { id: 12, x: 94.95, y: 92.19, size: 5.42, duration: 12.7, delay: 0.7 },
    { id: 13, x: 5.12, y: 12.66, size: 4.78, duration: 10.3, delay: 3.3 },
    { id: 14, x: 15.96, y: 54.48, size: 5.72, duration: 6.9, delay: 1.5 },
    { id: 15, x: 46.26, y: 91.25, size: 3.69, duration: 8.1, delay: 2.4 },
    { id: 16, x: 47.40, y: 1.74, size: 5.82, duration: 13.5, delay: 0.2 },
    { id: 17, x: 78.92, y: 79.27, size: 5.59, duration: 7.6, delay: 3.7 },
    { id: 18, x: 20.96, y: 32.44, size: 4.95, duration: 9.5, delay: 1.9 },
    { id: 19, x: 19.42, y: 23.40, size: 4.37, duration: 11.4, delay: 2.6 },
];

export function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
            {/* Animated gradient background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/40 to-violet-950/40" />
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-3xl"
                />
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {floatingParticles.map((p) => (
                    <motion.div
                        key={p.id}
                        className="absolute rounded-full bg-blue-400/20"
                        style={{
                            width: p.size,
                            height: p.size,
                            left: `${p.x}%`,
                            top: `${p.y}%`,
                        }}
                        animate={{
                            y: [-20, 20, -20],
                            x: [-10, 10, -10],
                            opacity: [0.2, 0.6, 0.2],
                        }}
                        transition={{
                            duration: p.duration,
                            repeat: Infinity,
                            delay: p.delay,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            {/* Grid overlay */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
                    backgroundSize: "60px 60px",
                }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 flex flex-col lg:flex-row items-center gap-16">
                {/* Left content */}
                <div className="flex-1 text-center lg:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium mb-6"
                    >
                        <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                        AI-Powered Policy Navigator
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-5xl lg:text-7xl font-extrabold text-white leading-[1.08] tracking-tight mb-6"
                    >
                        Navigate Policies
                        <br />
                        <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
                            With Confidence
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.5 }}
                        className="text-lg text-slate-400 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
                    >
                        PolicyPilot uses AI to decode complex legal policies, check your eligibility
                        in seconds, and guide you through every application step—no legal expertise needed.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.65 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                    >
                        <Show when="signed-out">
                            <SignUpButton forceRedirectUrl="/dashboard" mode="modal">
                                <button className="group relative px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-violet-600 rounded-xl overflow-hidden shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 cursor-pointer">
                                    <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <span className="relative flex items-center gap-2">
                                        Get Started Free
                                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </span>
                                </button>
                            </SignUpButton>
                        </Show>
                        <Show when="signed-in">
                            <Link
                                href="/dashboard"
                                className="group relative px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-violet-600 rounded-xl overflow-hidden shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <span className="relative flex items-center gap-2">
                                    Go to Dashboard
                                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </span>
                            </Link>
                        </Show>
                        <a
                            href="#how-it-works"
                            className="px-8 py-4 text-base font-semibold text-white border border-white/20 hover:border-white/40 rounded-xl backdrop-blur-sm hover:bg-white/5 transition-all duration-300"
                        >
                            See How It Works
                        </a>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.9 }}
                        className="flex gap-8 justify-center lg:justify-start mt-12 pt-8 border-t border-white/10"
                    >
                        {[
                            { value: "10K+", label: "Policies Analyzed" },
                            { value: "95%", label: "Accuracy Rate" },
                            { value: "50K+", label: "Users Helped" },
                        ].map((stat) => (
                            <div key={stat.label} className="text-center">
                                <div className="text-2xl font-bold text-white">{stat.value}</div>
                                <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Right — Animated UI Card */}
                <motion.div
                    initial={{ opacity: 0, x: 60, scale: 0.92 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
                    className="flex-1 max-w-lg w-full"
                >
                    <div className="relative">
                        {/* Glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-violet-500/30 rounded-2xl blur-2xl scale-105" />

                        {/* Main card */}
                        <div className="relative bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
                            {/* Card header */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-violet-600 rounded-xl flex items-center justify-center">
                                        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white">
                                            <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-white font-semibold text-sm">Eligibility Check</div>
                                        <div className="text-slate-400 text-xs">PM Scholarship Scheme 2024</div>
                                    </div>
                                </div>
                                <span className="px-2.5 py-1 text-xs font-semibold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-full">
                                    ✓ Eligible
                                </span>
                            </div>

                            {/* Progress bars */}
                            {[
                                { label: "Income Criteria", pct: 92, color: "from-emerald-400 to-cyan-400" },
                                { label: "Age Requirement", pct: 100, color: "from-blue-400 to-violet-400" },
                                { label: "Document Status", pct: 78, color: "from-amber-400 to-orange-400" },
                            ].map((item, i) => (
                                <div key={item.label} className="mb-4">
                                    <div className="flex justify-between text-xs mb-1.5">
                                        <span className="text-slate-400">{item.label}</span>
                                        <span className="text-slate-300 font-medium">{item.pct}%</span>
                                    </div>
                                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${item.pct}%` }}
                                            transition={{ duration: 1, delay: 0.8 + i * 0.2, ease: "easeOut" }}
                                            className={`h-full bg-gradient-to-r ${item.color} rounded-full`}
                                        />
                                    </div>
                                </div>
                            ))}

                            {/* AI insight box */}
                            <div className="mt-5 p-3.5 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                                <div className="flex gap-2.5">
                                    <div className="w-6 h-6 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <svg className="w-3.5 h-3.5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-xs font-semibold text-blue-400 mb-0.5">AI Insight</div>
                                        <p className="text-xs text-slate-400 leading-relaxed">
                                            You qualify! Upload your income certificate to complete the application.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating badges */}
                        <motion.div
                            animate={{ y: [-4, 4, -4] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-4 -right-4 px-3 py-1.5 bg-violet-600 text-white text-xs font-semibold rounded-full shadow-lg"
                        >
                            AI Powered ✨
                        </motion.div>
                        <motion.div
                            animate={{ y: [4, -4, 4] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute -bottom-4 -left-4 px-3 py-1.5 bg-emerald-600 text-white text-xs font-semibold rounded-full shadow-lg"
                        >
                            100% Free 🎉
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500"
            >
                <span className="text-xs tracking-widest uppercase">Scroll</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
            </motion.div>
        </section>
    );
}
