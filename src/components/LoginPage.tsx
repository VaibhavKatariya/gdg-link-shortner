"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-background">
      <Card className="w-[350px] shadow-xl">
        <CardContent className="p-6 text-center space-y-4">
          <h2 className="text-2xl font-semibold">Login to Continue</h2>
          <Button onClick={() => signInWithGoogle()}>
            Sign in with Google
          </Button>
          {error && <p className="text-sm text-red-500">{error.message}</p>}
          {loading && <p className="text-sm text-muted-foreground">Signing in…</p>}
        </CardContent>
      </Card>
    </div>
  );
}
