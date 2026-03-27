import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send, Mail, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { contactSchema, type ContactInput, useSubmitContact } from '@/hooks/use-contact';
import { AnimatedHeading } from '@/components/ui/animated-heading';

export function Contact() {
  const { toast } = useToast();
  const submitContact = useSubmitContact();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactInput) => {
    try {
      const res = await submitContact.mutateAsync(data);
      toast({
        title: "System Notification",
        description: res.message,
        className: "bg-card border-primary text-foreground font-mono",
      });
      reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="contact" className="py-24 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <p className="font-mono text-primary mb-2 text-sm tracking-widest uppercase">04. What's Next?</p>
          <AnimatedHeading title="Get In Touch" />
          <p className="text-muted-foreground max-w-xl mx-auto text-lg mt-6">
            Although I'm currently focused on my studies and building personal projects, my inbox is always open. Whether you have a question, a project idea, or just want to say hi, I'll try my best to get back to you!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
          <div className="lg:col-span-2 space-y-8">
            <Card className="bg-transparent border-none shadow-none">
              <CardContent className="p-0 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-mono font-bold text-foreground">Email</h4>
                    <a href="mailto:ashishkumar190304@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                      ashishkumar190304@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-mono font-bold text-foreground">Location</h4>
                    <p className="text-muted-foreground">VIT Bhopal, India</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <Card className="border-primary/20 relative overflow-hidden">
              {/* Decorative corner accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary"></div>
              
              <CardContent className="p-6 sm:p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <Input 
                      placeholder="Your Name" 
                      {...register("name")} 
                      className={errors.name ? "border-destructive focus-visible:ring-destructive" : ""}
                    />
                    {errors.name && <p className="text-destructive text-xs mt-1 font-mono">{errors.name.message}</p>}
                  </div>
                  
                  <div>
                    <Input 
                      placeholder="Your Email" 
                      type="email" 
                      {...register("email")} 
                      className={errors.email ? "border-destructive focus-visible:ring-destructive" : ""}
                    />
                    {errors.email && <p className="text-destructive text-xs mt-1 font-mono">{errors.email.message}</p>}
                  </div>
                  
                  <div>
                    <Textarea 
                      placeholder="Message" 
                      {...register("message")} 
                      className={errors.message ? "border-destructive focus-visible:ring-destructive" : ""}
                    />
                    {errors.message && <p className="text-destructive text-xs mt-1 font-mono">{errors.message.message}</p>}
                  </div>
                  
                  <Button type="submit" size="lg" className="w-full sm:w-auto font-mono uppercase tracking-wider" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></span>
                        Transmitting...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-4 h-4" /> Send Message
                      </span>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </section>
  );
}