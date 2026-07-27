import React from 'react';
import './ui.css';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  glass?: boolean;
}

export const Card = ({ children, className, glass = false, ...props }: CardProps) => {
  return (
    <div 
      className={`${glass ? 'glass-card' : 'card'} ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
};
