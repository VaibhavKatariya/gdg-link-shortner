"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSignInWithGoogle, useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react"; // optional icon for spinner

export default function LoginPage() {
  const router = useRouter();

  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const [authUser, authLoading] = useAuthState(auth); // check if user is signed in

  useEffect(() => {
    if (authUser && !authLoading) {
      router.push("/dashboard");
    }
  }, [authUser, authLoading, router]);

  if (authLoading || authUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-background">
        <div className="flex items-center space-x-2">
          <Loader2 className="animate-spin h-6 w-6 text-muted-foreground" />
          <p className="text-muted-foreground">Checking auth status…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-background">
      <Card className="w-[350px] shadow-xl">
        <CardContent className="p-6 text-center space-y-4">
          <h2 className="text-2xl font-semibold">Login to Continue</h2>
          <Button onClick={() => signInWithGoogle()}>
            Sign in with Google
          </Button>
          {error && <p className="text-sm text-red-500">{error.message}</p>}
          {loading && (
            <div className="flex text-sm text-muted-foreground justify-center items-center space-x-2">
              <Loader2 className="animate-spin h-6 w-6 text-muted-foreground" />
              <p className="text-muted-foreground">Signing in...</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
