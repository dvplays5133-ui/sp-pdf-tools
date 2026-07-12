import CTA from "@/components/CTA";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ToolGrid from "@/components/ToolGrid";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <ToolGrid />
      <Features />
      <CTA />
      <Footer />
    </main>
  );
}