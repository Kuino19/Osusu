'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Search, ChevronLeft, ChevronRight, Download, Send } from 'lucide-react';

type Contribution = {
  id: string;
  member: string | null;
  amount: string;
  status: string | null;
  date: string;
  method: string;
  ref: string | null;
};

export default function ContributionsClient({ 
  contributionsList, 
  totalExpected, 
  collectedSoFar, 
  outstandingBalance, 
  paidCount 
}: { 
  contributionsList: Contribution[],
  totalExpected: number,
  collectedSoFar: number,
  outstandingBalance: number,
  paidCount: number
}) {
  const [filter, setFilter] = useState<'all' | 'Confirmed' | 'Pending'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filtered = contributionsList.filter(c => {
    const matchesFilter = filter === 'all' || c.status === filter;
    const matchesSearch = c.member?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const paginatedList = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <>
      <div className="overview-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.25rem' }}>Monthly Contributions Ledger</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Collection Cycle — Executive Dashboard</p>
        </div>
      </div>

      <div className="stats-grid" style={{ marginBottom: '2rem' }}>
        <div className="stat-card">
          <p className="stat-label">Total Expected Pool</p>
          <h3 className="stat-value">₦{totalExpected.toLocaleString()}</h3>
          <p className="stat-subtext">Active members @ ₦20k</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Collected So Far</p>
          <h3 className="stat-value" style={{ color: 'var(--brand-green)' }}>₦{collectedSoFar.toLocaleString()}</h3>
          <p className="stat-subtext">{paidCount} members paid</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Outstanding Balance</p>
          <h3 className="stat-value" style={{ color: '#f87171' }}>₦{outstandingBalance.toLocaleString()}</h3>
          <p className="stat-subtext">Pending / Overdue</p>
        </div>
      </div>

      <Card glass className="widget-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
            <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search member name..." 
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="input-field"
              style={{ paddingLeft: '2.5rem' }}
            />
          </div>

          <div className="view-toggle">
            {(['all', 'Confirmed', 'Pending'] as const).map(f => (
              <button 
                key={f}
                className={`toggle-btn ${filter === f ? 'active' : ''}`}
                onClick={() => { setFilter(f); setCurrentPage(1); }}
                style={{ textTransform: 'capitalize' }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Member Name</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
              <th>Method / Ref</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedList.length > 0 ? paginatedList.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className="member-cell">
                    <div className="avatar-sm">{item.member?.substring(0, 2).toUpperCase() || 'M'}</div>
                    {item.member || 'Member'}
                  </div>
                </td>
                <td style={{ fontWeight: 700 }}>₦{Number(item.amount).toLocaleString()}</td>
                <td>
                  <span className={`badge badge-${item.status?.toLowerCase()}`}>
                    {item.status}
                  </span>
                </td>
                <td style={{ color: 'var(--text-secondary)' }}>{item.date}</td>
                <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {item.ref ? `${item.method} (${item.ref})` : item.method}
                </td>
                <td>
                  {item.status === 'Confirmed' ? (
                    <button className="widget-btn" style={{ padding: '0.3rem 0.65rem', fontSize: '0.75rem' }}>
                      <Download size={14} /> Receipt
                    </button>
                  ) : (
                    <button className="widget-btn" style={{ background: '#25D366', border: 'none', color: 'white', padding: '0.3rem 0.65rem', fontSize: '0.75rem' }}>
                      <Send size={14} /> Remind
                    </button>
                  )}
                </td>
              </tr>
            )) : (
              <tr><td colSpan={6} style={{textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)'}}>No contributions match search query</td></tr>
            )}
          </tbody>
        </table>

        {/* Pagination Footer */}
        {filtered.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filtered.length)} of {filtered.length} entries
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
