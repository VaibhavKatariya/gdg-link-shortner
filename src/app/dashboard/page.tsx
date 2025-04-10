"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { Loader2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";

export default function CreateShortLinkForm() {
  const [user] = useAuthState(auth);
  const [url, setUrl] = useState("");
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return toast.error("You must be logged in to create links.");
    if (!url.trim()) return toast.error("Please enter a valid URL.");

    setLoading(true);

    const res = await fetch("/api/link", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        originalUrl: url.trim(),
        customSlug: slug.trim() || undefined, // only send if present
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.error || "Something went wrong");
    } else {
      toast.success(`Short link created! 🔗 /${data.slug}`);
      setUrl("");
      setSlug("");
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md mx-auto flex flex-col gap-4 p-4"
      >
        <Input
          type="url"
          placeholder="Enter URL to shorten"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Custom slug (optional)"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          minLength={6}
        />
        <Button variant="outline" type="submit" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="animate-spin h-4 w-4 mr-2" /> Creating...
            </>
          ) : (
            "Create Short Link"
          )}
        </Button>
      </form>
    </div>
  );
}
