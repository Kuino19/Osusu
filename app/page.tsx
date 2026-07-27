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
  Sparkles,
  Award
} from 'lucide-react';
import { TransparentLedger } from '@/components/TransparentLedger';

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--passbook-cream)', color: 'var(--ink-indigo)' }}>
      {/* Header Navigation */}
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '1.25rem 2.5rem', 
        maxWidth: '1300px', 
        margin: '0 auto',
        borderBottom: '1px solid var(--hairline)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{ 
            width: '38px', 
            height: '38px', 
            background: 'var(--ledger-gold)', 
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--ink-indigo)',
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: '1.3rem',
            boxShadow: '0 4px 12px rgba(192, 138, 40, 0.3)'
          }}>
            O
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 800, letterSpacing: '-0.02em' }}>Osùsù</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link 
            href="/auth" 
            style={{ 
              color: 'var(--ink-indigo)', 
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
              background: 'var(--ink-indigo)', 
              color: '#FBF8F2', 
              fontSize: '0.9rem', 
              fontWeight: 600, 
              padding: '0.6rem 1.25rem', 
              borderRadius: '8px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 14px rgba(28, 42, 68, 0.2)',
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
            background: 'rgba(60, 110, 82, 0.12)', 
            border: '1px solid var(--guarantor-green)', 
            padding: '0.4rem 0.9rem', 
            borderRadius: '20px', 
            fontSize: '0.8rem', 
            color: 'var(--guarantor-green)', 
            fontWeight: 600,
            marginBottom: '1.5rem'
          }}>
            <ShieldCheck size={16} /> Enterprise Financial OS for Cooperatives
          </div>

          <h1 style={{ 
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', 
            fontWeight: 800, 
            lineHeight: 1.15, 
            letterSpacing: '-0.03em',
            marginBottom: '1.25rem',
            color: 'var(--ink-indigo)'
          }}>
            Modern Infrastructure for African Cooperative Societies & Unions
          </h1>

          <p style={{ 
            fontSize: '1.1rem', 
            color: 'var(--text-muted)', 
            marginBottom: '2rem',
            lineHeight: 1.6
          }}>
            Automate monthly contributions with Paystack, streamline 3-step executive loan approvals, track digital passbooks, and migrate legacy Excel records with enterprise security.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            <Link 
              href="/onboarding" 
              style={{ 
                background: 'var(--ink-indigo)', 
                color: '#FBF8F2', 
                fontSize: '1rem', 
                fontWeight: 600, 
                padding: '0.85rem 1.85rem', 
                borderRadius: '8px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 14px rgba(28, 42, 68, 0.25)'
              }}
            >
              Register Cooperative <ArrowRight size={18} />
            </Link>
            <Link 
              href="/auth" 
              style={{ 
                background: 'var(--paper-white)', 
                border: '1px solid var(--hairline)', 
                color: 'var(--ink-indigo)', 
                fontSize: '1rem', 
                fontWeight: 600, 
                padding: '0.85rem 1.85rem', 
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
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.875rem', color: 'var(--ink-indigo)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle2 size={16} style={{ color: 'var(--guarantor-green)' }} /> ACID Multi-Tenant Isolation
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle2 size={16} style={{ color: 'var(--guarantor-green)' }} /> Instant Paystack Receipts
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle2 size={16} style={{ color: 'var(--guarantor-green)' }} /> Termii SMS Passbook Alerts
            </div>
          </div>
        </div>

        {/* Visual Product Mockup Frame */}
        <div style={{ position: 'relative' }}>
          <div style={{ 
            background: 'var(--paper-white)', 
            border: '1.5px solid var(--hairline)', 
            borderRadius: '16px', 
            padding: '0.75rem',
            boxShadow: '0 16px 40px rgba(28, 42, 68, 0.12)'
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
                alt="Osùsù Executive Dashboard Visual Mockup" 
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
        background: 'var(--paper-white)', 
        borderTop: '1px solid var(--hairline)',
        borderBottom: '1px solid var(--hairline)',
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
          <div style={{ position: 'relative', height: '380px', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--hairline)' }}>
            <Image 
              src="/images/coop_leader.jpg" 
              alt="Cooperative Executive Managing Osùsù Software" 
              fill 
              style={{ objectFit: 'cover' }} 
            />
          </div>

          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--ink-indigo)' }}>
              Built for Executive Integrity & Unalterable Passbooks
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '2rem' }}>
              Osùsù empowers executives, treasurers, and trustees to maintain clear audit logs, prevent fraudulent disbursements, and give members instant 24/7 visibility into their passbook ledger.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div style={{ background: 'var(--passbook-cream)', padding: '1.25rem', borderRadius: '10px', border: '1px solid var(--hairline)' }}>
                <p className="font-display" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--guarantor-green)', marginBottom: '0.2rem' }}>3-Tier</p>
                <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--ink-indigo)' }}>Multi-Sig Approvals</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Secretary → President → Treasurer</p>
              </div>

              <div style={{ background: 'var(--passbook-cream)', padding: '1.25rem', borderRadius: '10px', border: '1px solid var(--hairline)' }}>
                <p className="font-display" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--ledger-gold)', marginBottom: '0.2rem' }}>100%</p>
                <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--ink-indigo)' }}>Automated Reconciliation</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Paystack & Termii Sync</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Feature Showcase Grid */}
      <section style={{ padding: '5rem 2.5rem', maxWidth: '1300px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            Comprehensive Modules for Cooperative Societies
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '640px', margin: '0 auto' }}>
            Eliminate manual record-keeping errors and provide your members with an unalterable digital passbook experience.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
          {/* Card 1 */}
          <div style={{ background: 'var(--paper-white)', border: '1px solid var(--hairline)', borderRadius: '16px', padding: '2rem' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(60, 110, 82, 0.12)', color: 'var(--guarantor-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <Wallet size={22} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>Paystack & Termii Passbooks</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', lineHeight: 1.5, marginBottom: '1.5rem' }}>
              Members pay monthly levies via Card, Bank Transfer, or USSD with instant Termii SMS receipts.
            </p>
            <div style={{ position: 'relative', height: '220px', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--hairline)' }}>
              <Image src="/images/mobile_mockup.jpg" alt="Mobile Passbook App Interface" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>

          {/* Card 2 */}
          <div style={{ background: 'var(--paper-white)', border: '1px solid var(--hairline)', borderRadius: '16px', padding: '2rem' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(192, 138, 40, 0.12)', color: 'var(--ledger-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <ShieldCheck size={22} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>Multi-Sig Loan Authorizations</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', lineHeight: 1.5, marginBottom: '1.5rem' }}>
              Configurable executive approval workflow with automatic 2x/3x savings eligibility checks.
            </p>
            <div style={{ background: 'var(--passbook-cream)', padding: '1.25rem', borderRadius: '10px', border: '1px solid var(--hairline)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.8rem', fontWeight: 600 }}>
                <span>APPROVAL PIPELINE</span>
                <span className="ink-stamp-badge stamp-approved" style={{ fontSize: '0.7rem' }}>2 OF 3 SIGNED</span>
              </div>
              <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                <span className="badge badge-paid" style={{ fontSize: '0.75rem' }}>✓ 1. Secretary</span>
                <span className="badge badge-paid" style={{ fontSize: '0.75rem' }}>✓ 2. President</span>
                <span className="badge badge-pending" style={{ fontSize: '0.75rem' }}>⌛ 3. Treasurer</span>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div style={{ background: 'var(--paper-white)', border: '1px solid var(--hairline)', borderRadius: '16px', padding: '2rem' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(28, 42, 68, 0.1)', color: 'var(--ink-indigo)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <FileSpreadsheet size={22} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>Legacy Excel Migration Wizard</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', lineHeight: 1.5, marginBottom: '1.5rem' }}>
              Migrate existing paper registers and Excel spreadsheets into Osùsù in minutes with automated column mapping.
            </p>
            <div style={{ background: 'var(--passbook-cream)', padding: '1.25rem', borderRadius: '10px', border: '1px solid var(--hairline)' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--guarantor-green)', marginBottom: '0.3rem' }}>✓ CSV Header Auto-Detector</div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Supports Member Rosters, Historical Passbooks, and Loan Ledgers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Live Passbook Ledger Demonstration */}
      <section style={{ padding: '3rem 2.5rem 5rem', maxWidth: '1000px', margin: '0 auto' }}>
        <TransparentLedger />
      </section>

      {/* CTA Footer Banner */}
      <section style={{ padding: '0 2.5rem 6rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ 
          background: 'var(--paper-white)', 
          border: '1px solid var(--hairline)', 
          borderRadius: '20px', 
          padding: '3.5rem 2.5rem', 
          textAlign: 'center',
          boxShadow: '0 4px 20px rgba(28, 42, 68, 0.06)'
        }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.25rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--ink-indigo)' }}>
            Transform Your Cooperative Society Today
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
            Register your cooperative, configure custom governance roles, and activate Termii SMS passbooks in under 90 seconds.
          </p>
          <Link 
            href="/onboarding" 
            style={{ 
              background: 'var(--ink-indigo)', 
              color: '#FBF8F2', 
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
        borderTop: '1px solid var(--hairline)', 
        padding: '2.5rem 2.5rem', 
        textAlign: 'center',
        color: 'var(--text-muted)',
        fontSize: '0.875rem'
      }}>
        <p>© 2026 Osùsù Cooperative Enterprise Platform. All rights reserved.</p>
      </footer>
    </div>
  );
}
