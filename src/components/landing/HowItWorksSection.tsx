"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
    {
        number: "01",
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
        ),
        title: "Upload Your Policy",
        description: "Upload any policy document or paste a scheme link. We support PDFs, Word files, and web URLs.",
        color: "from-blue-500 to-cyan-500",
        glow: "shadow-blue-500/30",
        border: "border-blue-500/30",
    },
    {
        number: "02",
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
        title: "AI Reads & Analyzes",
        description: "Our AI extracts eligibility criteria, key rules, deadlines, and important conditions—in seconds.",
        color: "from-violet-500 to-purple-500",
        glow: "shadow-violet-500/30",
        border: "border-violet-500/30",
    },
    {
        number: "03",
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        title: "Check Eligibility",
        description: "Enter your details and instantly know if you qualify, with a clear breakdown of each criterion.",
        color: "from-emerald-500 to-teal-500",
        glow: "shadow-emerald-500/30",
        border: "border-emerald-500/30",
    },
    {
        number: "04",
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
        ),
        title: "Apply With Guidance",
        description: "Get step-by-step help filling forms, uploading documents, and submitting your application.",
        color: "from-amber-500 to-orange-500",
        glow: "shadow-amber-500/30",
        border: "border-amber-500/30",
    },
];

export function HowItWorksSection() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section id="how-it-works" className="py-28 bg-slate-950 relative overflow-hidden">
            {/* Background accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

            <div className="relative max-w-6xl mx-auto px-6">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium mb-5">
                        Simple Process
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-5">
                        How{" "}
                        <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                            PolicyPilot
                        </span>{" "}
                        Works
                    </h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        From complex policy documents to a clear action plan—in four simple steps.
                    </p>
                </motion.div>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {steps.map((step, i) => (
                        <motion.div
                            key={step.number}
                            initial={{ opacity: 0, y: 50 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.1 + i * 0.15, ease: "easeOut" }}
                            className={`group relative p-6 bg-slate-900/60 border ${step.border} rounded-2xl hover:bg-slate-900/90 transition-all duration-300`}
                        >
                            {/* Connector line (hidden on last) */}
                            {i < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-10 -right-3 w-6 h-px bg-slate-700 z-10" />
                            )}

                            {/* Number badge */}
                            <div className="text-xs font-bold text-slate-600 mb-4 font-mono">{step.number}</div>

                            {/* Icon */}
                            <div
                                className={`w-12 h-12 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center text-white mb-4 shadow-lg ${step.glow} group-hover:scale-110 transition-transform duration-300`}
                            >
                                {step.icon}
                            </div>

                            <h3 className="text-white font-semibold text-base mb-2">{step.title}</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>

                            {/* Hover glow overlay */}
                            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
