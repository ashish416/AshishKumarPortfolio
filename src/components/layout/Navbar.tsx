import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Terminal, Menu, X } from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-primary/20 py-3 shadow-[0_4px_30px_hsl(var(--background))]' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <Terminal className="w-6 h-6 text-primary group-hover:text-glow transition-all" />
          <span className="font-mono font-bold text-xl tracking-tighter">
            AK<span className="text-primary">.dev</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href} 
                  className="font-mono text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  <span className="text-primary opacity-50 mr-1">&gt;</span>
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <Button variant="outline" size="sm" asChild>
            <a href="#resume">Download CV</a>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-muted-foreground hover:text-primary transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-primary/20 p-4 shadow-xl">
          <ul className="flex flex-col gap-4 mb-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href} 
                  className="font-mono text-base block py-2 text-foreground hover:text-primary transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="text-primary mr-2">/</span>
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <Button className="w-full" variant="outline" asChild onClick={() => setMobileMenuOpen(false)}>
            <a href="#resume">Download CV</a>
          </Button>
        </div>
      )}

      {/* Scroll Progress Bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary/50 to-primary origin-left"
        style={{ scaleX }}
      />
    </nav>
  );
}
