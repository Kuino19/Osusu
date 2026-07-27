-- Osusu Multi-Tenant Database Schema Initialization

-- 1. Create Enum Types
CREATE TYPE user_role AS ENUM ('Member', 'Secretary', 'Vice President', 'President', 'Treasurer');
CREATE TYPE loan_status AS ENUM ('Draft', 'Pending_Guarantor', 'Pending_Secretary', 'Pending_President', 'Pending_Treasurer', 'Approved', 'Disbursed', 'Repaid', 'Defaulted');
CREATE TYPE transaction_type AS ENUM ('Credit', 'Debit');

-- 2. Cooperatives Table (Tenant Scoping)
CREATE TABLE cooperatives (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  paystack_subaccount_code TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Members Table (Extends Auth Users with Multi-Tenant cooperative_id)
CREATE TABLE members (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  cooperative_id UUID NOT NULL REFERENCES cooperatives(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  phone_number TEXT UNIQUE NOT NULL,
  role user_role DEFAULT 'Member',
  branch_id TEXT,
  total_contributions NUMERIC(15, 2) DEFAULT 0,
  current_loan_limit NUMERIC(15, 2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Contributions Table (Tenant-scoped)
CREATE TABLE contributions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cooperative_id UUID NOT NULL REFERENCES cooperatives(id) ON DELETE CASCADE,
  member_id UUID NOT NULL REFERENCES members(id),
  amount NUMERIC(15, 2) NOT NULL,
  date TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'Confirmed',
  receipt_id TEXT UNIQUE,
  is_automated BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Loans Table (Tenant-scoped)
CREATE TABLE loans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cooperative_id UUID NOT NULL REFERENCES cooperatives(id) ON DELETE CASCADE,
  member_id UUID NOT NULL REFERENCES members(id),
  principal NUMERIC(15, 2) NOT NULL,
  interest_rate NUMERIC(5, 2) NOT NULL,
  term_months INTEGER NOT NULL,
  status loan_status DEFAULT 'Draft',
  monthly_repayment NUMERIC(15, 2),
  purpose TEXT,
  secretary_signature_id UUID,
  president_signature_id UUID,
  treasurer_signature_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  disbursed_at TIMESTAMPTZ
);

-- 6. Guarantors Table
CREATE TABLE guarantors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  loan_id UUID NOT NULL REFERENCES loans(id) ON DELETE CASCADE,
  member_id UUID NOT NULL REFERENCES members(id),
  status TEXT DEFAULT 'Pending' CHECK (status IN ('Pending', 'Confirmed', 'Rejected')),
  confirmed_at TIMESTAMPTZ
);

-- 7. Financial Ledger (Transparent Audit-ready Tenant Ledger)
CREATE TABLE financial_ledger (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cooperative_id UUID NOT NULL REFERENCES cooperatives(id) ON DELETE CASCADE,
  type transaction_type NOT NULL,
  amount NUMERIC(15, 2) NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  member_id UUID REFERENCES members(id),
  loan_id UUID REFERENCES loans(id),
  actor_id UUID REFERENCES members(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Audit Logs (Immutable History per Cooperative)
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cooperative_id UUID NOT NULL REFERENCES cooperatives(id) ON DELETE CASCADE,
  actor_id UUID NOT NULL REFERENCES members(id),
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,
  old_data JSONB,
  new_data JSONB,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Enable Row Level Security (RLS)
ALTER TABLE cooperatives ENABLE ROW LEVEL SECURITY;
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE contributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE loans ENABLE ROW LEVEL SECURITY;
ALTER TABLE guarantors ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_ledger ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- 10. Multi-Tenant RLS Policies
CREATE POLICY "Tenant Members View Self Profile" ON members 
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Tenant Executive Full Data Access" ON members 
  FOR ALL USING (
    cooperative_id IN (
      SELECT cooperative_id FROM members WHERE id = auth.uid()
    )
  );

CREATE POLICY "Tenant Scoped Contributions View" ON contributions 
  FOR SELECT USING (
    cooperative_id IN (
      SELECT cooperative_id FROM members WHERE id = auth.uid()
    )
  );

CREATE POLICY "Tenant Scoped Ledger View" ON financial_ledger 
  FOR SELECT USING (
    cooperative_id IN (
      SELECT cooperative_id FROM members WHERE id = auth.uid()
    )
  );
