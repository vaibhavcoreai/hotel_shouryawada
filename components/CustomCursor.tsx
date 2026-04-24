"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 768) return;

    let mouseX = 0;
    let mouseY = 0;
    let curX = 0;
    let curY = 0;
    let dotX = 0;
    let dotY = 0;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);

    const handleHoverIn = () => setHovered(true);
    const handleHoverOut = () => setHovered(false);

    const interactives = document.querySelectorAll("a, button, [data-cursor]");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", handleHoverIn);
      el.addEventListener("mouseleave", handleHoverOut);
    });

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);

    const animate = () => {
      // Outer ring: slow lerp
      curX += (mouseX - curX) * 0.08;
      curY += (mouseY - curY) * 0.08;
      // Inner dot: fast lerp
      dotX += (mouseX - dotX) * 0.3;
      dotY += (mouseY - dotY) * 0.3;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${curX - 20}px, ${curY - 20}px)`;
      }
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate(${dotX - 4}px, ${dotY - 4}px)`;
      }
      rafId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverIn);
        el.removeEventListener("mouseleave", handleHoverOut);
      });
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Outer ring */}
      <motion.div
        ref={cursorRef}
        className="hidden md:block fixed top-0 left-0 z-[99999] pointer-events-none"
        animate={{
          width: hovered ? 48 : clicked ? 28 : 40,
          height: hovered ? 48 : clicked ? 28 : 40,
          borderColor: hovered ? "#FF6B00" : "#C9A84C",
          opacity: hovered ? 0.9 : 0.6,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        style={{
          border: "1.5px solid #C9A84C",
          borderRadius: "50%",
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 99999,
        }}
      />
      {/* Inner dot */}
      <div
        ref={cursorDotRef}
        className="hidden md:block fixed top-0 left-0 z-[99999] pointer-events-none"
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#C9A84C",
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
        }}
      />
    </>
  );
}
