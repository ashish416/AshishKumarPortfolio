import React from 'react';
import { ParticleBackground } from '@/components/ParticleBackground';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Projects } from '@/components/sections/Projects';
import { Skills } from '@/components/sections/Skills';
import { Contact } from '@/components/sections/Contact';
import { CustomCursor } from '@/components/CustomCursor';
import { SectionIndicator } from '@/components/SectionIndicator';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground relative flex flex-col">
      <CustomCursor />
      <SectionIndicator />
      <ParticleBackground />
      <Navbar />
      
      {/* 
        Container constraints and side padding 
        z-10 ensures content sits above the particle background
      */}
      <main className="container mx-auto px-6 sm:px-12 md:px-24 lg:px-32 relative z-10 flex-grow">
        <Hero />
        <About />
        <Projects />
        <Skills />
        
        {/* Placeholder section for resume download link to satisfy navbar link */}
        <section id="resume" className="h-px w-full invisible opacity-0" aria-hidden="true"></section>
        
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
