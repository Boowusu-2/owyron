import { useEffect, useRef } from 'react';

interface NodePoint {
  baseAngle: number;
  radiusRatio: number;
  speed: number;
  size: number;
  isIndigo: boolean;
}

const NODES: NodePoint[] = [
  { baseAngle: 0.25, radiusRatio: 0.34, speed: 0.00018, size: 2.2, isIndigo: true },
  { baseAngle: 1.45, radiusRatio: 0.52, speed: -0.00014, size: 1.8, isIndigo: false },
  { baseAngle: 2.55, radiusRatio: 0.72, speed: 0.00011, size: 2.4, isIndigo: true },
  { baseAngle: 3.65, radiusRatio: 0.44, speed: -0.00016, size: 1.6, isIndigo: false },
  { baseAngle: 4.55, radiusRatio: 0.86, speed: 0.00009, size: 2.0, isIndigo: false },
  { baseAngle: 5.55, radiusRatio: 0.62, speed: -0.00012, size: 2.2, isIndigo: true },
  { baseAngle: 0.9, radiusRatio: 0.92, speed: 0.00008, size: 1.5, isIndigo: false },
  { baseAngle: 3.1, radiusRatio: 0.24, speed: -0.00022, size: 1.9, isIndigo: false },
];

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let rafId = 0;
    let pointerX = 0.5;
    let pointerY = 0.5;
    let targetX = 0.5;
    let targetY = 0.5;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      targetX = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      targetY = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    const draw = (time: number) => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      if (width === 0 || height === 0) return;

      pointerX += (targetX - pointerX) * 0.035;
      pointerY += (targetY - pointerY) * 0.035;

      ctx.clearRect(0, 0, width, height);

      // Anchor lattice toward the right half on desktop, centered subtly on narrow viewports
      const isWide = width >= 768;
      const cx = (isWide ? width * 0.72 : width * 0.5) + (pointerX - 0.5) * 18;
      const cy = height * 0.5 + (pointerY - 0.5) * 14;
      const maxRadius = Math.min(width * (isWide ? 0.38 : 0.46), height * 0.44);

      // Subtle radial indigo field (very restrained)
      const glow = ctx.createRadialGradient(cx, cy, maxRadius * 0.08, cx, cy, maxRadius * 1.15);
      glow.addColorStop(0, 'rgba(56, 21, 252, 0.14)');
      glow.addColorStop(0.55, 'rgba(56, 21, 252, 0.04)');
      glow.addColorStop(1, 'rgba(6, 6, 8, 0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      // Precision concentric rings & partial geometric arcs
      const ringRatios = [0.24, 0.44, 0.64, 0.84, 1.0];
      ringRatios.forEach((ratio, idx) => {
        const r = maxRadius * ratio;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle =
          idx === 1 ? 'rgba(88, 67, 255, 0.22)' : 'rgba(255, 255, 255, 0.065)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Subtle rotating arc segment echoing precision instrumentation
        const arcOffset = prefersReducedMotion ? idx * 0.8 : time * 0.00008 * (idx % 2 === 0 ? 1 : -1) + idx * 1.1;
        ctx.beginPath();
        ctx.arc(cx, cy, r, arcOffset, arcOffset + 0.85);
        ctx.strokeStyle =
          idx % 2 === 0 ? 'rgba(88, 67, 255, 0.45)' : 'rgba(255, 255, 255, 0.18)';
        ctx.lineWidth = 1.25;
        ctx.stroke();
      });

      // Orthogonal & 55-degree diagonal meridian axes (echoing the OWYRON chevron angle)
      const angleRad = (55 * Math.PI) / 180;
      const axisLength = maxRadius * 1.18;

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.055)';
      ctx.lineWidth = 1;

      // Horizontal + vertical axes
      ctx.beginPath();
      ctx.moveTo(cx - axisLength, cy);
      ctx.lineTo(cx + axisLength, cy);
      ctx.moveTo(cx, cy - axisLength);
      ctx.lineTo(cx, cy + axisLength);
      ctx.stroke();

      // Diagonal vector rays
      ctx.beginPath();
      ctx.moveTo(cx - Math.cos(angleRad) * axisLength, cy + Math.sin(angleRad) * axisLength);
      ctx.lineTo(cx + Math.cos(angleRad) * axisLength, cy - Math.sin(angleRad) * axisLength);
      ctx.moveTo(cx - Math.cos(angleRad) * axisLength, cy - Math.sin(angleRad) * axisLength);
      ctx.lineTo(cx + Math.cos(angleRad) * axisLength, cy + Math.sin(angleRad) * axisLength);
      ctx.strokeStyle = 'rgba(88, 67, 255, 0.12)';
      ctx.stroke();

      // Compute orbital node positions
      const coords = NODES.map((node) => {
        const theta = prefersReducedMotion
          ? node.baseAngle
          : node.baseAngle + time * node.speed;
        const r = maxRadius * node.radiusRatio;
        return {
          x: cx + Math.cos(theta) * r,
          y: cy + Math.sin(theta) * r,
          size: node.size,
          isIndigo: node.isIndigo,
        };
      });

      // Interconnect nearby nodes cleanly
      for (let i = 0; i < coords.length; i++) {
        for (let j = i + 1; j < coords.length; j++) {
          const dx = coords[i].x - coords[j].x;
          const dy = coords[i].y - coords[j].y;
          const dist = Math.hypot(dx, dy);
          const threshold = maxRadius * 1.05;
          if (dist < threshold) {
            const alpha = (1 - dist / threshold) * 0.18;
            ctx.beginPath();
            ctx.moveTo(coords[i].x, coords[i].y);
            ctx.lineTo(coords[j].x, coords[j].y);
            ctx.strokeStyle =
              coords[i].isIndigo || coords[j].isIndigo
                ? `rgba(88, 67, 255, ${alpha * 1.4})`
                : `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Draw crisp geometric nodes
      for (const p of coords) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.isIndigo ? '#5843FF' : 'rgba(245, 246, 250, 0.78)';
        ctx.fill();

        if (p.isIndigo) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size + 4, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(88, 67, 255, 0.28)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Center precision crosshair
      ctx.beginPath();
      ctx.arc(cx, cy, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#F5F6FA';
      ctx.fill();

      if (!prefersReducedMotion) {
        rafId = requestAnimationFrame(draw);
      }
    };

    if (prefersReducedMotion) {
      draw(0);
    } else {
      rafId = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}

