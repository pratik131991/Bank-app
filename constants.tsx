
import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Wallet, 
  ArrowRightLeft, 
  FileText, 
  ShieldCheck, 
  Settings,
  History
} from 'lucide-react';
import { UserRole, AccountType, KYCStatus } from './types';

export const APP_NAME = "FinEdge Banking";

export const NAVIGATION_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} />, roles: [UserRole.SUPER_ADMIN, UserRole.BRANCH_ADMIN, UserRole.TELLER, UserRole.AUDITOR] },
  { id: 'customers', label: 'Customers', icon: <Users size={20} />, roles: [UserRole.SUPER_ADMIN, UserRole.BRANCH_ADMIN, UserRole.TELLER] },
  { id: 'accounts', label: 'Accounts', icon: <Wallet size={20} />, roles: [UserRole.SUPER_ADMIN, UserRole.BRANCH_ADMIN, UserRole.TELLER, UserRole.AUDITOR] },
  { id: 'transactions', label: 'Transactions', icon: <ArrowRightLeft size={20} />, roles: [UserRole.SUPER_ADMIN, UserRole.BRANCH_ADMIN, UserRole.TELLER] },
  { id: 'invoices', label: 'Invoices', icon: <FileText size={20} />, roles: [UserRole.SUPER_ADMIN, UserRole.BRANCH_ADMIN, UserRole.TELLER] },
  { id: 'audit', label: 'Audit Log', icon: <History size={20} />, roles: [UserRole.SUPER_ADMIN, UserRole.AUDITOR] },
  { id: 'security', label: 'Security', icon: <ShieldCheck size={20} />, roles: [UserRole.SUPER_ADMIN] },
];

export const MOCK_CUSTOMERS = [
  { id: 'CUST-001', name: 'Rajesh Kumar', phone: '9876543210', email: 'rajesh@example.com', address: '123, MG Road, Bangalore', kycStatus: KYCStatus.VERIFIED, createdAt: '2023-10-01' },
  { id: 'CUST-002', name: 'Priya Sharma', phone: '9876543211', email: 'priya@example.com', address: '456, Jubilee Hills, Hyderabad', kycStatus: KYCStatus.VERIFIED, createdAt: '2023-11-15' },
  { id: 'CUST-003', name: 'Amit Singh', phone: '9876543212', email: 'amit@example.com', address: '789, Powai, Mumbai', kycStatus: KYCStatus.PENDING, createdAt: '2024-01-20' },
];

export const MOCK_ACCOUNTS = [
  { id: 'ACC-101', customerId: 'CUST-001', accountNumber: '30001234567', accountType: AccountType.SAVINGS, balance: 45000.00, interestRate: 3.5, ifsc: 'FEDG000101', branchCode: 'BR-01', isLocked: false, createdAt: '2023-10-02' },
  { id: 'ACC-102', customerId: 'CUST-002', accountNumber: '30009876543', accountType: AccountType.CURRENT, balance: 125000.50, interestRate: 0, ifsc: 'FEDG000101', branchCode: 'BR-01', isLocked: false, createdAt: '2023-11-16' },
];
