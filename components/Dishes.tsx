"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "../lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flame, Crown } from "lucide-react";

const DISHES = [
  {
    name: "Gavran Chicken Matka Handi (Half / Full)",
    marathi: "गावरान चिकन मटका हंडी (हाफ / फुल)",
    desc: "Authentic country-style chicken slow-cooked in a clay pot with earthy Maharashtrian spices.",
    price: "₹ 549 / ₹ 999",
    tags: ["Rustic", "Earthen Pot"],
    badge: "Signature",
    flame: 3,
  },
  {
    name: "Rajeshahi Murg",
    marathi: "राजेशाही मुर्ग",
    desc: "A royal delicacy. Tender chicken in a rich, velvety gravy infused with cashew, saffron, and premium whole spices.",
    price: "₹ 499",
    tags: ["Royal", "Rich Gravy"],
    badge: "Chef's Special",
    flame: 2,
  },
  {
    name: "Mutton Shahi Korma",
    marathi: "मटन शाही कोरमा",
    desc: "Slow-braised mutton in an aromatic, luxurious cream and yogurt-based gravy, fit for the Maratha kings.",
    price: "₹ 649",
    tags: ["Luxurious", "Mild Spice"],
    badge: "Must Try",
    flame: 1,
  },
  {
    name: "Mutton Matka Handi (Half / Full)",
    marathi: "मटन मटका हंडी (हाफ / फुल)",
    desc: "Premium mutton cuts simmered slowly in a sealed earthen pot, capturing the true essence of traditional spices.",
    price: "₹ 749 / ₹ 1399",
    tags: ["Traditional", "Slow Cooked"],
    badge: "Crowd Favorite",
    flame: 3,
  },
  {
    name: "Mutton Shahi Raan Ki Shaan",
    marathi: "मटन शाही रान की शान",
    desc: "The ultimate royal feast. A majestic whole leg of lamb, marinated in secret spices and slow-roasted to absolute perfection.",
    price: "₹ 1199",
    tags: ["Majestic", "Charcoal Roast"],
    badge: "The Crown Jewel",
    flame: 2,
  },
];

const FlameRow = ({ count }: { count: number }) => (
  <div className="flex gap-1">
    {[1, 2, 3].map((i) => (
      <Flame
        key={i}
        size={14}
        fill={i <= count ? "#C9A84C" : "transparent"}
        color={i <= count ? "#C9A84C" : "rgba(201,168,76,0.3)"}
      />
    ))}
  </div>
);

export default function Dishes() {
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

      gsap.from(".dish-card", {
        y: 60,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".dish-grid",
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
      id="dishes"
      className="relative py-20 md:py-32 overflow-hidden"
      style={{ background: "#FDFBF7" }}
    >
      {/* Atmospheric top glow */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(201,168,76,0.5) 50%, transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h2
              ref={titleRef}
              className="section-title font-heading font-extrabold gsap-animated"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: "#1A1A1A" }}
            >
              SHAURYAWADA{" "}
              <span style={{ color: "#C9A84C" }}>SPECIAL</span>
            </h2>
            <span ref={underlineRef} className="section-underline mt-4 gsap-animated" />
          </div>
          <p
            className="font-body text-sm md:text-base max-w-sm text-left md:text-right"
            style={{ color: "rgba(26,26,26,0.6)", lineHeight: 1.7 }}
          >
            Our heritage dishes
          </p>
        </div>

        {/* Cards grid */}
        <div className="dish-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DISHES.map((dish, i) => (
            <motion.div
              key={i}
              className="dish-card group relative flex flex-col p-6 md:p-8 rounded-sm overflow-hidden cursor-none gsap-animated"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,248,231,0.4) 0%, rgba(255,248,231,0.9) 100%)",
                border: "1px solid rgba(201,168,76,0.15)",
              }}
              whileHover={{
                y: -5,
                borderColor: "rgba(201,168,76,0.4)",
                background:
                  "linear-gradient(180deg, rgba(255,248,231,0.6) 0%, #FFF8E7 100%)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Premium Top Accents */}
              <div className="flex justify-between items-center mb-6">
                <Crown size={16} color="#C9A84C" className="opacity-70" />
                <span
                  className="text-[9px] font-body font-bold tracking-[0.2em] uppercase px-3 py-1"
                  style={{
                    border: "1px solid rgba(201,168,76,0.3)",
                    color: "#C9A84C",
                  }}
                >
                  {dish.badge}
                </span>
              </div>

              {/* Title row */}
              <div className="flex items-start justify-between mb-1">
                <div>
                  <h3
                    className="font-heading font-bold text-2xl group-hover:text-gold transition-colors duration-300"
                    style={{ color: "rgba(26, 26, 26, 1)" }}
                  >
                    {dish.name}
                  </h3>
                  <p
                    className="font-heading text-sm mt-1"
                    style={{ color: "#FF6B00" }}
                  >
                    {dish.marathi}
                  </p>
                </div>
                <FlameRow count={dish.flame} />
              </div>

              {/* Classic Divider */}
              <div className="flex items-center gap-2 mt-auto mb-4 opacity-50">
                <div className="flex-1 h-px" style={{ background: "rgba(201,168,76,0.2)" }} />
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#C9A84C" }} />
                <div className="flex-1 h-px" style={{ background: "rgba(201,168,76,0.2)" }} />
              </div>

              {/* Tags */}
              <div className="flex items-end justify-between">
                <div className="flex gap-2 flex-wrap">
                  {dish.tags.map((tag, j) => (
                    <span
                      key={j}
                      className="text-[10px] font-body tracking-wider uppercase"
                      style={{
                        color: "rgba(201,168,76,0.7)",
                      }}
                    >
                      {tag}{j < dish.tags.length - 1 && <span className="mx-1 text-black/20">|</span>}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Row */}
        <div className="mt-16 text-center">
          <motion.a
            href="/menu"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 px-8 py-3 font-body text-sm tracking-widest uppercase border cursor-none"
            style={{
              borderColor: "rgba(201,168,76,0.4)",
              color: "#C9A84C",
            }}
          >
            <Crown size={14} />
            Explore The Full Menu
            <Crown size={14} />
          </motion.a>
        </div>
      </div>

      {/* Bottom atmosphere */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(201,168,76,0.5) 50%, transparent)",
        }}
      />
    </section>
  );
}
