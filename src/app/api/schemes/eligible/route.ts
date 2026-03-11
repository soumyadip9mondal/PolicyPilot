import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Scheme from "@/models/Scheme";
import { rankSchemesByProfile, UserProfile } from "@/lib/eligibility";

// POST /api/schemes/eligible — get schemes ranked by user profile match
export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const body = await req.json();
        const profile: UserProfile = body.profile || {};

        const schemes = await Scheme.find({ isActive: true }).lean();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const ranked = rankSchemesByProfile(schemes as any, profile);

        return NextResponse.json({ results: ranked });
    } catch (err) {
        return NextResponse.json({ error: String(err) }, { status: 500 });
    }
}
