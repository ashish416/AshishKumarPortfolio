import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Server, Database, Wrench, Code } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AnimatedHeading } from '@/components/ui/animated-heading';

const SKILL_CATEGORIES = [
  {
    title: "Frontend",
    icon: Layers,
    skills: ["React", "HTML/CSS", "TailwindCSS", "JavaScript (ES6+)"]
  },
  {
    title: "Backend",
    icon: Server,
    skills: ["Node.js", "Express.js", "RESTful APIs", "Authentication"]
  },
  {
    title: "Database",
    icon: Database,
    skills: ["MongoDB", "Mongoose", "NoSQL Data Modeling"]
  },
  {
    title: "Tools & DevOps",
    icon: Wrench,
    skills: ["Git & GitHub", "VS Code"]
  },
  {
    title: "Languages",
    icon: Code,
    skills: ["C++", "Python"]
  }
];

export function Skills() {
  return (
    <section id="skills" className="py-24 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-4 mb-12">
          <AnimatedHeading 
            prefix={<span className="text-primary">03.</span>} 
            title="Technical Arsenal" 
          />
          <div className="h-px bg-border flex-grow max-w-xs"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((category, idx) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <Card className="h-full hover:border-primary/50 transition-colors group hover:animate-shimmer-border">
                  <CardHeader className="pb-4 flex flex-row items-center gap-4">
                    <div className="p-2 rounded-sm bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-lg m-0">{category.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <motion.div 
                      className="flex flex-wrap gap-2 mt-2"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.05 } }
                      }}
                    >
                      {category.skills.map(skill => (
                        <motion.div
                          key={skill}
                          variants={{
                            hidden: { opacity: 0, scale: 0.8 },
                            visible: { opacity: 1, scale: 1 }
                          }}
                        >
                          <Badge variant="outline" className="group-hover:border-primary/50 transition-colors">
                            {skill}
                          </Badge>
                        </motion.div>
                      ))}
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}