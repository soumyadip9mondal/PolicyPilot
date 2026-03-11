// LLM client: calls our internal /api/chat route which is securely backed by the Gemini API

export interface ChatMessage {
    role: "system" | "user" | "assistant";
    content: string;
}

export interface LLMResponse {
    content: string;
    error?: string;
}

export async function chatWithLLM(
    messages: ChatMessage[],
    systemPrompt?: string
): Promise<LLMResponse> {
    try {
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ messages, systemPrompt }),
        });

        const data = await response.json();
        if (!response.ok) {
            return { content: "", error: data.error || `Server error ${response.status}` };
        }

        return { content: data.content || "" };
    } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        return { content: "", error: `Network error: ${msg}` };
    }
}
