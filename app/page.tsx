"use client";

import ScrollReveal from "../components/ScrollReveal";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Manufacturing from "../components/sections/Manufacturing";
import Services from "../components/sections/Services";
import Products from "../components/sections/Products";
import Stats from "../components/sections/Stats";
import Testimonials from "../components/sections/Testimonials";
import CTA from "../components/sections/CTA";

export default function Home() {
  return (
    <ScrollReveal>
      <main className="gradient-bg min-h-screen overflow-hidden">
        <Navbar />
        <Hero />
        <About />
        <Manufacturing />
        <Services />
        <Products />
        <Stats />
        <Testimonials />
        <CTA />
        <Footer />
      </main>
    </ScrollReveal>
  );
}