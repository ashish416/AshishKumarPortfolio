import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Download, ChevronRight } from 'lucide-react';

const ScrambleText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState('');
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+{}|:"<>?~`-=[]\\;\',./';
  
  useEffect(() => {
    let iteration = 0;
    let interval: NodeJS.Timeout;
    
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setDisplayText(
          text.split('')
            .map((char, index) => {
              if (index < iteration) {
                return text[index];
              }
              return characters[Math.floor(Math.random() * characters.length)];
            })
            .join('')
        );
        
        if (iteration >= text.length) {
          clearInterval(interval);
        }
        
        iteration += 1 / 3;
      }, 30);
    }, 200);
    
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text]);

  return <>{displayText}</>;
};

const MagneticButton = ({ children, className, variant, size, asChild }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    
    // Only attract if within 80px
    const distance = Math.sqrt(middleX * middleX + middleY * middleY);
    if (distance < 80) {
      x.set(middleX * 0.2); 
      y.set(middleY * 0.2);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      <Button className={className} variant={variant} size={size} asChild={asChild}>
        {children}
      </Button>
    </motion.div>
  );
};

const Counter = ({ end, duration }: { end: number, duration: number }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };
    
    animationFrame = requestAnimationFrame(step);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);
  
  return <>{count}</>;
};

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center pt-20 relative z-10">
      <motion.div 
        className="w-full max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-4">
          <p className="font-mono text-primary flex items-center gap-2 text-lg">
             Hello, I'm
          </p>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold mb-4 text-foreground tracking-tighter uppercase text-glow flex items-center flex-wrap">
            <ScrambleText text="ASHISH KUMAR." />
            <span className="animate-pulse ml-2 text-primary">_</span>
          </h1>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-mono text-muted-foreground mb-8">
            Full-Stack Developer | <span className="text-primary">MERN</span>
          </h2>
        </motion.div>

        <motion.div variants={itemVariants}>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed border-l-2 border-primary/50 pl-4">
            I build fast, scalable web apps that solve real problems.
            Currently studying Computer Science at VIT Bhopal, passionate about crafting seamless digital experiences from frontend to backend.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-wrap gap-4 items-center mb-12">
          <MagneticButton size="lg" asChild className="font-mono uppercase tracking-wider">
            <a href="#projects">
              View My Work <ChevronRight className="w-4 h-4 ml-1" />
            </a>
          </MagneticButton>
          <MagneticButton size="lg" variant="outline" asChild className="font-mono uppercase tracking-wider">
            <a href="#resume">
              <Download className="w-4 h-4 mr-2" /> Download CV
            </a>
          </MagneticButton>
          
          <div className="flex items-center gap-3 ml-2 sm:ml-4 border-l border-border pl-4 sm:pl-6 h-10">
            <a href="https://github.com/ashish416" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transform duration-200">
              <Github className="w-6 h-6" />
              <span className="sr-only">GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/ashish-kumar-11151420a/" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transform duration-200">
              <Linkedin className="w-6 h-6" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </motion.div>

        {/* Hero Stats */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2 }}
          className="flex flex-wrap items-center gap-4 sm:gap-6 font-mono text-sm sm:text-base text-muted-foreground border-t border-border/50 pt-6"
        >
          <div className="flex items-center gap-2">
            <span className="text-primary font-bold"><Counter end={3} duration={1.5} />+</span> Projects Built
          </div>
          <div className="w-px h-4 bg-border/80 hidden sm:block"></div>
          <div className="flex items-center gap-2">
            <span className="text-primary font-bold"><Counter end={3} duration={1.5} />+</span> Years Coding
          </div>
          <div className="w-px h-4 bg-border/80 hidden sm:block"></div>
          <div className="flex items-center gap-2">
            <span className="text-primary font-bold text-lg leading-none">∞</span> Bugs Fixed
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}