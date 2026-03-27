import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FolderGit2, ExternalLink, Github } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AnimatedHeading } from '@/components/ui/animated-heading';

const PROJECTS = [
  {
    title: "Musify",
    description: "A modern, responsive Spotify clone built with React and Vite.",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    github: "https://github.com/ashish416/Musify",
    featured: true,
    image: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=800&q=80"
  },
  {
    title: "Patient Management System",
    description: "A full-stack patient management system with secure authentication and automated SMS appointment reminders that slashed no-show rates. Features a dynamic admin dashboard with search and filter to instantly locate patient records.",
    tech: ["Next.js", "Node.js", "Appwrite"],
    github: "https://github.com/ashish416",
    demo: "",
    featured: false,
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&q=80"
  },
  {
    title: "Flashcard Application",
    description: "A full-stack flashcard app with spaced repetition to boost long-term retention. Features client-side state management and caching for a fluid, app-like experience, plus the ability to create and share custom flashcard sets for community-driven learning.",
    tech: ["React.js", "Next.js"],
    github: "https://github.com/ashish416",
    demo: "",
    featured: false,
    image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=800&q=80"
  },
];

function ProjectCard({ project, idx }: { project: any, idx: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      className="h-full"
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="h-full relative group"
      >
        {/* Glow shadow behind card */}
        <div className="absolute inset-0 rounded-lg group-hover:shadow-[0_0_30px_rgba(0,255,255,0.2)] transition-shadow duration-500 pointer-events-none"></div>
        
        <Card className="h-full flex flex-col relative z-10 bg-card overflow-hidden transition-all duration-300 border-border group-hover:border-primary/30">
          {/* Cyan Light Glint */}
          <div className="absolute top-0 left-[-100%] w-1/2 h-[200%] bg-gradient-to-r from-transparent via-primary/20 to-transparent -skew-x-[20deg] group-hover:animate-glint z-30 pointer-events-none"></div>
          
          <div className="relative h-48 overflow-hidden rounded-t-sm border-b border-border">
            <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors duration-300"></div>
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
            />
            {project.featured && (
              <div className="absolute top-3 right-3 z-20">
                <Badge variant="default" className="bg-primary text-primary-foreground">Featured</Badge>
              </div>
            )}
          </div>
          
          <CardHeader>
            <div className="flex justify-between items-start mb-2 relative z-40">
              <FolderGit2 className="w-8 h-8 text-primary" />
              <div className="flex gap-3">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
            <CardTitle className="text-xl group-hover:text-primary transition-colors relative z-40">
              {project.demo ? (
                <a href={project.demo} target="_blank" rel="noreferrer">{project.title}</a>
              ) : (
                <span>{project.title}</span>
              )}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="flex-grow relative z-40">
            <CardDescription className="text-sm md:text-base mb-6">
              {project.description}
            </CardDescription>
          </CardContent>

          <CardFooter className="relative z-40">
            <div className="flex flex-wrap gap-2 w-full pt-4 border-t border-border/50">
              {project.tech.map((t: string) => (
                <span key={t} className="font-mono text-xs text-muted-foreground">
                  {t}
                </span>
              ))}
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="py-24 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-4 mb-12">
          <AnimatedHeading 
            prefix={<span className="text-primary">02.</span>} 
            title="Selected Work" 
          />
          <div className="h-px bg-border flex-grow max-w-xs"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, idx) => (
            <ProjectCard key={idx} project={project} idx={idx} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}