'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card } from '@/components/ui/Card';

export default function ContributionsAdminPage() {
  const [filter, setFilter] = useState<'all' | 'paid' | 'pending' | 'overdue'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const contributions = [
    { id: '1', member: 'Adaeze Obi', initials: 'AO', amount: '₦20,000', status: 'paid', date: 'Mar 1, 2026', method: 'Paystack (Card)', ref: 'PSTK_889201' },
    { id: '2', member: 'Kunle Adeyemi', initials: 'KA', amount: '₦20,000', status: 'paid', date: 'Mar 2, 2026', method: 'Bank Transfer', ref: 'TRF_992011' },
    { id: '3', member: 'Ngozi Eze', initials: 'NE', amount: '₦20,000', status: 'pending', date: '-', method: '-', ref: '-' },
    { id: '4', member: 'Bola Ibrahim', initials: 'BI', amount: '₦20,000', status: 'overdue', date: '-', method: '-', ref: '-' },
    { id: '5', member: 'Tunde Okafor', initials: 'TO', amount: '₦20,000', status: 'paid', date: 'Mar 3, 2026', method: 'Paystack (USSD)', ref: 'PSTK_441209' },
    { id: '6', member: 'Chioma Abia', initials: 'CA', amount: '₦20,000', status: 'pending', date: '-', method: '-', ref: '-' },
    { id: '7', member: 'Yemi Martins', initials: 'YM', amount: '₦20,000', status: 'overdue', date: '-', method: '-', ref: '-' },
  ];

  const filtered = contributions.filter(c => {
    const matchesFilter = filter === 'all' || c.status === filter;
    const matchesSearch = c.member.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <DashboardLayout>
      <div className="overview-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.25rem' }}>Monthly Contributions</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>March 2026 Collection Cycle — Ikeja Traders Cooperative</p>
        </div>
        <button className="widget-btn" style={{ background: 'var(--brand-green)', border: 'none', padding: '0.75rem 1.25rem' }}>
          + Record Manual Cash Entry
        </button>
      </div>

      <div className="stats-grid" style={{ marginBottom: '2rem' }}>
        <div className="stat-card">
          <p className="stat-label">Total Expected</p>
          <h3 className="stat-value">₦2,960,000</h3>
          <p className="stat-subtext">148 members @ ₦20k</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Collected So Far</p>
          <h3 className="stat-value" style={{ color: 'var(--brand-green)' }}>₦2,700,000</h3>
          <p className="stat-subtext">135 members paid (91%)</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Outstanding Balance</p>
          <h3 className="stat-value" style={{ color: '#f87171' }}>₦260,000</h3>
          <p className="stat-subtext">13 pending / overdue</p>
        </div>
      </div>

      <Card glass className="widget-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <input 
            type="text" 
            placeholder="Search member..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border-subtle)', padding: '0.6rem 1rem', borderRadius: '8px', color: 'white', minWidth: '240px' }}
          />

          <div className="view-toggle" style={{ transform: 'scale(0.9)', transformOrigin: 'right' }}>
            {(['all', 'paid', 'pending', 'overdue'] as const).map(f => (
              <button 
                key={f}
                className={`toggle-btn ${filter === f ? 'active' : ''}`}
                onClick={() => setFilter(f)}
                style={{ textTransform: 'capitalize' }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Member</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
              <th>Method / Ref</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className="member-cell">
                    <div className="avatar-sm">{item.initials}</div>
                    {item.member}
                  </div>
                </td>
                <td style={{ fontWeight: 700 }}>{item.amount}</td>
                <td>
                  <span className={`badge badge-${item.status}`}>
                    {item.status}
                  </span>
                </td>
                <td style={{ color: 'var(--text-secondary)' }}>{item.date}</td>
                <td style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  {item.ref !== '-' ? `${item.method} (${item.ref})` : '-'}
                </td>
                <td>
                  {item.status === 'paid' ? (
                    <button className="widget-btn" style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem' }}>
                      Receipt PDF
                    </button>
                  ) : (
                    <button className="widget-btn" style={{ background: '#25D366', border: 'none', color: 'white', padding: '0.25rem 0.75rem', fontSize: '0.75rem' }}>
                      WhatsApp Remind
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </DashboardLayout>
  );
}
