"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "../lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, MapPin, ArrowUp } from "lucide-react";

const BRANCHES_SHORT = [
  "Handewadi", "Wagholi", "Uruli Kanchan", "Bhosari",
  "Ahilyanagar", "Umerga", "Loni Kalbhor", "Nashik"
];

// Inline SVG brand icons — lucide-react doesn't include social brands
const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);
const YoutubeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
  </svg>
);

const SOCIALS = [
  {
    Icon: FacebookIcon,
    label: "Facebook",
    href: "https://facebook.com/vikasnana.handeiii",
    color: "#1877F2",
  },
  {
    Icon: InstagramIcon,
    label: "Instagram",
    href: "https://instagram.com/hotel_shauryawada",
    color: "#E4405F",
  },
  {
    Icon: YoutubeIcon,
    label: "YouTube",
    href: "https://youtube.com/@Hotel_Shauryawada_Official",
    color: "#FF0000",
  },
];

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".footer-col", {
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 0.9,
        ease: "expo.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      ref={sectionRef}
      id="contact"
      className="relative overflow-hidden"
      style={{ background: "#080500" }}
    >
      {/* Maratha decorative top border */}
      <div className="relative h-8">
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, #C9A84C 20%, #FF6B00 50%, #C9A84C 80%, transparent)",
          }}
        />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4"
          style={{ background: "#080500" }}
        >
          <span style={{ color: "#C9A84C", fontSize: "1.2rem" }}>◆</span>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand column */}
          <div className="footer-col gsap-animated lg:col-span-1">
            <h3
              className="font-heading font-extrabold text-2xl mb-2"
              style={{ color: "#C9A84C" }}
            >
              Hotel Shauryawada
            </h3>
            <p
              className="text-xs tracking-[0.22em] uppercase font-body mb-4"
              style={{ color: "#FF6B00" }}
            >
              The Raan Dynasty
            </p>
            <div
              className="w-12 h-px mb-5"
              style={{ background: "linear-gradient(90deg, #C9A84C, transparent)" }}
            />
            <p
              className="font-body text-sm leading-relaxed mb-6"
              style={{ color: "rgba(255,248,231,0.45)" }}
            >
              Ruling hearts across Maharashtra with authentic Mutton &amp; Chicken Raan,
              cooked the Maratha way — bold, honest, and unforgettable.
            </p>
            {/* Marathi brand stamp */}
            <div
              className="inline-block px-4 py-2 rounded-sm"
              style={{
                border: "1px solid rgba(201,168,76,0.2)",
                background: "rgba(201,168,76,0.05)",
              }}
            >
              <p className="font-heading text-lg font-bold" style={{ color: "#C9A84C" }}>
                ॥ शौर्यवाडा ॥
              </p>
            </div>
          </div>

          {/* Branches column */}
          <div className="footer-col gsap-animated">
            <h4
              className="font-heading font-bold text-base mb-6 flex items-center gap-2"
              style={{ color: "#FFF8E7" }}
            >
              <MapPin size={14} color="#FF6B00" />
              Our Branches
            </h4>
            <ul className="space-y-2">
              {BRANCHES_SHORT.map((branch, i) => (
                <li key={i}>
                  <span
                    className="font-body text-sm transition-colors duration-200 hover:text-gold cursor-pointer"
                    style={{ color: "rgba(255,248,231,0.5)" }}
                  >
                    {branch}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect column */}
          <div className="footer-col gsap-animated">
            <h4
              className="font-heading font-bold text-base mb-6 flex items-center gap-2"
              style={{ color: "#FFF8E7" }}
            >
              <Mail size={14} color="#FF6B00" />
              Connect With Us
            </h4>
            <div className="space-y-4">
              <a
                href="mailto:shauryawada.marketing@gmail.com"
                className="flex items-start gap-3 group cursor-none"
              >
                <Mail
                  size={14}
                  className="flex-shrink-0 mt-0.5"
                  style={{ color: "#C9A84C" }}
                />
                <span
                  className="font-body text-sm"
                  style={{ color: "rgba(255,248,231,0.5)", wordBreak: "break-all" }}
                >
                  shauryawada.marketing@gmail.com
                </span>
              </a>

              {/* Social icons */}
              <div className="pt-4">
                <p
                  className="font-body text-xs tracking-widest uppercase mb-4"
                  style={{ color: "rgba(255,248,231,0.3)" }}
                >
                  Follow Our Journey
                </p>
                <div className="flex gap-3">
                  {SOCIALS.map((social, i) => {
                    const { Icon } = social;
                    return (
                      <motion.a
                        key={i}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        whileHover={{ scale: 1.2, color: social.color }}
                        transition={{ type: "spring" as const, stiffness: 300, damping: 15 }}
                        className="w-10 h-10 flex items-center justify-center rounded-sm cursor-none"
                        style={{
                          background: "rgba(255,248,231,0.04)",
                          border: "1px solid rgba(201,168,76,0.15)",
                          color: "#C9A84C",
                        }}
                      >
                        <Icon />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Tagline / Quote column */}
          <div className="footer-col gsap-animated">
            <h4
              className="font-heading font-bold text-base mb-6"
              style={{ color: "#FFF8E7" }}
            >
              The Warrior&apos;s Oath
            </h4>
            <blockquote
              className="relative pl-4 py-2"
              style={{ borderLeft: "2px solid #FF6B00" }}
            >
              <p
                className="font-heading text-lg font-bold italic mb-2"
                style={{ color: "#C9A84C" }}
              >
                &ldquo;Ruling Hearts Across Maharashtra Since Day One&rdquo;
              </p>
              <cite
                className="font-body text-xs tracking-wider uppercase not-italic"
                style={{ color: "rgba(255,248,231,0.35)" }}
              >
                — Hotel Shauryawada
              </cite>
            </blockquote>

            {/* Back to top */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring" as const, stiffness: 300, damping: 20 }}
              className="mt-8 flex items-center gap-2 cursor-none"
              style={{ color: "rgba(201,168,76,0.5)" }}
            >
              <div
                className="w-8 h-8 rounded-sm flex items-center justify-center"
                style={{ border: "1px solid rgba(201,168,76,0.25)" }}
              >
                <ArrowUp size={14} color="#C9A84C" />
              </div>
              <span className="font-body text-xs tracking-widest uppercase">
                Back to Top
              </span>
            </motion.button>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-16 pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(201,168,76,0.1)" }}
        >
          <p
            className="font-body text-xs text-center md:text-left"
            style={{ color: "rgba(255,248,231,0.25)" }}
          >
            © {new Date().getFullYear()} Hotel Shauryawada. All rights reserved.
            Built with pride in Maharashtra. 🧡
          </p>
          <p
            className="font-body text-xs"
            style={{ color: "rgba(255,248,231,0.2)" }}
          >
            Handewadi · Wagholi · Bhosari · Nashik · &amp; more
          </p>
        </div>
      </div>
    </footer>
  );
}
