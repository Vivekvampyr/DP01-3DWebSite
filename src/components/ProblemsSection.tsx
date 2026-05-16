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
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const warningIconRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Intense text stagger with x/y shake
      textRefs.current.forEach((el, index) => {
        if (!el) return;
        gsap.fromTo(el,
          { x: -100, opacity: 0, rotateY: 45, scale: 0.8 },
          {
            x: 0,
            opacity: 1,
            rotateY: 0,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // Crazy shaking warning icon
      gsap.to(warningIconRef.current, {
        x: "random(-8, 8)",
        y: "random(-8, 8)",
        duration: 0.08,
        repeat: -1,
        repeatRefresh: true,
        ease: "none"
      });

      // Background flash/pulse scale
      gsap.to(bgRef.current, {
        scale: 1.1,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-40 bg-[#050000] overflow-hidden perspective-1000">
      {/* Background with dark red emergency lighting and strobe effect */}
      <div className="absolute inset-0 z-0 animate-strobe opacity-50"></div>
      
      <div ref={bgRef} className="absolute inset-[-5%] w-[110%] h-[110%] z-0">
        <Image 
          src="/images/Damaged Warehouse Problems.png" 
          alt="Damaged Warehouse" 
          fill 
          className="object-cover opacity-30 grayscale sepia hue-rotate-[-50deg] saturate-200"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a0000]/90 to-transparent"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>
      </div>

      <div className="container relative z-10">
        <div className="flex flex-col md:flex-row gap-16">
          <div className="md:w-1/2">
            <h2 className="text-red-500 font-bold tracking-widest text-sm mb-4 flex items-center">
              <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse mr-3 shadow-[0_0_10px_red]"></span>
              CRITICAL LOGISTICS ISSUES
            </h2>
            <h3 className="text-5xl md:text-7xl font-black text-white mb-12 uppercase leading-none drop-shadow-2xl">
              THE COST OF <br/><span className="text-red-600 glitch-hover inline-block">POOR STORAGE</span>
            </h3>

            <div className="space-y-8">
              {problems.map((problem, i) => (
                <div 
                  key={i} 
                  ref={(el) => { textRefs.current[i] = el; }}
                  className="flex items-center space-x-6 glass-panel p-6 rounded-xl border border-red-900/50 hover:bg-red-900/20 transition-colors transform-style-3d cursor-crosshair"
                >
                  <div className="text-red-600 font-black text-4xl drop-shadow-[0_0_10px_rgba(220,38,38,0.8)]">0{i + 1}</div>
                  <h4 className="text-2xl font-bold text-gray-100 uppercase tracking-wide">{problem}</h4>
                </div>
              ))}
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center items-center">
            {/* Intensive Warning Visual */}
            <div ref={warningIconRef} className="relative w-80 h-80 flex items-center justify-center pointer-events-none">
              <div className="absolute inset-0 border-4 border-red-600/50 rounded-full animate-[spin_4s_linear_infinite] mix-blend-screen"></div>
              <div className="absolute inset-4 border-2 border-red-500/30 rounded-full border-dashed animate-[spin_3s_linear_infinite_reverse]"></div>
              <div className="absolute inset-8 border border-red-400/20 rounded-full animate-[spin_5s_linear_infinite]"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-red-600 text-9xl font-black drop-shadow-[0_0_30px_red] mix-blend-screen animate-pulse">!</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
