import CustomCursor from "@/components/landing/CustomCursor";
import Hero from "@/components/landing/Hero";
import CommandCenter from "@/components/landing/CommandCenter";
import ProtocolDetail from "@/components/landing/ProtocolDetail";
import MonolithicFooter from "@/components/landing/MonolithicFooter";

export default function Landing() {
  return (
    <main className="min-h-screen w-full bg-[#050505] text-[#F9F9F9] antialiased">
      <CustomCursor />
      <Hero />
      <CommandCenter />
      <ProtocolDetail />
      <MonolithicFooter />
    </main>
  );
}