import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  type?: "button" | "submit";
  className?: string;
  disabled?: boolean;
}

export function Button({ 
  children, 
  onClick, 
  variant = "primary", 
  type = "button", 
  className = "",
  disabled = false
}: ButtonProps) {
  const baseClasses = "px-6 py-3 rounded-lg font-medium transition-all duration-200";
  
  const variantClasses = {
    primary: "bg-primary text-white hover:bg-primary/90 shadow-sm hover:shadow-md",
    secondary: "bg-secondary text-white hover:bg-secondary/90 shadow-sm hover:shadow-md",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
    ghost: "text-gray-600 hover:bg-gray-100"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      // eslint-disable-next-line react/button-has-type
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </button>
  );
}
