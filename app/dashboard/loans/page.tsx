import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { db } from '@/lib/db';
import { members, loans } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { getCurrentMember } from '@/lib/auth';
import { redirect } from 'next/navigation';
import LoansClient from './LoansClient';

export default async function LoansAdminPage() {
  const currentMember = await getCurrentMember();
  
  if (!currentMember) {
    redirect('/auth');
  }

  const coopId = currentMember.cooperativeId;

  // Fetch loans with member details
  const loansData = await db.select({
    id: loans.id,
    amount: loans.principal,
    purpose: loans.purpose,
    status: loans.status,
    member: members.fullName,
    memberTotalContributions: members.totalContributions,
  })
  .from(loans)
  .leftJoin(members, eq(loans.memberId, members.id))
  .where(eq(loans.cooperativeId, coopId))
  .orderBy(loans.createdAt);

  const loansList = loansData.map(l => ({
    id: l.id,
    member: l.member,
    amount: l.amount,
    contributions: l.memberTotalContributions || '0',
    maxEligible: String((Number(l.memberTotalContributions || 0)) * 2), // Example rule: 2x contributions
    purpose: l.purpose,
    status: l.status,
    approvals: {
      secretary: l.status !== 'Pending_Secretary' && l.status !== 'Pending_Guarantor' && l.status !== 'Draft',
      president: l.status === 'Pending_Treasurer' || l.status === 'Approved' || l.status === 'Disbursed',
      treasurer: l.status === 'Approved' || l.status === 'Disbursed',
    },
    guarantors: [], // To be implemented with a separate guarantors table or JSON field
  }));

  return (
    <DashboardLayout>
      <LoansClient loansList={loansList} />
    </DashboardLayout>
  );
}
