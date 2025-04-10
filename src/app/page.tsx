// app/page.tsx (Next 15 default root route)
"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { Loader2 } from "lucide-react";

export default function HomePage() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-6 w-6 text-muted-foreground" />
        <span className="ml-2 text-muted-foreground">Loading…</span>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold mb-4">GDG JIIT-128 Link Shortener</h1>
      <p className="text-muted-foreground mb-6 max-w-md">
        Quickly generate branded, animated short links for events, guests, and sponsors.
      </p>

      {user ? (
        <Link href="/dashboard">
          <Button variant="default" className="cursor-pointer">Go to Dashboard</Button>
        </Link>
      ) : (
        <Link href="/login">
          <Button variant="default" className="cursor-pointer">Get Started</Button>
        </Link>
      )}

      <p className="mt-10 text-xs text-muted-foreground">
        Built with ❤️ by <Link href="https://kaily.in"> Vaibhav Katariya</Link>
      </p>
    </main>
  );
}
