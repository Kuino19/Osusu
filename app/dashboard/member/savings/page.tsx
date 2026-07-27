'use client';

import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card } from '@/components/ui/Card';

export default function SavingsPage() {
  const years = [2024, 2025, 2026];
  const [selectedYear, setSelectedYear] = React.useState(2026);
  
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  // Mock data for contribution status
  const contributionStatus = {
    2026: ['paid', 'paid', 'paid', 'pending', 'upcoming', 'upcoming', 'upcoming', 'upcoming', 'upcoming', 'upcoming', 'upcoming', 'upcoming'],
    2025: Array(12).fill('paid'),
    2024: Array(12).fill('paid'),
  };

  return (
    <DashboardLayout>
      <div className="overview-header">
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>My Savings</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Track your contribution journey</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <p className="stat-label">Total Saved</p>
          <h3 className="stat-value">₦960,000</h3>
          <p className="stat-subtext">Across 27 months</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Loan Eligibility</p>
          <h3 className="stat-value" style={{ color: 'var(--brand-green)' }}>₦1,920,000</h3>
          <p className="stat-subtext">2x your total savings</p>
        </div>
      </div>

      <div className="widget-card" style={{ marginBottom: '2.5rem' }}>
        <div className="widget-header">
          <h3 className="widget-title">Contribution Grid</h3>
          <div className="view-toggle" style={{ transform: 'scale(0.8)', transformOrigin: 'right' }}>
            {years.map(y => (
              <button 
                key={y}
                className={`toggle-btn ${selectedYear === y ? 'active' : ''}`}
                onClick={() => setSelectedYear(y)}
              >
                {y}
              </button>
            ))}
          </div>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(6, 1fr)', 
          gap: '1rem',
          marginTop: '1rem'
        }}>
          {months.map((month, i) => {
            const status = contributionStatus[selectedYear as keyof typeof contributionStatus][i];
            return (
              <div key={month} style={{ 
                aspectRatio: '1',
                background: status === 'paid' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                border: `1px solid ${status === 'paid' ? 'rgba(16, 185, 129, 0.3)' : 'var(--border-subtle)'}`,
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                position: 'relative'
              }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, opacity: 0.8 }}>{month}</span>
                {status === 'paid' && <span style={{ color: '#10b981', fontSize: '1.25rem' }}>✓</span>}
                {status === 'pending' && <span style={{ color: '#fbbf24', fontSize: '1.25rem' }}>•</span>}
              </div>
            );
          })}
        </div>
      </div>

      <div className="overview-header">
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>Payment History</h2>
      </div>

      <div className="widget-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Receipt</th>
            </tr>
          </thead>
          <tbody>
            {[
              { date: 'Mar 1, 2026', amount: '₦20,000', method: 'Bank Transfer', id: 'OS-2603-01' },
              { date: 'Feb 1, 2026', amount: '₦20,000', method: 'Bank Transfer', id: 'OS-2602-01' },
              { date: 'Jan 1, 2026', amount: '₦20,000', method: 'Bank Transfer', id: 'OS-2601-01' },
              { date: 'Dec 1, 2025', amount: '₦20,000', method: 'Cash', id: 'OS-2512-01' },
              { date: 'Nov 1, 2025', amount: '₦20,000', method: 'Bank Transfer', id: 'OS-2511-01' },
            ].map((tx, i) => (
              <tr key={i}>
                <td>{tx.date}</td>
                <td style={{ fontWeight: 700 }}>{tx.amount}</td>
                <td style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{tx.method}</td>
                <td>
                  <button className="widget-btn" style={{ padding: '0.25rem 0.75rem', fontSize: '0.7rem' }}>
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
