import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Scheme from "@/models/Scheme";

// DELETE /api/schemes/[id] — delete a scheme (admin only)
// PUT /api/schemes/[id] — update a scheme (admin only)
// GET /api/schemes/[id] — get single scheme

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await connectDB();
        const scheme = await Scheme.findById(id).lean();
        if (!scheme) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json({ scheme });
    } catch (err) {
        return NextResponse.json({ error: String(err) }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const adminKey = req.headers.get("x-admin-key");
        if (adminKey !== process.env.ADMIN_SECRET_KEY) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        await connectDB();
        const body = await req.json();
        const scheme = await Scheme.findByIdAndUpdate(id, body, { new: true });
        return NextResponse.json({ scheme });
    } catch (err) {
        return NextResponse.json({ error: String(err) }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const adminKey = req.headers.get("x-admin-key");
        if (adminKey !== process.env.ADMIN_SECRET_KEY) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        await connectDB();
        await Scheme.findByIdAndDelete(id);
        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ error: String(err) }, { status: 500 });
    }
}
