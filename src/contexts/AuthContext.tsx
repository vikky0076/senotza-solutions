"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  auth,
  googleProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  type User,
} from "@/lib/firebase";

interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (
    email: string,
    password: string,
    displayName: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  getAuthToken: () => string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const unsubscribe = onAuthStateChanged(
        auth,
        (fbUser) => {
          if (fbUser) {
            setFirebaseUser(fbUser);
            setUser({
              uid: fbUser.uid,
              email: fbUser.email,
              displayName: fbUser.displayName,
              photoURL: fbUser.photoURL,
            });
          } else {
            setFirebaseUser(null);
            setUser(null);
          }
          setLoading(false);
        },
        (error) => {
          console.warn("Firebase auth error:", error);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.warn("Firebase auth initialization error:", err);
      setLoading(false);
    }
  }, []);

  const getAuthToken = (): string | null => {
    if (!user) return null;
    // Encode user info as base64 token for API auth
    const payload = JSON.stringify({
      uid: user.uid,
      email: user.email,
      name: user.displayName,
    });
    return Buffer.from(payload).toString("base64");
  };

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    // Save user to DB
    const token = Buffer.from(
      JSON.stringify({
        uid: result.user.uid,
        email: result.user.email,
        name: result.user.displayName,
      })
    ).toString("base64");

    await fetch("/api/auth/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: result.user.displayName || "",
        email: result.user.email || "",
      }),
    });
  };

  const signInWithEmail = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUpWithEmail = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(result.user, { displayName });

    // Save user to DB
    const token = Buffer.from(
      JSON.stringify({
        uid: result.user.uid,
        email: result.user.email,
        name: displayName,
      })
    ).toString("base64");

    await fetch("/api/auth/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: displayName, email }),
    });
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        logout,
        getAuthToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
