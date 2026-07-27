import React from 'react';
import Link from 'next/link';
import { 
  Users, 
  Wallet, 
  ShieldCheck, 
  ArrowRight, 
  TrendingUp, 
  Lock, 
  FileSpreadsheet, 
  CheckCircle2, 
  Building2, 
  Layers,
  Sparkles
} from 'lucide-react';
import { TransparentLedger } from '@/components/TransparentLedger';

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', background: '#090d16', color: '#f8fafc' }}>
      {/* Navigation Header */}
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '1.25rem 2rem', 
        maxWidth: '1280px', 
        margin: '0 auto',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            background: 'linear-gradient(135deg, #10b981, #059669)', 
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)'
          }}>
            <span style={{ color: 'white', fontWeight: 800, fontSize: '1.2rem' }}>O</span>
          </div>
          <span style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.03em' }}>Osusu</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link 
            href="/auth" 
            style={{ 
              color: '#94a3b8', 
              fontSize: '0.925rem', 
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
              background: 'linear-gradient(135deg, #10b981, #059669)', 
              color: 'white', 
              fontSize: '0.925rem', 
              fontWeight: 600, 
              padding: '0.65rem 1.35rem', 
              borderRadius: '10px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 14px rgba(16, 185, 129, 0.25)',
              transition: 'transform 0.2s ease'
            }}
          >
            Register Cooperative <ArrowRight size={16} />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ 
        padding: '5rem 1.5rem 4rem', 
        maxWidth: '1280px', 
        margin: '0 auto', 
        textAlign: 'center',
        position: 'relative'
      }}>
        {/* Glow Effects */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, rgba(9, 13, 22, 0) 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '0.5rem', 
          background: 'rgba(16, 185, 129, 0.1)', 
          border: '1px solid rgba(16, 185, 129, 0.25)', 
          padding: '0.4rem 1rem', 
          borderRadius: '30px', 
          fontSize: '0.85rem', 
          color: '#34d399', 
          fontWeight: 600,
          marginBottom: '1.75rem'
        }}>
          <Sparkles size={15} /> Next-Generation Cooperative OS
        </div>

        <h1 style={{ 
          fontSize: 'clamp(2.5rem, 5vw, 4.25rem)', 
          fontWeight: 800, 
          lineHeight: 1.1, 
          letterSpacing: '-0.03em',
          maxWidth: '900px',
          margin: '0 auto 1.5rem',
          background: 'linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Modern, Transparent & Automated Cooperative Management
        </h1>

        <p style={{ 
          fontSize: '1.2rem', 
          color: '#94a3b8', 
          maxWidth: '680px', 
          margin: '0 auto 2.5rem',
          lineHeight: 1.6
        }}>
          Power your thrift union, Esusu, or credit cooperative with multi-tenant accounting, Paystack automated contributions, multi-signature loans, and legacy migration tools.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link 
            href="/onboarding" 
            style={{ 
              background: 'linear-gradient(135deg, #10b981, #059669)', 
              color: 'white', 
              fontSize: '1.05rem', 
              fontWeight: 600, 
              padding: '0.85rem 2rem', 
              borderRadius: '12px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              boxShadow: '0 6px 20px rgba(16, 185, 129, 0.35)'
            }}
          >
            Start Cooperative Onboarding <ArrowRight size={18} />
          </Link>
          <Link 
            href="/auth" 
            style={{ 
              background: 'rgba(255, 255, 255, 0.05)', 
              border: '1px solid rgba(255, 255, 255, 0.1)', 
              color: '#f8fafc', 
              fontSize: '1.05rem', 
              fontWeight: 600, 
              padding: '0.85rem 2rem', 
              borderRadius: '12px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem'
            }}
          >
            Sign In to Dashboard
          </Link>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section style={{ 
        padding: '2rem 1.5rem 4rem', 
        maxWidth: '1100px', 
        margin: '0 auto' 
      }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
          gap: '1.5rem',
          background: 'rgba(15, 23, 42, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '20px',
          padding: '2rem',
          backdropFilter: 'blur(12px)'
        }}>
          {[
            { label: 'Multi-Tenant Tenancies', value: '100% Isolated', detail: 'ACID Compliant DB' },
            { label: 'Collection Automated', value: 'Paystack Integrated', detail: 'Instant Webhook Receipts' },
            { label: 'Multi-Sig Approvals', value: '3-Step Workflow', detail: 'Secretary → Pres → Treas' },
            { label: 'Migration Speed', value: '1-Click Import', detail: 'Excel & CSV Wizard' },
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '1.35rem', fontWeight: 800, color: '#10b981', marginBottom: '0.25rem' }}>{stat.value}</p>
              <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#f8fafc', marginBottom: '0.2rem' }}>{stat.label}</p>
              <p style={{ fontSize: '0.75rem', color: '#64748b' }}>{stat.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section style={{ padding: '4rem 1.5rem', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>Everything Your Cooperative Needs</h2>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
            Built ground-up for African cooperative societies, market unions, and informal financial circles.
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '1.75rem' 
        }}>
          {[
            {
              icon: Building2,
              title: 'Multi-Tenant Cooperative Tenancies',
              desc: 'Separate, secure database workspaces for every cooperative union with automated tenant isolation.'
            },
            {
              icon: Wallet,
              title: 'Automated Contributions (Paystack)',
              desc: 'Seamless card, USSD, and bank transfer collections with instant digital passbook updates.'
            },
            {
              icon: ShieldCheck,
              title: 'Multi-Signature Loan Workflow',
              desc: '3-tier executive authorization (Secretary → President → Treasurer) before fund disbursement.'
            },
            {
              icon: FileSpreadsheet,
              title: 'Legacy Migration Wizard',
              desc: 'Easily import member rosters, historical contributions, and active loans from Excel or legacy tools.'
            },
            {
              icon: Layers,
              title: 'Transparent Passbook & Audit Trail',
              desc: 'Real-time aggregate financial visibility for all members with unalterable ledger logging.'
            },
            {
              icon: TrendingUp,
              title: 'Year-End Dividend Engine',
              desc: 'Automated profit distribution and dividend calculations based on member shareholding ratios.'
            },
          ].map((f, i) => (
            <div key={i} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                borderRadius: '12px', 
                background: 'rgba(16, 185, 129, 0.12)', 
                color: '#34d399', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}>
                <f.icon size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>{f.title}</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.925rem', lineHeight: 1.5 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Live Ledger Preview & CTA Banner */}
      <section style={{ padding: '4rem 1.5rem 6rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ 
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(15, 23, 42, 0.9) 100%)', 
          border: '1px solid rgba(16, 185, 129, 0.3)', 
          borderRadius: '24px', 
          padding: '3.5rem 2.5rem', 
          textAlign: 'center',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)'
        }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '1rem' }}>Ready to Modernize Your Cooperative?</h2>
          <p style={{ color: '#cbd5e1', fontSize: '1.1rem', maxWidth: '640px', margin: '0 auto 2.5rem' }}>
            Join forward-thinking cooperative unions today. Register your cooperative in under 2 minutes.
          </p>
          <Link 
            href="/onboarding" 
            style={{ 
              background: 'linear-gradient(135deg, #10b981, #059669)', 
              color: 'white', 
              fontSize: '1.1rem', 
              fontWeight: 700, 
              padding: '0.95rem 2.25rem', 
              borderRadius: '12px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              boxShadow: '0 8px 24px rgba(16, 185, 129, 0.4)'
            }}
          >
            Register Your Cooperative Now <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ 
        borderTop: '1px solid rgba(255, 255, 255, 0.08)', 
        padding: '2.5rem 2rem', 
        textAlign: 'center',
        color: '#64748b',
        fontSize: '0.875rem'
      }}>
        <p>© 2026 Osusu Cooperative Management System. All rights reserved.</p>
      </footer>
    </div>
  );
}
