import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params; 

  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 });
  }

  try {
    const doc = await adminDb.collection("links").doc(slug).get();

    if (!doc.exists) {
      return NextResponse.json({ error: "Link not found" }, { status: 404 });
    }

    const data = doc.data();
    return NextResponse.json({ originalUrl: data?.originalUrl }, { status: 200 });
  } catch (err) {
    console.error("Failed to fetch link:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
