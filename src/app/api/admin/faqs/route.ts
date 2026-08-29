import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { verifyAdmin, forbidden } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const admin = await verifyAdmin(request);
    if (!admin) return forbidden();

    const db = await getDb();
    const faqs = await db.collection("faqs").find().sort({ createdAt: -1 }).toArray();

    return NextResponse.json({ success: true, data: faqs });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const admin = await verifyAdmin(request);
    if (!admin) return forbidden();

    const body = await request.json();

    const db = await getDb();
    const now = new Date();
    
    const insertResult = await db.collection("faqs").insertOne({
      ...body,
      createdAt: now,
      updatedAt: now,
    });

    return NextResponse.json({ success: true, data: { _id: insertResult.insertedId } }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
