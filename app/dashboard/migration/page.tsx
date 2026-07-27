'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card } from '@/components/ui/Card';

type ImportStep = 1 | 2 | 3 | 4;

interface ParsedMember {
  id: string;
  fullName: string;
  phone: string;
  branch: string;
  savingsBalance: number;
  activeLoan: number;
  role: string;
  status: 'valid' | 'warning' | 'error';
  errorMessage?: string;
}

export default function MigrationWizardPage() {
  const [step, setStep] = useState<ImportStep>(1);
  const [importType, setImportType] = useState<'members' | 'contributions' | 'loans'>('members');
  const [fileName, setFileName] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [importCompleted, setImportCompleted] = useState(false);

  // Mock parsed CSV rows for Preview (Step 3)
  const [parsedRows, setParsedRows] = useState<ParsedMember[]>([
    { id: '1', fullName: 'Babatunde Alabi', phone: '+2348023345566', branch: 'Ikeja Main', savingsBalance: 1200000, activeLoan: 0, role: 'President', status: 'valid' },
    { id: '2', fullName: 'Folake Solanke', phone: '+2348037789900', branch: 'Ikeja Main', savingsBalance: 850000, activeLoan: 250000, role: 'Vice President', status: 'valid' },
    { id: '3', fullName: 'Adaeze Obi', phone: '+2348031234567', branch: 'Ikeja Main', savingsBalance: 960000, activeLoan: 250000, role: 'Secretary', status: 'valid' },
    { id: '4', fullName: 'Alhaji Ibrahim Danjuma', phone: '+2348051122334', branch: 'Ikeja Branch B', savingsBalance: 1500000, activeLoan: 0, role: 'Treasurer', status: 'valid' },
    { id: '5', fullName: 'Chidi Nwosu', phone: '+2348030001122', branch: 'Ikeja Branch B', savingsBalance: 400000, activeLoan: 150000, role: 'Member', status: 'valid' },
    { id: '6', fullName: 'Blessing Okon', phone: '08031234567', branch: 'Ikeja Main', savingsBalance: 200000, activeLoan: 0, role: 'Member', status: 'warning', errorMessage: 'Phone formatted locally (will auto-format to +234)' },
    { id: '7', fullName: 'Emmanuel Kuti', phone: 'INVALID_PHONE', branch: 'Ikeja Main', savingsBalance: 50000, activeLoan: 0, role: 'Member', status: 'error', errorMessage: 'Invalid phone number format' },
  ]);

  // Column mapping states (Step 2)
  const [mapping, setMapping] = useState({
    fullName: 'Member Name',
    phone: 'Phone Number',
    branch: 'Branch / Unit',
    savingsBalance: 'Total Contributions (NGN)',
    activeLoan: 'Outstanding Loan (NGN)',
    role: 'Coop Role',
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setStep(2);
    }
  };

  const handleExecuteImport = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setImportCompleted(true);
    }, 2500);
  };

  const downloadSampleTemplate = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Member Name,Phone Number,Branch / Unit,Total Contributions (NGN),Outstanding Loan (NGN),Coop Role\n"
      + "John Doe,+2348012345678,Ikeja Main,500000,100000,Member\n"
      + "Jane Smith,+2348087654321,Ikeja Main,750000,0,Member\n";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `osusu_${importType}_migration_template.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <DashboardLayout>
      <div className="overview-header" style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.25rem' }}>Legacy Migration & Bulk Data Import Wizard</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          Seamlessly import existing members, historical contributions, and active loans from Excel, CSV, or legacy software.
        </p>
      </div>

      {/* Stepper Navigation */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {[
          { stepNum: 1, label: 'Upload File' },
          { stepNum: 2, label: 'Map Columns' },
          { stepNum: 3, label: 'Preview & Validate' },
          { stepNum: 4, label: 'Batch Import' },
        ].map((s) => (
          <div 
            key={s.stepNum}
            style={{ 
              flex: 1, 
              minWidth: '140px',
              padding: '0.875rem 1rem', 
              borderRadius: '12px', 
              background: step === s.stepNum ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255, 255, 255, 0.03)',
              border: `1px solid ${step === s.stepNum ? 'var(--brand-green)' : 'var(--border-subtle)'}`,
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}
          >
            <div style={{ 
              width: '28px', 
              height: '28px', 
              borderRadius: '50%', 
              background: step === s.stepNum ? 'var(--brand-green)' : 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '0.875rem'
            }}>
              {s.stepNum}
            </div>
            <span style={{ fontWeight: 600, fontSize: '0.875rem', color: step === s.stepNum ? 'white' : 'var(--text-secondary)' }}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* STEP 1: UPLOAD FILE & TEMPLATE */}
      {step === 1 && (
        <Card glass className="widget-card" style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center', padding: '3rem 2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📁</div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>Select Import Data Type</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '2rem' }}>
            Choose what type of legacy cooperative record you want to import into Osusu.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2.5rem' }}>
            {[
              { id: 'members', label: 'Member Roster & Savings', icon: '👥' },
              { id: 'contributions', label: 'Contribution Ledger', icon: '💰' },
              { id: 'loans', label: 'Active Loans', icon: '📝' },
            ].map((t) => (
              <div 
                key={t.id}
                onClick={() => setImportType(t.id as any)}
                style={{ 
                  padding: '1.25rem 0.5rem', 
                  borderRadius: '12px', 
                  background: importType === t.id ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                  border: `1px solid ${importType === t.id ? 'var(--brand-green)' : 'var(--border-subtle)'}`,
                  cursor: 'pointer'
                }}
              >
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{t.icon}</div>
                <p style={{ fontSize: '0.8rem', fontWeight: 600, margin: 0 }}>{t.label}</p>
              </div>
            ))}
          </div>

          {/* Drag & Drop File Upload Box */}
          <div style={{ 
            border: '2px dashed var(--brand-green)', 
            borderRadius: '16px', 
            padding: '3rem 1.5rem', 
            background: 'rgba(16, 185, 129, 0.02)',
            marginBottom: '2rem',
            position: 'relative'
          }}>
            <input 
              type="file" 
              accept=".csv,.xlsx,.xls"
              onChange={handleFileUpload}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
            />
            <p style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Click or Drag CSV / Excel file here</p>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Supports .csv, .xlsx, .xls (up to 50MB)</p>
          </div>

          <button 
            type="button"
            onClick={downloadSampleTemplate}
            className="widget-btn" 
            style={{ background: 'transparent', border: '1px solid var(--border-subtle)', color: 'var(--brand-green)', fontSize: '0.875rem' }}
          >
            📥 Download Sample {importType.toUpperCase()} Migration CSV Template
          </button>
        </Card>
      )}

      {/* STEP 2: COLUMN MAPPING */}
      {step === 2 && (
        <Card glass className="widget-card" style={{ maxWidth: '640px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>Map File Columns to Osusu Fields</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
            File detected: <span style={{ color: 'var(--brand-green)', fontWeight: 700 }}>{fileName || 'legacy_coop_members.csv'}</span>
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
            {[
              { fieldKey: 'fullName', label: 'Member Full Name', required: true },
              { fieldKey: 'phone', label: 'Phone Number', required: true },
              { fieldKey: 'branch', label: 'Branch / Unit Name', required: false },
              { fieldKey: 'savingsBalance', label: 'Opening Savings Balance (NGN)', required: true },
              { fieldKey: 'activeLoan', label: 'Outstanding Loan Balance (NGN)', required: false },
              { fieldKey: 'role', label: 'Cooperative Role', required: false },
            ].map((f) => (
              <div key={f.fieldKey} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                <div>
                  <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>{f.label}</span>
                  {f.required && <span style={{ color: '#f87171', marginLeft: '0.25rem' }}>*</span>}
                </div>
                <select 
                  value={(mapping as any)[f.fieldKey]}
                  onChange={(e) => setMapping({ ...mapping, [f.fieldKey]: e.target.value })}
                  style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid var(--border-subtle)', color: 'white', padding: '0.5rem 0.75rem', borderRadius: '6px', fontSize: '0.85rem' }}
                >
                  <option>{(mapping as any)[f.fieldKey]}</option>
                  <option>Column A (First Header)</option>
                  <option>Column B (Mobile)</option>
                  <option>Column C (Amount)</option>
                  <option>Do Not Import</option>
                </select>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="widget-btn" style={{ flex: 1, background: 'transparent', border: '1px solid var(--border-subtle)' }} onClick={() => setStep(1)}>
              Back
            </button>
            <button className="widget-btn" style={{ flex: 1, background: 'var(--brand-green)', border: 'none' }} onClick={() => setStep(3)}>
              Continue to Preview & Validate
            </button>
          </div>
        </Card>
      )}

      {/* STEP 3: PREVIEW & VALIDATION */}
      {step === 3 && (
        <Card glass className="widget-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>Import Data Preview & Health Check</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: '0.25rem 0 0' }}>
                7 rows detected • 5 Valid • 1 Auto-formattable Warning • 1 Invalid Error
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <span className="badge badge-paid">5 Ready</span>
              <span className="badge badge-pending">1 Warning</span>
              <span className="badge badge-overdue">1 Error</span>
            </div>
          </div>

          <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Validation Status</th>
                  <th>Full Name</th>
                  <th>Phone Number</th>
                  <th>Branch / Unit</th>
                  <th>Opening Savings</th>
                  <th>Outstanding Loan</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {parsedRows.map((row) => (
                  <tr key={row.id} style={{ opacity: row.status === 'error' ? 0.6 : 1 }}>
                    <td>
                      {row.status === 'valid' && <span className="badge badge-paid">✓ Ready</span>}
                      {row.status === 'warning' && <span className="badge badge-pending" title={row.errorMessage}>⚠️ Auto-Fix</span>}
                      {row.status === 'error' && <span className="badge badge-overdue" title={row.errorMessage}>❌ Skip Row</span>}
                    </td>
                    <td style={{ fontWeight: 600 }}>{row.fullName}</td>
                    <td>{row.phone}</td>
                    <td style={{ color: 'var(--text-secondary)' }}>{row.branch}</td>
                    <td style={{ fontWeight: 700, color: 'var(--brand-green)' }}>₦{row.savingsBalance.toLocaleString()}</td>
                    <td style={{ fontWeight: 600 }}>₦{row.activeLoan.toLocaleString()}</td>
                    <td><span className="badge badge-paid">{row.role}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button className="widget-btn" style={{ background: 'transparent', border: '1px solid var(--border-subtle)' }} onClick={() => setStep(2)}>
              Back to Mapping
            </button>
            <button className="widget-btn" style={{ background: 'var(--brand-green)', border: 'none', padding: '0.875rem 2rem' }} onClick={() => setStep(4)}>
              Confirm & Start Import (6 Valid Rows)
            </button>
          </div>
        </Card>
      )}

      {/* STEP 4: BATCH IMPORT EXECUTION */}
      {step === 4 && (
        <Card glass className="widget-card" style={{ maxWidth: '540px', margin: '0 auto', textAlign: 'center', padding: '3rem 2rem' }}>
          {!importCompleted ? (
            <>
              {!isProcessing ? (
                <>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚀</div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.5rem' }}>Ready to Execute Migration</h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '2rem' }}>
                    This action will batch import 6 members, create opening savings ledgers totaling ₦5,110,000, and setup initial digital passbooks.
                  </p>
                  <button className="widget-btn" style={{ width: '100%', padding: '1rem', background: 'var(--brand-green)', border: 'none' }} onClick={handleExecuteImport}>
                    Start Batch Migration Now
                  </button>
                </>
              ) : (
                <>
                  <div className="spinner" style={{ 
                    width: '60px', 
                    height: '60px', 
                    border: '4px solid rgba(255, 255, 255, 0.1)', 
                    borderTopColor: 'var(--brand-green)', 
                    borderRadius: '50%', 
                    margin: '0 auto 2rem',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Migrating Member Accounts & Passbooks...</h2>
                  <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Creating PostgreSQL ACID Ledger Entries...</p>
                  <style jsx>{`
                    @keyframes spin {
                      to { transform: rotate(360deg); }
                    }
                  `}</style>
                </>
              )}
            </>
          ) : (
            <>
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
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Migration Successful!</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                6 member profiles and ₦5,110,000 in opening contributions were successfully created and logged in the audit trail.
              </p>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button className="widget-btn" style={{ flex: 1, background: 'rgba(255, 255, 255, 0.1)', border: 'none' }} onClick={() => window.location.href = '/dashboard/reports'}>
                  Download Audit Report
                </button>
                <button className="widget-btn" style={{ flex: 1, background: 'var(--brand-green)', border: 'none' }} onClick={() => window.location.href = '/dashboard/members'}>
                  View Members Roster
                </button>
              </div>
            </>
          )}
        </Card>
      )}
    </DashboardLayout>
  );
}
