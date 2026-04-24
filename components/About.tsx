"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "../lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Shield, Award, Users } from "lucide-react";

const PILLARS = [
  {
    icon: Shield,
    title: "Warrior Heritage",
    desc: "Every dish carries the spirit of Maratha valor — bold, unapologetic, unforgettable.",
  },
  {
    icon: Award,
    title: "Royal Recipes",
    desc: "Slow-roasted Raan marinated in secret spices, perfected over generations.",
  },
  {
    icon: Users,
    title: "Community Feast",
    desc: "From Handewadi to Nashik — over 930K families call Shauryawada their second home.",
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Section title slide
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

      // Underline draw
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

      // Left panel slides in from left
      gsap.from(leftRef.current, {
        x: -100,
        opacity: 0,
        duration: 1.1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      // Right panel slides in from right
      gsap.from(rightRef.current, {
        x: 100,
        opacity: 0,
        duration: 1.1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #1A1A1A 0%, #12080000 50%, #1A1A1A 100%)" }}
    >
      {/* Background accent */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, #C9A84C 0, #C9A84C 1px, transparent 0, transparent 50%)`,
          backgroundSize: "30px 30px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Title */}
        <div className="mb-20">
          <h2
            ref={titleRef}
            className="section-title font-heading font-extrabold gsap-animated"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: "#FFF8E7" }}
          >
            The{" "}
            <span style={{ color: "#FF6B00" }}>Shauryawada</span>{" "}
            Legacy
          </h2>
          <span ref={underlineRef} className="section-underline mt-4 gsap-animated" />
        </div>

        {/* Split layout */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Story */}
          <div ref={leftRef} className="gsap-animated space-y-6">
            {/* Royal quote block */}
            <div
              className="relative pl-6 py-4"
              style={{ borderLeft: "3px solid #C9A84C" }}
            >
              <p
                className="font-heading text-xl md:text-2xl italic"
                style={{ color: "#C9A84C" }}
              >
                &ldquo;जिथे शौर्य, तिथे स्वाद.&rdquo;
              </p>
              <p
                className="text-sm mt-1 font-body"
                style={{ color: "rgba(255,248,231,0.5)" }}
              >
                Where there is valor, there is flavor.
              </p>
            </div>

            <p
              className="font-body text-base md:text-lg leading-relaxed"
              style={{ color: "rgba(255,248,231,0.75)" }}
            >
              Born from the red earth of Maharashtra, Hotel Shauryawada carries the soul of the
              Maratha warrior — fiercely proud, deeply rooted, and generous to the core. We didn&apos;t
              just open a dhaba; we built a kingdom on a plate.
            </p>
            <p
              className="font-body text-base md:text-lg leading-relaxed"
              style={{ color: "rgba(255,248,231,0.75)" }}
            >
              Our signature{" "}
              <span style={{ color: "#FF6B00", fontWeight: 700 }}>Mutton Raan</span> and{" "}
              <span style={{ color: "#FF6B00", fontWeight: 700 }}>Chicken Raan</span> are not
              merely dishes — they are rituals. Slow-marinated overnight in Kolhapuri spices,
              slow-roasted until the meat surrenders from the bone in smoky, golden perfection.
            </p>
            <p
              className="font-body text-base leading-relaxed"
              style={{ color: "rgba(255,248,231,0.5)" }}
            >
              Eight branches. One soul. From Handewadi where it all began, to Nashik, Bhosari,
              Ahilyanagar and beyond — every plate tells the same story.
            </p>
          </div>

          {/* Right: Visual pillars */}
          <div ref={rightRef} className="gsap-animated space-y-6">
            {PILLARS.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={i}
                  whileHover={{
                    x: 8,
                    boxShadow: "0 8px 40px rgba(201,168,76,0.15)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex items-start gap-5 p-5 rounded-sm cursor-none"
                  style={{
                    background: "rgba(255,248,231,0.03)",
                    border: "1px solid rgba(201,168,76,0.12)",
                  }}
                >
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-sm flex items-center justify-center"
                    style={{ background: "rgba(255,107,0,0.12)", border: "1px solid rgba(255,107,0,0.3)" }}
                  >
                    <Icon size={20} color="#FF6B00" />
                  </div>
                  <div>
                    <h3
                      className="font-heading font-bold text-lg mb-1"
                      style={{ color: "#C9A84C" }}
                    >
                      {pillar.title}
                    </h3>
                    <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(255,248,231,0.6)" }}>
                      {pillar.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}

            {/* Decorative brand stamp */}
            <div
              className="mt-4 p-4 text-center rounded-sm"
              style={{
                background: "linear-gradient(135deg, rgba(139,69,19,0.2), rgba(201,168,76,0.08))",
                border: "1px solid rgba(201,168,76,0.2)",
              }}
            >
              <p
                className="font-heading text-2xl font-bold"
                style={{ color: "#C9A84C" }}
              >
                ॥ शौर्यवाडा ॥
              </p>
              <p
                className="text-xs tracking-[0.25em] uppercase font-body mt-1"
                style={{ color: "rgba(255,248,231,0.4)" }}
              >
                Ruling Hearts Across Maharashtra Since Day One
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
