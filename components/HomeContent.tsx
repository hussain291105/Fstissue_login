"use client";

import { useAuth } from "@/hooks/useAuth";
import ScrollReveal from "@/components/ScrollReveal";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Products from "@/components/sections/Products";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/CTA";
import Footer from "@/components/layout/Footer";

export default function HomeContent() {
  const { user } = useAuth();

  return (
    <ScrollReveal>
      <main className="gradient-bg min-h-screen overflow-hidden">
        <Navbar />

        {/* You can use user here if needed */}

        <Hero />
        <About />
        <Services />
        <Products />
        <Testimonials />
        <Contact />
        <Footer />
      </main>
    </ScrollReveal>
  );
}