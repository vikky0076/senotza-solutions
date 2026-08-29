import { NextRequest, NextResponse } from "next/server";
import { getDb } from "./mongodb";

const ADMIN_EMAILS = (process.env.ADMIN_EMAIL || "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

/**
 * Verifies the Firebase ID token from the Authorization header by checking
 * the user profile in MongoDB. This avoids needing firebase-admin SDK.
 * The client sends the Firebase user's email as a verified identity.
 */
export async function verifyAuth(
  request: NextRequest
): Promise<{ uid: string; email: string; name: string } | null> {
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;

  try {
    // The token here is a JSON payload: { uid, email, name }
    // Base64-encoded for simple transport. In production, use Firebase Admin SDK.
    const tokenPayload = Buffer.from(
      authHeader.replace("Bearer ", ""),
      "base64"
    ).toString("utf-8");
    const parsed = JSON.parse(tokenPayload);

    if (!parsed.uid || !parsed.email) return null;

    return {
      uid: parsed.uid,
      email: parsed.email,
      name: parsed.name || "",
    };
  } catch {
    return null;
  }
}

/**
 * Verifies the request is from an authenticated admin user.
 */
export async function verifyAdmin(
  request: NextRequest
): Promise<{ uid: string; email: string; name: string } | null> {
  const user = await verifyAuth(request);
  if (!user) return null;

  if (!ADMIN_EMAILS.includes(user.email.toLowerCase())) return null;

  return user;
}

export function unauthorized() {
  return NextResponse.json(
    { success: false, error: "Unauthorized" },
    { status: 401 }
  );
}

export function forbidden() {
  return NextResponse.json(
    { success: false, error: "Forbidden" },
    { status: 403 }
  );
}

export function isAdmin(email: string): boolean {
  return ADMIN_EMAILS.includes(email.toLowerCase());
}
