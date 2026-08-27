export default function MonolithicFooter() {
  return (
    <footer className="relative w-full overflow-hidden bg-[#050505] pt-20">
      <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
        <div className="flex flex-col items-start justify-between gap-6 border-b border-[#1a1a1a] pb-10 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#CCFF00]" />
              <span
                className="text-[12px] uppercase tracking-[0.3em] text-[#A0A0A0]"
                style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
              >
                PepAlign
              </span>
            </div>
            <p className="mt-3 max-w-sm text-[0.95rem] leading-[1.6] text-[#A0A0A0]">
              The essential tracker for your personal protocols.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {[
              { label: "Privacy", href: "/privacy.html" },
              { label: "Terms", href: "/terms.html" },
              { label: "Contact", href: "mailto:support@pepalign.app" },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-[12px] uppercase tracking-[0.2em] text-[#A0A0A0] transition-colors hover:text-[#CCFF00]"
                style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Monolithic wordmark */}
      <div className="relative w-full select-none px-2 pb-0 pt-6">
        <h2
          aria-hidden="true"
          className="w-full text-center font-display font-bold uppercase leading-[0.8] text-transparent"
          style={{
            fontSize: "clamp(4rem, 22vw, 20rem)",
            letterSpacing: "-0.05em",
            WebkitTextStroke: "1px rgba(249,249,249,0.18)",
            transform: "translateY(18%)",
          }}
        >
          PepAlign
        </h2>
      </div>

      <div className="mx-auto w-full max-w-6xl px-6 pb-8 md:px-10">
        <p
          className="text-[10px] uppercase tracking-[0.25em] text-[#5a5a5a]"
          style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
        >
          © {new Date().getFullYear()} PepAlign — All rights reserved
        </p>
      </div>
    </footer>
  );
}
