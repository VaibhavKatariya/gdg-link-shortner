"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import "./slug.css";

export default function SlugPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const fetchAndRedirect = async () => {
      try {
        const res = await fetch(`/api/link/${slug}`);
        const data = await res.json();

        if (res.ok && data.originalUrl) {
          timeout = setTimeout(() => {
            window.location.href = data.originalUrl;
          }, 5600);
        } else {
          router.replace("/not-found");
        }
      } catch (err) {
        console.error("Redirection failed:", err);
        router.replace("/");
      }
    };

    fetchAndRedirect();

    return () => clearTimeout(timeout);
  }, [slug, router]);

  return (
    <div className="out-align flex flex-col items-center justify-center h-screen">
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
  );
}
