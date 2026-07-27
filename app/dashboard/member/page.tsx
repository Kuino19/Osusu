'use client';

import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card } from '@/components/ui/Card';
import Link from 'next/link';

export default function MemberDashboard() {
  return (
    <DashboardLayout>
      <div className="overview-header">
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>Good morning, Adaeze 👋</h1>
      </div>

      <div className="stats-grid" style={{ gridTemplateColumns: '1fr' }}>
        <div className="stat-card" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', border: 'none' }}>
          <p className="stat-label" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Total savings</p>
          <h3 className="stat-value" style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>₦960,000</h3>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '0.5rem 1rem', borderRadius: '12px', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ opacity: 0.8 }}>🕒</span> Next due Apr 1
            </div>
            <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '0.5rem 1rem', borderRadius: '12px', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              ₦20,000 levy
            </div>
          </div>
        </div>
      </div>

      <div className="widgets-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2.5rem' }}>
        {[
          { label: 'Apply loan', icon: '💸', color: '#10b981', href: '/dashboard/member/loans?apply=true' },
          { label: 'Contributions', icon: '💳', color: '#3b82f6', href: '/dashboard/member/pay' },
          { label: 'Passbook', icon: '📖', color: '#fbbf24', href: '/dashboard/member/savings' },
          { label: 'Alerts', icon: '🔔', color: '#f87171', href: '/dashboard/member/alerts' },
        ].map((action, i) => (
          <Link key={i} href={action.href} style={{ textDecoration: 'none', textAlign: 'center' }}>
            <div style={{ 
              width: '100%', 
              aspectRatio: '1', 
              background: 'var(--card-bg)', 
              border: '1px solid var(--card-border)',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              marginBottom: '0.75rem',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            className="sidebar-item"
            >
              {action.icon}
            </div>
            <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>{action.label}</p>
          </Link>
        ))}
      </div>

      <div className="overview-header" style={{ marginTop: '2.5rem' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>Active Loan</h2>
      </div>

      <div className="widget-card" style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>₦500,000</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Business expansion</p>
          </div>
          <span className="badge badge-paid">Repaying</span>
        </div>
        
        <div className="progress-bar-bg" style={{ marginBottom: '1rem', height: '6px' }}>
          <div className="progress-bar-fill" style={{ width: '50%' }}></div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
          <span>50% repaid</span>
          <span>6 months left</span>
        </div>
      </div>

      <div className="overview-header">
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>Recent Activity</h2>
      </div>

      <Card glass className="widget-card">
        <div className="transaction-list" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {[
            { name: 'March contribution', date: 'Mar 1, 2026', amount: '-₦20,000', icon: '→', type: 'debit' },
            { name: 'Loan repayment', date: 'Mar 1, 2026', amount: '-₦43,750', icon: '₦', type: 'debit' },
            { name: 'Feb contribution', date: 'Feb 1, 2026', amount: '-₦20,000', icon: '→', type: 'debit' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '40px', height: '40px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {item.icon}
                </div>
                <div>
                  <p style={{ fontWeight: 600 }}>{item.name}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{item.date}</p>
                </div>
              </div>
              <p style={{ fontWeight: 700, color: item.type === 'debit' ? '#f87171' : 'var(--brand-green)' }}>{item.amount}</p>
            </div>
          ))}
        </div>
      </Card>
    </DashboardLayout>
  );
}
