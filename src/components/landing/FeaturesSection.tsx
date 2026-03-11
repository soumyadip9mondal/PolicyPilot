"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const features = [
    {
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
        title: "Instant AI Analysis",
        description: "Upload any policy document and receive a complete breakdown of key terms, eligibility rules, and deadlines within seconds.",
        gradient: "from-blue-500 to-cyan-500",
        glow: "group-hover:shadow-blue-500/20",
        border: "group-hover:border-blue-500/40",
    },
    {
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        ),
        title: "Eligibility Checker",
        description: "Answer a few simple questions and instantly know whether you qualify for a policy—with a detailed explanation of each criterion.",
        gradient: "from-emerald-500 to-teal-500",
        glow: "group-hover:shadow-emerald-500/20",
        border: "group-hover:border-emerald-500/40",
    },
    {
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
        ),
        title: "AI Policy Chatbot",
        description: "Ask any question about a policy in plain language and get clear, accurate answers powered by advanced AI language models.",
        gradient: "from-violet-500 to-purple-500",
        glow: "group-hover:shadow-violet-500/20",
        border: "group-hover:border-violet-500/40",
    },
    {
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
        ),
        title: "Smart Application Guide",
        description: "Get personalized step-by-step guidance on filling forms, gathering required documents, and submitting your application correctly.",
        gradient: "from-amber-500 to-orange-500",
        glow: "group-hover:shadow-amber-500/20",
        border: "group-hover:border-amber-500/40",
    },
];

export function FeaturesSection() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section id="features" className="py-28 bg-gradient-to-b from-slate-950 to-slate-900 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="relative max-w-6xl mx-auto px-6">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 text-sm font-medium mb-5">
                        Powerful Features
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-5">
                        Everything You Need to{" "}
                        <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                            Succeed
                        </span>
                    </h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        PolicyPilot combines AI analysis, eligibility checking, and smart guidance in one seamless platform.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {features.map((feature, i) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 40 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.1 + i * 0.12, ease: "easeOut" }}
                            className={`group relative p-7 bg-slate-900/60 border border-white/5 ${feature.border} rounded-2xl hover:-translate-y-1 transition-all duration-300 shadow-xl ${feature.glow} hover:shadow-2xl overflow-hidden`}
                        >
                            {/* Glassmorphism subtle overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />

                            {/* Glow gradient background on hover */}
                            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-300`} />

                            <div className="relative">
                                {/* Icon */}
                                <div className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center text-white mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    {feature.icon}
                                </div>

                                <h3 className="text-white font-bold text-lg mb-3">{feature.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
