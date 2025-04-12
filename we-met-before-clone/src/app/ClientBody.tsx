"use client";

import { useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorFollowerPosition, setCursorFollowerPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  // Initialize smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    // Integrate with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Handle resize events
    const resize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", resize);

    // Clean up on unmount
    return () => {
      lenis.destroy();
      window.removeEventListener("resize", resize);
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  // Custom cursor effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });

      // Delayed follower position
      setTimeout(() => {
        setCursorFollowerPosition({ x: e.clientX, y: e.clientY });
      }, 70);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' ||
          target.closest('a') || target.closest('button') ||
          target.dataset.cursor === 'pointer') {
        setIsPointer(true);
      }
    };

    const handleMouseOut = () => {
      setIsPointer(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <body suppressHydrationWarning className="antialiased bg-black text-white">
      <div
        className="cursor"
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
          width: isPointer ? '50px' : '20px',
          height: isPointer ? '50px' : '20px',
        }}
      />
      <div
        className="cursor-follower"
        style={{
          left: `${cursorFollowerPosition.x}px`,
          top: `${cursorFollowerPosition.y}px`,
        }}
      />
      <div className="smooth-scroll">{children}</div>
    </body>
  );
}
