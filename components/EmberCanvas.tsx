"use client";

import { useEffect, useRef } from "react";

interface Ember {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  drift: number;
  life: number;
  maxLife: number;
}

export default function EmberCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const embers: Ember[] = [];
    const MAX_EMBERS = 35;

    const createEmber = (): Ember => ({
      x: Math.random() * canvas.width,
      y: canvas.height + 10,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 1.5 + 0.4,
      opacity: Math.random() * 0.6 + 0.3,
      drift: (Math.random() - 0.5) * 0.8,
      life: 0,
      maxLife: Math.random() * 200 + 120,
    });

    for (let i = 0; i < MAX_EMBERS; i++) {
      const e = createEmber();
      e.y = Math.random() * canvas.height; // scatter initial positions
      embers.push(e);
    }

    let rafId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < embers.length; i++) {
        const e = embers[i];
        e.y -= e.speed;
        e.x += e.drift;
        e.life++;

        const progress = e.life / e.maxLife;
        const alpha = e.opacity * (1 - Math.pow(progress, 2));

        if (e.life >= e.maxLife || e.y < -10) {
          embers[i] = createEmber();
          continue;
        }

        // Glow core
        const gradient = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, e.size * 2.5);
        gradient.addColorStop(0, `rgba(255,180,50,${alpha})`);
        gradient.addColorStop(0.4, `rgba(201,168,76,${alpha * 0.6})`);
        gradient.addColorStop(1, `rgba(255,107,0,0)`);

        ctx.beginPath();
        ctx.arc(e.x, e.y, e.size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Bright center
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.size * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,240,180,${alpha * 0.9})`;
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="ember-canvas"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 2 }}
    />
  );
}
