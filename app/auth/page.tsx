'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Connect to Supabase Auth
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
    }}>
      <Card glass className="auth-card" style={{ maxWidth: '450px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', color: 'var(--brand-green)', marginBottom: '0.5rem' }}>Osusu</h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            {isLogin ? 'Welcome back to your cooperative.' : 'Join the modern cooperative system.'}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <Input 
              label="Full Name" 
              placeholder="e.g. Chidi Okeke" 
              required
            />
          )}
          
          <Input 
            label="Phone Number" 
            placeholder="e.g. 08012345678" 
            type="tel"
            required
          />

          {/* For MVP we can start with Password, but plan for OTP */}
          <Input 
            label="Password" 
            placeholder="••••••••" 
            type="password"
            required
          />

          <Button 
            type="submit" 
            style={{ width: '100%', marginTop: '1rem' }}
            disabled={loading}
          >
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
          </Button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <button 
            onClick={() => setIsLogin(!isLogin)}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: 'var(--brand-green-light)', 
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
          </button>
        </div>
      </Card>

      <style jsx global>{`
        .auth-card {
          animation: fadeIn 0.5s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
