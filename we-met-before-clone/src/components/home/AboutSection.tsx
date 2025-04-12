"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const secondTitleRef = useRef<HTMLHeadingElement>(null);
  const secondTextRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Create animations for the section elements as they come into view
    gsap.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      textRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      secondTitleRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: secondTitleRef.current,
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      secondTextRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
        scrollTrigger: {
          trigger: secondTextRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="about-section py-20 md:py-32 bg-black text-white"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          <div>
            <h2
              ref={titleRef}
              className="text-3xl md:text-4xl lg:text-5xl font-medium mb-6"
            >
              Who we are
            </h2>
            <p
              ref={textRef}
              className="text-lg md:text-xl opacity-80 leading-relaxed"
            >
              We are a digital-focused Amsterdam-based studio. Our multidisciplinary team of freelancers and an A.I. multiplies creative results and helps brands flourish.
            </p>
          </div>

          <div>
            <h2
              ref={secondTitleRef}
              className="text-3xl md:text-4xl lg:text-5xl font-medium mb-6"
            >
              We believe in co-creating
            </h2>
            <p
              ref={secondTextRef}
              className="text-lg md:text-xl opacity-80 leading-relaxed"
            >
              The new game is co-creation, which - in our case - can be broken down into three phases: Branding, Design, and Development.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
