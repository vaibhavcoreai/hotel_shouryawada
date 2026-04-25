"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronDown, Star, Utensils } from "lucide-react";
import { gsap } from "../lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
          className="object-cover opacity-100"
          priority
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



      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto -translate-y-60 md:-translate-y-80">
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
            className="object-contain drop-shadow-[0_10px_35px_rgba(0,0,0,0.6)]"
            priority
          />
        </h1>



      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.8, duration: 0.6 }}
        className="absolute bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 cursor-none"
      >
        <span
          className="text-[10px] tracking-[0.3em] uppercase font-body text-white"
        >
          Scroll
        </span>
        <div className="w-[22px] h-[36px] border border-white rounded-full flex justify-center p-1 opacity-80">
          <motion.div
            animate={{ y: [0, 14, 0], opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-1 h-[6px] bg-white rounded-full"
          />
        </div>
      </motion.button>

      {/* Bottom gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 z-[5]"
        style={{
          background:
            "linear-gradient(to top, #FFF8E7, transparent)",
        }}
      />
    </section>
  );
}
