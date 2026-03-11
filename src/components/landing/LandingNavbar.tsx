"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs";

const navLinks = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Preview", href: "#preview" },
    { label: "Contact", href: "#contact" },
];

export function LandingNavbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? "bg-slate-950/90 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/20"
                : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between py-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2.5 group">
                    <div className="relative w-9 h-9">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-violet-600 rounded-xl blur-sm opacity-70 group-hover:opacity-100 transition-opacity" />
                        <div className="relative w-9 h-9 bg-gradient-to-br from-blue-500 to-violet-600 rounded-xl flex items-center justify-center">
                            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white">
                                <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>
                    <span className="text-xl font-bold text-white tracking-tight">
                        Policy<span className="text-blue-400">Pilot</span>
                    </span>
                </Link>

                {/* Desktop Nav Links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="relative text-sm font-medium text-slate-300 hover:text-white transition-colors group"
                        >
                            {link.label}
                            <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-violet-400 group-hover:w-full transition-all duration-300 rounded-full" />
                        </a>
                    ))}
                </div>

                {/* Auth Buttons */}
                <div className="hidden md:flex items-center gap-3">
                    <Show when="signed-out">
                        <SignInButton forceRedirectUrl="/dashboard" mode="modal">
                            <button className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white border border-white/10 hover:border-white/30 rounded-lg transition-all duration-200 cursor-pointer">
                                Sign In
                            </button>
                        </SignInButton>
                        <SignUpButton forceRedirectUrl="/dashboard" mode="modal">
                            <button className="px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 rounded-lg transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 cursor-pointer">
                                Get Started
                            </button>
                        </SignUpButton>
                    </Show>
                    <Show when="signed-in">
                        <Link href="/dashboard" className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 rounded-lg transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 cursor-pointer">
                            Dashboard
                        </Link>
                        <UserButton />
                    </Show>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white p-2"
                    onClick={() => setMobileOpen(!mobileOpen)}
                >
                    {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-slate-950/95 backdrop-blur-xl border-t border-white/10 px-6 py-4 flex flex-col gap-4"
                    >
                        {navLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="text-slate-300 hover:text-white font-medium transition-colors"
                                onClick={() => setMobileOpen(false)}
                            >
                                {link.label}
                            </a>
                        ))}
                        <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
                            <Show when="signed-out">
                                <SignInButton forceRedirectUrl="/dashboard" mode="modal">
                                    <button className="w-full px-4 py-2.5 text-center text-sm font-medium text-white border border-white/20 rounded-lg">
                                        Sign In
                                    </button>
                                </SignInButton>
                                <SignUpButton forceRedirectUrl="/dashboard" mode="modal">
                                    <button className="w-full px-4 py-2.5 text-center text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-violet-600 rounded-lg">
                                        Get Started
                                    </button>
                                </SignUpButton>
                            </Show>
                            <Show when="signed-in">
                                <Link onClick={() => setMobileOpen(false)} href="/dashboard" className="w-full px-4 py-2.5 text-center text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-violet-600 rounded-lg">
                                    Dashboard
                                </Link>
                                <div className="flex justify-center p-2">
                                    <UserButton />
                                </div>
                            </Show>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
