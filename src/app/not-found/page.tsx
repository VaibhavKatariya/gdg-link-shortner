"use client";

import Link from "next/link";
import "@/app/[slug]/slug.css";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="out-align">
        <div className="loader">
          <div className="dot dot1" />
          <div className="dot dot2" />
          <div className="dot dot3" />
          <div className="dot dot4" />
          <div className="dot dot5" />
          <div className="dot dot6" />
          <div className="dot dot7" />
        </div>
      </div>
      <div className="text-center mt-10">
        <h1 className="dark:text-white text-2xl mb-4 font-bold">
          The URL you typed doesn&apos;t exist 🧐
        </h1>
        <Link href="/dashboard">
          <Button variant="outline">
            Create one
          </Button>
        </Link>
      </div>
    </div>
  );
}
