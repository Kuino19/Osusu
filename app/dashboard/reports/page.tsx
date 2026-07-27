'use client';

import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card } from '@/components/ui/Card';

export default function ReportsAdminPage() {
  const reports = [
    {
      title: 'Monthly Collection Statement',
      description: 'Detailed month-by-month financial summary of all member contributions and collection efficiency.',
      type: 'Financial',
      icon: '📊',
      lastGenerated: 'March 1, 2026'
    },
    {
      title: 'Annual Cooperative Audit',
      description: 'Comprehensive annual balance sheet, profit/loss breakdown, dividend calculations, and asset status.',
      type: 'Audit',
      icon: '📈',
      lastGenerated: 'December 31, 2025'
    },
    {
      title: 'Loan Recovery & Risk Report',
      description: 'Overview of active loans, repayment rates, overdue installments, and guarantor backing exposure.',
      type: 'Risk',
      icon: '📑',
      lastGenerated: 'March 15, 2026'
    },
    {
      title: 'Member Passbook Batch Export',
      description: 'Export digital passbooks for all active members with transaction timestamps and verified balances.',
      type: 'Passbook',
      icon: '📖',
      lastGenerated: 'March 18, 2026'
    }
  ];

  return (
    <DashboardLayout>
      <div className="overview-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.25rem' }}>Financial Reports & Statements</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>PDF Generation & Immutable Audit Exports — Ikeja Traders Cooperative</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        {reports.map((r, i) => (
          <Card key={i} glass className="widget-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div style={{ width: '48px', height: '48px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                  {r.icon}
                </div>
                <span className="badge badge-paid">{r.type}</span>
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>{r.title}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.4', marginBottom: '1.5rem' }}>{r.description}</p>
            </div>

            <div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>Last generated: {r.lastGenerated}</p>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button className="widget-btn" style={{ flex: 1, background: 'var(--brand-green)', border: 'none', padding: '0.6rem' }}>
                  Download PDF
                </button>
                <button className="widget-btn" style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border-subtle)', padding: '0.6rem 0.8rem' }}>
                  View Live
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
