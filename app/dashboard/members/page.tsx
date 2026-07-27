import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { db } from '@/lib/db';
import { members } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { getCurrentMember } from '@/lib/auth';
import { redirect } from 'next/navigation';
import MembersClient from './MembersClient';

export default async function MembersPage() {
  const currentMember = await getCurrentMember();
  
  if (!currentMember) {
    redirect('/auth');
  }

  const coopId = currentMember.cooperativeId;

  // Fetch members
  const membersList = await db.select({
    id: members.id,
    fullName: members.fullName,
    role: members.role,
    totalContributions: members.totalContributions,
  })
  .from(members)
  .where(eq(members.cooperativeId, coopId))
  .orderBy(members.fullName);

  return (
    <DashboardLayout>
      <MembersClient membersList={membersList} />
    </DashboardLayout>
  );
}
