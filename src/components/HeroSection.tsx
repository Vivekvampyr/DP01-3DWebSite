"use client";

import { useLayoutEffect, useRef, useEffect } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textWrapperRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const title1Ref = useRef<HTMLSpanElement>(null);
  const title2Ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Intro massive zoom and blur
      gsap.fromTo(bgRef.current,
        { scale: 1.5, filter: "blur(20px)" },
        { scale: 1, filter: "blur(0px)", duration: 2.5, ease: "power4.out" }
      );

      // Intense text intro
      gsap.fromTo([title1Ref.current, title2Ref.current], 
        { y: 150, opacity: 0, rotateX: -90, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          scale: 1,
          duration: 1.8,
          stagger: 0.2,
          ease: "expo.out",
          delay: 0.5
        }
      );

      // Parallax scroll effect
      gsap.to(bgRef.current, {
        scale: 1.3,
        y: 200,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });
      
      // Text intense scroll effect (sinks and fades)
      gsap.to(textWrapperRef.current, {
        y: -150,
        scale: 0.8,
        filter: "blur(10px)",
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Mousemove Parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!textRef.current || !bgRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      
      gsap.to(textRef.current, { x: -x * 2, y: -y * 2, duration: 1, ease: "power2.out" });
      gsap.to(bgRef.current, { x: x, y: y, duration: 1, ease: "power2.out" });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black perspective-1000">
      {/* Background Image */}
      <div ref={bgRef} className="absolute inset-[-5%] w-[110%] h-[110%] z-0 opacity-70">
        <Image 
          src="/images/Warehouse Exterior.png" 
          alt="Warehouse Exterior" 
          fill 
          className="object-cover"
          priority
        />
        {/* Intense Cinematic gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/50 to-black/90"></div>
        {/* Vignette */}
        <div className="absolute inset-0" style={{ boxShadow: 'inset 0 0 150px rgba(0,0,0,0.9)' }}></div>
      </div>
      
      {/* Dynamic Floating Particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div 
          key={i} 
          className="particle"
          style={{
            left: `${(i * 17) % 100}%`,
            width: `${(i % 5) * 2 + 2}px`,
            height: `${(i % 5) * 2 + 2}px`,
            animationDuration: `${(i % 3) + 2}s`,
            animationDelay: `${(i % 4) * 0.5}s`
          }}
        ></div>
      ))}

      {/* Hero Typography */}
      <div ref={textWrapperRef} className="relative z-20 text-center container transform-style-3d">
        <h1 ref={textRef} className="text-7xl md:text-9xl font-black tracking-tighter leading-none drop-shadow-2xl flex flex-col items-center">
          <span ref={title1Ref} className="glitch-hover inline-block text-gradient-orange">DUNNAGE</span>
          <span ref={title2Ref} className="glitch-hover inline-block text-white opacity-90 text-6xl md:text-8xl mt-2">PALLET</span>
        </h1>
      </div>
    </section>
  );
}
