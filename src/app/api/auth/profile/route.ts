import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { verifyAuth, unauthorized } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const user = await verifyAuth(request);
    if (!user) return unauthorized();

    const body = await request.json();
    const { name, email } = body;

    const db = await getDb();
    const now = new Date();
    
    await db.collection("users").updateOne(
      { uid: user.uid },
      {
        $set: {
          name,
          email,
          updatedAt: now,
        },
        $setOnInsert: {
          uid: user.uid,
          role: "user",
          createdAt: now,
        }
      },
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
