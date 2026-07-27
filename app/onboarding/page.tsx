'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { registerCooperative } from '@/lib/actions/cooperative';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  CreditCard, 
  MessageSquare, 
  Smartphone, 
  Copy, 
  CheckCircle2, 
  Building2, 
  Users, 
  Sparkles,
  Lock,
  Clock,
  RotateCcw
} from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();

  // Step 1 - 5 state
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    coopName: '',
    fullName: '',
    phone: '',
    password: '',
    frequency: 'Monthly',
    baseLevy: '20000',
    role1: 'Secretary',
    role2: 'President',
    role3: 'Treasurer',
  });

  // Step 2 OTP State
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  // Step 4 Integrations State
  const [connectedIntegrations, setConnectedIntegrations] = useState<{ [key: string]: boolean }>({
    paystack: false,
    termii: false,
    whatsapp: false,
  });
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Real-time validation checks for Step 1
  const isCoopValid = formData.coopName.trim().length >= 3;
  const isNameValid = formData.fullName.trim().length >= 3;
  const isPhoneValid = formData.phone.trim().length >= 10;
  const isPassValid = formData.password.length >= 6;
  const isStep1Valid = isCoopValid && isNameValid && isPhoneValid && isPassValid;

  // Countdown timer for OTP
  useEffect(() => {
    let interval: any;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  // Handle OTP Input Change
  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-advance
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }

    // Auto-submit on 6th digit
    if (newOtp.every(digit => digit !== '')) {
      handleVerifyOtp(newOtp.join(''));
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = (code: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 600);
  };

  const handleConnectIntegration = (key: string) => {
    setConnectedIntegrations(prev => {
      const next = { ...prev, [key]: true };
      // Trigger Confetti on first connection
      if (Object.values(prev).every(val => !val)) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
      return next;
    });
  };

  const handleCopyKey = (keyString: string, keyName: string) => {
    navigator.clipboard.writeText(keyString);
    setCopiedKey(keyName);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleCompleteOnboarding = async () => {
    setLoading(true);
    setErrorMsg(null);

    const fd = new FormData();
    fd.append('coopName', formData.coopName);
    fd.append('fullName', formData.fullName);
    fd.append('phone', formData.phone);
    fd.append('password', formData.password);

    try {
      const res = await registerCooperative(fd);
      if (res?.error) {
        setErrorMsg(res.error);
        setLoading(false);
      } else {
        router.push('/dashboard');
      }
    } catch (err) {
      setErrorMsg('Failed to initialize cooperative.');
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--passbook-cream)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '2rem 1rem'
    }}>
      {/* Header Brand */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.65rem' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            background: 'var(--ledger-gold)', 
            borderRadius: '8px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: '1.4rem',
            color: 'var(--ink-indigo)',
            boxShadow: '0 4px 12px rgba(192, 138, 40, 0.3)'
          }}>
            O
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 800, color: 'var(--ink-indigo)' }}>
            Osùsù
          </span>
        </div>
      </div>

      {/* Progress Step Indicator (Termii Style) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        {[
          { s: 1, label: 'Create Account' },
          { s: 2, label: 'Verify OTP' },
          { s: 3, label: 'Configure Roles' },
          { s: 4, label: 'Integrations' },
          { s: 5, label: 'Activate' },
        ].map((item, idx) => (
          <React.Fragment key={item.s}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ 
                width: '30px', 
                height: '30px', 
                borderRadius: '50%', 
                background: step >= item.s ? 'var(--ink-indigo)' : 'var(--paper-white)', 
                border: `2px solid ${step >= item.s ? 'var(--ink-indigo)' : 'var(--hairline)'}`,
                color: step >= item.s ? '#FBF8F2' : 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.85rem'
              }}>
                {step > item.s ? <Check size={16} /> : item.s}
              </div>
              <span style={{ 
                fontSize: '0.85rem', 
                fontWeight: step === item.s ? 700 : 500, 
                color: step === item.s ? 'var(--ink-indigo)' : 'var(--text-muted)' 
              }}>
                {item.label}
              </span>
            </div>
            {idx < 4 && (
              <div style={{ width: '24px', height: '2px', background: step > item.s ? 'var(--ink-indigo)' : 'var(--hairline)' }} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Main Container */}
      <div style={{ width: '100%', maxWidth: step === 3 ? '1050px' : '560px' }}>
        <AnimatePresence mode="wait">
          {/* STEP 1: CREATE ACCOUNT */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <Card glass style={{ padding: '2.5rem' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', marginBottom: '0.5rem', color: 'var(--ink-indigo)' }}>
                  Create your Cooperative Account
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>
                  Set up your multi-tenant workspace on Osùsù in under 90 seconds.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {/* Coop Name */}
                  <div style={{ position: 'relative' }}>
                    <Input 
                      label="Cooperative Name" 
                      placeholder="e.g. Ikeja Traders Thrift Society" 
                      value={formData.coopName}
                      onChange={e => setFormData({ ...formData, coopName: e.target.value })}
                    />
                    {isCoopValid && (
                      <CheckCircle2 size={18} style={{ color: 'var(--guarantor-green)', position: 'absolute', right: '1rem', top: '2.4rem' }} />
                    )}
                  </div>

                  {/* Admin Name */}
                  <div style={{ position: 'relative' }}>
                    <Input 
                      label="Admin Full Name" 
                      placeholder="e.g. Chief Babatunde Raji" 
                      value={formData.fullName}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    />
                    {isNameValid && (
                      <CheckCircle2 size={18} style={{ color: 'var(--guarantor-green)', position: 'absolute', right: '1rem', top: '2.4rem' }} />
                    )}
                  </div>

                  {/* Phone Number */}
                  <div style={{ position: 'relative' }}>
                    <Input 
                      label="Mobile Phone Number (Termii SMS Verified)" 
                      placeholder="08012345678" 
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    />
                    {isPhoneValid && (
                      <CheckCircle2 size={18} style={{ color: 'var(--guarantor-green)', position: 'absolute', right: '1rem', top: '2.4rem' }} />
                    )}
                  </div>

                  {/* Password */}
                  <div style={{ position: 'relative' }}>
                    <Input 
                      label="Password" 
                      placeholder="••••••••" 
                      type="password"
                      value={formData.password}
                      onChange={e => setFormData({ ...formData, password: e.target.value })}
                    />
                    {isPassValid && (
                      <CheckCircle2 size={18} style={{ color: 'var(--guarantor-green)', position: 'absolute', right: '1rem', top: '2.4rem' }} />
                    )}
                  </div>

                  <Button 
                    onClick={() => setStep(2)}
                    disabled={!isStep1Valid}
                    style={{ width: '100%', marginTop: '1rem', padding: '0.85rem' }}
                  >
                    Continue to OTP Verification <ArrowRight size={18} />
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}

          {/* STEP 2: VERIFY OTP */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <Card glass style={{ padding: '2.5rem', textAlign: 'center' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(28, 42, 68, 0.08)', color: 'var(--ink-indigo)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
                  <Smartphone size={24} />
                </div>

                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', marginBottom: '0.5rem' }}>
                  Verify your Phone Number
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>
                  We sent a 6-digit Termii SMS OTP code to <strong style={{ color: 'var(--ink-indigo)' }}>{formData.phone || '08012345678'}</strong>
                </p>

                {/* 6 Digit Auto-Advancing Input */}
                <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'center', marginBottom: '2rem' }}>
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={el => { otpRefs.current[index] = el; }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={e => handleOtpChange(index, e.target.value)}
                      onKeyDown={e => handleOtpKeyDown(index, e)}
                      className="font-mono"
                      style={{
                        width: '46px',
                        height: '54px',
                        textAlign: 'center',
                        fontSize: '1.4rem',
                        fontWeight: 700,
                        borderRadius: '8px',
                        border: '1.5px solid var(--hairline)',
                        background: 'var(--paper-white)',
                        color: 'var(--ink-indigo)',
                        outline: 'none'
                      }}
                    />
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                  <button 
                    onClick={() => setStep(1)}
                    style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                  >
                    <ArrowLeft size={16} /> Edit Phone
                  </button>

                  <button 
                    disabled={!canResend}
                    onClick={() => { setTimer(30); setCanResend(false); }}
                    style={{ background: 'none', border: 'none', color: canResend ? 'var(--ink-indigo)' : 'var(--text-muted)', fontWeight: 600, cursor: canResend ? 'pointer' : 'default' }}
                  >
                    {canResend ? 'Resend Termii SMS OTP' : `Resend in ${timer}s`}
                  </button>
                </div>
              </Card>
            </motion.div>
          )}

          {/* STEP 3: CONFIGURE ROLES & REAL-TIME LIVE PREVIEW */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                {/* Form Side */}
                <Card glass style={{ padding: '2rem' }}>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                    Configure Cooperative Governance
                  </h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                    Customize contribution rules & approval roles. Your live dashboard updates on the right in real time!
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                      <label className="input-label">Contribution Frequency</label>
                      <select 
                        className="input-field"
                        value={formData.frequency}
                        onChange={e => setFormData({ ...formData, frequency: e.target.value })}
                      >
                        <option value="Monthly">Monthly Cycle</option>
                        <option value="Weekly">Weekly Cycle</option>
                        <option value="Daily">Daily Thrift (Esùsù)</option>
                      </select>
                    </div>

                    <div>
                      <Input 
                        label="Base Levy Amount (NGN)" 
                        value={formData.baseLevy}
                        onChange={e => setFormData({ ...formData, baseLevy: e.target.value })}
                      />
                    </div>

                    <div style={{ borderTop: '1px solid var(--hairline)', paddingTop: '1rem' }}>
                      <p className="input-label" style={{ marginBottom: '0.75rem' }}>3-Step Multi-Sig Approval Roles</p>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', width: '60px' }}>Step 1:</span>
                          <Input value={formData.role1} onChange={e => setFormData({ ...formData, role1: e.target.value })} />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', width: '60px' }}>Step 2:</span>
                          <Input value={formData.role2} onChange={e => setFormData({ ...formData, role2: e.target.value })} />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', width: '60px' }}>Step 3:</span>
                          <Input value={formData.role3} onChange={e => setFormData({ ...formData, role3: e.target.value })} />
                        </div>
                      </div>
                    </div>

                    <Button onClick={() => setStep(4)} style={{ marginTop: '1rem', padding: '0.8rem' }}>
                      Save & Activate Integrations <ArrowRight size={18} />
                    </Button>
                  </div>
                </Card>

                {/* Real-time Live Preview Panel (The Reward Moment!) */}
                <Card style={{ background: 'var(--paper-white)', padding: '1.75rem', border: '1.5px solid var(--ink-indigo)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Sparkles size={16} style={{ color: 'var(--ledger-gold)' }} />
                      <span className="font-mono" style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)' }}>
                        Live Workspace Preview
                      </span>
                    </div>
                    <span className="ink-stamp-badge stamp-approved">ACTIVE</span>
                  </div>

                  <div className="aso-oke-divider" style={{ marginBottom: '1.5rem' }} />

                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', marginBottom: '0.25rem' }}>
                    {formData.coopName || 'My Cooperative'}
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                    Admin: {formData.fullName || 'Admin'} • Frequency: {formData.frequency}
                  </p>

                  <div style={{ background: 'var(--passbook-cream)', padding: '1rem', borderRadius: '8px', marginBottom: '1.25rem', border: '1px solid var(--hairline)' }}>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Target Monthly Pool</p>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 700, color: 'var(--ink-indigo)' }}>
                      ₦{(Number(formData.baseLevy || 0) * 15).toLocaleString()}
                    </p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Base Levy: ₦{Number(formData.baseLevy || 0).toLocaleString()} / member</p>
                  </div>

                  <div>
                    <p className="input-label" style={{ marginBottom: '0.5rem' }}>Configured Approval Chain</p>
                    <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                      <span className="badge badge-paid">1. {formData.role1 || 'Role 1'}</span>
                      <span className="badge badge-pending">2. {formData.role2 || 'Role 2'}</span>
                      <span className="badge badge-pending">3. {formData.role3 || 'Role 3'}</span>
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>
          )}

          {/* STEP 4: ACTIVATE INTEGRATIONS (The "API Key Unlock" Moment) */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <Card glass style={{ padding: '2.5rem' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', marginBottom: '0.5rem' }}>
                  Activate Financial & Messaging Integrations
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>
                  Connect Paystack, Termii SMS, and WhatsApp APIs to unlock instant automated passbooks.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
                  {/* Paystack Card */}
                  <div style={{ padding: '1.25rem', borderRadius: '10px', background: 'var(--paper-white)', border: '1px solid var(--hairline)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ width: '42px', height: '42px', borderRadius: '8px', background: 'rgba(60, 110, 82, 0.12)', color: 'var(--guarantor-green)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <CreditCard size={22} />
                      </div>
                      <div>
                        <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>Paystack Collections</h4>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Automated bank transfer & USSD levies</p>
                      </div>
                    </div>

                    {connectedIntegrations.paystack ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span className="font-mono" style={{ fontSize: '0.8rem', background: 'rgba(60, 110, 82, 0.1)', padding: '0.35rem 0.65rem', borderRadius: '6px', color: 'var(--guarantor-green)', fontWeight: 600 }}>
                          pk_live_89...a42
                        </span>
                        <button onClick={() => handleCopyKey('pk_live_89a42be77', 'paystack')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                          {copiedKey === 'paystack' ? <Check size={16} style={{ color: 'var(--guarantor-green)' }} /> : <Copy size={16} />}
                        </button>
                      </div>
                    ) : (
                      <Button onClick={() => handleConnectIntegration('paystack')} variant="secondary">
                        Connect Paystack
                      </Button>
                    )}
                  </div>

                  {/* Termii SMS Card */}
                  <div style={{ padding: '1.25rem', borderRadius: '10px', background: 'var(--paper-white)', border: '1px solid var(--hairline)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ width: '42px', height: '42px', borderRadius: '8px', background: 'rgba(192, 138, 40, 0.12)', color: 'var(--ledger-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <MessageSquare size={22} />
                      </div>
                      <div>
                        <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>Termii SMS Receipts</h4>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Transactional SMS passbook alerts</p>
                      </div>
                    </div>

                    {connectedIntegrations.termii ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span className="font-mono" style={{ fontSize: '0.8rem', background: 'rgba(192, 138, 40, 0.1)', padding: '0.35rem 0.65rem', borderRadius: '6px', color: 'var(--ledger-gold)', fontWeight: 600 }}>
                          tlv_8olkR...ftz
                        </span>
                        <button onClick={() => handleCopyKey('tlv_8olkR2x1wSdZ7457JUbhjDvrrTCRJftzrgDj1nW-nmQ', 'termii')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                          {copiedKey === 'termii' ? <Check size={16} style={{ color: 'var(--guarantor-green)' }} /> : <Copy size={16} />}
                        </button>
                      </div>
                    ) : (
                      <Button onClick={() => handleConnectIntegration('termii')} variant="secondary">
                        Connect Termii
                      </Button>
                    )}
                  </div>
                </div>

                <Button onClick={() => setStep(5)} style={{ width: '100%', padding: '0.85rem' }}>
                  Proceed to Final Activation <ArrowRight size={18} />
                </Button>
              </Card>
            </motion.div>
          )}

          {/* STEP 5: YOU'RE LIVE */}
          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <Card glass style={{ padding: '3rem 2rem', textAlign: 'center' }}>
                <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(60, 110, 82, 0.12)', color: 'var(--guarantor-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                  <CheckCircle2 size={36} />
                </div>

                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '0.5rem' }}>
                  You are Live on Osùsù!
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '420px', margin: '0 auto 2rem' }}>
                  Your cooperative workspace <strong style={{ color: 'var(--ink-indigo)' }}>{formData.coopName}</strong> is fully provisioned with pre-populated member passbooks.
                </p>

                {errorMsg && (
                  <div style={{ padding: '0.75rem', background: '#fee2e2', color: '#991b1b', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
                    {errorMsg}
                  </div>
                )}

                <Button 
                  onClick={handleCompleteOnboarding}
                  disabled={loading}
                  style={{ padding: '0.9rem 2.5rem', fontSize: '1rem' }}
                >
                  {loading ? 'Initializing Workspace...' : 'Enter Executive Dashboard'} <ArrowRight size={18} />
                </Button>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
