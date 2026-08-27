import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
      const target = e.target;
      const interactive = target.closest(
        'a, button, input, textarea, select, [data-cursor="active"], [role="button"]'
      );
      setActive(!!interactive);
    };
    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed z-[9999] hidden md:block"
      style={{
        left: pos.x,
        top: pos.y,
        transform: "translate(-50%, -50%)",
        transition: "width 0.2s ease, height 0.2s ease, background-color 0.2s ease, border-color 0.2s ease",
      }}
    >
      <div
        className="rounded-full mix-blend-difference"
        style={{
          width: active ? 44 : 26,
          height: active ? 44 : 26,
          border: `1.5px solid ${active ? "#CCFF00" : "#00F5FF"}`,
          backgroundColor: active ? "rgba(204,255,0,0.08)" : "rgba(0,245,255,0.04)",
          boxShadow: active
            ? "0 0 24px rgba(204,255,0,0.45)"
            : "0 0 16px rgba(0,245,255,0.25)",
        }}
      />
    </div>
  );
}