import { useEffect, useRef } from "react";

export function ParticleBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
    };
    resize();
    window.addEventListener("resize", resize);

    const N = 70;
    const pts = Array.from({ length: N }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3 * dpr,
      vy: (Math.random() - 0.5) * 0.3 * dpr,
    }));

    const mouse = { x: -9999, y: -9999 };
    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX * dpr;
      mouse.y = e.clientY * dpr;
    };
    window.addEventListener("mousemove", onMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      }
      const max = 130 * dpr;
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const a = pts[i], b = pts[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < max) {
            const o = 1 - d / max;
            ctx.strokeStyle = `rgba(59,130,246,${o * 0.25})`;
            ctx.lineWidth = dpr * 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        const dmx = pts[i].x - mouse.x, dmy = pts[i].y - mouse.y;
        const dm = Math.hypot(dmx, dmy);
        if (dm < 180 * dpr) {
          const o = 1 - dm / (180 * dpr);
          ctx.strokeStyle = `rgba(6,182,212,${o * 0.5})`;
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
        ctx.fillStyle = "rgba(125,211,252,0.7)";
        ctx.beginPath();
        ctx.arc(pts[i].x, pts[i].y, 1.4 * dpr, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none fixed inset-0 -z-10 opacity-60"
      aria-hidden
    />
  );
}
