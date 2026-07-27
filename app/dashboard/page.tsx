import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { db } from '@/lib/db';
import { members, contributions, loans, cooperatives } from '@/lib/db/schema';
import { eq, sql, count, desc } from 'drizzle-orm';
import { getCurrentMember } from '@/lib/auth';
import { redirect } from 'next/navigation';
import DashboardOverviewClient from './DashboardOverviewClient';

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
      sql`${loans.cooperativeId} = ${coopId} AND ${loans.status} IN ('Disbursed', 'Approved')`
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

  // 4. Fetch Recent Loan Applications
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
        <h1 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '0.25rem', color: 'var(--ink-indigo)' }}>
          Executive Dashboard — {coop?.name}
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          Real-time aggregate performance & passbook ledger operations
        </p>
      </div>

      <DashboardOverviewClient 
        totalMembers={totalMembers}
        monthlyPool={monthlyPool}
        activeLoans={activeLoans}
        collectionRate={collectionRate}
        paidCount={paidCount}
        recentContributions={recentContributions}
        recentLoans={recentLoans}
      />
    </DashboardLayout>
  );
}
