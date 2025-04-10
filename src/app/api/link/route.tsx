import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { originalUrl, customSlug } = body;

    if (!originalUrl || typeof originalUrl !== "string") {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

    const slug = customSlug?.trim() || Math.random().toString(36).substring(2, 8);

    const docRef = adminDb.collection("links").doc(slug);
    const existing = await docRef.get();

    if (existing.exists) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
    }

    await docRef.set({
      originalUrl,
      slug,
      createdAt: Date.now(),
    });

    return NextResponse.json({ message: "Short link created", slug }, { status: 201 });
  } catch (err) {
    console.error("Failed to create link:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
