"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textWrapperRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Intro animation
      gsap.from(textRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        delay: 0.2
      });

      // Parallax scroll effect
      gsap.to(bgRef.current, {
        scale: 1.2,
        y: 150,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });
      
      // Text scroll effect
      gsap.to(textWrapperRef.current, {
        y: -100,
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

  return (
    <section ref={sectionRef} className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full z-0 opacity-60">
        <Image 
          src="/images/Warehouse Exterior.png" 
          alt="Warehouse Exterior" 
          fill 
          className="object-cover"
          priority
        />
        {/* Cinematic gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/90"></div>
      </div>
      
      {/* Dust/Fog particles overlay (CSS-based or simple image) */}
      <div className="absolute inset-0 z-10 opacity-20 mix-blend-screen pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,94,0,0.1) 0%, rgba(0,0,0,0) 70%)'}}></div>

      {/* Hero Typography */}
      <div ref={textWrapperRef} className="relative z-20 text-center container">
        <h1 ref={textRef} className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-gradient-orange leading-tight drop-shadow-2xl">
          DUNNAGE<br/>PALLET
        </h1>
      </div>
    </section>
  );
}
