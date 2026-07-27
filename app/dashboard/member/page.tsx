import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card } from '@/components/ui/Card';
import Link from 'next/link';
import { db } from '@/lib/db';
import { members, cooperatives, loans, contributions } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';
import { getCurrentMember } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { 
  PlusCircle, 
  CreditCard, 
  BookOpen, 
  Bell, 
  Clock, 
  CheckCircle2, 
  ArrowUpRight, 
  ArrowDownLeft,
  Sparkles
} from 'lucide-react';

export default async function MemberDashboard() {
  const currentMember = await getCurrentMember();

  if (!currentMember) {
    redirect('/auth');
  }

  // Fetch Cooperative Details
  const [coop] = await db.select()
    .from(cooperatives)
    .where(eq(cooperatives.id, currentMember.cooperativeId));

  // Fetch Member's Active Loans
  const memberLoans = await db.select()
    .from(loans)
    .where(eq(loans.memberId, currentMember.id))
    .orderBy(desc(loans.createdAt));

  const activeLoan = memberLoans.find(l => l.status === 'Disbursed' || l.status === 'Approved' || l.status?.startsWith('Pending'));

  // Fetch Member's Recent Contributions
  const recentContributions = await db.select()
    .from(contributions)
    .where(eq(contributions.memberId, currentMember.id))
    .orderBy(desc(contributions.date))
    .limit(5);

  const memberInfo = {
    name: currentMember.fullName,
    role: currentMember.role || 'Member',
    cooperativeName: coop?.name || 'My Cooperative',
    initials: currentMember.fullName.substring(0, 2).toUpperCase()
  };

  const totalSavings = Number(currentMember.totalContributions || 0);

  return (
    <DashboardLayout memberInfo={memberInfo}>
      <div className="overview-header">
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.25rem' }}>
          Welcome back, {currentMember.fullName.split(' ')[0]} 👋
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          Personal Member Passbook & Loan Portal
        </p>
      </div>

      {/* Savings Hero Card */}
      <div className="stats-grid" style={{ gridTemplateColumns: '1fr', marginBottom: '2rem' }}>
        <div 
          className="stat-card" 
          style={{ 
            background: 'linear-gradient(135deg, #059669 0%, #10b981 50%, #047857 100%)', 
            border: 'none',
            padding: '2rem',
            boxShadow: '0 10px 30px rgba(16, 185, 129, 0.25)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <p className="stat-label" style={{ color: 'rgba(255, 255, 255, 0.85)', margin: 0 }}>Total Savings Balance</p>
            <span style={{ 
              background: 'rgba(255, 255, 255, 0.15)', 
              backdropFilter: 'blur(8px)',
              padding: '0.3rem 0.75rem', 
              borderRadius: '20px', 
              fontSize: '0.75rem', 
              color: 'white', 
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}>
              <Sparkles size={14} /> Active Passbook
            </span>
          </div>

          <h3 className="stat-value" style={{ fontSize: '2.75rem', marginBottom: '1.5rem', color: 'white' }}>
            ₦{totalSavings.toLocaleString()}
          </h3>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.15)', padding: '0.5rem 1rem', borderRadius: '12px', fontSize: '0.85rem', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={16} /> Next Monthly Contribution: ₦20,000
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Grid */}
      <div className="widgets-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
        {[
          { label: 'Pay Contribution', icon: <CreditCard size={22} />, color: '#10b981', href: '/dashboard/member/pay' },
          { label: 'Apply for Loan', icon: <PlusCircle size={22} />, color: '#3b82f6', href: '/dashboard/member/loans' },
          { label: 'Passbook History', icon: <BookOpen size={22} />, color: '#fbbf24', href: '/dashboard/member/savings' },
          { label: 'Alerts', icon: <Bell size={22} />, color: '#f87171', href: '/dashboard/member/alerts' },
        ].map((action, i) => (
          <Link key={i} href={action.href} style={{ textDecoration: 'none', textAlign: 'center' }}>
            <div style={{ 
              width: '100%', 
              aspectRatio: '1.1', 
              background: 'var(--bg-card)', 
              border: '1px solid var(--border-subtle)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: action.color,
              marginBottom: '0.6rem',
              cursor: 'pointer',
              transition: 'transform 0.2s ease, border-color 0.2s ease'
            }}
            className="sidebar-item"
            >
              {action.icon}
            </div>
            <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>{action.label}</p>
          </Link>
        ))}
      </div>

      {/* Active Loan Widget */}
      <div className="overview-header" style={{ marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>
          Active Loan Status
        </h2>
      </div>

      <div className="widget-card" style={{ marginBottom: '2.5rem' }}>
        {activeLoan ? (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                  ₦{Number(activeLoan.principal).toLocaleString()}
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  Purpose: {activeLoan.purpose || 'General Loan'} • Term: {activeLoan.termMonths} Months
                </p>
              </div>
              <span className={`badge badge-${activeLoan.status?.toLowerCase().includes('pending') ? 'pending' : 'active'}`}>
                {activeLoan.status}
              </span>
            </div>
            
            <div className="progress-bar-bg" style={{ marginBottom: '0.85rem', height: '8px' }}>
              <div className="progress-bar-fill" style={{ width: activeLoan.status === 'Disbursed' ? '40%' : '10%' }}></div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              <span>Monthly Repayment: ₦{Number(activeLoan.monthlyRepayment || 0).toLocaleString()}</span>
              <span>Rate: {activeLoan.interestRate}%</span>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '1.5rem 1rem', color: 'var(--text-secondary)' }}>
            <p style={{ fontSize: '0.95rem', marginBottom: '1rem' }}>You currently have no active loan applications.</p>
            <Link href="/dashboard/member/loans">
              <button className="widget-btn" style={{ background: 'var(--brand-green)', color: 'white', border: 'none' }}>
                <PlusCircle size={16} /> Request a Loan
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* Recent Activity Ledger */}
      <div className="overview-header">
        <h2 style={{ fontSize: '1rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>
          Recent Passbook Activity
        </h2>
      </div>

      <Card glass className="widget-card">
        {recentContributions.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {recentContributions.map((item) => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div style={{ 
                    width: '38px', 
                    height: '38px', 
                    background: 'rgba(16, 185, 129, 0.12)', 
                    color: '#34d399',
                    borderRadius: '10px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                  }}>
                    <ArrowDownLeft size={18} />
                  </div>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>Monthly Contribution</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {item.date ? item.date.toDateString() : 'Recent'} • Ref: {item.receiptId || 'Manual'}
                    </p>
                  </div>
                </div>
                <p style={{ fontWeight: 700, color: 'var(--brand-green)', fontSize: '0.95rem' }}>
                  +₦{Number(item.amount).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--text-secondary)' }}>
            No recent passbook transactions logged.
          </div>
        )}
      </Card>
    </DashboardLayout>
  );
}
