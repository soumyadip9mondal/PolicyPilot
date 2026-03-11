import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI, Type, Schema } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "dummy" });

const responseSchema: Schema = {
    type: Type.OBJECT,
    properties: {
        policyName: { type: Type.STRING },
        summary: { type: Type.STRING },
        eligibilityCriteria: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    criterion: { type: Type.STRING },
                    userMet: { type: Type.BOOLEAN, nullable: true },
                    detail: { type: Type.STRING }
                },
                required: ["criterion", "userMet", "detail"]
            }
        },
        hiddenClauses: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    severity: { type: Type.STRING, enum: ["high", "medium", "low"] },
                    title: { type: Type.STRING },
                    detail: { type: Type.STRING }
                },
                required: ["severity", "title", "detail"]
            }
        },
        requiredDocuments: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING },
                    mandatory: { type: Type.BOOLEAN },
                    note: { type: Type.STRING }
                },
                required: ["name", "mandatory", "note"]
            }
        },
        overallEligibility: { type: Type.STRING, enum: ["eligible", "not_eligible", "possibly_eligible"] },
        eligibilityScore: { type: Type.INTEGER }
    },
    required: ["policyName", "summary", "eligibilityCriteria", "hiddenClauses", "requiredDocuments", "overallEligibility", "eligibilityScore"]
};

export async function POST(req: NextRequest) {
    try {
        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json({ error: "GEMINI_API_KEY is not configured on the server." }, { status: 500 });
        }

        const body = await req.json();
        const { policyText, userProfile } = body;

        if (!policyText || typeof policyText !== "string") {
            return NextResponse.json({ error: "policyText is required" }, { status: 400 });
        }

        const systemPrompt = `You are PolicyPilot AI, an expert in government policies, scholarships, and insurance.
Analyze the provided policy document and respond strictly matching the required JSON structure. Evaluate eligibility based on the User Profile provided. If information is missing from the user profile, set userMet to null.`;

        const userContent = `Policy Document:\n${policyText.slice(0, 15000)}\n\nUser Profile:\n${JSON.stringify(userProfile || {}, null, 2)}`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: userContent,
            config: {
                systemInstruction: systemPrompt,
                temperature: 0.1,
                responseMimeType: "application/json",
                responseSchema: responseSchema
            }
        });

        const jsonStr = response.text || "{}";
        let result;
        try {
            result = JSON.parse(jsonStr);
        } catch {
            // Fallback
            result = {
                policyName: "Policy Analysis",
                summary: "Failed to parse JSON",
                eligibilityCriteria: [],
                hiddenClauses: [],
                requiredDocuments: [],
                overallEligibility: "possibly_eligible",
                eligibilityScore: 50,
            };
        }

        return NextResponse.json({ result });
    } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        return NextResponse.json({ error: `Analysis error: ${msg}` }, { status: 500 });
    }
}
