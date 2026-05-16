"use client";

import { useLayoutEffect, useRef, useState, MouseEvent } from "react";
import gsap from "gsap";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const products = [
  {
    id: 1,
    name: "DP-X1 Heavy Duty",
    spec: "Load: 3000kg | Material: HDPE",
    desc: "Engineered for maximum load capacity in extreme industrial environments.",
  },
  {
    id: 2,
    name: "DP-E2 Export Standard",
    spec: "Load: 1500kg | Material: PP",
    desc: "Lightweight yet durable, optimized for international shipping regulations.",
  },
  {
    id: 3,
    name: "DP-C3 Clean Room",
    spec: "Load: 2000kg | Material: Virgin HDPE",
    desc: "Smooth surface design preventing moisture and bacteria buildup.",
  }
];

function TiltCard({ product, index }: { product: any, index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);
  
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 150, scale: 0.8, rotateX: 45 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.2, type: "spring", stiffness: 50 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY }}
      className="glass-panel rounded-2xl overflow-hidden group cursor-pointer perspective-1000 transform-style-3d relative"
    >
      <div className="relative h-72 w-full bg-gradient-to-b from-[#1a1a1f] to-[#0a0a0c] overflow-hidden">
        {/* Dynamic Glare */}
        <motion.div 
          className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.4) 0%, transparent 60%)`,
            mixBlendMode: "overlay"
          }}
        />

        <Image 
          src="/images/Premium Dunnage Pallet Hero Render.png" 
          alt={product.name} 
          fill 
          className="object-cover opacity-80 mix-blend-screen group-hover:scale-125 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-black/60 group-hover:bg-black/20 transition-colors duration-500"></div>
        {/* Overlay Tech Lines */}
        <div className="absolute top-4 left-4 border-l-2 border-t-2 border-accent-orange/80 w-12 h-12 transition-all duration-300 group-hover:w-full group-hover:h-full group-hover:top-0 group-hover:left-0 group-hover:border-accent-orange/20"></div>
        <div className="absolute bottom-4 right-4 border-r-2 border-b-2 border-accent-orange/80 w-12 h-12 transition-all duration-300 group-hover:w-full group-hover:h-full group-hover:bottom-0 group-hover:right-0 group-hover:border-accent-orange/20"></div>
      </div>
      
      <div className="p-10 relative z-20 bg-gradient-to-t from-black via-black/90 to-transparent transform translate-y-[-20px] group-hover:translate-y-0 transition-transform duration-500">
        <div className="text-accent-orange font-mono text-sm mb-3 opacity-90 tracking-widest">{product.spec}</div>
        <h3 className="text-3xl font-black text-white mb-4 uppercase">{product.name}</h3>
        <p className="text-gray-400 text-base leading-relaxed mb-8">{product.desc}</p>
        
        <div className="flex items-center justify-between text-white text-sm font-bold tracking-widest group-hover:text-accent-orange transition-colors uppercase">
          <span>Explore Specs</span>
          <motion.div 
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-accent-orange bg-white/5"
            whileHover={{ scale: 1.2, x: 5 }}
          >
            →
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProductShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current, 
        { y: 100, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-40 bg-[#0a0a0c] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-orange/5 via-black to-black opacity-50 pointer-events-none"></div>

      <div className="container relative z-10">
        <div ref={headerRef} className="text-center mb-24">
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-6 uppercase drop-shadow-2xl">
            PRODUCT <span className="text-gray-600 glitch-hover inline-block">LINEUP</span>
          </h2>
          <div className="w-24 h-2 bg-accent-orange mx-auto shadow-[0_0_20px_rgba(255,94,0,0.8)]"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 perspective-1000">
          {products.map((product, i) => (
            <TiltCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
