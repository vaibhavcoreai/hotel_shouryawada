"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "../lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play, Users, TrendingUp } from "lucide-react";

const YoutubeIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
  </svg>
);

export default function YouTube() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);

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
      gsap.from(".yt-card", {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 0.9,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".yt-grid",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="youtube"
      className="relative py-32 overflow-hidden"
      style={{ background: "#FDFBF7" }}
    >
      {/* Top line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, #FF6B00 30%, #C9A84C 50%, #FF6B00 70%, transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-16">
          <h2
            ref={titleRef}
            className="section-title font-heading font-extrabold gsap-animated"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: "#1A1A1A" }}
          >
            <span style={{ color: "#FF6B00" }}>930K+</span> Warriors
            <br />Join Our Kingdom
          </h2>
          <span ref={underlineRef} className="section-underline mt-4 gsap-animated" />
          <p
            className="font-body mt-6 max-w-xl"
            style={{ color: "rgba(26,26,26,0.6)", lineHeight: 1.7 }}
          >
            Watch the Raan being made. Witness the flavors. Follow our culinary journey across
            Maharashtra on YouTube.
          </p>
        </div>

        <div className="yt-grid grid md:grid-cols-2 gap-8 items-start">
          {/* Main channel card */}
          <motion.div
            className="yt-card gsap-animated rounded-sm overflow-hidden cursor-none"
            style={{
              background: "linear-gradient(145deg, rgba(255,0,0,0.08), #FFF8E7)",
              border: "1px solid rgba(255,107,0,0.2)",
            }}
            whileHover={{
              boxShadow: "0 20px 60px rgba(255,107,0,0.2)",
              borderColor: "rgba(255,107,0,0.45)",
            }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            {/* Thumbnail placeholder with play button */}
            <div
              className="relative flex items-center justify-center"
              style={{
                aspectRatio: "16/9",
                background: "linear-gradient(135deg, #FFF8E7, #FDFBF7, #F5DEB3)",
              }}
            >
              {/* Decorative text in background */}
              <div
                className="absolute inset-0 flex items-center justify-center overflow-hidden"
                style={{ opacity: 0.06 }}
              >
                <span
                  className="font-heading font-extrabold text-[8rem] text-center leading-none select-none"
                  style={{ color: "#FF6B00" }}
                >
                  ॥ शौर्य ॥
                </span>
              </div>

              <motion.a
                href="https://www.youtube.com/@Hotel_Shauryawada_Official"
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 flex flex-col items-center gap-4 cursor-none"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{ background: "#FF0000", boxShadow: "0 0 40px rgba(255,0,0,0.5)" }}
                >
                  <Play size={32} fill="white" color="white" />
                </div>
                <span
                  className="font-body text-sm tracking-widest uppercase"
                  style={{ color: "rgba(26,26,26,0.8)" }}
                >
                  Watch on YouTube
                </span>
              </motion.a>
            </div>

            {/* Channel info */}
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: "#FF0000" }}
                >
                  <YoutubeIcon size={18} />
                </div>
                <div>
                  <p className="font-heading font-bold text-base" style={{ color: "#1A1A1A" }}>
                    Hotel Shauryawada Official
                  </p>
                  <p className="text-xs font-body" style={{ color: "rgba(26,26,26,0.5)" }}>
                    @Hotel_Shauryawada_Official
                  </p>
                </div>
              </div>
              <p
                className="font-body text-sm leading-relaxed"
                style={{ color: "rgba(26,26,26,0.7)" }}
              >
                Behind-the-scenes kitchen tours, Raan cooking process, branch expansion vlogs,
                and the raw energy of Maharashtra&apos;s most beloved dhaba chain.
              </p>
            </div>
          </motion.div>

          {/* Stats + Subscribe side */}
          <div className="yt-card gsap-animated space-y-5">
            {/* Stats */}
            {[
              { icon: Users, label: "Subscribers", value: "930K+", color: "#FF6B00" },
              { icon: TrendingUp, label: "Monthly Views", value: "15M+", color: "#C9A84C" },
              { icon: Play, label: "Videos Published", value: "200+", color: "#8B4513" },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  className="flex items-center gap-5 p-5 rounded-sm cursor-none"
                  style={{
                    background: "rgba(26,26,26,0.03)",
                    border: "1px solid rgba(201,168,76,0.1)",
                  }}
                  whileHover={{
                    x: 8,
                    borderColor: "rgba(201,168,76,0.3)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div
                    className="w-12 h-12 rounded-sm flex items-center justify-center flex-shrink-0"
                    style={{ background: `${stat.color}18`, border: `1px solid ${stat.color}40` }}
                  >
                    <Icon size={20} color={stat.color} />
                  </div>
                  <div>
                    <p
                      className="font-heading font-extrabold text-2xl"
                      style={{ color: stat.color }}
                    >
                      {stat.value}
                    </p>
                    <p
                      className="font-body text-xs tracking-wider uppercase"
                      style={{ color: "rgba(26,26,26,0.5)" }}
                    >
                      {stat.label}
                    </p>
                  </div>
                </motion.div>
              );
            })}

            {/* Subscribe CTA */}
            <motion.a
              href="https://www.youtube.com/@Hotel_Shauryawada_Official"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-3 w-full py-4 rounded-sm font-body font-bold text-sm tracking-widest uppercase cursor-none"
              style={{ background: "#FF0000", color: "white" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <YoutubeIcon size={18} />
              Subscribe — Join the 930K
            </motion.a>

            <p
              className="text-center text-xs font-body"
              style={{ color: "rgba(26,26,26,0.5)" }}
            >
              New episodes every week · Available on all devices
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
