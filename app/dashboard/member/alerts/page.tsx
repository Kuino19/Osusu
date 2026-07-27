'use client';

import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card } from '@/components/ui/Card';

export default function MemberAlertsPage() {
  const notifications = [
    {
      group: 'Today',
      items: [
        { id: 1, title: 'Contribution Confirmed', body: 'Your March 2026 contribution of ₦20,000 has been verified.', time: '2h ago', type: 'success', icon: '💰' },
        { id: 2, title: 'Loan Repayment Due', body: 'Reminder: Your monthly loan repayment of ₦43,750 is due on April 1st.', time: '5h ago', type: 'warning', icon: '📅' },
      ]
    },
    {
      group: 'Yesterday',
      items: [
        { id: 3, title: 'New Cooperative Announcement', body: 'The Annual General Meeting (AGM) has been scheduled for May 15th at the Ikeja Center.', time: '1d ago', type: 'info', icon: '📢' },
        { id: 4, title: 'Loan Partially Repaid', body: 'We received your partial repayment of ₦10,000 for the February cycle.', time: '1d ago', type: 'success', icon: '💸' },
      ]
    },
    {
      group: 'Earlier this week',
      items: [
        { id: 5, title: 'Guarantor Request', body: 'Tunde Okafor has requested you to be a guarantor for his ₦350,000 loan.', time: '3d ago', type: 'action', icon: '🤝' },
      ]
    }
  ];

  return (
    <DashboardLayout>
      <div className="overview-header">
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>Alerts</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Stay updated with your cooperative activity</p>
      </div>

      <div className="alerts-container" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '2rem' }}>
        {notifications.map((group, i) => (
          <div key={i}>
            <h3 style={{ 
              fontSize: '0.875rem', 
              fontWeight: 700, 
              color: 'var(--text-secondary)', 
              textTransform: 'uppercase', 
              letterSpacing: '0.05em',
              marginBottom: '1rem' 
            }}>
              {group.group}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {group.items.map((item) => (
                <Card key={item.id} glass className="sidebar-item" style={{ 
                  display: 'flex', 
                  gap: '1rem', 
                  padding: '1.25rem',
                  alignItems: 'flex-start',
                  cursor: 'pointer'
                }}>
                  <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    background: 'rgba(255, 255, 255, 0.05)', 
                    borderRadius: '12px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: '1.25rem'
                  }}>
                    {item.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                      <h4 style={{ fontWeight: 600, fontSize: '1rem' }}>{item.title}</h4>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{item.time}</span>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>{item.body}</p>
                    {item.type === 'action' && (
                      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                        <button className="widget-btn" style={{ background: 'var(--brand-green)', border: 'none', padding: '0.4rem 1rem', fontSize: '0.8rem' }}>Accept</button>
                        <button className="widget-btn" style={{ background: 'transparent', border: '1px solid var(--border-subtle)', padding: '0.4rem 1rem', fontSize: '0.8rem' }}>Decline</button>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
