"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const previewScreens = [
    {
        title: "Dashboard",
        icon: "📊",
        description: "Your personalized policy hub",
        content: (
            <div className="space-y-2.5">
                <div className="flex gap-2">
                    {["Eligible: 8", "Applied: 3", "Success: 5"].map((s, i) => (
                        <div key={i} className="flex-1 bg-slate-800 rounded-lg p-2 text-center">
                            <div className="text-xs text-slate-300 font-medium">{s.split(":")[0]}</div>
                            <div className="text-lg font-bold text-white">{s.split(":")[1]}</div>
                        </div>
                    ))}
                </div>
                <div className="bg-slate-800 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-400" />
                        <div className="text-xs text-white font-medium">PM Scholarship Scheme</div>
                        <div className="ml-auto text-xs text-emerald-400">Eligible</div>
                    </div>
                    <div className="h-1.5 bg-slate-700 rounded-full">
                        <div className="h-full w-4/5 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full" />
                    </div>
                </div>
                <div className="bg-slate-800 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-blue-400" />
                        <div className="text-xs text-white font-medium">MSME Loan Scheme</div>
                        <div className="ml-auto text-xs text-blue-400">Review</div>
                    </div>
                    <div className="h-1.5 bg-slate-700 rounded-full">
                        <div className="h-full w-3/5 bg-gradient-to-r from-blue-400 to-violet-400 rounded-full" />
                    </div>
                </div>
            </div>
        ),
    },
    {
        title: "Policy Analysis",
        icon: "🤖",
        description: "Deep AI policy breakdown",
        content: (
            <div className="space-y-2.5">
                <div className="bg-slate-800 rounded-lg p-3">
                    <div className="text-xs text-slate-400 mb-1">Document</div>
                    <div className="text-xs text-white font-medium">PM_Scholarship_2024.pdf</div>
                    <div className="mt-2 flex gap-1.5 flex-wrap">
                        {["Education", "Financial Aid", "Students"].map((tag) => (
                            <span key={tag} className="px-1.5 py-0.5 bg-blue-500/20 text-blue-300 text-[10px] rounded-md">{tag}</span>
                        ))}
                    </div>
                </div>
                <div className="bg-slate-800 rounded-lg p-3">
                    <div className="text-[10px] text-slate-400 mb-2 uppercase tracking-wide">AI Summary</div>
                    <div className="text-xs text-slate-300 leading-relaxed">
                        Scholarship for students from families earning below ₹8 LPA. Age 18–25, merit-based selection...
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="flex-1 bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-2 text-center">
                        <div className="text-xs text-emerald-400">✓ Eligible</div>
                    </div>
                    <div className="flex-1 bg-amber-500/10 border border-amber-500/20 rounded-lg p-2 text-center">
                        <div className="text-xs text-amber-400">2 docs missing</div>
                    </div>
                </div>
            </div>
        ),
    },
    {
        title: "Eligibility Check",
        icon: "✅",
        description: "Instant qualification results",
        content: (
            <div className="space-y-2">
                {[
                    { label: "Annual Income < ₹8 LPA", pass: true, value: "₹4.2 LPA" },
                    { label: "Age 18–25 years", pass: true, value: "22 years" },
                    { label: "10th Score > 60%", pass: true, value: "78%" },
                    { label: "Indian Citizen", pass: true, value: "Yes" },
                ].map((criterion) => (
                    <div key={criterion.label} className="flex items-center gap-2 bg-slate-800 rounded-lg px-3 py-2">
                        <span className={`text-xs font-bold ${criterion.pass ? "text-emerald-400" : "text-red-400"}`}>
                            {criterion.pass ? "✓" : "✗"}
                        </span>
                        <span className="text-xs text-slate-300 flex-1">{criterion.label}</span>
                        <span className="text-xs text-slate-500">{criterion.value}</span>
                    </div>
                ))}
                <div className="mt-1 p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-center">
                    <div className="text-xs font-bold text-emerald-400">🎉 You Qualify!</div>
                </div>
            </div>
        ),
    },
];

export function DashboardPreviewSection() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section id="preview" className="py-28 bg-slate-900 relative overflow-hidden">
            <div className="absolute inset-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl" />
            </div>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="relative max-w-6xl mx-auto px-6">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-14"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm font-medium mb-5">
                        Platform Preview
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-5">
                        See It In{" "}
                        <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                            Action
                        </span>
                    </h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        A clean, intuitive dashboard designed to simplify your policy journey from start to finish.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {previewScreens.map((screen, i) => (
                        <motion.div
                            key={screen.title}
                            initial={{ opacity: 0, y: 50, scale: 0.96 }}
                            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                            transition={{ duration: 0.6, delay: 0.1 + i * 0.15, ease: "easeOut" }}
                            className="group"
                        >
                            {/* Browser chrome */}
                            <div className="bg-slate-800 rounded-t-xl px-4 py-2.5 flex items-center gap-2 border border-white/5">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                                </div>
                                <div className="flex-1 bg-slate-700 rounded-md h-5 flex items-center px-2">
                                    <div className="text-[9px] text-slate-500">app.policypilot.in/{screen.title.toLowerCase().replace(" ", "-")}</div>
                                </div>
                            </div>

                            {/* Screen content */}
                            <div className="bg-slate-950 border border-white/5 border-t-0 rounded-b-xl p-4 group-hover:border-blue-500/20 transition-colors duration-300">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-base">{screen.icon}</span>
                                    <div>
                                        <div className="text-white font-semibold text-sm">{screen.title}</div>
                                        <div className="text-slate-500 text-[10px]">{screen.description}</div>
                                    </div>
                                </div>
                                {screen.content}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom tagline */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mt-12 text-center"
                >
                    <div className="flex flex-wrap justify-center gap-6 text-slate-400 text-sm">
                        {["No credit card required", "Free to get started", "Cancel anytime"].map((t) => (
                            <div key={t} className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                {t}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
