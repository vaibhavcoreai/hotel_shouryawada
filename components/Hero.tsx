"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronDown, Star, Utensils } from "lucide-react";
import { gsap } from "../lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EmberCanvas from "./EmberCanvas";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Parallax background
    if (bgRef.current && sectionRef.current) {
      gsap.to(bgRef.current, {
        yPercent: -25,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    // Title image animation
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "expo.out",
          delay: 2.5,
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };



  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Parallax background */}
      <div
        ref={bgRef}
        className="absolute inset-0 scale-110"
        style={{ zIndex: 0 }}
      >
        {/* Soft Image Background */}
        <Image
          src="/hero-bg.jpg" // Note: Please save the provided image to your public folder as `hero-bg.jpg`
          alt="Shauryawada Special"
          fill
          className="object-cover opacity-100 mix-blend-overlay"
          priority
        />
        {/* Deep gradient layered with texture */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(13,8,0,0.8) 0%, rgba(26,14,0,0.85) 30%, rgba(45,21,0,0.9) 60%, #1A1A1A 100%)",
          }}
        />
        {/* Stone texture overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(201,168,76,0.03) 2px,
              rgba(201,168,76,0.03) 4px
            )`,
          }}
        />
        {/* Radial glow from center */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(139,69,19,0.35) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Ember particles */}
      <EmberCanvas />

      {/* Top gradient fade */}
      <div
        className="absolute top-0 left-0 right-0 h-32 z-10"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4, duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <span className="w-12 h-px" style={{ background: "#C9A84C" }} />
          <span
            className="flex items-center gap-2 text-xs tracking-[0.3em] uppercase font-body"
            style={{ color: "#C9A84C" }}
          >
            <Star size={10} fill="#C9A84C" />
            Legendary Maharashtrian Dhaba
            <Star size={10} fill="#C9A84C" />
          </span>
          <span className="w-12 h-px" style={{ background: "#C9A84C" }} />
        </motion.div>

        {/* Main heading image */}
        <h1 ref={headingRef} className="relative w-full max-w-[92vw] md:max-w-3xl mx-auto h-[120px] xs:h-[160px] sm:h-[200px] md:h-[280px] mb-6 md:mb-8">
          <span className="sr-only">हॉटेल शौर्यवाडा बेत गावाकडचा</span>
          <Image
            src="/title_transparent.png"
            alt="Hotel Shauryawada Title"
            fill
            className="object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.7)]"
            priority
          />
        </h1>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.0, duration: 0.7 }}
          className="font-body text-base sm:text-lg md:text-xl mb-6 md:mb-4 max-w-2xl mx-auto px-4 sm:px-0"
          style={{ color: "rgba(255,248,231,0.7)", lineHeight: 1.6 }}
        >
          Home of the legendary{" "}
          <span style={{ color: "#FF6B00", fontWeight: 700 }}>Mutton Raan</span>{" "}
          &amp;{" "}
          <span style={{ color: "#FF6B00", fontWeight: 700 }}>Chicken Raan</span>
          {" "}— cooked the Maratha way. Eight cities. One legacy.
        </motion.p>

        {/* Gold divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 3.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-24 md:w-32 h-px mx-auto mb-8"
          style={{
            background: "linear-gradient(90deg, transparent, #C9A84C, transparent)",
            transformOrigin: "center",
          }}
        />

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.2, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 px-6 sm:px-0"
        >
          {/* Primary CTA */}
          <motion.a
            href="#dishes"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group relative w-full sm:w-auto px-8 py-3.5 md:py-4 font-body font-bold text-sm tracking-[0.18em] uppercase overflow-hidden cursor-none"
            style={{
              background: "linear-gradient(135deg, #FF6B00, #C9A84C)",
              color: "#1A1A1A",
              clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
            }}
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#dishes")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <Utensils size={14} />
              View Our Raan
            </span>
          </motion.a>

          {/* Secondary CTA */}
          <motion.a
            href="#branches"
            whileHover={{ scale: 1.04, borderColor: "#FF6B00" }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-full sm:w-auto px-8 py-3.5 md:py-4 font-body font-bold text-sm tracking-[0.18em] uppercase border cursor-none"
            style={{
              borderColor: "#C9A84C",
              color: "#C9A84C",
              clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
            }}
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#branches")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Find a Branch
          </motion.a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5, duration: 0.8 }}
          className="flex items-center justify-center gap-x-6 gap-y-4 md:gap-8 mt-12 md:mt-16 flex-wrap"
        >
          {[
            { value: "8", label: "Royal Branches" },
            { value: "930K+", label: "YouTube Warriors" },
            { value: "∞", label: "Raans Served" },
          ].map((stat, i) => (
            <div key={i} className="text-center px-2">
              <div
                className="font-heading font-extrabold text-2xl md:text-4xl glow-gold"
                style={{ color: "#C9A84C" }}
              >
                {stat.value}
              </div>
              <div
                className="text-[10px] md:text-xs tracking-widest uppercase font-body mt-1"
                style={{ color: "rgba(255,248,231,0.5)" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.8, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-none"
      >
        <span
          className="text-[10px] tracking-[0.3em] uppercase font-body"
          style={{ color: "rgba(201,168,76,0.6)" }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ChevronDown size={18} color="#C9A84C" />
        </motion.div>
      </motion.button>

      {/* Bottom gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 z-[5]"
        style={{
          background:
            "linear-gradient(to top, #1A1A1A, transparent)",
        }}
      />
    </section>
  );
}
