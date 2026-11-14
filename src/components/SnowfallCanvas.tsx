import { useEffect, useRef } from 'react';

interface Snowflake {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  speedX: number;
  opacity: number;
  tint: string;
}

const SNOW_TINTS = [
  'rgba(255, 255, 255, 0.85)',
  'rgba(185, 223, 255, 0.8)',
  'rgba(229, 139, 255, 0.45)',
  'rgba(0, 229, 204, 0.42)',
];

export function SnowfallCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let flakes: Snowflake[] = [];

    const createFlakes = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      const isMobile = width < 768;
      // Intentionally sparse so snow feels atmospheric and never distracting
      const targetCount = isMobile ? 22 : Math.min(54, Math.floor((width * height) / 36000));

      flakes = Array.from({ length: targetCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.6 + 0.6,
        speedY: Math.random() * 0.45 + 0.18,
        speedX: (Math.random() - 0.5) * 0.28,
        opacity: Math.random() * 0.45 + 0.15,
        tint: SNOW_TINTS[Math.floor(Math.random() * SNOW_TINTS.length)],
      }));
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (const flake of flakes) {
        flake.y += flake.speedY;
        flake.x += flake.speedX + Math.sin(flake.y * 0.012) * 0.12;

        if (flake.y > height + 6) {
          flake.y = -6;
          flake.x = Math.random() * width;
        }
        if (flake.x > width + 6) flake.x = -6;
        if (flake.x < -6) flake.x = width + 6;

        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        ctx.fillStyle = flake.tint;
        ctx.globalAlpha = flake.opacity;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animationFrameId = window.requestAnimationFrame(render);
    };

    createFlakes();
    animationFrameId = window.requestAnimationFrame(render);

    const handleResize = () => createFlakes();
    const handleMotionChange = () => {
      if (mediaQuery.matches) {
        window.cancelAnimationFrame(animationFrameId);
        ctx.clearRect(0, 0, width, height);
      } else {
        createFlakes();
        animationFrameId = window.requestAnimationFrame(render);
      }
    };

    window.addEventListener('resize', handleResize);
    mediaQuery.addEventListener('change', handleMotionChange);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
}
