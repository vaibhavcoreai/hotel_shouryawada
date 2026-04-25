"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "../lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Shield, Award, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

const bentoItems = [
  { id: "1", img: "/Masonry/1-0aa0q2b4ck.jpg", className: "col-span-2 row-span-2" },
  { id: "2", img: "/Masonry/1-0vlsvtdry6.jpg", className: "col-span-1 row-span-1" },
  { id: "3", img: "/Masonry/1-0ylhh9ynlt.jpg", className: "col-span-1 row-span-1" },
  { id: "4", img: "/Masonry/1-2suzb36roz.jpg", className: "col-span-1 row-span-2" },
  { id: "5", img: "/Masonry/1-4yd13x47fy.jpg", className: "col-span-2 row-span-1" },
  { id: "6", img: "/Masonry/1-65wt7y56xl.jpg", className: "col-span-1 row-span-1" },
  { id: "7", img: "/Masonry/1-6b9b1avnfv.jpg", className: "col-span-1 row-span-1" },
];

const PILLARS = [
  {
    icon: Shield,
    title: "Warrior Heritage",
    desc: "Born from the bold spirit of the Maratha warrior.",
  },
  {
    icon: Award,
    title: "Royal Recipes",
    desc: "Our special dishes have been perfected over generations.",
  },
  {
    icon: Users,
    title: "Community Feast",
    desc: "Over 2 million people are connected to our Hotel Shauryawada.",
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);
  
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
      style={{ background: "linear-gradient(180deg, #FFF8E7 0%, transparent 100%)" }}
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
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: "#1A1A1A" }}
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
              
            </div>

            <div className="space-y-6">
              <p
                className="font-body text-base md:text-lg leading-relaxed"
                style={{ color: "rgba(26,26,26,0.8)" }}
              >
                Born from the Land of Maharashtra, Hotel Shauryawada carries the soul of the
                Maratha warrior — fiercely proud, deeply rooted, and generous to the core.
              </p>
              <p
                className="font-body text-base md:text-lg leading-relaxed"
                style={{ color: "rgba(26,26,26,0.8)" }}
              >
                Cooking is a ritual - every dish is prepared with care and patience, perfected through generations of our tradition.
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
                  <p className="text-[11px] font-body" style={{ color: "rgba(26,26,26,0.6)" }}>{pillar.desc}</p>
                </div>
              ))}
            </div>

            {/* Gallery Button */}
            <div className="pt-6">
              <Link href="/gallery" className="inline-flex items-center gap-3 group cursor-none">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 rounded-sm text-sm font-body uppercase tracking-[0.2em] font-bold relative overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, #FF6B00, #C9A84C)",
                    color: "#1A1A1A",
                  }}
                >
                  View Full Gallery
                </motion.div>
                <motion.div 
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-gold/30 transition-colors group-hover:border-gold"
                  whileHover={{ x: 5 }}
                >
                  <ArrowRight size={18} color="#C9A84C" />
                </motion.div>
              </Link>
            </div>
          </div>

          {/* Right: Visual Section */}
          <div ref={rightRef} className="relative">
            <div className="relative aspect-[4/3] md:aspect-square lg:aspect-[4/5] rounded-sm overflow-hidden border border-gold/20 shadow-2xl p-2 bg-[#1A1A1A]/5">
              <div className="grid grid-cols-3 grid-rows-4 gap-2 h-full w-full">
                {bentoItems.map((item) => (
                  <div 
                    key={item.id} 
                    className={`relative rounded-[8px] overflow-hidden group cursor-pointer ${item.className}`}
                    onClick={() => setSelectedImage(item.img)}
                  >
                    <Image
                      src={item.img}
                      alt="Gallery Image"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-gold/40 pointer-events-none" />
            <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-gold/40 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-5xl h-[85vh] rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Selected Image full view"
                fill
                className="object-contain"
                sizes="100vw"
                quality={100}
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full hover:bg-black/80 transition-colors z-10"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
