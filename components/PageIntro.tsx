"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "../lib/gsap";

export default function PageIntro({ onComplete }: { onComplete: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    // 1. Logo scales in from 0.3 → 1
    tl.fromTo(
      logoRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.5, ease: "expo.out" }
    )
      // 2. Overlay fades out
      .to(
        overlayRef.current,
        { opacity: 0, duration: 1, ease: "power2.inOut", pointerEvents: "none" },
        "+=0.5"
      );
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      id="page-overlay"
      style={{
        position: "fixed",
        inset: 0,
        background: "#000",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "all",
      }}
    >
      {/* Logo mark */}
      <div ref={logoRef} className="text-center flex flex-col items-center" style={{ opacity: 0 }}>
        {/* Logo Image */}
        <div className="relative w-40 h-40 md:w-56 md:h-56">
          <Image
            src="/logo.png"
            alt="Hotel Shauryawada Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}
