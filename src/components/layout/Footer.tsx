import React from 'react';
import { Terminal } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-border mt-20 py-8 bg-background relative z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Terminal className="w-5 h-5 text-primary" />
          <span className="font-mono text-sm">
            Designed & Built by <span className="text-foreground">Ashish Kumar</span>
          </span>
        </div>
        <p className="font-mono text-xs text-muted-foreground">
          &copy; {currentYear} All rights reserved.
        </p>
      </div>
    </footer>
  );
}
