import { useEffect, useRef, useState } from "react";
import PhoneMockup from "./PhoneMockup";
import MicroGrid from "./MicroGrid";

export default function Hero() {
  const ref = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const parallax = Math.min(scrollY * 0.5, 400);

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] w-full overflow-hidden bg-[#050505]"
    >
      <MicroGrid />

      {/* Gaussian depth orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(0,245,255,0.18), transparent 70%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[40vh] w-[40vh] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]"
        style={{ background: "radial-gradient(circle, rgba(204,255,0,0.10), transparent 70%)" }}
      />

      {/* Top headline */}
      <div className="relative z-10 px-6 pt-[7vh] text-center md:px-10 md:pt-[9vh]">
        <div
          className="mx-auto mb-6 flex w-fit items-center gap-2 border border-[#1f1f1f] bg-[#0c0c0c] px-3 py-1.5"
          style={{ transitionDelay: "0.1s" }}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#CCFF00] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#CCFF00]" />
          </span>
          <span
            className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#A0A0A0]"
            style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
          >
            System Status: Pre-Launch
          </span>
        </div>

        <h1
          className="font-display font-bold uppercase leading-[0.92] text-[#F9F9F9]"
          style={{
            fontSize: "clamp(2.6rem, 8vw, 7.5rem)",
            letterSpacing: "-0.05em",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.9s ease, transform 0.9s ease",
          }}
        >
          TRACK, UNDERSTAND,
          <br />
          <span className="text-[#CCFF00]">THRIVE.</span>
        </h1>
      </div>

      {/* Floating iPhone mockup */}
      <div className="relative z-10 flex justify-center px-6 py-10 md:py-14">
        <div
          style={{
            transform: `translateY(${parallax * -0.5}px) scale(${mounted ? 1 : 0.95})`,
            transition: "transform 1.1s cubic-bezier(0.16,1,0.3,1)",
          }}
          className="relative"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 scale-110 rounded-[3rem] blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(0,245,255,0.25), transparent 70%)" }}
          />
          <PhoneMockup />
        </div>
      </div>

      {/* Bottom subheadline */}
      <div className="relative z-10 px-6 pb-[8vh] text-center md:px-10">
        <p className="mx-auto max-w-xl text-[1.0625rem] leading-[1.6] text-[#A0A0A0] md:text-[1.125rem]">
          The premium tracker for your complete peptide stack. Log doses,
          monitor cycles, and perfectly organize your protocols.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <span
            className="text-[11px] uppercase tracking-[0.25em] text-[#5a5a5a]"
            style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
          >
            Protocol ID: P-01
          </span>
          <span className="h-px w-10 bg-[#1f1f1f]" />
          <span
            className="text-[11px] uppercase tracking-[0.25em] text-[#00F5FF]"
            style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
          >
            iOS · Coming Soon
          </span>
        </div>
      </div>
    </section>
  );
}