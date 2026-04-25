"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "../lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin } from "lucide-react";

const BRANCHES = [
  { name: "Handewadi", note: "The Origin" },
  { name: "Wagholi", note: "East Pune" },
  { name: "Uruli Kanchan", note: "" },
  { name: "Bhosari", note: "PCMC" },
  { name: "Ahilyanagar", note: "Ahmednagar" },
  { name: "Umerga", note: "Osmanabad" },
  { name: "Loni Kalbhor", note: "NH-65" },
  { name: "Nashik", note: "Wine City" },
];

import type { Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const chipVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 400, damping: 17 },
  },
};

export default function Branches() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);
  const chipsTriggered = useRef(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        x: -80,
        opacity: 0,
        duration: 0.9,
        ease: "expo.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(underlineRef.current, {
        scaleX: 0,
        transformOrigin: "left",
        duration: 0.8,
        delay: 0.2,
        ease: "expo.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="branches"
      className="relative py-20 md:py-32 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #FFF8E7 0%, #FDFBF7 50%, #FFF8E7 100%)",
      }}
    >
      {/* Decorative map-pin grid background */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `radial-gradient(circle, #C9A84C 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-6">
          <h2
            ref={titleRef}
            className="section-title font-heading font-extrabold gsap-animated"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: "#1A1A1A" }}
          >
            Our Kingdom Spans{" "}
            <span style={{ color: "#FF6B00" }}>Maharashtra</span>
          </h2>
          <span ref={underlineRef} className="section-underline mt-4 gsap-animated" />
        </div>
        <p
          className="font-body mb-16 max-w-xl"
          style={{ color: "rgba(26,26,26,0.6)", lineHeight: 1.7 }}
        >
          From the red hills of Kolhapur country to the vineyards of Nashik — the Shauryawada
          throne sits tall in eight cities.
        </p>

        {/* Branch chip grid — Framer Motion stagger */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {BRANCHES.map((branch, i) => (
            <motion.div
              key={i}
              variants={chipVariants}
              whileHover={{
                scale: 1.06,
                backgroundColor: "#FF6B00",
                color: "#1A1A1A",
              }}
              className="branch-chip group relative flex flex-col items-center justify-center gap-1 py-5 px-4 rounded-sm cursor-none text-center transition-colors duration-300"
              style={{
                background: "rgba(26,26,26,0.03)",
                border: "1px solid rgba(201,168,76,0.18)",
                color: "#1A1A1A",
              }}
            >
              <MapPin
                size={16}
                className="group-hover:text-charcoal transition-colors duration-300"
                style={{ color: "#C9A84C" }}
              />
              <span className="font-heading font-bold text-base">{branch.name}</span>
              {branch.note && (
                <span
                  className="text-[10px] font-body tracking-wider uppercase"
                  style={{ color: "rgba(201,168,76,0.55)" }}
                >
                  {branch.note}
                </span>
              )}
              {/* First branch "The Origin" crown */}
              {i === 0 && (
                <span
                  className="absolute top-2 right-2 text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-full"
                  style={{ background: "#FF6B00", color: "#1A1A1A" }}
                >
                  OG
                </span>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Expansion note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-sm"
            style={{
              background: "rgba(201,168,76,0.06)",
              border: "1px dashed rgba(201,168,76,0.25)",
            }}
          >
            <MapPin size={14} color="#C9A84C" />
            <span className="font-body text-sm" style={{ color: "rgba(26,26,26,0.6)" }}>
              More cities coming soon — the conquest continues.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
