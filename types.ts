
export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  BRANCH_ADMIN = 'BRANCH_ADMIN',
  TELLER = 'TELLER',
  AUDITOR = 'AUDITOR'
}

export enum AccountType {
  SAVINGS = 'Savings',
  CURRENT = 'Current',
  FD = 'Fixed Deposit',
  RD = 'Recurring Deposit',
  LOAN = 'Loan'
}

export enum KYCStatus {
  PENDING = 'Pending',
  VERIFIED = 'Verified',
  REJECTED = 'Rejected'
}

export enum TransactionType {
  DEPOSIT = 'Deposit',
  WITHDRAWAL = 'Withdrawal',
  EMI_PAYMENT = 'EMI Payment',
  INTEREST_CREDIT = 'Interest Credit',
  PENALTY = 'Penalty'
}

export enum InvoiceStatus {
  PAID = 'Paid',
  PENDING = 'Pending',
  CANCELLED = 'Cancelled'
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  kycStatus: KYCStatus;
  aadhaar?: string;
  pan?: string;
  createdAt: string;
}

export interface BankAccount {
  id: string;
  customerId: string;
  accountNumber: string;
  accountType: AccountType;
  balance: number;
  interestRate: number;
  ifsc: string;
  branchCode: string;
  isLocked: boolean;
  createdAt: string;
}

export interface Transaction {
  id: string;
  accountId: string;
  type: TransactionType;
  amount: number;
  taxableAmount?: number;
  gstRate?: number;
  gstAmount?: number;
  balanceAfter: number;
  description: string;
  createdAt: string;
  tellerId: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  customerId: string;
  accountId: string;
  transactionId?: string;
  amount: number;
  taxableAmount?: number;
  gstRate?: number;
  gstAmount?: number;
  type: 'Transaction' | 'Statement' | 'EMI' | 'Interest';
  status: InvoiceStatus;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  branch: string;
}
