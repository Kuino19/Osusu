'use client';

import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card } from '@/components/ui/Card';

export default function MemberLoansPage() {
  const [showApply, setShowApply] = React.useState(false);

  return (
    <DashboardLayout>
      <div className="overview-header">
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>My Loans</h1>
        <button 
          className="widget-btn" 
          style={{ background: 'var(--brand-green)', border: 'none' }}
          onClick={() => setShowApply(!showApply)}
        >
          {showApply ? 'Back to Tracker' : 'Apply for New Loan'}
        </button>
      </div>

      {!showApply ? (
        <>
          <div className="stats-grid">
            <div className="stat-card">
              <p className="stat-label">Active Principal</p>
              <h3 className="stat-value">₦500,000</h3>
              <p className="stat-subtext">Business expansion</p>
            </div>
            <div className="stat-card">
              <p className="stat-label">Amount Repaid</p>
              <h3 className="stat-value" style={{ color: 'var(--brand-green)' }}>₦250,000</h3>
              <p className="stat-subtext">50% of total</p>
            </div>
            <div className="stat-card">
              <p className="stat-label">Next Payment</p>
              <h3 className="stat-value">₦43,750</h3>
              <p className="stat-subtext">Due April 1, 2026</p>
            </div>
          </div>

          <div className="widget-card" style={{ marginBottom: '2.5rem' }}>
            <h3 className="widget-title" style={{ marginBottom: '1.5rem' }}>Repayment Schedule</h3>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { month: 'March', amount: '₦43,750', status: 'Pending', date: 'Apr 1' },
                  { month: 'February', amount: '₦43,750', status: 'Paid', date: 'Mar 1' },
                  { month: 'January', amount: '₦43,750', status: 'Paid', date: 'Feb 1' },
                  { month: 'December', amount: '₦43,750', status: 'Paid', date: 'Jan 1' },
                ].map((row, i) => (
                  <tr key={i}>
                    <td>{row.month}</td>
                    <td style={{ fontWeight: 700 }}>{row.amount}</td>
                    <td>
                      <span className={`badge badge-${row.status.toLowerCase()}`}>
                        {row.status}
                      </span>
                    </td>
                    <td style={{ color: 'var(--text-secondary)' }}>{row.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <Card glass className="widget-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h3 className="widget-title" style={{ marginBottom: '1.5rem' }}>New Loan Application</h3>
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '12px', marginBottom: '2rem', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Your current eligibility limit:</p>
            <h4 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--brand-green)' }}>₦1,920,000</h4>
          </div>

          <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="form-group">
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Loan Amount</label>
              <input 
                type="number" 
                placeholder="₦0.00" 
                style={{ width: '100%', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border-subtle)', padding: '0.75rem', borderRadius: '8px', color: 'white' }}
              />
            </div>
            <div className="form-group">
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Purpose of Loan</label>
              <select style={{ width: '100%', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border-subtle)', padding: '0.75rem', borderRadius: '8px', color: 'white' }}>
                <option>Business Expansion</option>
                <option>Educational Support</option>
                <option>Medical Emergency</option>
                <option>Asset Purchase</option>
              </select>
            </div>
            <div className="form-group">
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Repayment Term (Months)</label>
              <input 
                type="number" 
                placeholder="e.g., 12" 
                style={{ width: '100%', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border-subtle)', padding: '0.75rem', borderRadius: '8px', color: 'white' }}
              />
            </div>
            
            <button 
              type="button" 
              className="widget-btn" 
              style={{ background: 'var(--brand-green)', border: 'none', padding: '1rem', marginTop: '1rem' }}
            >
              Submit Application
            </button>
          </form>
        </Card>
      )}
    </DashboardLayout>
  );
}
