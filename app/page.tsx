"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { StaggeredMenu } from "@/components/StaggeredMenu";
import Hero from "@/components/Hero";
import PageIntro from "@/components/PageIntro";

// Menu configuration
const menuItems = [
  { label: 'About', ariaLabel: 'About Us', link: '/#about' },
  { label: 'Dishes', ariaLabel: 'Signature Dishes', link: '/#dishes' },
  { label: 'Menu', ariaLabel: 'Full Menu', link: '/menu' },
  { label: 'Branches', ariaLabel: 'Our Branches', link: '/#branches' },
  { label: 'Watch', ariaLabel: 'Watch Videos', link: '/#youtube' },
  { label: 'Reserve', ariaLabel: 'Reserve a Table', link: 'tel:+918888888888' },
  { label: 'Contact', ariaLabel: 'Contact Us', link: '/#contact' }
];

const socialItems = [
  { label: 'Facebook', link: 'https://facebook.com/vikasnana.handeiii' },
  { label: 'Instagram', link: 'https://instagram.com/hotel_shauryawada' },
  { label: 'YouTube', link: 'https://youtube.com/@Hotel_Shauryawada_Official' }
];

// Lazy-load below-fold sections for performance
const About = dynamic(() => import("@/components/About"), { ssr: false });
const Dishes = dynamic(() => import("@/components/Dishes"), { ssr: false });
const Branches = dynamic(() => import("@/components/Branches"), { ssr: false });
const YouTube = dynamic(() => import("@/components/YouTube"), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  // Prevent scroll during intro animation
  useEffect(() => {
    if (!introComplete) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [introComplete]);

  return (
    <>
      {/* Cinematic intro overlay — unmounts after animation */}
      {!introComplete && <PageIntro onComplete={handleIntroComplete} />}

      {/* Main site — always in DOM but invisible until intro fades */}
      <main className={introComplete ? "opacity-100 transition-opacity duration-1000" : "opacity-0"}>
        <StaggeredMenu 
          items={menuItems}
          socialItems={socialItems}
          displaySocials={true}
          logoUrl="/logo.png"
          accentColor="#FF6B00"
          colors={['#C9A84C', '#FF6B00', '#1a1a1a']}
        />

        {/* 1. Hero */}
        <Hero />

        {/* Maratha decorative section divider */}
        <SectionDivider />

        {/* 2. About */}
        <About />

        <SectionDivider />

        {/* 3. Signature Dishes */}
        <Dishes />

        <SectionDivider />

        {/* 4. Branches */}
        <Branches />

        <SectionDivider />

        {/* 5. YouTube */}
        <YouTube />

        {/* 6. Footer / Contact */}
        <Footer />
      </main>
    </>
  );
}

// ─── Reusable Maratha-style section divider ────────────────────
function SectionDivider() {
  return (
    <div className="relative flex items-center justify-center py-2 overflow-hidden">
      {/* Left line */}
      <div
        className="flex-1 h-px max-w-xs"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(201,168,76,0.3))",
        }}
      />
      {/* Center ornament */}
      <div className="flex items-center gap-2 px-4">
        <span style={{ color: "rgba(201,168,76,0.35)", fontSize: "8px" }}>◆</span>
        <div
          className="w-12 h-px"
          style={{
            background:
              "linear-gradient(90deg, rgba(201,168,76,0.3), rgba(255,107,0,0.5), rgba(201,168,76,0.3))",
          }}
        />
        <span style={{ color: "#FF6B00", fontSize: "12px" }}>◆</span>
        <div
          className="w-12 h-px"
          style={{
            background:
              "linear-gradient(90deg, rgba(201,168,76,0.3), rgba(255,107,0,0.5), rgba(201,168,76,0.3))",
          }}
        />
        <span style={{ color: "rgba(201,168,76,0.35)", fontSize: "8px" }}>◆</span>
      </div>
      {/* Right line */}
      <div
        className="flex-1 h-px max-w-xs"
        style={{
          background:
            "linear-gradient(90deg, rgba(201,168,76,0.3), transparent)",
        }}
      />
    </div>
  );
}
