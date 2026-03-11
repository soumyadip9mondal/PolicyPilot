"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const problems = [
    {
        icon: "📄",
        title: "Hundreds of Pages",
        description: "Government policies span hundreds of pages of dense legal text that takes days to read.",
    },
    {
        icon: "🔒",
        title: "Complex Eligibility Rules",
        description: "Hidden eligibility criteria buried in footnotes cause most applicants to be rejected.",
    },
    {
        icon: "⏰",
        title: "Missed Deadlines",
        description: "Important application windows close unnoticed because information is scattered across portals.",
    },
    {
        icon: "📋",
        title: "Confusing Paperwork",
        description: "Multi-form applications with unclear instructions lead to errors and repeated submissions.",
    },
];

function ProblemCard({ icon, title, description, index }: {
    icon: string;
    title: string;
    description: string;
    index: number;
}) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
            className="group relative p-6 bg-slate-900/60 border border-white/5 rounded-2xl hover:border-red-500/30 transition-all duration-300 hover:bg-slate-900/80"
        >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative">
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="text-white font-semibold text-base mb-2">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
            </div>
        </motion.div>
    );
}

export function ProblemSection() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section className="py-28 bg-slate-950 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-red-950/5 to-slate-950" />

            <div className="relative max-w-6xl mx-auto px-6">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 text-sm font-medium mb-5">
                        The Problem
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-5">
                        Policies Are{" "}
                        <span className="text-red-400">Hard to Understand</span>
                    </h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
                        Government schemes, insurance policies, and scholarship rules are often long
                        and written in complex legal language—leaving most people confused and unable to benefit.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {problems.map((p, i) => (
                        <ProblemCard key={p.title} {...p} index={i} />
                    ))}
                </div>

                {/* VS divider */}
                <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={inView ? { opacity: 1, scaleX: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-16 flex items-center gap-6"
                >
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
                    <div className="px-6 py-2 bg-blue-600/20 border border-blue-500/30 rounded-full text-blue-400 text-sm font-semibold">
                        PolicyPilot Solves This
                    </div>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
                </motion.div>
            </div>
        </section>
    );
}
