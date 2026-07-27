'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { registerMember } from '@/lib/actions/members';

export default function MembersPage() {
  const [isAdding, setIsAdding] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const res = await registerMember(formData);
    
    if (res.error) {
      setStatus({ type: 'error', msg: res.error });
    } else {
      setStatus({ type: 'success', msg: 'Member registered successfully!' });
      setIsAdding(false);
      // In a real app, the list would refresh via revalidatePath
    }
  }

  return (
    <DashboardLayout>
      <div className="members-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ margin: 0 }}>Member Directory</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Manage and register your cooperative members.</p>
        </div>
        <Button onClick={() => setIsAdding(!isAdding)}>
          {isAdding ? 'Cancel' : 'Add New Member'}
        </Button>
      </div>

      {status && (
        <div style={{ 
          padding: '1rem', 
          borderRadius: '8px', 
          marginBottom: '1rem', 
          background: status.type === 'success' ? '#dcfce7' : '#fee2e2',
          color: status.type === 'success' ? '#166334' : '#991b1b',
          fontSize: '0.875rem'
        }}>
          {status.msg}
        </div>
      )}

      {isAdding && (
        <Card style={{ marginBottom: '2rem', maxWidth: '500px' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.25rem' }}>Full Name</label>
              <Input name="fullName" placeholder="e.g. John Doe" required />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.25rem' }}>Email Address</label>
              <Input name="email" type="email" placeholder="john@example.com" required />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.25rem' }}>Phone Number</label>
              <Input name="phone" placeholder="08012345678" required />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.25rem' }}>Initial Password</label>
              <Input name="password" type="password" placeholder="••••••••" required />
            </div>
            <Button type="submit" style={{ marginTop: '0.5rem' }}>Create Account</Button>
          </form>
        </Card>
      )}

      <Card>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border-subtle)' }}>
              <th style={{ padding: '1rem 0.5rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>NAME</th>
              <th style={{ padding: '1rem 0.5rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>ROLE</th>
              <th style={{ padding: '1rem 0.5rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>CONTRIBUTIONS</th>
              <th style={{ padding: '1rem 0.5rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: 'Chidi Okeke', role: 'Member', contributions: '₦245,000', status: 'Active' },
              { name: 'Amaka Eze', role: 'Treasurer', contributions: '₦1.2M', status: 'Active' },
              { name: 'Babatunde Raji', role: 'Secretary', contributions: '₦850k', status: 'Active' },
            ].map((m, i) => (
              <tr key={i} style={{ borderBottom: '1px solid rgba(0,0,0,0.02)' }}>
                <td style={{ padding: '1rem 0.5rem', fontWeight: 600 }}>{m.name}</td>
                <td style={{ padding: '1rem 0.5rem', fontSize: '0.875rem' }}>{m.role}</td>
                <td style={{ padding: '1rem 0.5rem', fontSize: '0.875rem' }}>{m.contributions}</td>
                <td style={{ padding: '1rem 0.5rem' }}>
                  <span style={{ 
                    fontSize: '0.75rem', 
                    padding: '0.2rem 0.5rem', 
                    background: '#dcfce7', 
                    color: '#166334', 
                    borderRadius: '4px',
                    fontWeight: 600
                  }}>{m.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '1.5rem' }}>
          Showing 3 members. Total membership: 142
        </p>
      </Card>
    </DashboardLayout>
  );
}
