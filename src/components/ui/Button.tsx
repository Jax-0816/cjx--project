import { Link } from 'react-router-dom';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  to?: string;
  variant?: ButtonVariant;
}

const variantClass: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/20',
  secondary: 'bg-white text-primary hover:bg-warm border border-primary/20',
  ghost: 'bg-transparent text-dark hover:bg-white/70',
};

export default function Button({ children, to, variant = 'primary', className = '', ...props }: ButtonProps) {
  const classes = `inline-flex min-h-11 items-center justify-center rounded-md px-5 text-sm font-semibold transition-colors ${variantClass[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
