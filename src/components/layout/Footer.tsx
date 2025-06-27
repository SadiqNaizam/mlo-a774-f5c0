import React from 'react';

console.log('Footer loaded');

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/40">
      <div className="container flex h-14 items-center justify-between px-4 lg:px-6">
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} CommercePulse. All rights reserved.
        </p>
        <nav className="flex items-center gap-4">
          <a href="#" className="text-sm text-muted-foreground hover:text-primary">
            Terms of Service
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-primary">
            Privacy Policy
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;