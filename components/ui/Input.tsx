import React from 'react';
import './ui.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = ({ label, className, ...props }: InputProps) => {
  return (
    <div style={{ width: '100%', marginBottom: '1.25rem' }}>
      {label && <label className="input-label">{label}</label>}
      <input 
        className={`input-field ${className || ''}`} 
        {...props}
      />
    </div>
  );
};
