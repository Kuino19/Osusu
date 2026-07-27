'use client';

import React from 'react';
import './dashboard.css';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarItemProps {
  label: string;
  icon?: string;
  href: string;
}

const SidebarItem = ({ label, icon, href }: SidebarItemProps) => {
  const pathname = usePathname();
  const active = pathname === href;
  
  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <div className={`sidebar-item ${active ? 'active' : ''}`}>
        <span className="sidebar-icon">{icon}</span>
        <span className="sidebar-label">{label}</span>
      </div>
    </Link>
  );
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminView = pathname === '/dashboard' || pathname.startsWith('/dashboard/members') || pathname.startsWith('/dashboard/contributions') || pathname.startsWith('/dashboard/loans') || pathname.startsWith('/dashboard/reports') || pathname.startsWith('/dashboard/settings');
  const isMemberView = pathname.startsWith('/dashboard/member');

  // Determine current view from URL
  const currentView = isMemberView ? 'member' : 'admin';

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span style={{ color: 'white', fontWeight: 800 }}>O</span>
          </div>
          <h2 className="sidebar-brand">Osusu</h2>
        </div>
        
        <nav className="sidebar-nav">
          {currentView === 'admin' ? (
            <>
              <div className="nav-section">
                <p className="nav-section-title">Main</p>
                <SidebarItem label="Dashboard" icon="📊" href="/dashboard" />
                <SidebarItem label="Members" icon="👥" href="/dashboard/members" />
                <SidebarItem label="Contributions" icon="💰" href="/dashboard/contributions" />
                <SidebarItem label="Loans" icon="📝" href="/dashboard/loans" />
              </div>

              <div className="nav-section">
                <p className="nav-section-title">Reports & Setup</p>
                <SidebarItem label="Reports" icon="📋" href="/dashboard/reports" />
                <SidebarItem label="Migration Wizard" icon="📥" href="/dashboard/migration" />
                <SidebarItem label="Settings" icon="⚙️" href="/dashboard/settings" />
              </div>
            </>
          ) : (
            <>
              <div className="nav-section">
                <p className="nav-section-title">Personal</p>
                <SidebarItem label="Home" icon="🏠" href="/dashboard/member" />
                <SidebarItem label="Savings" icon="💰" href="/dashboard/member/savings" />
                <SidebarItem label="Loans" icon="📝" href="/dashboard/member/loans" />
                <SidebarItem label="Alerts" icon="🔔" href="/dashboard/member/alerts" />
              </div>

              <div className="nav-section">
                <p className="nav-section-title">Account</p>
                <SidebarItem label="Profile" icon="👤" href="/dashboard/member/profile" />
                <SidebarItem label="Settings" icon="⚙️" href="/dashboard/member/settings" />
              </div>
            </>
          )}
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="avatar">{currentView === 'admin' ? 'AO' : 'AO'}</div>
            <div className="user-info">
              <p className="user-name">Adaeze Obi</p>
              <p className="user-role">{currentView === 'admin' ? 'Executive Admin' : 'Member'}</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="top-nav" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="coop-tenant-badge" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255, 255, 255, 0.05)', padding: '0.4rem 0.875rem', borderRadius: '20px', border: '1px solid var(--border-subtle)' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--brand-green)' }}></span>
            <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Ikeja Traders Cooperative</span>
          </div>

          <div className="view-toggle">
            <Link href="/dashboard" className={`toggle-btn ${currentView === 'admin' ? 'active' : ''}`}>
              Admin view
            </Link>
            <Link href="/dashboard/member" className={`toggle-btn ${currentView === 'member' ? 'active' : ''}`}>
              Member view
            </Link>
          </div>
        </header>
        <section className="content-inner">
          {children}
        </section>
      </main>
    </div>
  );
}
