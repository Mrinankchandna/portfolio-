"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const headImageRef = useRef<HTMLDivElement>(null);
  const astroidImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    // Initialize timeline
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Animate the main title
    tl.fromTo(
      titleRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, delay: 0.5 }
    )
      // Animate the subtitle
      .fromTo(
        subtitleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.8" // Overlap with the previous animation
      )
      // Animate the head image
      .fromTo(
        headImageRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2 },
        "-=0.8"
      )
      // Animate the asteroid image
      .fromTo(
        astroidImageRef.current,
        { scale: 0.8, rotation: -10, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 1, duration: 1.2 },
        "-=1"
      );

    // Create floating animation for the images
    gsap.to(headImageRef.current, {
      y: 20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(astroidImageRef.current, {
      y: -15,
      rotation: 5,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Scroll animation for parallax effect
    gsap.to(".hero-parallax", {
      y: (i, el) => -parseFloat(el.getAttribute("data-speed") || "0") * 100,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <section
      ref={heroRef}
      className="hero-section min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div
        ref={headImageRef}
        className="absolute top-1/2 right-5 md:right-20 transform -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 hero-parallax"
        data-speed="0.2"
      >
        <Image
          src="/assets/images/hero_head.png"
          alt="We Met Before Head"
          fill
          className="object-contain"
          priority
        />
      </div>

      <div
        ref={astroidImageRef}
        className="absolute top-1/3 left-10 md:left-20 lg:left-40 w-40 h-40 md:w-56 md:h-56 hero-parallax"
        data-speed="0.4"
      >
        <Image
          src="/assets/images/hero_astroid.png"
          alt="We Met Before Astroid"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Main content */}
      <div className="container mx-auto px-6 py-20 z-10">
        <div className="max-w-4xl mx-auto">
          <h1
            ref={titleRef}
            className="text-5xl md:text-7xl lg:text-8xl font-medium mb-8 tracking-tight"
          >
            Digital Design & Development Studio
          </h1>
          <h2
            ref={subtitleRef}
            className="text-xl md:text-2xl lg:text-3xl font-normal max-w-2xl opacity-90"
          >
            We are a digital-focused Amsterdam-based studio. Our multidisciplinary team of freelancers and an A.I. multiplies creative results and helps brands flourish.
          </h2>
        </div>
      </div>
    </section>
  );
}
