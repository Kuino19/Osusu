import { pgTable, uuid, text, numeric, integer, boolean, timestamp, pgEnum, jsonb } from 'drizzle-orm/pg-core';

// Enums
export const userRoleEnum = pgEnum('user_role', ['Member', 'Secretary', 'Vice President', 'President', 'Treasurer']);
export const loanStatusEnum = pgEnum('loan_status', ['Draft', 'Pending_Guarantor', 'Pending_Secretary', 'Pending_President', 'Pending_Treasurer', 'Approved', 'Disbursed', 'Repaid', 'Defaulted']);
export const transactionTypeEnum = pgEnum('transaction_type', ['Credit', 'Debit']);

// Cooperatives (Tenants)
export const cooperatives = pgTable('cooperatives', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  paystackSubaccountCode: text('paystack_subaccount_code'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Members
export const members = pgTable('members', {
  id: uuid('id').primaryKey(),
  cooperativeId: uuid('cooperative_id').notNull().references(() => cooperatives.id, { onDelete: 'cascade' }),
  fullName: text('full_name').notNull(),
  phoneNumber: text('phone_number').notNull().unique(),
  role: userRoleEnum('role').default('Member'),
  branchId: text('branch_id'),
  totalContributions: numeric('total_contributions', { precision: 15, scale: 2 }).default('0.00'),
  currentLoanLimit: numeric('current_loan_limit', { precision: 15, scale: 2 }).default('0.00'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Contributions
export const contributions = pgTable('contributions', {
  id: uuid('id').primaryKey().defaultRandom(),
  cooperativeId: uuid('cooperative_id').notNull().references(() => cooperatives.id, { onDelete: 'cascade' }),
  memberId: uuid('member_id').notNull().references(() => members.id),
  amount: numeric('amount', { precision: 15, scale: 2 }).notNull(),
  date: timestamp('date').defaultNow(),
  status: text('status').default('Confirmed'),
  receiptId: text('receipt_id').unique(),
  isAutomated: boolean('is_automated').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});

// Loans
export const loans = pgTable('loans', {
  id: uuid('id').primaryKey().defaultRandom(),
  cooperativeId: uuid('cooperative_id').notNull().references(() => cooperatives.id, { onDelete: 'cascade' }),
  memberId: uuid('member_id').notNull().references(() => members.id),
  principal: numeric('principal', { precision: 15, scale: 2 }).notNull(),
  interestRate: numeric('interest_rate', { precision: 5, scale: 2 }).notNull(),
  termMonths: integer('term_months').notNull(),
  status: loanStatusEnum('status').default('Draft'),
  monthlyRepayment: numeric('monthly_repayment', { precision: 15, scale: 2 }),
  purpose: text('purpose'),
  secretarySignatureId: uuid('secretary_signature_id'),
  presidentSignatureId: uuid('president_signature_id'),
  treasurerSignatureId: uuid('treasurer_signature_id'),
  createdAt: timestamp('created_at').defaultNow(),
  disbursedAt: timestamp('disbursed_at'),
});

// Guarantors
export const guarantors = pgTable('guarantors', {
  id: uuid('id').primaryKey().defaultRandom(),
  loanId: uuid('loan_id').notNull().references(() => loans.id, { onDelete: 'cascade' }),
  memberId: uuid('member_id').notNull().references(() => members.id),
  status: text('status').default('Pending'),
  confirmedAt: timestamp('confirmed_at'),
});

// Financial Ledger
export const financialLedger = pgTable('financial_ledger', {
  id: uuid('id').primaryKey().defaultRandom(),
  cooperativeId: uuid('cooperative_id').notNull().references(() => cooperatives.id, { onDelete: 'cascade' }),
  type: transactionTypeEnum('type').notNull(),
  amount: numeric('amount', { precision: 15, scale: 2 }).notNull(),
  category: text('category').notNull(),
  description: text('description'),
  memberId: uuid('member_id').references(() => members.id),
  loanId: uuid('loan_id').references(() => loans.id),
  actorId: uuid('actor_id').references(() => members.id),
  createdAt: timestamp('created_at').defaultNow(),
});

// Audit Logs
export const auditLogs = pgTable('audit_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  cooperativeId: uuid('cooperative_id').notNull().references(() => cooperatives.id, { onDelete: 'cascade' }),
  actorId: uuid('actor_id').notNull().references(() => members.id),
  action: text('action').notNull(),
  entityType: text('entity_type').notNull(),
  entityId: uuid('entity_id').notNull(),
  oldData: jsonb('old_data'),
  newData: jsonb('new_data'),
  timestamp: timestamp('timestamp').defaultNow(),
});
