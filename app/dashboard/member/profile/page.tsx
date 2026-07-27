'use client';

import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card } from '@/components/ui/Card';

export default function MemberProfilePage() {
  return (
    <DashboardLayout>
      <div className="overview-header">
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>My Profile</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Manage your personal information and preferences</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 400px) 1fr', gap: '2rem', marginTop: '2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <Card glass className="widget-card" style={{ textAlign: 'center', padding: '2.5rem 1.5rem' }}>
            <div style={{ 
              width: '100px', 
              height: '100px', 
              background: 'var(--brand-green)', 
              borderRadius: '50%', 
              margin: '0 auto 1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.5rem',
              fontWeight: 700,
              color: 'white',
              boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)'
            }}>
              AO
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>Adaeze Obi</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>Member since Jan 2024</p>
            <button className="widget-btn" style={{ width: '100%', padding: '0.75rem' }}>Edit Profile</button>
          </Card>

          <Card glass className="widget-card">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem' }}>Documents</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '1.25rem' }}>📖</span>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: '0.875rem' }}>Digital Passbook</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Updated: Today</p>
                  </div>
                </div>
                <button className="widget-btn" style={{ padding: '0.25rem 0.75rem', fontSize: '0.7rem' }}>Download PDF</button>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '1.25rem' }}>📝</span>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: '0.875rem' }}>Member Certificate</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Jan 2024</p>
                  </div>
                </div>
                <button className="widget-btn" style={{ padding: '0.25rem 0.75rem', fontSize: '0.7rem' }}>View</button>
              </div>
            </div>
          </Card>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <Card glass className="widget-card">
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem' }}>Personal Information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
              <div>
                <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Phone Number</p>
                <p style={{ fontWeight: 600 }}>+234 803 123 4567</p>
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Email</p>
                <p style={{ fontWeight: 600 }}>adaeze.obi@example.com</p>
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Address</p>
                <p style={{ fontWeight: 600 }}>12, Adeniyi Jones, Ikeja, Lagos</p>
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Occupation</p>
                <p style={{ fontWeight: 600 }}>Chartered Accountant</p>
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Next of Kin</p>
                <p style={{ fontWeight: 600 }}>Obinna Obi (Brother)</p>
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Branch</p>
                <p style={{ fontWeight: 600 }}>Ikeja Traders Unit</p>
              </div>
            </div>
          </Card>

          <Card glass className="widget-card">
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem' }}>Settings & Security</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontWeight: 600 }}>Push Notifications</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Get alerts for payments and announcements</p>
                </div>
                <div style={{ width: '40px', height: '20px', background: 'var(--brand-green)', borderRadius: '10px', position: 'relative' }}>
                  <div style={{ width: '16px', height: '16px', background: 'white', borderRadius: '50%', position: 'absolute', right: '2px', top: '2px' }}></div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontWeight: 600 }}>SMS Notifications</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Receive OTPs and alerts via SMS</p>
                </div>
                <div style={{ width: '40px', height: '20px', background: 'var(--brand-green)', borderRadius: '10px', position: 'relative' }}>
                  <div style={{ width: '16px', height: '16px', background: 'white', borderRadius: '50%', position: 'absolute', right: '2px', top: '2px' }}></div>
                </div>
              </div>
              <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)', marginTop: '0.5rem' }}>
                <button className="widget-btn" style={{ background: 'transparent', border: '1px solid #f87171', color: '#f87171', width: '100%', padding: '0.75rem' }}>
                  Sign Out
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
