"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    // Animation for footer when it comes into view
    gsap.fromTo(
      ".footer-content",
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
        },
      }
    );

    // Parallax effect for the head image
    gsap.to(".footer-image", {
      y: -80,
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <footer ref={footerRef} className="bg-black text-white py-20 relative overflow-hidden">
      {/* Decorative head illustration */}
      <div className="absolute right-0 -top-20 lg:right-20 lg:-top-40 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 footer-image">
        <Image
          src="/assets/images/hero_head.png"
          alt="We Met Before Head Illustration"
          width={400}
          height={400}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="container mx-auto px-6 footer-content">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="md:col-span-1">
            <div className="mb-4 font-medium text-2xl">AMS</div>
            <address className="not-italic mb-8">
              <p>Parnassusweg 126</p>
              <p>1076 AT Amsterdam</p>
              <p>The Netherlands</p>
            </address>
          </div>

          <div className="md:col-span-1">
            <div className="space-y-4">
              <Link href="tel:+31648405400" className="block text-white hover:text-primary transition-colors">
                +31648405400
              </Link>
              <Link href="mailto:info@wemetbefore.com" className="block text-white hover:text-primary transition-colors">
                info@wemetbefore.com
              </Link>
              <div className="flex space-x-4 mt-6">
                <Link href="https://www.instagram.com/wemetbefore.studio/" className="text-white hover:text-primary transition-colors">
                  Instagram
                </Link>
                <span>/</span>
                <Link href="https://www.behance.net/WeMetBefore" className="text-white hover:text-primary transition-colors">
                  Behance
                </Link>
                <span>/</span>
                <Link href="https://www.linkedin.com/company/wemetbefore" className="text-white hover:text-primary transition-colors">
                  LinkedIn
                </Link>
              </div>
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="mb-4 font-medium text-2xl">BCN</div>
            <address className="not-italic">
              <p>C/ de Magalhes 46</p>
              <p>08004 Barcelona</p>
              <p>Spain</p>
            </address>
          </div>
        </div>

        <div className="mt-20 text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} We Met Before. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
