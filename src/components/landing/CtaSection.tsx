"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { SignInButton, SignUpButton, Show } from "@clerk/nextjs";

export function CtaSection() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section id="contact" className="py-28 bg-slate-950 relative overflow-hidden">
            {/* Background glow */}
            <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.35, 0.15] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-blue-600 rounded-full blur-3xl"
            />
            <motion.div
                animate={{ scale: [1.15, 1, 1.15], opacity: [0.1, 0.25, 0.1] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-violet-600 rounded-full blur-3xl"
            />

            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="relative max-w-4xl mx-auto px-6 text-center">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium mb-6">
                        🚀 Ready to Start?
                    </div>

                    <h2 className="text-4xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                        Stop Struggling With
                        <br />
                        <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
                            Complex Policies
                        </span>
                    </h2>

                    <p className="text-slate-400 text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
                        Join thousands of users who have already discovered, understood, and successfully
                        applied for policies they deserve—with PolicyPilot.
                    </p>

                    <Show when="signed-out">
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <SignUpButton forceRedirectUrl="/dashboard" mode="modal">
                                <button className="group relative px-10 py-4 text-base font-bold text-white rounded-xl overflow-hidden shadow-2xl shadow-blue-500/40 hover:shadow-blue-500/60 transition-all duration-300 hover:scale-105 cursor-pointer text-left">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-violet-600" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    {/* Glow ring animation */}
                                    <div className="absolute inset-0 rounded-xl ring-2 ring-blue-400/0 group-hover:ring-blue-400/40 transition-all duration-300" />
                                    <span className="relative flex items-center justify-center gap-2">
                                        Get Started Free
                                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </span>
                                </button>
                            </SignUpButton>

                            <SignInButton forceRedirectUrl="/dashboard" mode="modal">
                                <button className="px-10 py-4 text-base font-semibold text-white border border-white/20 hover:border-white/40 rounded-xl backdrop-blur-sm hover:bg-white/5 transition-all duration-300 cursor-pointer">
                                    Sign In
                                </button>
                            </SignInButton>
                        </div>
                    </Show>
                    <Show when="signed-in">
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/dashboard" className="group relative px-10 py-4 text-base font-bold text-white rounded-xl overflow-hidden shadow-2xl shadow-blue-500/40 hover:shadow-blue-500/60 transition-all duration-300 hover:scale-105 text-center">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-violet-600" />
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                {/* Glow ring animation */}
                                <div className="absolute inset-0 rounded-xl ring-2 ring-blue-400/0 group-hover:ring-blue-400/40 transition-all duration-300" />
                                <span className="relative flex items-center justify-center gap-2">
                                    Go to Dashboard
                                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </span>
                            </Link>
                        </div>
                    </Show>

                    {/* Social proof */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-slate-500 text-sm"
                    >
                        <div className="flex items-center gap-2">
                            <div className="flex -space-x-2">
                                {["bg-blue-500", "bg-violet-500", "bg-emerald-500", "bg-amber-500"].map((color, i) => (
                                    <div key={i} className={`w-7 h-7 ${color} rounded-full border-2 border-slate-950 flex items-center justify-center text-[9px] text-white font-bold`}>
                                        {String.fromCharCode(65 + i)}
                                    </div>
                                ))}
                            </div>
                            <span>50,000+ users already onboard</span>
                        </div>
                        <div className="w-px h-4 bg-slate-700 hidden sm:block" />
                        <div className="flex items-center gap-1.5">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <svg key={s} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                            <span className="ml-1">4.9/5 rating</span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
