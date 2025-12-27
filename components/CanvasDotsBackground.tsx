"use client";

import { useEffect, useRef } from "react";

/**
 * QRコード風の正方形ドットが明滅する背景キャンバス
 * index.html (ダウンロード提供) のアニメーションをReactに移植。
 */
export default function CanvasDotsBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const gridSize = 20;
    let animationId = 0;

    type Particle = {
      x: number;
      y: number;
      size: number;
      alpha: number;
      fadeIn: boolean;
      speed: number;
    };

    let particles: Particle[] = [];

    const initParticles = () => {
      particles = [];
      const count = Math.floor((width * height) / (gridSize * gridSize) / 10);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.floor(Math.random() * (width / gridSize)) * gridSize,
          y: Math.floor(Math.random() * (height / gridSize)) * gridSize,
          size: Math.random() > 0.8 ? gridSize * 2 : gridSize,
          alpha: 0,
          fadeIn: true,
          speed: Math.random() * 0.5 + 0.1,
        });
      }
    };

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // まれに走査線を入れる
      if (Math.random() > 0.95) {
        ctx.fillStyle = `rgba(0, 255, 65, 0.05)`;
        ctx.fillRect(0, Math.random() * height, width, 2);
      }

      particles.forEach((p) => {
        if (p.fadeIn) {
          p.alpha += 0.02 * p.speed;
          if (p.alpha >= 0.5) p.fadeIn = false;
        } else {
          p.alpha -= 0.02 * p.speed;
          if (p.alpha <= 0) {
            // 再配置
            p.x = Math.floor(Math.random() * (width / gridSize)) * gridSize;
            p.y = Math.floor(Math.random() * (height / gridSize)) * gridSize;
            p.alpha = 0;
            p.fadeIn = true;
            p.size = Math.random() > 0.9 ? gridSize * 3 : gridSize;
          }
        }

        ctx.fillStyle = `rgba(0, 255, 65, ${p.alpha})`;
        // -2で隙間を作り、ドット感を出す
        ctx.fillRect(p.x, p.y, p.size - 2, p.size - 2);
      });

      animationId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 w-full h-full bg-[#050505]"
      aria-hidden
    />
  );
}

