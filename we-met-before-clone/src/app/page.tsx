import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import ServicesSection from "@/components/home/ServicesSection";
import WorkSection from "@/components/home/WorkSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Header />
      <HeroSection />
      <AboutSection />
      <WorkSection />
      <ServicesSection />
      <Footer />
    </main>
  );
}
