"use client";

import { useLayoutEffect, useRef, useEffect, useState } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function EnteringWarehouse() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [matrixText, setMatrixText] = useState("INITIALIZING...");

  useEffect(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
    const interval = setInterval(() => {
      let result = "";
      for (let i = 0; i < 15; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      setMatrixText(result);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Violent swoop in
      gsap.fromTo(contentRef.current, 
        { y: 250, opacity: 0, scale: 0.9, rotateX: 45 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          rotateX: 0,
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "top 30%",
            scrub: 1,
          }
        }
      );

      // Extreme background parallax
      gsap.to(imageRef.current, {
        y: -200,
        scale: 1.15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-40 lg:py-64 bg-black flex items-center justify-center overflow-hidden perspective-1000">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div ref={imageRef} className="absolute inset-[-20%] w-[140%] h-[140%] opacity-30">
          <Image 
            src="/images/Premium Dunnage Pallet Hero Render.png" 
            alt="Inside Warehouse" 
            fill 
            className="object-cover blur-[8px] grayscale contrast-150"
          />
          <div className="absolute inset-0 bg-[#0a0a0c]/90 mix-blend-multiply"></div>
          {/* Intense vignette */}
          <div className="absolute inset-0" style={{ boxShadow: 'inset 0 0 200px rgba(0,0,0,1)' }}></div>
        </div>
      </div>

      <div ref={contentRef} className="container relative z-10 grid grid-cols-1 md:grid-cols-2 gap-20 items-center transform-style-3d">
        <div>
          <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter text-white uppercase drop-shadow-2xl">
            ENTERING THE<br/>
            <span className="text-accent-orange glitch-hover inline-block">WAREHOUSE</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 max-w-lg leading-relaxed font-medium">
            Step into the modern industrial logistics environment. Where efficiency meets absolute robust engineering. 
            Experience the heavy-duty foundation of world-class supply chains.
          </p>
          <div className="w-32 h-2 bg-accent-orange mt-12 shadow-[0_0_30px_rgba(255,94,0,1)] relative overflow-hidden">
             <div className="absolute top-0 bottom-0 left-0 w-8 bg-white/50 animate-[translate_2s_linear_infinite]" style={{ transform: 'skewX(-45deg)' }}></div>
          </div>
        </div>
        
        <div className="hidden md:flex justify-end glass-panel p-10 rounded-2xl relative shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-accent-orange/20">
           <div className="absolute inset-0 border border-white/10 rounded-2xl animate-pulse"></div>
           
           <div className="w-full h-full flex flex-col justify-between">
             <p className="text-sm uppercase tracking-widest text-accent-orange font-mono mb-10">SYSTEM OVERRIDE</p>
             <div className="h-24 overflow-hidden flex items-start">
               <h3 className="text-3xl font-mono text-white opacity-80 break-all leading-tight tracking-widest text-shadow-[0_0_10px_white]">
                 {matrixText}
               </h3>
             </div>
             
             {/* Decorative elements representing sound/data bars */}
             <div className="absolute bottom-10 right-10 flex items-end space-x-3 h-24">
               {[40, 70, 30, 90, 50, 80, 20].map((h, i) => (
                 <div 
                   key={i} 
                   className="w-3 bg-accent-orange rounded-t-sm" 
                   style={{ 
                     height: `${h}%`, 
                     opacity: 0.5 + (h / 200),
                     animation: `pulse ${1 + (i % 3) * 0.5}s infinite alternate`
                   }}
                 ></div>
               ))}
             </div>
           </div>
        </div>
      </div>
    </section>
  );
}
