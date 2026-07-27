'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { 
  Users, 
  Wallet, 
  FileText, 
  TrendingUp, 
  Check, 
  Clock, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface DashboardOverviewClientProps {
  totalMembers: number;
  monthlyPool: number;
  activeLoans: number;
  collectionRate: number;
  paidCount: number;
  recentContributions: any[];
  recentLoans: any[];
}

export default function DashboardOverviewClient({
  totalMembers,
  monthlyPool,
  activeLoans,
  collectionRate,
  paidCount,
  recentContributions,
  recentLoans
}: DashboardOverviewClientProps) {
  const shouldReduceMotion = useReducedMotion();

  // Animated Count-Up State
  const [memberCount, setMemberCount] = useState(0);
  const [poolDisplay, setPoolDisplay] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) {
      setMemberCount(totalMembers);
      setPoolDisplay(monthlyPool);
      return;
    }

    // Ease-out count up
    let start = 0;
    const duration = 600;
    const steps = 30;
    const stepTime = duration / steps;
    
    const timer = setInterval(() => {
      start++;
      const progress = start / steps;
      const easeProgress = 1 - Math.pow(1 - progress, 3); // cubic ease out
      setMemberCount(Math.round(totalMembers * easeProgress));
      setPoolDisplay(Math.round(monthlyPool * easeProgress));

      if (start >= steps) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [totalMembers, monthlyPool, shouldReduceMotion]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* KPI Cards Grid */}
      <div className="stats-grid">
        {/* Card 1: Total Members */}
        <motion.div 
          className="stat-card"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
            <p className="stat-label">Total Active Members</p>
            <Users size={18} style={{ color: 'var(--ink-indigo)', opacity: 0.7 }} />
          </div>
          <h3 className="stat-value">{memberCount}</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {/* Animated SVG Sparkline */}
            <svg width="60" height="20" viewBox="0 0 60 20" style={{ overflow: 'visible' }}>
              <motion.path
                d="M 0 16 L 15 10 L 30 14 L 45 4 L 60 2"
                fill="none"
                stroke="var(--guarantor-green)"
                strokeWidth="2"
                initial={shouldReduceMotion ? false : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </svg>
            <span className="stat-subtext" style={{ color: 'var(--guarantor-green)', fontWeight: 600 }}>+3 this cycle</span>
          </div>
        </motion.div>

        {/* Card 2: Target Pool */}
        <motion.div 
          className="stat-card"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.08 }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
            <p className="stat-label">Target Monthly Pool</p>
            <Wallet size={18} style={{ color: 'var(--ledger-gold)', opacity: 0.9 }} />
          </div>
          <h3 className="stat-value">₦{(poolDisplay / 1000000).toFixed(2)}M</h3>
          <p className="stat-subtext">₦20,000 avg / member</p>
        </motion.div>

        {/* Card 3: Active Loans */}
        <motion.div 
          className="stat-card"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.16 }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
            <p className="stat-label">Active Disbursed Loans</p>
            <FileText size={18} style={{ color: 'var(--ink-indigo)', opacity: 0.7 }} />
          </div>
          <h3 className="stat-value">{activeLoans}</h3>
          <p className="stat-subtext">See approval pipeline below</p>
        </motion.div>

        {/* Card 4: Collection Rate */}
        <motion.div 
          className="stat-card"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.24 }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
            <p className="stat-label">Collection Rate</p>
            <TrendingUp size={18} style={{ color: 'var(--guarantor-green)' }} />
          </div>
          <h3 className="stat-value" style={{ color: 'var(--guarantor-green)' }}>{collectionRate}%</h3>
          <p className="stat-subtext">{paidCount} confirmed entries</p>
        </motion.div>
      </div>

      {/* Widgets Section */}
      <div className="widgets-grid">
        {/* Recent Contributions Activity Feed with Slide-In */}
        <div className="widget-card">
          <div className="widget-header">
            <h3 className="widget-title">Recent Passbook Contributions</h3>
            <Link href="/dashboard/contributions">
              <button className="widget-btn">View All</button>
            </Link>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Member</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentContributions.length > 0 ? recentContributions.map((item, i) => (
                <motion.tr 
                  key={item.id || i}
                  initial={shouldReduceMotion ? false : { opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  style={{ background: i === 0 ? 'rgba(192, 138, 40, 0.06)' : 'transparent' }}
                >
                  <td>
                    <div className="member-cell">
                      <div className="avatar-sm">{item.member?.substring(0, 2).toUpperCase() || 'M'}</div>
                      {item.member || 'Member'}
                    </div>
                  </td>
                  <td style={{ fontWeight: 600, fontFamily: 'var(--font-mono)' }}>₦{Number(item.amount).toLocaleString()}</td>
                  <td>
                    <span className="ink-stamp-badge stamp-approved">
                      <Check size={12} /> {item.status}
                    </span>
                  </td>
                </motion.tr>
              )) : (
                <tr><td colSpan={3} style={{textAlign: 'center', padding: '1.5rem', color: 'var(--text-muted)'}}>No contributions logged yet</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Loan Applications Widget with Animated Multi-Sig Chips */}
        <div className="widget-card">
          <div className="widget-header">
            <h3 className="widget-title">Loan Applications & Multi-Sig</h3>
            <Link href="/dashboard/loans">
              <button className="widget-btn">View Pipeline</button>
            </Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {recentLoans.length > 0 ? recentLoans.map((item, i) => (
              <div 
                key={item.id || i}
                style={{ 
                  padding: '1rem', 
                  borderRadius: '8px', 
                  background: 'var(--passbook-cream)', 
                  border: '1px solid var(--hairline)' 
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{item.member || 'Member'}</span>
                  <span className="font-mono" style={{ fontWeight: 700, color: 'var(--guarantor-green)' }}>
                    ₦{Number(item.principal).toLocaleString()}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>MULTI-SIG:</span>
                  
                  {/* Approval Chips with Draw-in Checkmarks */}
                  <span className="badge badge-paid">
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }}>
                      <Check size={12} />
                    </motion.span>
                    1. Secretary
                  </span>
                  <span className="badge badge-paid">
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4 }}>
                      <Check size={12} />
                    </motion.span>
                    2. President
                  </span>
                  <span className="badge badge-pending">
                    <Clock size={12} /> 3. Treasurer
                  </span>
                </div>
              </div>
            )) : (
              <div style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--text-muted)' }}>
                No active loan approval workflows pending.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
