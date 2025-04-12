"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";

// Define projects data
const projects = [
  {
    id: 1,
    title: "Healthblocks",
    type: "Branding, Design & Development",
    image: "https://ext.same-assets.com/3472513867/2085724237.jpeg",
    url: "https://www.healthblocks.ai/",
  },
  {
    id: 2,
    title: "Jonathan Warner",
    type: "Strategy, Branding, Design & Development",
    image: "https://ext.same-assets.com/3472513867/3137313015.jpeg",
    url: "https://www.jonathanwarner.nl/",
  },
  {
    id: 3,
    title: "Ignore",
    type: "Design & Development",
    image: "https://ext.same-assets.com/3472513867/2333436594.jpeg",
    url: "https://www.ignoreamsterdam.com/",
  },
  {
    id: 4,
    title: "SlapFunk Records",
    type: "Design & Development",
    image: "https://ext.same-assets.com/3472513867/2866118139.jpeg",
    url: "https://www.slapfunk.com/",
  },
  {
    id: 5,
    title: "We Are Landmark",
    type: "Design & Development",
    image: "https://ext.same-assets.com/3472513867/1204572069.jpeg",
    url: "https://www.wearelandmark.co.uk/",
  },
  {
    id: 6,
    title: "Studio Studio",
    type: "Design & Development",
    image: "https://ext.same-assets.com/3472513867/2739406401.jpeg",
    url: "https://www.studiostudio.film/",
  },
];

export default function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Stagger animation for project items
    gsap.fromTo(
      ".project-item",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      }
    );

    // Set up hover animations for project items
    const projectItems = document.querySelectorAll(".project-item");
    projectItems.forEach((item) => {
      const image = item.querySelector(".project-image");
      const content = item.querySelector(".project-content");

      item.addEventListener("mouseenter", () => {
        gsap.to(image, { scale: 1.05, duration: 0.4, ease: "power2.out" });
        gsap.to(content, { y: -10, duration: 0.4, ease: "power2.out" });
      });

      item.addEventListener("mouseleave", () => {
        gsap.to(image, { scale: 1, duration: 0.4, ease: "power2.out" });
        gsap.to(content, { y: 0, duration: 0.4, ease: "power2.out" });
      });
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="work-section py-20 md:py-32 bg-black text-white"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="project-item block relative overflow-hidden group"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <div className="project-image w-full h-full transition-all duration-500 ease-out">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="project-content pt-4 pb-8 transition-all duration-300">
                <h3 className="text-2xl font-medium">{project.title}</h3>
                <p className="text-sm text-primary mt-1">{project.type}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
