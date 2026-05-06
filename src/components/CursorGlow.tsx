import { useEffect, useState } from "react";

export function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed -z-10 h-[400px] w-[400px] rounded-full blur-3xl transition-transform duration-150 ease-out"
      style={{
        left: pos.x - 200,
        top: pos.y - 200,
        background:
          "radial-gradient(circle, oklch(0.68 0.19 252 / 0.18), transparent 60%)",
      }}
    />
  );
}
