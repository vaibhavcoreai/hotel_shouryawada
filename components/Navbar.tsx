"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "About", href: "/#about" },
  { label: "Dishes", href: "/#dishes" },
  { label: "Menu", href: "/menu" },
  { label: "Branches", href: "/#branches" },
  { label: "Watch", href: "/#youtube" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (href: string) => {
    setActive(href);
    setMenuOpen(false);
    
    if (href.startsWith("/#")) {
      const id = href.replace("/", "");
      const el = document.querySelector(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = href;
      }
    } else {
      window.location.href = href;
    }
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-md bg-charcoal/85 border-b border-gold/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="/"
          className="flex items-center gap-3 cursor-none"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="relative w-10 h-10 md:w-12 md:h-12">
            <Image
              src="/logo.png"
              alt="Hotel Shauryawada Logo"
              fill
              className="object-contain"
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span
              className="text-lg md:text-xl font-heading font-bold"
              style={{ color: "#C9A84C", letterSpacing: "0.04em" }}
            >
              Shauryawada
            </span>
            <span
              className="text-[8px] md:text-[10px] tracking-[0.22em] uppercase font-body"
              style={{ color: "#FF6B00" }}
            >
              The Raan Dynasty
            </span>
          </div>
        </motion.a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <div key={link.href} className="relative">
              <button
                onClick={() => handleNav(link.href)}
                className="nav-link cursor-none"
              >
                {link.label}
              </button>
              {active === link.href && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 w-full h-[1px]"
                  style={{ background: "#C9A84C" }}
                />
              )}
            </div>
          ))}
          <motion.a
            href="tel:+918888888888"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="px-5 py-2 rounded-sm text-sm font-body uppercase tracking-widest font-bold cursor-none"
            style={{
              background: "linear-gradient(135deg, #FF6B00, #C9A84C)",
              color: "#1A1A1A",
            }}
          >
            Reserve
          </motion.a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-gold"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={menuOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="md:hidden overflow-hidden bg-charcoal/95 backdrop-blur-md border-t border-gold/20"
      >
        <div className="flex flex-col gap-4 px-6 py-6">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="text-left text-cream text-lg font-heading hover:text-gold transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
}
