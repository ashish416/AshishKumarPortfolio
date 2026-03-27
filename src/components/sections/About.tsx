import React from 'react';
import { motion } from 'framer-motion';
import { User, Code2, Coffee } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedHeading } from '@/components/ui/animated-heading';

export function About() {
  return (
    <section id="about" className="py-24 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-4 mb-12">
          <AnimatedHeading 
            prefix={<span className="text-primary">01.</span>} 
            title="About Me" 
          />
          <div className="h-px bg-border flex-grow max-w-xs"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-6 text-lg text-muted-foreground">
            <p>
              Hello! My name is Ashish and I enjoy creating things that live on the internet.
            </p>
            <p>
              Fast-forward to today, I am a final-year Computer Science student at <span className="text-primary font-mono">VIT Bhopal</span>, specializing in the MERN stack. I've had the privilege of building diverse web applications.
            </p>
            <p>
              My main focus these days is building accessible, inclusive products and digital experiences that perform exceptionally well under scale.
            </p>
            
            <div className="p-4 mt-6 border-l-2 border-primary bg-primary/5 rounded-r-md">
              <p className="font-mono text-sm text-foreground flex items-start gap-3">
                <Coffee className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>
                  <strong>Fun Fact:</strong> When I'm not coding, I'm probably debugging… or pretending to debug.
                </span>
              </p>
            </div>
            
            <div className="pt-4">
              <a href="#resume" className="inline-flex items-center gap-2 text-primary font-mono hover:underline hover:text-primary/80 transition-colors">
                <User className="w-4 h-4" /> View Full Resume
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative group">
            {/* Cyberpunk styled image placeholder */}
            <div className="relative z-10 rounded-sm overflow-hidden border border-primary/20 bg-card aspect-square flex items-center justify-center box-glow transition-all duration-500 group-hover:border-primary/60 group-hover:box-glow-strong">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80')] bg-cover bg-center opacity-40 mix-blend-luminosity filter grayscale group-hover:filter-none group-hover:opacity-60 transition-all duration-500"></div>
              {/* Fallback icon if image doesn't load/for aesthetic */}
              <Code2 className="w-32 h-32 text-primary/30 absolute z-0 group-hover:scale-110 transition-transform duration-500" />
            </div>
            
            {/* Decorative background border */}
            <div className="absolute inset-0 border-2 border-primary/30 rounded-sm translate-x-4 translate-y-4 -z-10 transition-transform duration-500 group-hover:translate-x-6 group-hover:translate-y-6"></div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}