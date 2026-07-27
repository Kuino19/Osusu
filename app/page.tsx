import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Building2, 
  Wallet, 
  ShieldCheck, 
  ArrowRight, 
  TrendingUp, 
  Lock, 
  FileSpreadsheet, 
  CheckCircle2, 
  Users, 
  Layers,
  Award,
  ChevronRight
} from 'lucide-react';
import { TransparentLedger } from '@/components/TransparentLedger';

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', background: '#0b0f19', color: '#f8fafc' }}>
      {/* Header */}
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '1.25rem 2.5rem', 
        maxWidth: '1300px', 
        margin: '0 auto',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{ 
            width: '38px', 
            height: '38px', 
            background: '#059669', 
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 800,
            fontSize: '1.25rem'
          }}>
            O
          </div>
          <span style={{ fontSize: '1.4rem', fontWeight: 700, letterSpacing: '-0.03em' }}>Osusu</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link 
            href="/auth" 
            style={{ 
              color: '#cbd5e1', 
              fontSize: '0.9rem', 
              fontWeight: 600, 
              padding: '0.5rem 1rem',
              transition: 'color 0.2s'
            }}
          >
            Sign In
          </Link>
          <Link 
            href="/onboarding" 
            style={{ 
              background: '#059669', 
              color: 'white', 
              fontSize: '0.9rem', 
              fontWeight: 600, 
              padding: '0.6rem 1.25rem', 
              borderRadius: '8px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'background-color 0.2s'
            }}
          >
            Register Cooperative <ArrowRight size={16} />
          </Link>
        </div>
      </header>

      {/* Hero Section with Visual Product Mockup */}
      <section style={{ 
        padding: '4.5rem 2.5rem 5rem', 
        maxWidth: '1300px', 
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1.1fr',
        gap: '3.5rem',
        alignItems: 'center'
      }}>
        <div>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            background: 'rgba(5, 150, 105, 0.12)', 
            border: '1px solid rgba(5, 150, 105, 0.3)', 
            padding: '0.4rem 0.9rem', 
            borderRadius: '20px', 
            fontSize: '0.8rem', 
            color: '#34d399', 
            fontWeight: 600,
            marginBottom: '1.5rem'
          }}>
            <ShieldCheck size={16} /> Enterprise Financial OS for Cooperatives
          </div>

          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', 
            fontWeight: 800, 
            lineHeight: 1.15, 
            letterSpacing: '-0.03em',
            marginBottom: '1.25rem',
            color: '#ffffff'
          }}>
            Modern Financial Infrastructure for Cooperative Unions & Thrift Societies
          </h1>

          <p style={{ 
            fontSize: '1.1rem', 
            color: '#94a3b8', 
            marginBottom: '2rem',
            lineHeight: 1.6
          }}>
            Automate monthly contributions with Paystack, streamline 3-step executive loan approvals, track digital passbooks, and migrate legacy Excel records with enterprise security.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            <Link 
              href="/onboarding" 
              style={{ 
                background: '#059669', 
                color: 'white', 
                fontSize: '1rem', 
                fontWeight: 600, 
                padding: '0.8rem 1.75rem', 
                borderRadius: '8px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              Register Cooperative <ArrowRight size={18} />
            </Link>
            <Link 
              href="/auth" 
              style={{ 
                background: 'rgba(255, 255, 255, 0.05)', 
                border: '1px solid rgba(255, 255, 255, 0.12)', 
                color: '#f8fafc', 
                fontSize: '1rem', 
                fontWeight: 600, 
                padding: '0.8rem 1.75rem', 
                borderRadius: '8px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              Sign In to Portal
            </Link>
          </div>

          {/* Key Bullet Checklist */}
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.875rem', color: '#cbd5e1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle2 size={16} style={{ color: '#34d399' }} /> ACID Multi-Tenant Isolation
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle2 size={16} style={{ color: '#34d399' }} /> Instant Paystack Receipts
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle2 size={16} style={{ color: '#34d399' }} /> 1-Click Excel Migration
            </div>
          </div>
        </div>

        {/* Visual Product Mockup Frame */}
        <div style={{ position: 'relative' }}>
          <div style={{ 
            background: '#0f172a', 
            border: '1px solid rgba(255, 255, 255, 0.12)', 
            borderRadius: '16px', 
            padding: '0.75rem',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)'
          }}>
            {/* Browser Frame Dots */}
            <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.75rem', paddingLeft: '0.5rem' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
            </div>

            <div style={{ borderRadius: '10px', overflow: 'hidden', position: 'relative', width: '100%', height: '360px' }}>
              <Image 
                src="/images/dashboard_mockup.jpg" 
                alt="Osusu Executive Dashboard Visual Mockup" 
                fill 
                style={{ objectFit: 'cover' }} 
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Social Proof & Leadership Section */}
      <section style={{ 
        background: '#0f172a', 
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '4rem 2.5rem' 
      }}>
        <div style={{ 
          maxWidth: '1300px', 
          margin: '0 auto', 
          display: 'grid', 
          gridTemplateColumns: '1fr 1.2fr', 
          gap: '3.5rem',
          alignItems: 'center'
        }}>
          <div style={{ position: 'relative', height: '380px', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <Image 
              src="/images/coop_leader.jpg" 
              alt="Cooperative Executive Managing Osusu Software" 
              fill 
              style={{ objectFit: 'cover' }} 
            />
          </div>

          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem', color: '#ffffff' }}>
              Built for Executive Transparency & Financial Integrity
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '2rem' }}>
              Osusu empowers executives, treasurers, and trustees to maintain clear audit logs, prevent fraudulent disbursements, and give members instant 24/7 visibility into their savings passbooks.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div style={{ background: '#131b2e', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <p style={{ fontSize: '1.5rem', fontWeight: 800, color: '#059669', marginBottom: '0.2rem' }}>3-Tier</p>
                <p style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f8fafc' }}>Multi-Sig Approvals</p>
                <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>Secretary → President → Treasurer</p>
              </div>

              <div style={{ background: '#131b2e', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <p style={{ fontSize: '1.5rem', fontWeight: 800, color: '#d97706', marginBottom: '0.2rem' }}>100%</p>
                <p style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f8fafc' }}>Automated Reconciliation</p>
                <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>Paystack Webhook Sync</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Feature Showcase Grid */}
      <section style={{ padding: '5rem 2.5rem', maxWidth: '1300px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            Comprehensive Modules Built for Modern Cooperatives
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: '640px', margin: '0 auto' }}>
            Eliminate manual record-keeping errors and provide your members with a digital passbook experience.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
          {/* Card 1 */}
          <div style={{ background: '#131b2e', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '2rem' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(5, 150, 105, 0.15)', color: '#34d399', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <Wallet size={22} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem' }}>Paystack Automated Collections</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.925rem', lineHeight: 1.5, marginBottom: '1.5rem' }}>
              Members can pay monthly levies via Card, Bank Transfer, or USSD with instant receipt PDF generation.
            </p>
            <div style={{ position: 'relative', height: '220px', borderRadius: '10px', overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <Image src="/images/mobile_mockup.jpg" alt="Mobile Passbook App Interface" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>

          {/* Card 2 */}
          <div style={{ background: '#131b2e', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '2rem' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(217, 119, 6, 0.15)', color: '#fbbf24', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <ShieldCheck size={22} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem' }}>Multi-Sig Loan Authorizations</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.925rem', lineHeight: 1.5, marginBottom: '1.5rem' }}>
              Multi-level executive approval workflow with automatic 2x/3x savings eligibility checks and guarantor verification.
            </p>
            <div style={{ background: '#0b0f19', padding: '1.25rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.8rem', fontWeight: 600 }}>
                <span>APPROVAL PIPELINE</span>
                <span style={{ color: '#34d399' }}>2 of 3 SIGNED</span>
              </div>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                <span className="badge badge-paid" style={{ fontSize: '0.75rem' }}>✓ 1. Secretary</span>
                <span className="badge badge-paid" style={{ fontSize: '0.75rem' }}>✓ 2. President</span>
                <span className="badge badge-pending" style={{ fontSize: '0.75rem' }}>⌛ 3. Treasurer</span>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div style={{ background: '#131b2e', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '2rem' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <FileSpreadsheet size={22} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem' }}>Legacy Excel Migration Wizard</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.925rem', lineHeight: 1.5, marginBottom: '1.5rem' }}>
              Migrate existing paper registers and Excel spreadsheets into Osusu in minutes with automated column mapping.
            </p>
            <div style={{ background: '#0b0f19', padding: '1.25rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#059669', marginBottom: '0.3rem' }}>✓ CSV Header Auto-Detector</div>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Supports Member Roster, Historical Passbooks, and Loan Ledgers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Live Ledger Preview */}
      <section style={{ padding: '3rem 2.5rem 5rem', maxWidth: '1000px', margin: '0 auto' }}>
        <TransparentLedger />
      </section>

      {/* CTA Footer Banner */}
      <section style={{ padding: '0 2.5rem 6rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ 
          background: '#0f172a', 
          border: '1px solid rgba(255, 255, 255, 0.1)', 
          borderRadius: '20px', 
          padding: '3.5rem 2.5rem', 
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '1rem', color: '#ffffff' }}>
            Transform Your Cooperative Society Today
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
            Register your cooperative, set up your admin workspace, and invite your members in under 5 minutes.
          </p>
          <Link 
            href="/onboarding" 
            style={{ 
              background: '#059669', 
              color: 'white', 
              fontSize: '1.05rem', 
              fontWeight: 600, 
              padding: '0.9rem 2.25rem', 
              borderRadius: '8px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            Get Started Free <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ 
        borderTop: '1px solid rgba(255, 255, 255, 0.08)', 
        padding: '2.5rem 2.5rem', 
        textAlign: 'center',
        color: '#64748b',
        fontSize: '0.875rem'
      }}>
        <p>© 2026 Osusu Enterprise Cooperative OS. All rights reserved.</p>
      </footer>
    </div>
  );
}
