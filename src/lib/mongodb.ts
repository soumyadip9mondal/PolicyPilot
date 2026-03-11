import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

/* Cache the connection across hot-reloads in dev to avoid
   creating multiple connections to MongoDB. */
declare global {
    var _mongooseCache: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
}

let cached = global._mongooseCache;
if (!cached) {
    cached = global._mongooseCache = { conn: null, promise: null };
}

export async function connectDB(): Promise<typeof mongoose> {
    if (!MONGODB_URI) {
        throw new Error("Please define MONGODB_URI in .env.local");
    }
    
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {
            bufferCommands: false,
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (err) {
        cached.promise = null;
        throw err;
    }
    return cached.conn;
}
