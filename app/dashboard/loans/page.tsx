'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card } from '@/components/ui/Card';

export default function LoansAdminPage() {
  const [activeTab, setActiveTab] = useState<'pending' | 'active' | 'repaid'>('pending');

  const loans = [
    {
      id: 'L-101',
      member: 'Tunde Okafor',
      initials: 'TO',
      amount: '₦350,000',
      contributions: '₦210,000',
      maxEligible: '₦420,000',
      purpose: 'Stock Purchase',
      status: 'Pending_Secretary',
      approvals: { secretary: false, president: false, treasurer: false },
      guarantors: ['Adaeze Obi (Confirmed)', 'Kunle Adeyemi (Confirmed)'],
    },
    {
      id: 'L-102',
      member: 'Chioma Abia',
      initials: 'CA',
      amount: '₦500,000',
      contributions: '₦300,000',
      maxEligible: '₦600,000',
      purpose: 'Equipment Upgrade',
      status: 'Pending_President',
      approvals: { secretary: true, president: false, treasurer: false },
      guarantors: ['Ngozi Eze (Confirmed)', 'Bola Ibrahim (Confirmed)'],
    },
    {
      id: 'L-103',
      member: 'Yemi Martins',
      initials: 'YM',
      amount: '₦800,000',
      contributions: '₦200,000',
      maxEligible: '₦400,000',
      purpose: 'Store Rent',
      status: 'Rejected',
      approvals: { secretary: false, president: false, treasurer: false },
      guarantors: ['Fatima Kuti (Pending)'],
    },
    {
      id: 'L-104',
      member: 'Adaeze Obi',
      initials: 'AO',
      amount: '₦500,000',
      contributions: '₦960,000',
      maxEligible: '₦1,920,000',
      purpose: 'Business Expansion',
      status: 'Active',
      approvals: { secretary: true, president: true, treasurer: true },
      guarantors: ['Tunde Okafor (Confirmed)', 'Chioma Abia (Confirmed)'],
    },
  ];

  return (
    <DashboardLayout>
      <div className="overview-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.25rem' }}>Loan Applications & Management</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Multi-Signature Approval Workflow (Secretary → President → Treasurer)</p>
        </div>
      </div>

      <div className="stats-grid" style={{ marginBottom: '2rem' }}>
        <div className="stat-card">
          <p className="stat-label">Pending Applications</p>
          <h3 className="stat-value">2</h3>
          <p className="stat-subtext">Awaiting executive signatures</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Total Outstanding Loans</p>
          <h3 className="stat-value" style={{ color: 'var(--brand-gold)' }}>₦8,400,000</h3>
          <p className="stat-subtext">34 active borrowers</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Cooperative Fund Pool</p>
          <h3 className="stat-value" style={{ color: 'var(--brand-green)' }}>₦12,400,000</h3>
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
          {loans.map((loan) => (
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
                  <div className="avatar-sm" style={{ width: '48px', height: '48px', fontSize: '1.1rem' }}>{loan.initials}</div>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>{loan.member}</h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>Purpose: {loan.purpose} • App ID: {loan.id}</p>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--brand-green)', margin: 0 }}>{loan.amount}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>Max Eligible: {loan.maxEligible}</p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', background: 'rgba(0, 0, 0, 0.2)', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
                <div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '0 0 0.25rem' }}>Member Contributions</p>
                  <p style={{ fontWeight: 600, margin: 0 }}>{loan.contributions}</p>
                </div>
                <div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '0 0 0.25rem' }}>Guarantors Backing</p>
                  <p style={{ fontWeight: 600, margin: 0, fontSize: '0.8rem' }}>{loan.guarantors.join(', ')}</p>
                </div>
                <div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '0 0 0.25rem' }}>Eligibility Check</p>
                  <span className={`badge ${parseInt(loan.amount.replace(/\D/g,'')) <= parseInt(loan.maxEligible.replace(/\D/g,'')) ? 'badge-paid' : 'badge-overdue'}`}>
                    {parseInt(loan.amount.replace(/\D/g,'')) <= parseInt(loan.maxEligible.replace(/\D/g,'')) ? '✓ Qualified (2x Limit)' : '⚠️ Exceeds Limit'}
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
          ))}
        </div>
      </Card>
    </DashboardLayout>
  );
}
