import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { verifyAdmin, forbidden } from "@/lib/auth";
import { projectSchema } from "@/lib/validations";

export async function GET(request: NextRequest) {
  try {
    const admin = await verifyAdmin(request);
    if (!admin) return forbidden();

    const db = await getDb();
    const projects = await db.collection("projects").find().sort({ createdAt: -1 }).toArray();

    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const admin = await verifyAdmin(request);
    if (!admin) return forbidden();

    const body = await request.json();
    const result = projectSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error.issues }, { status: 400 });
    }

    const db = await getDb();
    const now = new Date();
    
    const insertResult = await db.collection("projects").insertOne({
      ...result.data,
      createdAt: now,
      updatedAt: now,
    });

    return NextResponse.json({ success: true, data: { _id: insertResult.insertedId } }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
