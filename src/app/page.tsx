"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSection from "@/components/HeroSection";
import EnteringWarehouse from "@/components/EnteringWarehouse";
import ProblemsSection from "@/components/ProblemsSection";
import SolutionReveal from "@/components/SolutionReveal";
import ProductShowcase from "@/components/ProductShowcase";
import CTASection from "@/components/CTASection";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Basic GSAP context setup
    const ctx = gsap.context(() => {
      // Global scroll animations can be defined here
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="relative w-full overflow-hidden">
      <HeroSection />
      <EnteringWarehouse />
      <ProblemsSection />
      <SolutionReveal />
      <ProductShowcase />
      <CTASection />
    </main>
  );
}
