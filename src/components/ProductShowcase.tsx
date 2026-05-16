"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import { motion } from "framer-motion";

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

export default function ProductShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-32 bg-[#0a0a0c]">
      <div className="container relative z-10">
        <div ref={headerRef} className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">
            PRODUCT <span className="text-gray-500">LINEUP</span>
          </h2>
          <div className="w-16 h-1 bg-white mx-auto opacity-20"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, i) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              whileHover={{ y: -10 }}
              className="glass-panel rounded-2xl overflow-hidden group cursor-pointer"
            >
              <div className="relative h-64 w-full bg-gradient-to-b from-[#1a1a1f] to-[#0a0a0c] overflow-hidden">
                <Image 
                  src="/images/Premium Dunnage Pallet Hero Render.png" 
                  alt={product.name} 
                  fill 
                  className="object-cover opacity-80 mix-blend-screen group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500"></div>
                {/* Overlay Tech Lines */}
                <div className="absolute top-4 left-4 border-l-2 border-t-2 border-accent-orange/50 w-8 h-8"></div>
                <div className="absolute bottom-4 right-4 border-r-2 border-b-2 border-accent-orange/50 w-8 h-8"></div>
              </div>
              
              <div className="p-8">
                <div className="text-accent-orange font-mono text-sm mb-2 opacity-80">{product.spec}</div>
                <h3 className="text-2xl font-bold text-white mb-4">{product.name}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">{product.desc}</p>
                
                <div className="flex items-center text-white text-sm font-semibold tracking-wider group-hover:text-accent-orange transition-colors">
                  EXPLORE SPECS 
                  <motion.span 
                    className="ml-2"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                  >→</motion.span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
