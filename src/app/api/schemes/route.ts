import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Scheme from "@/models/Scheme";

// GET /api/schemes — list all active schemes
export async function GET() {
    try {
        await connectDB();
        const schemes = await Scheme.find({ isActive: true }).sort({ createdAt: -1 }).lean();
        return NextResponse.json({ schemes });
    } catch (err) {
        return NextResponse.json({ error: String(err) }, { status: 500 });
    }
}

// POST /api/schemes — create a new scheme (admin only)
export async function POST(req: NextRequest) {
    try {
        // Basic admin check via secret header (set by admin page)
        const adminKey = req.headers.get("x-admin-key");
        if (adminKey !== process.env.ADMIN_SECRET_KEY) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();
        const body = await req.json();
        const scheme = await Scheme.create(body);
        return NextResponse.json({ scheme }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ error: String(err) }, { status: 500 });
    }
}
