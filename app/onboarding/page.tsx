'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { registerCooperative } from '@/lib/actions/cooperative';
import { useRouter } from 'next/navigation';

export default function OnboardingPage() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    
    const formData = new FormData(e.currentTarget);
    
    try {
      const res = await registerCooperative(formData);
      
      if (res?.error) {
        setErrorMsg(res.error);
        setLoading(false);
      } else {
        router.push('/auth');
      }
    } catch (err) {
      setErrorMsg('An unexpected error occurred.');
      setLoading(false);
    }
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
      <Card glass className="auth-card" style={{ maxWidth: '500px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', color: 'var(--brand-green)', marginBottom: '0.5rem' }}>Register Cooperative</h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Start managing your cooperative with Osusu.
          </p>
        </div>

        {errorMsg && (
          <div style={{ padding: '0.75rem', background: '#fee2e2', color: '#991b1b', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Input 
            name="coopName"
            label="Cooperative Name" 
            placeholder="e.g. Lagos Traders Union" 
            required
          />

          <div style={{ margin: '1rem 0', borderTop: '1px solid var(--border-subtle)' }} />

          <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Admin Profile</p>

          <Input 
            name="fullName"
            label="Your Full Name" 
            placeholder="e.g. Chidi Okeke" 
            required
          />
          
          <Input 
            name="phone"
            label="Phone Number" 
            placeholder="e.g. 08012345678" 
            type="tel"
            required
          />

          <Input 
            name="password"
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
            {loading ? 'Processing...' : 'Register Cooperative'}
          </Button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Already registered? <a href="/auth" style={{ color: 'var(--brand-green)', textDecoration: 'none', fontWeight: 600 }}>Sign in</a>
          </p>
        </div>
      </Card>
    </div>
  );
}
