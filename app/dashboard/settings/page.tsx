'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card } from '@/components/ui/Card';

export default function SettingsAdminPage() {
  const [levy, setLevy] = useState('20000');
  const [interestRate, setInterestRate] = useState('5');
  const [multiplier, setMultiplier] = useState('2');
  const [penalty, setPenalty] = useState('500');

  return (
    <DashboardLayout>
      <div className="overview-header" style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.25rem' }}>Cooperative Settings & Configuration</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Manage financial policy, interest rates, and executive RBAC roles</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 500px) 1fr', gap: '2rem' }}>
        <Card glass className="widget-card">
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem' }}>Financial Parameters</h2>

          <form style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                Monthly Contribution Levy (₦)
              </label>
              <input 
                type="text" 
                value={levy} 
                onChange={(e) => setLevy(e.target.value)}
                style={{ width: '100%', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border-subtle)', padding: '0.75rem', borderRadius: '8px', color: 'white', fontWeight: 600 }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                Loan Interest Rate (% per annum)
              </label>
              <input 
                type="text" 
                value={interestRate} 
                onChange={(e) => setInterestRate(e.target.value)}
                style={{ width: '100%', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border-subtle)', padding: '0.75rem', borderRadius: '8px', color: 'white', fontWeight: 600 }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                Loan Eligibility Multiplier (x Total Savings)
              </label>
              <input 
                type="text" 
                value={multiplier} 
                onChange={(e) => setMultiplier(e.target.value)}
                style={{ width: '100%', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border-subtle)', padding: '0.75rem', borderRadius: '8px', color: 'white', fontWeight: 600 }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                Late Contribution Penalty (₦)
              </label>
              <input 
                type="text" 
                value={penalty} 
                onChange={(e) => setPenalty(e.target.value)}
                style={{ width: '100%', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border-subtle)', padding: '0.75rem', borderRadius: '8px', color: 'white', fontWeight: 600 }}
              />
            </div>

            <button className="widget-btn" type="button" style={{ background: 'var(--brand-green)', border: 'none', padding: '0.875rem', marginTop: '1rem' }}>
              Save Policy Changes
            </button>
          </form>
        </Card>

        <Card glass className="widget-card">
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem' }}>Executive RBAC Role Assignment</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            Assigned executives carry specific multi-signature authorization rights for loan approvals and dividend distribution.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { role: 'President', holder: 'Chief Babatunde Alabi', phone: '+234 802 334 5566', status: 'Active' },
              { role: 'Vice President', holder: 'Mrs. Folake Solanke', phone: '+234 803 778 9900', status: 'Active' },
              { role: 'Secretary', holder: 'Adaeze Obi', phone: '+234 803 123 4567', status: 'Active' },
              { role: 'Treasurer', holder: 'Alhaji Ibrahim Danjuma', phone: '+234 805 112 2334', status: 'Active' },
            ].map((exec, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)', borderRadius: '8px' }}>
                <div>
                  <span className="badge badge-paid" style={{ marginBottom: '0.25rem', display: 'inline-block' }}>{exec.role}</span>
                  <p style={{ fontWeight: 600, margin: '0.25rem 0 0' }}>{exec.holder}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>{exec.phone}</p>
                </div>
                <button className="widget-btn" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}>
                  Reassign
                </button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
