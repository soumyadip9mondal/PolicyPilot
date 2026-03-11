import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "dummy" });

export async function POST(req: NextRequest) {
    try {
        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json({ error: "GEMINI_API_KEY is not configured on the server." }, { status: 500 });
        }

        const body = await req.json();
        const { messages, systemPrompt } = body;

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json({ error: "Messages array is required" }, { status: 400 });
        }

        const formattedMessages = messages.map(msg => ({
            role: msg.role === "assistant" ? "model" as const : "user" as const,
            parts: [{ text: msg.content }]
        }));

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: formattedMessages,
            config: {
                systemInstruction: systemPrompt ? systemPrompt : undefined,
                temperature: 0.7,
                maxOutputTokens: 1024,
            }
        });

        return NextResponse.json({ content: response.text || "" });
    } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        return NextResponse.json({ error: `Chat error: ${msg}` }, { status: 500 });
    }
}
