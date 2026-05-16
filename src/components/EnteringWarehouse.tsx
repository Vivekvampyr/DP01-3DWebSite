"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function EnteringWarehouse() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current, 
        { y: 150, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "top 30%",
            scrub: 1,
          }
        }
      );

      gsap.to(imageRef.current, {
        y: -100,
        scale: 1.05,
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
    <section ref={sectionRef} className="relative w-full py-32 lg:py-64 bg-black flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div ref={imageRef} className="absolute inset-[-10%] w-[120%] h-[120%] opacity-20">
          <Image 
            src="/images/Premium Dunnage Pallet Hero Render.png" 
            alt="Inside Warehouse" 
            fill 
            className="object-cover blur-sm"
          />
          <div className="absolute inset-0 bg-[#0a0a0c]/80 mix-blend-multiply"></div>
        </div>
      </div>

      <div ref={contentRef} className="container relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl md:text-6xl font-semibold mb-6 tracking-wide text-white">
            ENTERING THE<br/>
            <span className="text-accent-orange">WAREHOUSE</span>
          </h2>
          <p className="text-lg md:text-xl text-text-muted max-w-lg leading-relaxed">
            Step into the modern industrial logistics environment. Where efficiency meets robust engineering. 
            Experience the foundation of world-class supply chains.
          </p>
          <div className="w-24 h-1 bg-accent-orange mt-10 shadow-[0_0_15px_rgba(255,94,0,0.8)]"></div>
        </div>
        
        <div className="hidden md:flex justify-end glass-panel p-8 rounded-2xl relative">
           <div className="absolute inset-0 border border-white/5 rounded-2xl"></div>
           <p className="text-sm uppercase tracking-widest text-text-muted">Logistics Data</p>
           {/* Decorative elements representing sound/data bars */}
           <div className="absolute bottom-8 right-8 flex items-end space-x-2 h-16">
             {[40, 70, 30, 90, 50].map((h, i) => (
               <div key={i} className="w-2 bg-accent-orange rounded-t-sm" style={{ height: `${h}%`, opacity: 0.5 + (h / 200) }}></div>
             ))}
           </div>
        </div>
      </div>
    </section>
  );
}
