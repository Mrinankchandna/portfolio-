"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Animate the header on load
    gsap.fromTo(
      ".header",
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
    );
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);

    if (!isMenuOpen) {
      // Open animation
      gsap.to(".menu-overlay", {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
        pointerEvents: "all",
      });

      // Animate menu links
      gsap.fromTo(
        ".menu-link",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
          delay: 0.2,
        }
      );
    } else {
      // Close animation
      gsap.to(".menu-overlay", {
        y: "-100%",
        opacity: 0,
        duration: 0.5,
        ease: "power3.in",
        pointerEvents: "none",
      });
    }
  };

  return (
    <>
      <header className="header fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center">
        <div className="logo">
          <Link href="/">
            <Image
              src="/assets/graphics/logo_white.svg"
              alt="We Met Before Logo"
              width={40}
              height={40}
              className="h-10 w-auto"
            />
          </Link>
        </div>

        <nav className="flex gap-4 md:gap-8">
          <Link href="/" className="text-white hover:text-primary transition-colors">
            You
          </Link>
          <Link href="/work" className="text-white hover:text-primary transition-colors">
            Work
          </Link>
          <Link href="/about" className="text-white hover:text-primary transition-colors">
            Us
          </Link>
          <button
            className="menu-button p-2 ml-4 md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <div className={`h-0.5 w-6 bg-white mb-1.5 transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
            <div className={`h-0.5 w-6 bg-white mb-1.5 transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`h-0.5 w-6 bg-white transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
          </button>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      <div className="menu-overlay fixed inset-0 bg-black opacity-0 -translate-y-full pointer-events-none z-40 flex flex-col items-center justify-center">
        <div className="container max-w-2xl">
          <nav className="flex flex-col items-center gap-8 text-center">
            <Link href="/" className="menu-link text-4xl font-medium text-white hover:text-primary transition-colors" onClick={toggleMenu}>
              You
            </Link>
            <Link href="/work" className="menu-link text-4xl font-medium text-white hover:text-primary transition-colors" onClick={toggleMenu}>
              Work
            </Link>
            <Link href="/about" className="menu-link text-4xl font-medium text-white hover:text-primary transition-colors" onClick={toggleMenu}>
              Us
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
