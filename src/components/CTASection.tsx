"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(formRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-32 bg-black flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/Warehouse Exterior.png" 
          alt="Warehouse Exterior" 
          fill 
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-black/80 to-transparent"></div>
      </div>

      <div className="container relative z-10 flex flex-col items-center">
        <div className="text-center mb-16 max-w-3xl">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6 uppercase">
            Upgrade Your <br/>
            <span className="text-gradient-orange">Warehouse Logistics</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl">
            Request a quote or consultation with our industrial storage experts today.
          </p>
        </div>

        <div ref={formRef} className="w-full max-w-2xl glass-panel p-8 md:p-12 rounded-2xl relative">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent-orange/20 blur-[50px] rounded-full pointer-events-none"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 blur-[50px] rounded-full pointer-events-none"></div>

          <form className="relative z-10 flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold">Name</label>
                <input 
                  type="text" 
                  className="bg-[#111115] border border-white/10 rounded-md p-4 text-white focus:outline-none focus:border-accent-orange transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold">Company</label>
                <input 
                  type="text" 
                  className="bg-[#111115] border border-white/10 rounded-md p-4 text-white focus:outline-none focus:border-accent-orange transition-colors"
                  placeholder="Logistics Inc."
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold">Email</label>
              <input 
                type="email" 
                className="bg-[#111115] border border-white/10 rounded-md p-4 text-white focus:outline-none focus:border-accent-orange transition-colors"
                placeholder="john@example.com"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold">Message</label>
              <textarea 
                rows={4}
                className="bg-[#111115] border border-white/10 rounded-md p-4 text-white focus:outline-none focus:border-accent-orange transition-colors resize-none"
                placeholder="Tell us about your requirements..."
              ></textarea>
            </div>

            <button type="submit" className="btn-primary mt-4 w-full md:w-auto self-end">
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
