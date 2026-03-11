import { NextRequest, NextResponse } from "next/server";

// Proxy route to fetch external URLs server-side (avoids CORS)
export async function GET(req: NextRequest) {
    const url = req.nextUrl.searchParams.get("url");
    if (!url) {
        return NextResponse.json({ error: "url parameter is required" }, { status: 400 });
    }

    try {
        const res = await fetch(url, {
            headers: {
                "User-Agent": "PolicyPilot/1.0 (policy document reader)",
                Accept: "text/html,text/plain,application/pdf",
            },
            signal: AbortSignal.timeout(15000),
        });

        if (!res.ok) {
            return NextResponse.json({ error: `Fetch failed: ${res.status}` }, { status: 502 });
        }

        const contentType = res.headers.get("content-type") || "";

        if (contentType.includes("text/html")) {
            const html = await res.text();
            // Strip HTML tags to get plain text
            const text = html
                .replace(/<script[\s\S]*?<\/script>/gi, "")
                .replace(/<style[\s\S]*?<\/style>/gi, "")
                .replace(/<[^>]+>/g, " ")
                .replace(/\s+/g, " ")
                .trim()
                .slice(0, 8000);
            return NextResponse.json({ text });
        }

        const text = await res.text();
        return NextResponse.json({ text: text.slice(0, 8000) });
    } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        return NextResponse.json({ error: `Could not fetch URL: ${msg}` }, { status: 500 });
    }
}
