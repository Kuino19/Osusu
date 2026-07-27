'use client';

import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';
import './ui.css';

export interface ToastProps {
  type: 'success' | 'error';
  message: string;
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({ type, message, onClose, duration = 4000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className="toast-container">
      <div className={`toast toast-${type}`}>
        {type === 'success' ? (
          <CheckCircle2 size={18} style={{ color: '#34d399', flexShrink: 0 }} />
        ) : (
          <AlertCircle size={18} style={{ color: '#f87171', flexShrink: 0 }} />
        )}
        <span style={{ flex: 1 }}>{message}</span>
        <button 
          onClick={onClose}
          style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex' }}
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};
