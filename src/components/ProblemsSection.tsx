"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

const problems = [
  "Product Damage",
  "Unstable Storage",
  "Higher Logistics Cost",
  "Unsafe Transportation"
];

export default function ProblemsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLHeadingElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      textRefs.current.forEach((el, index) => {
        if (!el) return;
        gsap.fromTo(el,
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-32 bg-[#050000] overflow-hidden">
      {/* Background with dark red emergency lighting */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/Damaged Warehouse Problems.png" 
          alt="Damaged Warehouse" 
          fill 
          className="object-cover opacity-30 grayscale sepia hue-rotate-[-50deg] saturate-200"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a0000]/90 to-transparent"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      </div>

      <div className="container relative z-10">
        <div className="flex flex-col md:flex-row gap-16">
          <div className="md:w-1/2">
            <h2 className="text-red-500 font-bold tracking-widest text-sm mb-4 flex items-center">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse mr-3"></span>
              CRITICAL LOGISTICS ISSUES
            </h2>
            <h3 className="text-4xl md:text-5xl font-semibold text-white mb-12">
              THE COST OF <br/><span className="text-red-600">POOR STORAGE</span>
            </h3>

            <div className="space-y-8">
              {problems.map((problem, i) => (
                <div 
                  key={i} 
                  ref={(el) => { textRefs.current[i] = el; }}
                  className="flex items-center space-x-6 glass-panel p-6 rounded-xl border border-red-900/30 hover:border-red-500/50 transition-colors"
                >
                  <div className="text-red-500 font-bold text-2xl">0{i + 1}</div>
                  <h4 className="text-xl md:text-2xl font-medium text-gray-200">{problem}</h4>
                </div>
              ))}
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center items-center">
            {/* Additional visual for warning */}
            <div className="relative w-64 h-64 border-2 border-red-600/30 rounded-full flex items-center justify-center animate-[spin_10s_linear_infinite]">
              <div className="absolute inset-4 border border-red-500/20 rounded-full border-dashed"></div>
              <div className="absolute inset-0 flex items-center justify-center animate-[spin_10s_linear_infinite_reverse]">
                <span className="text-red-500 text-6xl opacity-50 font-black">!</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
