import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { verifyAdmin, forbidden } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const admin = await verifyAdmin(request);
    if (!admin) return forbidden();

    const db = await getDb();
    
    const [usersCount, totalInquiries, newInquiries, resolvedInquiries] = await Promise.all([
      db.collection("users").countDocuments(),
      db.collection("inquiries").countDocuments(),
      db.collection("inquiries").countDocuments({ status: "new" }),
      db.collection("inquiries").countDocuments({ status: "resolved" }),
    ]);

    const stats = {
      users: usersCount,
      inquiries: {
        total: totalInquiries,
        new: newInquiries,
        resolved: resolvedInquiries
      }
    };

    return NextResponse.json({ success: true, data: stats });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
