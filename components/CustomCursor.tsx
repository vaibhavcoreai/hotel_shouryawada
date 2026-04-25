"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 768) return;

    let mouseX = -100;
    let mouseY = -100;
    let curX = -100;
    let curY = -100;
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
      curX += (mouseX - curX) * 0.2;
      curY += (mouseY - curY) * 0.2;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${curX}px, ${curY}px, 0) translate3d(-50%, -50%, 0)`;
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
    <motion.div
      ref={cursorRef}
      className="hidden md:block fixed top-0 left-0 z-[99999] pointer-events-none mix-blend-difference"
      animate={{
        width: hovered ? 48 : clicked ? 20 : 24,
        height: hovered ? 48 : clicked ? 20 : 24,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{
        background: "white",
        borderRadius: "50%",
        willChange: "transform, width, height",
      }}
    />
  );
}
