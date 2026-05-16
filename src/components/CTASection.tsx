"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Dramatic title entrance
      gsap.fromTo(titleRef.current, 
        { y: 100, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          }
        }
      );

      // Form floating in from 3D space
      gsap.fromTo(formRef.current, {
        y: 200,
        opacity: 0,
        rotateX: -30,
        scale: 0.9,
      }, {
        y: 0,
        opacity: 1,
        rotateX: 0,
        scale: 1,
        duration: 1.5,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-40 bg-black flex items-center justify-center overflow-hidden perspective-1000">
      {/* Intense Cinematic Background */}
      <div className="absolute inset-[-10%] z-0 animate-[pulse_10s_ease-in-out_infinite]">
        <Image 
          src="/images/Warehouse Exterior.png" 
          alt="Warehouse Exterior" 
          fill 
          className="object-cover opacity-30 grayscale blur-[4px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-black/80 to-transparent"></div>
        {/* Core glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,94,0,0.15)_0%,_transparent_60%)]"></div>
      </div>

      <div className="container relative z-10 flex flex-col items-center transform-style-3d">
        <div className="text-center mb-20 max-w-4xl">
          <h2 ref={titleRef} className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-6 uppercase drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            Upgrade Your <br/>
            <span className="text-gradient-orange glitch-hover inline-block">Warehouse Logistics</span>
          </h2>
          <p className="text-gray-300 text-xl md:text-2xl font-medium max-w-2xl mx-auto">
            Request a quote or consultation with our industrial storage experts today. Pushing the boundaries of efficiency.
          </p>
        </div>

        <div ref={formRef} className="w-full max-w-3xl glass-panel p-10 md:p-16 rounded-3xl relative shadow-[0_0_50px_rgba(255,94,0,0.1)] border border-white/10 hover:border-accent-orange/30 transition-colors duration-500">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent-orange/20 blur-[80px] rounded-full pointer-events-none animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 blur-[80px] rounded-full pointer-events-none animate-pulse" style={{ animationDelay: '1s' }}></div>

          <form className="relative z-10 flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-3">
                <label className="text-sm uppercase tracking-widest text-gray-200 font-bold">Name</label>
                <input 
                  type="text" 
                  className="glow-input bg-[#0a0a0c] border border-white/20 rounded-lg p-5 text-white text-lg focus:outline-none focus:border-accent-orange transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-sm uppercase tracking-widest text-gray-200 font-bold">Company</label>
                <input 
                  type="text" 
                  className="glow-input bg-[#0a0a0c] border border-white/20 rounded-lg p-5 text-white text-lg focus:outline-none focus:border-accent-orange transition-all"
                  placeholder="Logistics Inc."
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-3">
              <label className="text-sm uppercase tracking-widest text-gray-200 font-bold">Email</label>
              <input 
                type="email" 
                className="glow-input bg-[#0a0a0c] border border-white/20 rounded-lg p-5 text-white text-lg focus:outline-none focus:border-accent-orange transition-all"
                placeholder="john@example.com"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-sm uppercase tracking-widest text-gray-200 font-bold">Message</label>
              <textarea 
                rows={5}
                className="glow-input bg-[#0a0a0c] border border-white/20 rounded-lg p-5 text-white text-lg focus:outline-none focus:border-accent-orange transition-all resize-none"
                placeholder="Tell us about your requirements..."
              ></textarea>
            </div>

            <button type="submit" className="btn-primary mt-6 w-full md:w-auto self-end text-lg py-5 px-10 rounded-lg relative overflow-hidden group">
              <span className="relative z-10">SUBMIT TRANSMISSION</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
