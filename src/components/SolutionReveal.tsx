"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import { Canvas } from "@react-three/fiber";
import { Environment, Float, ContactShadows } from "@react-three/drei";
import DunnagePallet3D from "./DunnagePallet3D";

const features = [
  "Heavy Load Capacity",
  "Moisture Resistant",
  "Durable",
  "Reusable",
  "Export Friendly",
  "Cost Efficient"
];

export default function SolutionReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Background transition from dark to light
      gsap.to(sectionRef.current, {
        backgroundColor: "#16161a",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
          end: "top 20%",
          scrub: true,
        }
      });

      // Title reveal
      gsap.fromTo(titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Feature cards stagger
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(card,
          { y: 30, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            delay: i * 0.1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 40%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen py-32 bg-[#050000] overflow-hidden flex flex-col items-center">
      <div className="absolute inset-0 z-0 opacity-10 mix-blend-screen pointer-events-none">
        <Image 
          src="/images/Organized Warehouse Solution.png" 
          alt="Clean Organized Warehouse" 
          fill 
          className="object-cover grayscale"
        />
      </div>

      <div className="container relative z-10 text-center mb-16">
        <h2 ref={titleRef} className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
          THE <span className="text-gradient-orange">SOLUTION</span>
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Engineered for perfection. Built for endurance. 
          Discover the premium dunnage pallet that redefines logistics.
        </p>
      </div>

      <div className="relative w-full flex-grow flex items-center justify-center min-h-[600px] z-10">
        {/* 3D Canvas */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <Canvas camera={{ position: [0, 2, 8], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
            <Environment preset="studio" />
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
              <DunnagePallet3D />
            </Float>
            <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={2} far={4} />
          </Canvas>
        </div>

        {/* Feature Cards Around the Model */}
        <div className="container relative w-full h-full flex items-center justify-between pointer-events-none">
           <div className="flex flex-col gap-12 pointer-events-auto">
             {features.slice(0, 3).map((feature, i) => (
               <div key={i} ref={(el) => { cardsRef.current[i] = el; }} className="glass-panel p-6 rounded-lg w-48 md:w-64 backdrop-blur-xl border-l-4 border-l-accent-orange transform hover:scale-105 transition-transform">
                 <h4 className="text-white font-semibold text-lg">{feature}</h4>
               </div>
             ))}
           </div>
           <div className="flex flex-col gap-12 pointer-events-auto text-right">
             {features.slice(3, 6).map((feature, i) => (
               <div key={i+3} ref={(el) => { cardsRef.current[i+3] = el; }} className="glass-panel p-6 rounded-lg w-48 md:w-64 backdrop-blur-xl border-r-4 border-r-accent-orange transform hover:scale-105 transition-transform">
                 <h4 className="text-white font-semibold text-lg">{feature}</h4>
               </div>
             ))}
           </div>
        </div>
      </div>
    </section>
  );
}
