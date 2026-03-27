import React, { useEffect, useState } from 'react';

const SECTIONS = ['about', 'projects', 'skills', 'contact'];

export function SectionIndicator() {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const observers = SECTIONS.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { threshold: 0.5 }
      );
      
      observer.observe(el);
      return observer;
    });

    return () => {
      observers.forEach(obs => obs?.disconnect());
    };
  }, []);

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-4">
      {SECTIONS.map((id) => (
        <button
          key={id}
          onClick={() => {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
          }}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            activeSection === id 
              ? 'bg-primary scale-150 shadow-[0_0_10px_rgba(0,255,255,0.8)]' 
              : 'bg-primary/30 hover:bg-primary/60 hover:scale-125'
          }`}
          aria-label={`Scroll to ${id}`}
        />
      ))}
    </div>
  );
}
