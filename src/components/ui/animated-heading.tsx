import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedHeadingProps {
  title: string;
  prefix?: React.ReactNode;
}

export function AnimatedHeading({ title, prefix }: AnimatedHeadingProps) {
  const words = title.split(" ");
  
  return (
    <h2 className="text-3xl md:text-4xl font-bold font-display uppercase tracking-tight text-foreground flex items-center flex-wrap">
      {prefix && <span className="mr-2">{prefix}</span>}
      {words.map((word, wordIdx) => (
        <span key={wordIdx} className="mr-[0.25em] flex">
          {word.split("").map((char, charIdx) => (
            <span key={charIdx} className="overflow-hidden inline-block py-1">
              <motion.span
                className="inline-block"
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.6, 
                  delay: (wordIdx * 0.1) + (charIdx * 0.04), 
                  ease: [0.33, 1, 0.68, 1] 
                }}
              >
                {char}
              </motion.span>
            </span>
          ))}
        </span>
      ))}
    </h2>
  );
}