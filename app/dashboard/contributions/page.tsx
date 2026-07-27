import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { db } from '@/lib/db';
import { members, contributions } from '@/lib/db/schema';
import { eq, count } from 'drizzle-orm';
import { getCurrentMember } from '@/lib/auth';
import { redirect } from 'next/navigation';
import ContributionsClient from './ContributionsClient';

export default async function ContributionsAdminPage() {
  const currentMember = await getCurrentMember();
  
  if (!currentMember) {
    redirect('/auth');
  }

  const coopId = currentMember.cooperativeId;

  // 1. Total Expected (20k per member)
  const membersResult = await db.select({ count: count() }).from(members).where(eq(members.cooperativeId, coopId));
  const totalMembers = membersResult[0].count;
  const totalExpected = totalMembers * 20000;

  // 2. Fetch Contributions
  const contributionsData = await db.select({
    id: contributions.id,
    amount: contributions.amount,
    status: contributions.status,
    date: contributions.date,
    receiptId: contributions.receiptId,
    member: members.fullName,
  })
  .from(contributions)
  .leftJoin(members, eq(contributions.memberId, members.id))
  .where(eq(contributions.cooperativeId, coopId))
  .orderBy(contributions.date);

  const contributionsList = contributionsData.map(c => ({
    id: c.id,
    member: c.member,
    amount: c.amount,
    status: c.status,
    date: c.date ? c.date.toDateString() : '-',
    method: 'Paystack',
    ref: c.receiptId,
  }));

  const collectedSoFar = contributionsList.filter(c => c.status === 'Confirmed').reduce((sum, c) => sum + Number(c.amount), 0);
  const paidCount = contributionsList.filter(c => c.status === 'Confirmed').length;
  const outstandingBalance = totalExpected - collectedSoFar;

  return (
    <DashboardLayout>
      <ContributionsClient 
        contributionsList={contributionsList} 
        totalExpected={totalExpected}
        collectedSoFar={collectedSoFar}
        outstandingBalance={outstandingBalance}
        paidCount={paidCount}
      />
    </DashboardLayout>
  );
}
