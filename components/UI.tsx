import React from 'react';

// --- BUTTONS ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "py-3 px-8 uppercase tracking-[0.2em] text-xs font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-shadow text-white hover:bg-gold dark:bg-smoke dark:text-ebony dark:hover:bg-antique",
    secondary: "bg-champagne text-shadow hover:bg-gold hover:text-white dark:bg-charcoal dark:text-smoke dark:hover:bg-antique dark:hover:text-ebony",
    outline: "border border-shadow text-shadow hover:bg-shadow hover:text-white dark:border-smoke dark:text-smoke dark:hover:bg-smoke dark:hover:text-ebony",
    text: "text-shadow hover:text-gold underline decoration-transparent hover:decoration-gold underline-offset-4 dark:text-smoke dark:hover:text-antique"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// --- INPUTS ---
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ label, className = '', ...props }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && <label className="text-xs uppercase tracking-widest text-shadow/60 dark:text-smoke/60">{label}</label>}
      <input 
        className={`bg-transparent border-b border-shadow/20 py-2 text-sm focus:border-gold focus:outline-none transition-colors dark:border-smoke/20 dark:text-smoke dark:focus:border-antique placeholder:text-shadow/30 dark:placeholder:text-smoke/30 ${className}`}
        {...props}
      />
    </div>
  );
};

// --- SECTION ---
interface SectionProps {
  children: React.ReactNode;
  className?: string;
  full?: boolean;
}

export const Section: React.FC<SectionProps> = ({ children, className = '', full = false }) => {
  return (
    <section className={`py-20 md:py-32 ${full ? 'w-full' : 'container mx-auto px-6 md:px-12'} ${className}`}>
      {children}
    </section>
  );
};

// --- TYPOGRAPHY ---
export const SectionTitle: React.FC<{ children: React.ReactNode; subtitle?: string; align?: 'left' | 'center' }> = ({ children, subtitle, align = 'center' }) => {
  return (
    <div className={`mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}>
      {subtitle && <span className="block text-xs font-sans tracking-[0.2em] uppercase text-gold dark:text-antique mb-4 animate-slide-up">{subtitle}</span>}
      <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-shadow dark:text-smoke font-light leading-tight animate-slide-up" style={{ animationDelay: '0.1s' }}>
        {children}
      </h2>
    </div>
  );
};