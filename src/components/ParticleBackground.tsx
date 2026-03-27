import React from 'react';
import { motion } from 'framer-motion';

export function ParticleBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Noise/Grain filter */}
      <svg className="hidden">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
        </filter>
      </svg>
      <div 
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay z-50 pointer-events-none"
        style={{ filter: 'url(#noiseFilter)' }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-cyber-grid opacity-30" />
      
      {/* Vignette effect to fade out edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--background))_80%)]" />
      
      {/* Subtle moving glowing orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]"
        animate={{
          x: [0, 50, 0, -50, 0],
          y: [0, -50, 0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]"
        animate={{
          x: [0, -70, 0, 70, 0],
          y: [0, 70, 0, -70, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute top-1/4 right-1/3 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[100px]"
        animate={{
          x: [0, 60, 0, -60, 0],
          y: [0, 60, 0, -60, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
}
