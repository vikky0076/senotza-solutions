import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { verifyAuth, unauthorized } from "@/lib/auth";
import { inquirySchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  try {
    const user = await verifyAuth(request);
    if (!user) return unauthorized();

    const body = await request.json();
    const result = inquirySchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error.issues }, { status: 400 });
    }

    const db = await getDb();
    const now = new Date();
    
    const insertResult = await db.collection("inquiries").insertOne({
      ...result.data,
      userId: user.uid,
      status: "new",
      createdAt: now,
      updatedAt: now,
    });

    return NextResponse.json({ success: true, data: { _id: insertResult.insertedId } }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await verifyAuth(request);
    if (!user) return unauthorized();

    const db = await getDb();
    const inquiries = await db.collection("inquiries").find({ userId: user.uid }).sort({ createdAt: -1 }).toArray();

    return NextResponse.json({ success: true, data: inquiries });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
