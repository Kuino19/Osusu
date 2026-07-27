'use client';

import React, { useState } from 'react';
import './dashboard.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from '@/lib/actions/auth';
import { 
  LayoutDashboard, 
  Users, 
  Wallet, 
  FileText, 
  PieChart, 
  ArrowRightLeft, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Home, 
  User, 
  Bell,
  Building2,
  ChevronRight
} from 'lucide-react';

interface SidebarItemProps {
  label: string;
  icon: React.ReactNode;
  href: string;
  onClick?: () => void;
}

const SidebarItem = ({ label, icon, href, onClick }: SidebarItemProps) => {
  const pathname = usePathname();
  const active = pathname === href;
  
  return (
    <Link href={href} style={{ textDecoration: 'none' }} onClick={onClick}>
      <div className={`sidebar-item ${active ? 'active' : ''}`}>
        <span className="sidebar-icon">{icon}</span>
        <span className="sidebar-label">{label}</span>
      </div>
    </Link>
  );
};

export interface DashboardLayoutProps {
  children: React.ReactNode;
  memberInfo?: {
    name: string;
    role: string;
    cooperativeName: string;
    initials: string;
  };
}

export default function DashboardLayout({ children, memberInfo }: DashboardLayoutProps) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const isMemberView = pathname.startsWith('/dashboard/member');
  const currentView = isMemberView ? 'member' : 'admin';

  const defaultMember = {
    name: memberInfo?.name || 'Adaeze Obi',
    role: memberInfo?.role || (currentView === 'admin' ? 'Executive Admin' : 'Member'),
    cooperativeName: memberInfo?.cooperativeName || 'Ikeja Traders Cooperative',
    initials: memberInfo?.initials || (memberInfo?.name ? memberInfo.name.substring(0, 2).toUpperCase() : 'AO')
  };

  const getBreadcrumbs = () => {
    const parts = pathname.split('/').filter(Boolean);
    if (parts.length <= 1) return ['Dashboard', 'Overview'];
    return parts.map(p => p.charAt(0).toUpperCase() + p.slice(1));
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <div className="dashboard-container">
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${isMobileOpen ? 'mobile-open' : ''}`}>
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
                <p className="nav-section-title">Main Management</p>
                <SidebarItem label="Dashboard" icon={<LayoutDashboard size={18} />} href="/dashboard" onClick={() => setIsMobileOpen(false)} />
                <SidebarItem label="Members" icon={<Users size={18} />} href="/dashboard/members" onClick={() => setIsMobileOpen(false)} />
                <SidebarItem label="Contributions" icon={<Wallet size={18} />} href="/dashboard/contributions" onClick={() => setIsMobileOpen(false)} />
                <SidebarItem label="Loans" icon={<FileText size={18} />} href="/dashboard/loans" onClick={() => setIsMobileOpen(false)} />
              </div>

              <div className="nav-section">
                <p className="nav-section-title">Reports & Setup</p>
                <SidebarItem label="Reports" icon={<PieChart size={18} />} href="/dashboard/reports" onClick={() => setIsMobileOpen(false)} />
                <SidebarItem label="Migration Wizard" icon={<ArrowRightLeft size={18} />} href="/dashboard/migration" onClick={() => setIsMobileOpen(false)} />
                <SidebarItem label="Settings" icon={<Settings size={18} />} href="/dashboard/settings" onClick={() => setIsMobileOpen(false)} />
              </div>
            </>
          ) : (
            <>
              <div className="nav-section">
                <p className="nav-section-title">Personal Portal</p>
                <SidebarItem label="Home" icon={<Home size={18} />} href="/dashboard/member" onClick={() => setIsMobileOpen(false)} />
                <SidebarItem label="Savings Passbook" icon={<Wallet size={18} />} href="/dashboard/member/savings" onClick={() => setIsMobileOpen(false)} />
                <SidebarItem label="My Loans" icon={<FileText size={18} />} href="/dashboard/member/loans" onClick={() => setIsMobileOpen(false)} />
                <SidebarItem label="Alerts & Reminders" icon={<Bell size={18} />} href="/dashboard/member/alerts" onClick={() => setIsMobileOpen(false)} />
              </div>

              <div className="nav-section">
                <p className="nav-section-title">Account</p>
                <SidebarItem label="My Profile" icon={<User size={18} />} href="/dashboard/member/profile" onClick={() => setIsMobileOpen(false)} />
                <SidebarItem label="Settings" icon={<Settings size={18} />} href="/dashboard/member/settings" onClick={() => setIsMobileOpen(false)} />
              </div>
            </>
          )}
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="avatar">{defaultMember.initials}</div>
            <div className="user-info">
              <p className="user-name">{defaultMember.name}</p>
              <p className="user-role">{defaultMember.role}</p>
            </div>
          </div>

          <form action={signOut}>
            <button 
              type="submit" 
              className="sidebar-item" 
              style={{ width: '100%', background: 'none', border: 'none', color: '#f87171', marginTop: '0.25rem' }}
            >
              <span className="sidebar-icon"><LogOut size={18} /></span>
              <span className="sidebar-label">Sign Out</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Layout Area */}
      <main className="main-content">
        <header className="top-nav">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button 
              className="mobile-menu-btn" 
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="Toggle navigation menu"
            >
              {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Breadcrumb Path Indicator */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <Building2 size={15} style={{ color: 'var(--brand-green)' }} />
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{defaultMember.cooperativeName}</span>
              {breadcrumbs.map((b, i) => (
                <React.Fragment key={i}>
                  <ChevronRight size={14} style={{ color: 'var(--text-muted)' }} />
                  <span style={{ color: i === breadcrumbs.length - 1 ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                    {b}
                  </span>
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="view-toggle">
            <Link href="/dashboard" className={`toggle-btn ${currentView === 'admin' ? 'active' : ''}`}>
              Admin View
            </Link>
            <Link href="/dashboard/member" className={`toggle-btn ${currentView === 'member' ? 'active' : ''}`}>
              Member View
            </Link>
          </div>
        </header>

        <section className="content-inner animate-fade-in">
          {children}
        </section>
      </main>
    </div>
  );
}
