'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Toast } from '@/components/ui/Toast';
import { registerMember } from '@/lib/actions/members';
import { ChevronLeft, ChevronRight, UserPlus } from 'lucide-react';

type Member = {
  id: string;
  fullName: string;
  role: string | null;
  totalContributions: string | null;
};

export default function MembersClient({ membersList }: { membersList: Member[] }) {
  const [isAdding, setIsAdding] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error', msg: string } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const totalPages = Math.ceil(membersList.length / itemsPerPage) || 1;
  const paginatedMembers = membersList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const res = await registerMember(formData);
    
    if (res.error) {
      setToast({ type: 'error', msg: res.error });
    } else {
      setToast({ type: 'success', msg: 'Member registered successfully!' });
      setIsAdding(false);
    }
  }

  return (
    <>
      {toast && (
        <Toast 
          type={toast.type} 
          message={toast.msg} 
          onClose={() => setToast(null)} 
        />
      )}

      <div className="members-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.35rem' }}>Member Directory</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Manage and register your cooperative members.</p>
        </div>
        <Button onClick={() => setIsAdding(!isAdding)}>
          <UserPlus size={18} /> {isAdding ? 'Cancel' : 'Add New Member'}
        </Button>
      </div>

      {isAdding && (
        <Card style={{ marginBottom: '2rem', maxWidth: '520px' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <Input name="fullName" label="Full Name" placeholder="e.g. John Doe" required />
            </div>
            <input type="hidden" name="email" value="dummy@example.com" />
            <div>
              <Input name="phone" label="Phone Number" placeholder="08012345678" required />
            </div>
            <div>
              <Input name="password" label="Initial Password" type="password" placeholder="••••••••" required />
            </div>
            <div>
              <label className="input-label">Assigned Role</label>
              <select name="role" className="input-field">
                <option value="Member">Member</option>
                <option value="Secretary">Secretary</option>
                <option value="Treasurer">Treasurer</option>
                <option value="President">President</option>
                <option value="Vice President">Vice President</option>
              </select>
            </div>
            <Button type="submit" style={{ marginTop: '0.5rem' }}>Create Member Account</Button>
          </form>
        </Card>
      )}

      <Card glass>
        <table className="data-table">
          <thead>
            <tr>
              <th>Member Name</th>
              <th>Cooperative Role</th>
              <th>Total Savings</th>
              <th>Account Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedMembers.length > 0 ? paginatedMembers.map((m) => (
              <tr key={m.id}>
                <td>
                  <div className="member-cell">
                    <div className="avatar-sm">{m.fullName.substring(0, 2).toUpperCase()}</div>
                    {m.fullName}
                  </div>
                </td>
                <td><span className="badge badge-paid">{m.role || 'Member'}</span></td>
                <td style={{ fontWeight: 600 }}>₦{Number(m.totalContributions || 0).toLocaleString()}</td>
                <td><span className="badge badge-active">Active</span></td>
              </tr>
            )) : (
              <tr><td colSpan={4} style={{textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)'}}>No members registered yet</td></tr>
            )}
          </tbody>
        </table>

        {/* Pagination Footer */}
        {membersList.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, membersList.length)} of {membersList.length} members
            </p>

            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <button 
                className="widget-btn" 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              >
                <ChevronLeft size={16} /> Prev
              </button>
              <span style={{ fontSize: '0.85rem', padding: '0 0.5rem', fontWeight: 600 }}>
                {currentPage} / {totalPages}
              </span>
              <button 
                className="widget-btn" 
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </Card>
    </>
  );
}
