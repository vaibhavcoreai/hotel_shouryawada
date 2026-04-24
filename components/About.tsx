"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "../lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Shield, Award, Users } from "lucide-react";

const PILLARS = [
  {
    icon: Shield,
    title: "Warrior Heritage",
    desc: "Bold, unapologetic spirit of Maratha valor.",
  },
  {
    icon: Award,
    title: "Royal Recipes",
    desc: "Slow-roasted Raan perfected over generations.",
  },
  {
    icon: Users,
    title: "Community Feast",
    desc: "Over 930K families call us their second home.",
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
      className="relative py-20 md:py-32 overflow-hidden"
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
            className="section-title font-heading font-extrabold"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: "#FFF8E7" }}
          >
            The{" "}
            <span style={{ color: "#FF6B00" }}>Shauryawada</span>{" "}
            Legacy
          </h2>
          <span ref={underlineRef} className="section-underline mt-4" />
        </div>

        {/* Split layout */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Story */}
          <div ref={leftRef} className="space-y-8">
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

            <div className="space-y-6">
              <p
                className="font-body text-base md:text-lg leading-relaxed"
                style={{ color: "rgba(255,248,231,0.75)" }}
              >
                Born from the red earth of Maharashtra, Hotel Shauryawada carries the soul of the
                Maratha warrior — fiercely proud, deeply rooted, and generous to the core. We built a kingdom on a plate.
              </p>
              <p
                className="font-body text-base md:text-lg leading-relaxed"
                style={{ color: "rgba(255,248,231,0.75)" }}
              >
                Our signature <span style={{ color: "#FF6B00", fontWeight: 700 }}>Mutton Raan</span> and <span style={{ color: "#FF6B00", fontWeight: 700 }}>Chicken Raan</span> are not merely dishes — they are rituals, slow-roasted until the meat surrenders in smoky, golden perfection.
              </p>
            </div>

            {/* Compact Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {PILLARS.map((pillar, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <pillar.icon size={16} color="#FF6B00" />
                    <h4 className="font-heading font-bold text-sm uppercase tracking-wider" style={{ color: "#C9A84C" }}>{pillar.title}</h4>
                  </div>
                  <p className="text-[11px] font-body" style={{ color: "rgba(255,248,231,0.4)" }}>{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visual Section */}
          <div ref={rightRef} className="relative">
            <div className="relative aspect-[4/3] md:aspect-square lg:aspect-[4/5] rounded-sm overflow-hidden border border-gold/20 shadow-2xl">
              <Image
                src="/about.png"
                alt="Shauryawada Restaurant Ambience"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-gold/40" />
            <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-gold/40" />
          </div>
        </div>
      </div>
    </section>
  );
}
