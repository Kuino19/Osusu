'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card } from '@/components/ui/Card';

type LedgerStat = {
  total_assets: number;
  total_loans: number;
  member_count: number;
};

export const TransparentLedger = () => {
  const [stats, setStats] = useState<LedgerStat>({
    total_assets: 12400000,
    total_loans: 8100000,
    member_count: 142
  });

  useEffect(() => {
    // 1. Subscribe to changes in financial_ledger or dedicated stats view
    const channel = supabase
      .channel('ledger-updates')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'financial_ledger' }, (payload) => {
        console.log('Ledger updated!', payload);
        // In a real app, we'd refetch aggregate stats or update state incrementally
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <Card className="ledger-preview">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
        <h3 style={{ margin: 0 }}>Transparent Ledger</h3>
        <span style={{ fontSize: '0.75rem', background: '#dcfce7', color: '#166534', padding: '0.1rem 0.4rem', borderRadius: '4px', fontWeight: 600 }}>LIVE</span>
      </div>
      <p className="ledger-hint" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        Aggregate cooperative financials visible to all members.
      </p>
      
      <div className="ledger-stats">
        {[
          { label: 'Total Cooperative Assets', value: stats.total_assets },
          { label: 'Total Loans Disbursed', value: stats.total_loans },
          { label: 'Number of Members', value: stats.member_count, isCurrency: false }
        ].map((stat, i) => (
          <div key={i} className="ledger-item" style={{ marginBottom: '1.25rem' }}>
            <span className="label" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block' }}>{stat.label}</span>
            <span className="value" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--brand-green)' }}>
              {stat.isCurrency === false ? stat.value : `₦${(stat.value / 1000000).toFixed(1)}M`}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};
