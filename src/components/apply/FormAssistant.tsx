"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, Send, HelpCircle, AlertCircle } from "lucide-react";
import { logEvent } from "@/lib/history";

interface Message {
    role: "user" | "assistant";
    content: string;
}

const SUGGESTED_QUERIES = [
    "How do I upload my Student ID?",
    "Why can't I auto-fill the entire form?",
    "What happens if a field doesn't match?",
    "How do I check my application status?",
];

interface FormAssistantProps {
    formContext?: string;
}

export function FormAssistant({ formContext }: FormAssistantProps) {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content:
                "Hi! I'm your Form Assistant. I'll help you fill out this application correctly, check your documents, and answer any questions about the process.",
        },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = async (text?: string) => {
        const userText = (text ?? input).trim();
        if (!userText || loading) return;

        setInput("");
        setError(null);
        const newMessages: Message[] = [...messages, { role: "user", content: userText }];
        setMessages(newMessages);
        setLoading(true);

        try {
            const systemPrompt = `You are PolicyPilot's Form Assistant. Help users fill out government application forms correctly.
Be concise and practical. ${formContext ? `\nForm context:\n${formContext.slice(0, 2000)}` : ""}`;

            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
                    systemPrompt,
                }),
            });

            const data = await res.json();
            if (data.error) {
                setError(data.error);
                setMessages((prev) => prev.slice(0, -1));
            } else {
                setMessages([...newMessages, { role: "assistant", content: data.content }]);
                logEvent("AI Help", "Form Assistant Chat", userText.slice(0, 60), "resolved");
            }
        } catch {
            setError("Network error. Please try again.");
            setMessages((prev) => prev.slice(0, -1));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-card rounded-2xl shadow-soft border border-border h-full min-h-[500px] flex flex-col">
            <div className="p-4 border-b border-border flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                        <Bot size={20} />
                    </div>
                    <div>
                        <h3 className="font-semibold text-foreground">Form Assistant</h3>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <span className={`w-1.5 h-1.5 rounded-full ${loading ? "bg-amber-500 animate-pulse" : "bg-green-500"}`} />
                            {loading ? "Thinking..." : "Powered by Gemma 3"}
                        </p>
                    </div>
                </div>
                <button className="text-muted-foreground hover:text-foreground transition-colors p-2">
                    <HelpCircle size={18} />
                </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto bg-muted/10 space-y-4">
                {messages.map((msg, i) => (
                    <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""} max-w-[90%] ${msg.role === "user" ? "ml-auto" : ""}`}>
                        {msg.role === "assistant" && (
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
                                <Bot size={16} />
                            </div>
                        )}
                        <div
                            className={`rounded-2xl p-3 text-sm shadow-sm leading-relaxed ${msg.role === "user"
                                    ? "bg-primary text-primary-foreground rounded-tr-sm"
                                    : "bg-white dark:bg-zinc-900 border border-border text-foreground rounded-tl-sm"
                                }`}
                        >
                            {msg.content}
                        </div>
                    </div>
                ))}

                {messages.length === 1 && (
                    <div className="flex flex-col gap-2 pl-11">
                        {SUGGESTED_QUERIES.map((q) => (
                            <button
                                key={q}
                                onClick={() => sendMessage(q)}
                                className="text-left text-xs bg-primary/5 hover:bg-primary/10 text-primary border border-primary/20 rounded-xl px-3 py-2 transition-colors w-max max-w-full"
                            >
                                {q}
                            </button>
                        ))}
                    </div>
                )}

                {loading && (
                    <div className="flex gap-3 max-w-[85%]">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                            <Bot size={16} />
                        </div>
                        <div className="bg-white dark:bg-zinc-900 border border-border rounded-2xl rounded-tl-sm p-3 flex items-center gap-2">
                            <div className="flex gap-1">
                                {[0, 1, 2].map((i) => (
                                    <span key={i} className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-xl text-sm text-red-700 dark:text-red-400">
                        <AlertCircle size={16} className="shrink-0 mt-0.5" />
                        <div className="flex-1">{error}</div>
                    </div>
                )}

                <div ref={bottomRef} />
            </div>

            <div className="p-4 border-t border-border bg-card rounded-b-2xl flex-shrink-0">
                <div className="relative flex items-center">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                        placeholder="Ask about this form..."
                        disabled={loading}
                        className="w-full bg-muted/50 border border-border rounded-full pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
                    />
                    <button
                        onClick={() => sendMessage()}
                        disabled={loading || !input.trim()}
                        className="absolute right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-40"
                    >
                        <Send size={14} className="ml-0.5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
