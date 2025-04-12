"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

const services = [
  {
    id: "branding",
    title: "Branding",
    description:
      "Our team loves building from scratch or updating existing identities. Together we craft and translate a brand strategy into a visual identity, beginning with a logo that tells a story. After that we start working on the color palettes, fonts, imagery, tone of voice, moodboards and mockups. All of this will be translated into a brandbook. Working with accessible tools like Figma, Sketch and Adobe XD makes everything (and easy collaboration) possible. Think bold, think big, think new.",
    details: "Logo / Brandbook / Visual Brand Identity / Strategy / Copywriting",
  },
  {
    id: "design",
    title: "Design",
    description:
      "We believe in a - broad spectrum - approach to create state of the art designs and UX frameworks for your digital products, whether its a new website or App. Not only by developing the visual design but also adding new trends like 3D art, illustrations and the alignment of video and photography. All to deliver the full brand story to any chosen audience.",
    details: "UX & UI Design / Webdesign / 3D Art / Illustration / Video / Photography",
  },
  {
    id: "development",
    title: "Development",
    description:
      "We build modular and sustainable solutions that perfectly match our designs and concepts. We are always on the lookout for new tools to adapt to the latest and ever evolving standards. Ranging from robust headless Singe Page Webapps build in React with Nextjs and Gatsbyjs, to quick but highly animated landing pages in Webflow. Always with a friendly CMS as a basis for our future relationship. This gives our clients, plenty freedom for easy and ongoing edits.",
    details: "Websites / Webflow / React / Nextjs / Shopify / Landingpages",
  },
];

export default function ServicesSection() {
  const [activeTab, setActiveTab] = useState("branding");
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Animate the section title on scroll
    gsap.fromTo(
      ".services-title",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );

    // Animate tabs on scroll
    gsap.fromTo(
      ".tab-item",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".tabs-container",
          start: "top 80%",
        },
      }
    );
  }, []);

  // Animate content when tab changes
  useEffect(() => {
    if (!contentRef.current) return;

    gsap.fromTo(
      contentRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
    );
  }, [activeTab]);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  // Find the active service
  const activeService = services.find((service) => service.id === activeTab) || services[0];

  return (
    <section
      ref={sectionRef}
      className="services-section py-20 md:py-32 bg-black text-white"
    >
      <div className="container mx-auto px-6">
        <h2 className="services-title text-3xl md:text-4xl lg:text-5xl font-medium mb-16 text-center">
          Our services
        </h2>

        {/* Tabs */}
        <div className="tabs-container max-w-4xl mx-auto mb-16">
          <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-8">
            {services.map((service) => (
              <button
                key={service.id}
                className={`tab-item text-lg md:text-xl px-6 py-3 rounded-full transition-all ${
                  activeTab === service.id
                    ? "bg-primary text-black font-medium"
                    : "bg-transparent text-white hover:bg-gray-800"
                }`}
                onClick={() => handleTabClick(service.id)}
              >
                {service.title}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div
          ref={contentRef}
          className="service-content max-w-4xl mx-auto"
          key={activeTab}
        >
          <div className="grid grid-cols-1 gap-12">
            <div>
              <p className="text-lg md:text-xl leading-relaxed mb-8">
                {activeService.description}
              </p>
              <p className="text-primary text-lg">
                {activeService.details}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
