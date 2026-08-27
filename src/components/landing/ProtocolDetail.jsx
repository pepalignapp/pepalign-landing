import { Bell, BookOpen, LineChart, ShieldCheck } from "lucide-react";

const modules = [
  {
    icon: Bell,
    label: "Log & Remind",
    title: "Never miss a dose.",
    desc: "Easily track your schedule and get reminders to stay perfectly consistent.",
    accent: "#CCFF00",
    span: "md:col-span-2",
  },
  {
    icon: LineChart,
    label: "Visualize Progress",
    title: "See changes the scale misses.",
    desc: "Monitor your journey over time with clear, visual data charts that map your true progress.",
    accent: "#00F5FF",
    span: "",
  },
  {
    icon: BookOpen,
    label: "Reference Library",
    title: "Understand your compounds.",
    desc: "Access an integrated library to read, learn, and reference details about your stack.",
    accent: "#00F5FF",
    span: "",
  },
  {
    icon: ShieldCheck,
    label: "Private & Secure",
    title: "Encrypted by default.",
    desc: "Your logs and personal data are strictly yours. Track securely with complete peace of mind.",
    accent: "#CCFF00",
    span: "md:col-span-2",
  },
];

export default function ProtocolDetail() {
  return (
    <section className="relative w-full overflow-hidden bg-[#050505] py-28 md:py-40">
      <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
        <div className="mb-14 max-w-2xl">
          <span
            className="text-[11px] uppercase tracking-[0.3em] text-[#00F5FF]"
            style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
          >
            // Protocol Tracker
          </span>
          <h2
            className="mt-4 font-display font-bold uppercase leading-[0.95] text-[#F9F9F9]"
            style={{ fontSize: "clamp(2rem, 5.5vw, 4rem)", letterSpacing: "-0.04em" }}
          >
            Built for <span className="text-[#CCFF00]">simplicity.</span>
          </h2>
          <p className="mt-4 text-[1.0625rem] leading-[1.6] text-[#A0A0A0]">
            A clean, intuitive tracker designed to make logging your protocols effortless.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {modules.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.label}
                className={`group relative overflow-hidden rounded-xl border border-[#1a1a1a] bg-[#0c0c0c] p-7 transition-colors hover:border-[#2a2a2a] ${m.span}`}
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: `radial-gradient(circle, ${m.accent}33, transparent 70%)` }}
                />
                <div className="relative flex items-center gap-3">
                  <Icon size={18} style={{ color: m.accent }} />
                  <span
                    className="text-[11px] uppercase tracking-[0.25em] text-[#A0A0A0]"
                    style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
                  >
                    {m.label}
                  </span>
                </div>
                <h3 className="relative mt-5 text-[1.35rem] font-semibold leading-tight text-[#F9F9F9]">
                  {m.title}
                </h3>
                <p className="relative mt-3 text-[0.95rem] leading-[1.6] text-[#A0A0A0]">
                  {m.desc}
                </p>
                <div
                  className="relative mt-6 h-px w-full"
                  style={{ background: `linear-gradient(to right, ${m.accent}66, transparent)` }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}