"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "../lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin } from "lucide-react";
import Image from "next/image";

const Youtube = ({ size = 18, color = "currentColor" }: { size?: number, color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
  </svg>
);

const Instagram = ({ size = 18, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const LinkIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
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
      gsap.from(".social-card", {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 0.9,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".social-grid",
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
      id="socials"
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
            Join Our <span style={{ color: "#FF6B00" }}>Community</span>
          </h2>
          <span ref={underlineRef} className="section-underline mt-4 gsap-animated" />
          <p
            className="font-body mt-6 max-w-xl"
            style={{ color: "rgba(26,26,26,0.6)", lineHeight: 1.7 }}
          >
            Follow our  journey across Maharashtra. Connect with us on Instagram and enjoy our content on YouTube.

          </p>
        </div>

        <div className="social-grid grid xl:grid-cols-2 gap-8 items-stretch">
          
          {/* Instagram Card */}
          <motion.div
            className="social-card gsap-animated rounded-2xl overflow-hidden cursor-none flex flex-col"
            style={{
              background: "#121212", 
              border: "1px solid rgba(255,255,255,0.1)",
            }}
            whileHover={{
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
              y: -5
            }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-start flex-1">
              {/* Profile Image with Gradient Border */}
              <div className="relative shrink-0 mx-auto md:mx-0">
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full p-1" style={{ background: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)" }}>
                  <div className="w-full h-full rounded-full border-[3px] border-[#121212] overflow-hidden relative flex items-center justify-center bg-zinc-800">
                    <Image src="/channels4_profile.jpg" alt="Vikas Nana Hande" fill className="object-cover" />
                  </div>
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1 flex flex-col gap-4 text-white w-full">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-body text-xl font-bold">hotel_shauryawada</h3>
                      <Instagram size={18} className="opacity-80" />
                    </div>
                    <p className="font-body text-sm opacity-90">Vikas Nana Hande</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex gap-4 sm:gap-6 font-body text-sm">
                  <p><span className="font-bold">2,980</span> posts</p>
                  <p><span className="font-bold">846K</span> followers</p>
                  <p><span className="font-bold">656</span> following</p>
                </div>

                {/* Bio */}
                <div className="font-body text-[13px] opacity-90 space-y-1.5 mt-1">
                  <p className="flex items-start gap-1.5 leading-snug">
                    <MapPin size={14} className="mt-[2px] shrink-0 text-[#FF6B00]" />
                    <span>हांडेवाडी (Main), वाघोली, भोसरी, उरुळी-कांचन, अहिल्या नगर, लोणीकाळभोर (व्हेज), उमरगा, नाशिक, लोणावळा, खेड शिवापूर... more</span>
                  </p>
                  <p className="flex items-center gap-1.5 text-blue-400">
                    <LinkIcon size={14} /> shorturl.at/Xrhww
                  </p>

                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-auto pt-4">
                  <motion.a 
                    href="https://instagram.com/hotel_shauryawada" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#0095f6] hover:bg-[#1877f2] text-white text-center py-2.5 rounded-lg font-body font-semibold text-sm transition-colors cursor-none"
                  >
                    Follow
                  </motion.a>
                  <motion.a 
                    href="https://ig.me/m/hotel_shauryawada"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#363636] hover:bg-[#262626] text-white text-center py-2.5 rounded-lg font-body font-semibold text-sm transition-colors cursor-none"
                  >
                    Message
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* YouTube Card */}
          <motion.div
            className="social-card gsap-animated rounded-2xl overflow-hidden cursor-none flex flex-col"
            style={{
              background: "#121212", 
              border: "1px solid rgba(255,255,255,0.1)",
            }}
            whileHover={{
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
              y: -5
            }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-start flex-1">
              {/* Profile Image with Red Border */}
              <div className="relative shrink-0 mx-auto md:mx-0">
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full p-1" style={{ background: "#FF0000" }}>
                  <div className="w-full h-full rounded-full border-[3px] border-[#121212] overflow-hidden relative flex items-center justify-center bg-zinc-800">
                    <Image src="/channels4_profile.jpg" alt="Hotel Shauryawada Official" fill className="object-cover" />
                  </div>
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1 flex flex-col gap-4 text-white w-full">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-body text-xl font-bold">Hotel Shauryawada</h3>
                      <Youtube size={20} color="#FF0000" />
                    </div>
                    <p className="font-body text-sm opacity-70">@Hotel_Shauryawada_Official</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex gap-4 sm:gap-6 font-body text-sm">
                  <p><span className="font-bold">930K+</span> subscribers</p>
                  <p><span className="font-bold">200+</span> videos</p>
                </div>

                {/* Bio */}
                <div className="font-body text-[13px] opacity-90 space-y-1.5 mt-1">
                  <p className="leading-snug">
                    Behind-the-scenes kitchen tours, Raan cooking process, branch expansion vlogs, and the raw energy of Maharashtra's most beloved dhaba chain.
                  </p>
                  <p className="flex items-center gap-1.5 text-blue-400">
                    <LinkIcon size={14} /> youtube.com/@Hotel_Shauryawada_Official
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-auto pt-4">
                  <motion.a 
                    href="https://www.youtube.com/@Hotel_Shauryawada_Official" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 bg-white hover:bg-gray-200 text-black text-center py-2.5 rounded-full font-body font-bold text-sm transition-colors cursor-none"
                  >
                    Subscribe
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
