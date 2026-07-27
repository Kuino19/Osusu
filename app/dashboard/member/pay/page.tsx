'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card } from '@/components/ui/Card';

type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export default function PaymentFlowPage() {
  const [step, setStep] = useState<Step>(1);
  const [paymentType, setPaymentType] = useState<'levy' | 'loan' | 'both'>('levy');
  const [method, setMethod] = useState<'card' | 'bank' | 'ussd' | 'wallet' | null>(null);
  const [autoPay, setAutoPay] = useState(false);

  const levyAmount = 20000;
  const loanAmount = 43750;
  const total = paymentType === 'levy' ? levyAmount : paymentType === 'loan' ? loanAmount : levyAmount + loanAmount;

  const nextStep = () => setStep((s) => (s + 1) as Step);
  const prevStep = () => setStep((s) => (s - 1) as Step);

  useEffect(() => {
    if (step === 5) {
      const timer = setTimeout(() => nextStep(), 2000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <DashboardLayout>
      <div className="payment-stepper-nav" style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
        {[1, 2, 3, 4, 5, 6, 7].map((s) => (
          <div 
            key={s} 
            style={{ 
              padding: '0.5rem 1rem', 
              borderRadius: '999px', 
              background: step === s ? 'var(--brand-green)' : 'rgba(255, 255, 255, 0.05)',
              color: step === s ? 'white' : 'var(--text-secondary)',
              fontSize: '0.75rem',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              border: step === s ? 'none' : '1px solid var(--border-subtle)',
              transition: 'all 0.2s'
            }}
          >
            {s}. {['Pay levy', 'Method', 'Card', 'USSD', 'Processing', 'Receipt', 'Auto-pay'][s-1]}
          </div>
        ))}
      </div>

      <div style={{ maxWidth: '480px', margin: '0 auto' }}>
        {step === 1 && (
          <Card glass className="widget-card">
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem' }}>What are you paying?</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              {[
                { id: 'levy', label: 'Monthly Levy', amount: levyAmount },
                { id: 'loan', label: 'Loan Repayment', amount: loanAmount },
                { id: 'both', label: 'Both (Levy + Loan)', amount: levyAmount + loanAmount },
              ].map((item) => (
                <div 
                  key={item.id}
                  onClick={() => setPaymentType(item.id as any)}
                  style={{ 
                    padding: '1.25rem', 
                    borderRadius: '12px', 
                    background: paymentType === item.id ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                    border: `1px solid ${paymentType === item.id ? '#10b981' : 'var(--border-subtle)'}`,
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <span style={{ fontWeight: 600 }}>{item.label}</span>
                  <span style={{ fontWeight: 700, color: 'var(--brand-green)' }}>₦{item.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div style={{ padding: '1.25rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontWeight: 600, fontSize: '0.875rem' }}>Auto-pay monthly</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Never miss a payment again</p>
                </div>
                <div 
                  onClick={() => setAutoPay(!autoPay)}
                  style={{ 
                    width: '40px', 
                    height: '20px', 
                    background: autoPay ? 'var(--brand-green)' : 'rgba(255, 255, 255, 0.2)', 
                    borderRadius: '10px', 
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ 
                    width: '16px', 
                    height: '16px', 
                    background: 'white', 
                    borderRadius: '50%', 
                    position: 'absolute', 
                    left: autoPay ? '22px' : '2px', 
                    top: '2px',
                    transition: 'all 0.2s'
                  }}></div>
                </div>
              </div>
            </div>

            <button 
              className="widget-btn" 
              style={{ width: '100%', padding: '1rem', background: 'var(--brand-green)', border: 'none' }}
              onClick={nextStep}
            >
              Continue to Payment (₦{total.toLocaleString()})
            </button>
          </Card>
        )}

        {step === 2 && (
          <Card glass className="widget-card">
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem' }}>Choose payment method</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
              {[
                { id: 'card', label: 'Card', icon: '💳' },
                { id: 'bank', label: 'Transfer', icon: '🏛️' },
                { id: 'ussd', label: 'USSD', icon: '📱' },
                { id: 'wallet', label: 'Wallet', icon: '👛' },
              ].map((m) => (
                <div 
                  key={m.id}
                  onClick={() => setMethod(m.id as any)}
                  style={{ 
                    padding: '1.5rem 1rem', 
                    borderRadius: '12px', 
                    background: method === m.id ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                    border: `1px solid ${method === m.id ? '#10b981' : 'var(--border-subtle)'}`,
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{m.icon}</div>
                  <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>{m.label}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button 
                className="widget-btn" 
                style={{ flex: 1, background: 'transparent', border: '1px solid var(--border-subtle)' }}
                onClick={prevStep}
              >
                Back
              </button>
              <button 
                className="widget-btn" 
                style={{ flex: 1, background: 'var(--brand-green)', border: 'none' }}
                disabled={!method}
                onClick={() => {
                  if (method === 'card') setStep(3);
                  else if (method === 'ussd') setStep(4);
                  else nextStep();
                }}
              >
                Continue
              </button>
            </div>
          </Card>
        )}

        {step === 3 && (
          <Card glass className="widget-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ background: '#09a5db', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ color: 'white', fontWeight: 700, margin: 0 }}>Paystack</h3>
              <span style={{ color: 'white', opacity: 0.8, fontSize: '0.75rem' }}>adaeze.obi@example.com</span>
            </div>
            <div style={{ padding: '2rem' }}>
              <p style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>Enter your card details to pay <span style={{ color: 'white', fontWeight: 700 }}>₦{total.toLocaleString()}</span></p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                <input type="text" placeholder="0000 0000 0000 0000" style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border-subtle)', padding: '0.75rem', borderRadius: '8px', color: 'white' }} />
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <input type="text" placeholder="MM / YY" style={{ flex: 1, background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border-subtle)', padding: '0.75rem', borderRadius: '8px', color: 'white' }} />
                  <input type="password" placeholder="CVV" style={{ flex: 1, background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border-subtle)', padding: '0.75rem', borderRadius: '8px', color: 'white' }} />
                </div>
              </div>

              <button 
                className="widget-btn" 
                style={{ width: '100%', padding: '1rem', background: '#09a5db', border: 'none' }}
                onClick={() => setStep(5)}
              >
                Pay ₦{total.toLocaleString()}
              </button>
              <button 
                style={{ width: '100%', background: 'none', border: 'none', color: '#f87171', marginTop: '1rem', cursor: 'pointer', fontSize: '0.875rem' }}
                onClick={() => setStep(2)}
              >
                Cancel Payment
              </button>
            </div>
          </Card>
        )}

        {step === 4 && (
          <Card glass className="widget-card">
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem' }}>Select your bank</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
              {['Access Bank', 'First Bank', 'GTBank', 'Kuda Bank', 'UBA', 'Zenith Bank'].map((bank) => (
                <button 
                  key={bank}
                  onClick={() => setStep(5)}
                  style={{ padding: '1rem', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border-subtle)', color: 'white', textAlign: 'left', cursor: 'pointer' }}
                >
                  {bank}
                </button>
              ))}
            </div>
            <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Dial <span style={{ color: 'var(--brand-green)', fontWeight: 700 }}>*737*1*20000#</span> on your mobile phone to complete payment</p>
            <button 
              className="widget-btn" 
              style={{ width: '100%', background: 'transparent', border: '1px solid var(--border-subtle)', marginTop: '1.5rem' }}
              onClick={() => setStep(2)}
            >
              Change Method
            </button>
          </Card>
        )}

        {step === 5 && (
          <Card glass className="widget-card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <div className="spinner" style={{ 
              width: '60px', 
              height: '60px', 
              border: '4px solid rgba(255, 255, 255, 0.1)', 
              borderTopColor: 'var(--brand-green)', 
              borderRadius: '50%', 
              margin: '0 auto 2rem',
              animation: 'spin 1s linear infinite'
            }}></div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Processing Payment...</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Please do not close this window</p>

            <style jsx>{`
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `}</style>
          </Card>
        )}

        {step === 6 && (
          <Card glass className="widget-card" style={{ textAlign: 'center' }}>
            <div style={{ 
              width: '80px', 
              height: '80px', 
              background: 'rgba(16, 185, 129, 0.1)', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              margin: '0 auto 1.5rem',
              color: '#10b981',
              fontSize: '2.5rem'
            }}>
              ✓
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Payment Successful!</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Receipt #OS-2603-991 has been sent to your email.</p>
            
            <div style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px', padding: '1.5rem', textAlign: 'left', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Amount Paid:</span>
                <span style={{ fontWeight: 700 }}>₦{total.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Reference:</span>
                <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>PSTK_77182992</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Date:</span>
                <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>Mar 18, 2026</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
              <button className="widget-btn" style={{ flex: 1, background: 'rgba(255, 255, 255, 0.1)', border: 'none', fontSize: '0.8rem' }}>PDF Receipt</button>
              <button className="widget-btn" style={{ flex: 1, background: '#25D366', border: 'none', color: 'white', fontSize: '0.8rem' }}>WhatsApp Share</button>
            </div>

            <button 
              className="widget-btn" 
              style={{ width: '100%', padding: '1rem', background: 'var(--brand-green)', border: 'none' }}
              onClick={nextStep}
            >
              Continue
            </button>
          </Card>
        )}

        {step === 7 && (
          <Card glass className="widget-card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>🚀</div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>Never miss a month!</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: '1.5' }}>
              Would you like to set up automatic debit for your monthly ₦20,000 levy? We'll notify you 3 days before each deduction.
            </p>

            <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600 }}>Enable Auto-debit</span>
                <div 
                  onClick={() => setAutoPay(!autoPay)}
                  style={{ 
                    width: '40px', 
                    height: '20px', 
                    background: autoPay ? 'var(--brand-green)' : 'rgba(255, 255, 255, 0.2)', 
                    borderRadius: '10px', 
                    position: 'relative',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ 
                    width: '16px', 
                    height: '16px', 
                    background: 'white', 
                    borderRadius: '50%', 
                    position: 'absolute', 
                    left: autoPay ? '22px' : '2px', 
                    top: '2px'
                  }}></div>
                </div>
              </div>
            </div>

            <button 
              className="widget-btn" 
              style={{ width: '100%', padding: '1rem', background: 'var(--brand-green)', border: 'none', marginBottom: '1rem' }}
              onClick={() => window.location.href = '/dashboard/member'}
            >
              {autoPay ? 'Complete Setup' : 'Finish'}
            </button>
            <button 
              style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
              onClick={() => window.location.href = '/dashboard/member'}
            >
              Maybe later
            </button>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
