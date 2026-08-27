const DUAL_PNG =
  "https://media.base44.com/images/public/6a8b6302491efeeebe4a946a/ae1ab562f_337shots_so.png";

export default function PhoneMockup() {
  return (
    <div className="relative flex items-center justify-center">
      {/* glow field behind */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(0,245,255,0.22), transparent 70%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[55%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]"
        style={{ background: "radial-gradient(circle, rgba(204,255,0,0.12), transparent 70%)" }}
      />

      {/* dual-phone render (transparent PNG) */}
      <img
        src={DUAL_PNG}
        alt="PepAlign dual-phone preview — Progress tracking and Active Protocols"
        className="w-[clamp(560px,86vw,1040px)] select-none drop-shadow-[0_60px_140px_rgba(0,245,255,0.28)]"
        style={{ height: "auto" }}
      />
    </div>
  );
}