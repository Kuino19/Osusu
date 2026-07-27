import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { db } from '@/lib/db';
import { members, contributions, loans, cooperatives } from '@/lib/db/schema';
import { eq, sql, count, desc } from 'drizzle-orm';
import { getCurrentMember } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function DashboardOverview() {
  const currentMember = await getCurrentMember();
  
  if (!currentMember) {
    redirect('/auth');
  }

  const coopId = currentMember.cooperativeId;

  // 0. Fetch Cooperative Info
  const [coop] = await db.select().from(cooperatives).where(eq(cooperatives.id, coopId));

  // 1. Total Members
  const membersResult = await db.select({ count: count() }).from(members).where(eq(members.cooperativeId, coopId));
  const totalMembers = membersResult[0].count;

  // 2. Active & Outstanding Loans
  const loansResult = await db.select({ count: count() })
    .from(loans)
    .where(
      sql`${loans.cooperativeId} = ${coopId} AND ${loans.status} IN ('Disbursed', 'Active')`
    );
  const activeLoans = loansResult[0].count;

  // 3. Collection Progress (Assuming 20k per member per cycle)
  const monthlyPool = totalMembers * 20000;
  
  // Recent contributions
  const recentContributions = await db.select({
    id: contributions.id,
    amount: contributions.amount,
    status: contributions.status,
    member: members.fullName,
  })
  .from(contributions)
  .leftJoin(members, eq(contributions.memberId, members.id))
  .where(eq(contributions.cooperativeId, coopId))
  .orderBy(desc(contributions.createdAt))
  .limit(5);

  // Compute Total Confirmed Collected Amount
  const confirmedContributions = await db.select({
    amount: contributions.amount
  })
  .from(contributions)
  .where(sql`${contributions.cooperativeId} = ${coopId} AND ${contributions.status} = 'Confirmed'`);

  const totalCollected = confirmedContributions.reduce((sum, c) => sum + Number(c.amount || 0), 0);
  const collectionRate = monthlyPool > 0 ? Math.min(Math.round((totalCollected / monthlyPool) * 100), 100) : 0;
  const paidCount = confirmedContributions.length;

  // 4. Fetch Recent Loan Applications (Replacing Mock Array)
  const recentLoans = await db.select({
    id: loans.id,
    principal: loans.principal,
    status: loans.status,
    purpose: loans.purpose,
    member: members.fullName,
  })
  .from(loans)
  .leftJoin(members, eq(loans.memberId, members.id))
  .where(eq(loans.cooperativeId, coopId))
  .orderBy(desc(loans.createdAt))
  .limit(5);

  const memberInfo = {
    name: currentMember.fullName,
    role: currentMember.role || 'Executive Admin',
    cooperativeName: coop?.name || 'My Cooperative',
    initials: currentMember.fullName.substring(0, 2).toUpperCase()
  };

  return (
    <DashboardLayout memberInfo={memberInfo}>
      <div className="overview-header">
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.25rem' }}>
          Executive Dashboard — {coop?.name}
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          Real-time aggregate performance & financial operations
        </p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <p className="stat-label">Total Active Members</p>
          <h3 className="stat-value">{totalMembers}</h3>
          <p className="stat-subtext" style={{ color: 'var(--brand-green)' }}>Synced with DB</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Target Monthly Pool</p>
          <h3 className="stat-value">₦{(monthlyPool/1000000).toFixed(2)}M</h3>
          <p className="stat-subtext">₦20k avg / member</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Active Disbursed Loans</p>
          <h3 className="stat-value">{activeLoans}</h3>
          <p className="stat-subtext">See loan section for approvals</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Collection Rate</p>
          <h3 className="stat-value" style={{ color: 'var(--brand-green)' }}>{collectionRate}%</h3>
          <p className="stat-subtext">{paidCount} confirmed entries</p>
        </div>
      </div>

      <div className="widgets-grid">
        {/* Recent Contributions Widget */}
        <div className="widget-card">
          <div className="widget-header">
            <h3 className="widget-title">Recent Contributions</h3>
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
                <tr key={i}>
                  <td>
                    <div className="member-cell">
                      <div className="avatar-sm">{item.member?.substring(0, 2).toUpperCase() || 'M'}</div>
                      {item.member || 'Member'}
                    </div>
                  </td>
                  <td style={{ fontWeight: 600 }}>₦{Number(item.amount).toLocaleString()}</td>
                  <td>
                    <span className={`badge badge-${item.status?.toLowerCase()}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={3} style={{textAlign: 'center', padding: '1.5rem', color: 'var(--text-secondary)'}}>No contributions logged yet</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Loan Applications Widget (Bound to Real DB) */}
        <div className="widget-card">
          <div className="widget-header">
            <h3 className="widget-title">Loan Applications</h3>
            <Link href="/dashboard/loans">
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
              {recentLoans.length > 0 ? recentLoans.map((item, i) => (
                <tr key={i}>
                  <td>
                    <div className="member-cell">
                      <div className="avatar-sm">{item.member?.substring(0, 2).toUpperCase() || 'M'}</div>
                      {item.member || 'Member'}
                    </div>
                  </td>
                  <td style={{ fontWeight: 600 }}>₦{Number(item.principal).toLocaleString()}</td>
                  <td>
                    <span className={`badge badge-${item.status?.toLowerCase().includes('pending') ? 'pending' : 'active'}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={3} style={{textAlign: 'center', padding: '1.5rem', color: 'var(--text-secondary)'}}>No loan applications recorded</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Collection Progress Card */}
      <div className="collection-progress">
        <div className="progress-info">
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}>Active Collection Progress</h3>
            <p className="stat-subtext">{paidCount} members paid</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p className="progress-value">₦{totalCollected.toLocaleString()} / ₦{monthlyPool.toLocaleString()}</p>
            <p className="stat-subtext">{Math.max(totalMembers - paidCount, 0)} pending</p>
          </div>
        </div>
        <div className="progress-bar-bg">
          <div className="progress-bar-fill" style={{ width: `${collectionRate}%` }}></div>
        </div>
      </div>
    </DashboardLayout>
  );
}
