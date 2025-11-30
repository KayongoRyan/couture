import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "px-8 py-3 uppercase tracking-[0.15em] text-xs font-medium transition-all duration-500 ease-out disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-shadow text-snow hover:bg-gold hover:text-white dark:bg-smoke dark:text-ebony dark:hover:bg-antiqueGold",
    outline: "border border-shadow text-shadow hover:bg-shadow hover:text-snow dark:border-smoke dark:text-smoke dark:hover:bg-smoke dark:hover:text-ebony",
    ghost: "text-shadow hover:text-gold dark:text-smoke dark:hover:text-antiqueGold px-0"
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