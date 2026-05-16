"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, ContactShadows, Sparkles } from "@react-three/drei";
import DunnagePallet3D from "./DunnagePallet3D";

const features = [
  "Heavy Load Capacity",
  "Moisture Resistant",
  "Durable",
  "Reusable",
  "Export Friendly",
  "Cost Efficient"
];

// A component to rotate the entire scene based on time for an epic feel
function SceneRig() {
  useFrame((state) => {
    state.camera.position.x = Math.sin(state.clock.elapsedTime * 0.1) * 2;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function SolutionReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Intense background flash to white then to dark
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
          end: "top 20%",
          scrub: true,
        }
      });
      tl.to(sectionRef.current, { backgroundColor: "#ffffff", duration: 0.1 })
        .to(sectionRef.current, { backgroundColor: "#0a0a0c", duration: 0.9 });

      // Dramatic title swoop
      gsap.fromTo(titleRef.current,
        { y: 150, opacity: 0, scale: 0.5, rotateX: 90 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotateX: 0,
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Extreme 3D card fly-in
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const isLeft = i < 3;
        gsap.fromTo(card,
          { 
            x: isLeft ? -300 : 300, 
            y: Math.random() * 200 - 100,
            opacity: 0, 
            rotateY: isLeft ? -90 : 90,
            rotateZ: Math.random() * 45 - 22.5,
            scale: 0
          },
          {
            x: 0,
            y: 0,
            opacity: 1,
            rotateY: 0,
            rotateZ: 0,
            scale: 1,
            duration: 1.2,
            delay: i * 0.1,
            ease: "back.out(1.5)",
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
    <section ref={sectionRef} className="relative w-full min-h-screen py-32 bg-[#050000] overflow-hidden flex flex-col items-center perspective-1000">
      <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
        <Image 
          src="/images/Organized Warehouse Solution.png" 
          alt="Clean Organized Warehouse" 
          fill 
          className="object-cover grayscale blur-[2px]"
        />
      </div>

      <div className="container relative z-10 text-center mb-16 transform-style-3d">
        <h2 ref={titleRef} className="text-6xl md:text-8xl font-black tracking-tight text-white mb-6 uppercase drop-shadow-2xl">
          THE <span className="text-gradient-orange glitch-hover inline-block">SOLUTION</span>
        </h2>
        <p className="text-2xl text-gray-400 max-w-3xl mx-auto font-medium">
          Engineered for perfection. Built for endurance. 
          Discover the premium dunnage pallet that redefines logistics.
        </p>
      </div>

      <div className="relative w-full flex-grow flex items-center justify-center min-h-[700px] z-10">
        {/* 3D Canvas with insane details */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <Canvas camera={{ position: [0, 3, 10], fov: 35 }}>
            <ambientLight intensity={0.2} />
            <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} intensity={2} castShadow color="#ff5e00" />
            <spotLight position={[-10, 10, -10]} angle={0.2} penumbra={1} intensity={1} castShadow color="#ffffff" />
            <Environment preset="studio" />
            <SceneRig />
            
            <Float speed={3} rotationIntensity={1} floatIntensity={2}>
              <DunnagePallet3D />
            </Float>
            
            {/* Awesome glowing particles */}
            <Sparkles count={200} scale={12} size={4} speed={0.4} opacity={0.5} color="#ff5e00" />
            
            <ContactShadows position={[0, -2.5, 0]} opacity={0.7} scale={15} blur={2.5} far={4} color="#000000" />
          </Canvas>
        </div>

        {/* Feature Cards Around the Model */}
        <div className="container relative w-full h-full flex items-center justify-between pointer-events-none z-20">
           <div className="flex flex-col gap-16 pointer-events-auto perspective-1000">
             {features.slice(0, 3).map((feature, i) => (
               <div key={i} ref={(el) => { cardsRef.current[i] = el; }} className="glass-panel p-6 md:p-8 rounded-xl w-56 md:w-80 backdrop-blur-xl border-l-4 border-l-accent-orange transform transition-transform duration-500 hover:scale-110 hover:border-l-8 hover:bg-black/60 shadow-[0_0_20px_rgba(255,94,0,0.1)]">
                 <h4 className="text-white font-bold text-xl uppercase tracking-wider">{feature}</h4>
               </div>
             ))}
           </div>
           <div className="flex flex-col gap-16 pointer-events-auto perspective-1000 text-right">
             {features.slice(3, 6).map((feature, i) => (
               <div key={i+3} ref={(el) => { cardsRef.current[i+3] = el; }} className="glass-panel p-6 md:p-8 rounded-xl w-56 md:w-80 backdrop-blur-xl border-r-4 border-r-accent-orange transform transition-transform duration-500 hover:scale-110 hover:border-r-8 hover:bg-black/60 shadow-[0_0_20px_rgba(255,94,0,0.1)]">
                 <h4 className="text-white font-bold text-xl uppercase tracking-wider">{feature}</h4>
               </div>
             ))}
           </div>
        </div>
      </div>
    </section>
  );
}
