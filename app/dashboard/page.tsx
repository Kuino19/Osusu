'use client';

import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card } from '@/components/ui/Card';

const StatCard = ({ title, value, detail, color }: { title: string, value: string, detail?: string, color: string }) => (
  <Card glass className="stat-card">
    <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>{title}</p>
    <h3 style={{ fontSize: '1.75rem', color: color }}>{value}</h3>
    {detail && <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>{detail}</p>}
  </Card>
);

export default function DashboardOverview() {
  return (
    <DashboardLayout>
      <div className="overview-header">
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>Overview — Ikeja Traders Cooperative</h1>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <p className="stat-label">Total Members</p>
          <h3 className="stat-value">148</h3>
          <p className="stat-subtext" style={{ color: 'var(--brand-green)' }}>+3 this month</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Monthly Pool</p>
          <h3 className="stat-value">₦2.96M</h3>
          <p className="stat-subtext">₦20k avg / member</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Active Loans</p>
          <h3 className="stat-value">34</h3>
          <p className="stat-subtext">₦8.4M outstanding</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Collection Rate</p>
          <h3 className="stat-value">91%</h3>
          <p className="stat-subtext">135 of 148 paid</p>
        </div>
      </div>

      <div className="widgets-grid">
        <div className="widget-card">
          <div className="widget-header">
            <h3 className="widget-title">Recent contributions</h3>
            <button className="widget-btn">View all</button>
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
              {[
                { name: 'Adaeze Obi', initials: 'AO', amount: '₦20,000', status: 'Paid' },
                { name: 'Kunle Adeyemi', initials: 'KA', amount: '₦20,000', status: 'Paid' },
                { name: 'Ngozi Eze', initials: 'NE', amount: '₦20,000', status: 'Pending' },
                { name: 'Bola Ibrahim', initials: 'BI', amount: '₦20,000', status: 'Overdue' },
              ].map((item, i) => (
                <tr key={i}>
                  <td>
                    <div className="member-cell">
                      <div className="avatar-sm">{item.initials}</div>
                      {item.name}
                    </div>
                  </td>
                  <td style={{ fontWeight: 600 }}>{item.amount}</td>
                  <td>
                    <span className={`badge badge-${item.status.toLowerCase()}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="widget-card">
          <div className="widget-header">
            <h3 className="widget-title">Loan applications</h3>
            <button className="widget-btn">View all</button>
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
              {[
                { name: 'Tunde Okafor', initials: 'TO', amount: '₦350,000', status: 'Pending' },
                { name: 'Chioma Abia', initials: 'CA', amount: '₦500,000', status: 'Approved' },
                { name: 'Yemi Martins', initials: 'YM', amount: '₦200,000', status: 'Rejected' },
                { name: 'Fatima Kuti', initials: 'FK', amount: '₦150,000', status: 'Rejected' },
              ].map((item, i) => (
                <tr key={i}>
                  <td>
                    <div className="member-cell">
                      <div className="avatar-sm">{item.initials}</div>
                      {item.name}
                    </div>
                  </td>
                  <td style={{ fontWeight: 600 }}>{item.amount}</td>
                  <td>
                    <span className={`badge badge-${item.status.toLowerCase()}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="collection-progress">
        <div className="progress-info">
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}>March 2026 collection progress</h3>
            <p className="stat-subtext">135 members paid</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p className="progress-value">₦2,700,000 / ₦2,960,000</p>
            <p className="stat-subtext">13 pending</p>
          </div>
        </div>
        <div className="progress-bar-bg">
          <div className="progress-bar-fill" style={{ width: '91%' }}></div>
        </div>
      </div>
    </DashboardLayout>
  );
}
