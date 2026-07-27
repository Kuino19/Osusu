'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';

type LoanWithMember = {
  id: string;
  member: string | null;
  amount: string;
  contributions: string;
  maxEligible: string;
  purpose: string | null;
  status: string | null;
  approvals: {
    secretary: boolean;
    president: boolean;
    treasurer: boolean;
  };
  guarantors: string[];
};

export default function LoansClient({ loansList }: { loansList: LoanWithMember[] }) {
  const [activeTab, setActiveTab] = useState<'pending' | 'active' | 'repaid'>('pending');

  const pendingCount = loansList.filter(l => l.status?.startsWith('Pending')).length;
  const activeCount = loansList.filter(l => l.status === 'Active' || l.status === 'Disbursed').length;
  const totalOutstanding = loansList
    .filter(l => l.status === 'Active' || l.status === 'Disbursed')
    .reduce((sum, l) => sum + Number(l.amount), 0);

  const filteredLoans = loansList.filter(l => {
    if (activeTab === 'pending') return l.status?.startsWith('Pending') || l.status === 'Draft';
    if (activeTab === 'active') return l.status === 'Active' || l.status === 'Disbursed';
    if (activeTab === 'repaid') return l.status === 'Repaid';
    return true;
  });

  return (
    <>
      <div className="overview-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.25rem' }}>Loan Applications & Management</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Multi-Signature Approval Workflow (Secretary → President → Treasurer)</p>
        </div>
      </div>

      <div className="stats-grid" style={{ marginBottom: '2rem' }}>
        <div className="stat-card">
          <p className="stat-label">Pending Applications</p>
          <h3 className="stat-value">{pendingCount}</h3>
          <p className="stat-subtext">Awaiting executive signatures</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Total Outstanding Loans</p>
          <h3 className="stat-value" style={{ color: 'var(--brand-gold)' }}>₦{totalOutstanding.toLocaleString()}</h3>
          <p className="stat-subtext">{activeCount} active borrowers</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Cooperative Fund Pool</p>
          <h3 className="stat-value" style={{ color: 'var(--brand-green)' }}>TBD</h3>
          <p className="stat-subtext">Sufficient liquid reserves</p>
        </div>
      </div>

      <Card glass className="widget-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div className="view-toggle" style={{ transform: 'scale(0.9)', transformOrigin: 'left' }}>
            {(['pending', 'active', 'repaid'] as const).map((tab) => (
              <button 
                key={tab}
                className={`toggle-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
                style={{ textTransform: 'capitalize' }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {filteredLoans.length > 0 ? filteredLoans.map((loan) => (
            <div 
              key={loan.id} 
              style={{ 
                background: 'rgba(255, 255, 255, 0.03)', 
                border: '1px solid var(--border-subtle)', 
                borderRadius: '12px', 
                padding: '1.5rem' 
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div className="member-cell">
                  <div className="avatar-sm" style={{ width: '48px', height: '48px', fontSize: '1.1rem' }}>{loan.member?.substring(0,2).toUpperCase()}</div>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>{loan.member}</h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>Purpose: {loan.purpose} • App ID: {loan.id.substring(0, 8)}</p>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--brand-green)', margin: 0 }}>₦{Number(loan.amount).toLocaleString()}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>Max Eligible: ₦{Number(loan.maxEligible).toLocaleString()}</p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', background: 'rgba(0, 0, 0, 0.2)', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
                <div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '0 0 0.25rem' }}>Member Contributions</p>
                  <p style={{ fontWeight: 600, margin: 0 }}>₦{Number(loan.contributions).toLocaleString()}</p>
                </div>
                <div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '0 0 0.25rem' }}>Guarantors Backing</p>
                  <p style={{ fontWeight: 600, margin: 0, fontSize: '0.8rem' }}>{loan.guarantors.length > 0 ? loan.guarantors.join(', ') : 'None'}</p>
                </div>
                <div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '0 0 0.25rem' }}>Eligibility Check</p>
                  <span className={`badge ${Number(loan.amount) <= Number(loan.maxEligible) ? 'badge-paid' : 'badge-overdue'}`}>
                    {Number(loan.amount) <= Number(loan.maxEligible) ? '✓ Qualified (2x Limit)' : '⚠️ Exceeds Limit'}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', paddingTop: '0.5rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Multi-Sig Status:</span>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <span className={`badge ${loan.approvals.secretary ? 'badge-paid' : 'badge-pending'}`}>1. Secretary {loan.approvals.secretary ? '✓' : '⌛'}</span>
                    <span className={`badge ${loan.approvals.president ? 'badge-paid' : 'badge-pending'}`}>2. President {loan.approvals.president ? '✓' : '⌛'}</span>
                    <span className={`badge ${loan.approvals.treasurer ? 'badge-paid' : 'badge-pending'}`}>3. Treasurer {loan.approvals.treasurer ? '✓' : '⌛'}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button className="widget-btn" style={{ background: '#f87171', border: 'none', color: 'white', padding: '0.4rem 1rem', fontSize: '0.8rem' }}>Reject</button>
                  <button className="widget-btn" style={{ background: 'var(--brand-green)', border: 'none', padding: '0.4rem 1rem', fontSize: '0.8rem' }}>Sign & Approve</button>
                </div>
              </div>
            </div>
          )) : (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>No loans found for this status.</div>
          )}
        </div>
      </Card>
    </>
  );
}
