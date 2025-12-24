
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Printer, 
  IndianRupee, 
  CreditCard,
  History,
  AlertCircle,
  MoreVertical,
  CheckCircle2,
  XCircle,
  Mail,
  Share2,
  // Fix: Added missing icon imports
  Users,
  ArrowRightLeft,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';

import Sidebar from './components/Sidebar';
import StatCard from './components/StatCard';
import InvoiceTemplate from './components/InvoiceTemplate';
import { 
  UserRole, 
  Customer, 
  BankAccount, 
  Transaction, 
  Invoice, 
  KYCStatus, 
  AccountType, 
  TransactionType, 
  InvoiceStatus 
} from './types';
import { MOCK_CUSTOMERS, MOCK_ACCOUNTS } from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userRole, setUserRole] = useState<UserRole>(UserRole.SUPER_ADMIN);
  const [customers, setCustomers] = useState<Customer[]>(MOCK_CUSTOMERS);
  const [accounts, setAccounts] = useState<BankAccount[]>(MOCK_ACCOUNTS);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  // Stats Calculations
  const totalBalance = useMemo(() => accounts.reduce((acc, curr) => acc + curr.balance, 0), [accounts]);
  const activeCustomers = useMemo(() => customers.filter(c => c.kycStatus === KYCStatus.VERIFIED).length, [customers]);
  const monthTransactions = useMemo(() => transactions.length, [transactions]);

  const chartData = [
    { name: 'Mon', amount: 4000 },
    { name: 'Tue', amount: 3000 },
    { name: 'Wed', amount: 2000 },
    { name: 'Thu', amount: 2780 },
    { name: 'Fri', amount: 1890 },
    { name: 'Sat', amount: 2390 },
    { name: 'Sun', amount: 3490 },
  ];

  const handleCreateTransaction = (data: Partial<Transaction>) => {
    const newTxn: Transaction = {
      id: `TXN-${Math.floor(Math.random() * 1000000)}`,
      accountId: data.accountId!,
      type: data.type!,
      amount: data.amount!,
      balanceAfter: 0, // In real app, calculate based on prev balance
      description: data.description || 'Standard Transaction',
      createdAt: new Date().toISOString(),
      tellerId: 'T-001'
    };

    setTransactions([newTxn, ...transactions]);
    
    // Auto-generate invoice
    const newInvoice: Invoice = {
      id: `INV-${Math.floor(Math.random() * 1000000)}`,
      invoiceNumber: `BR01-2024-${Math.floor(Math.random() * 99999)}`,
      customerId: accounts.find(a => a.id === data.accountId)?.customerId || '',
      accountId: data.accountId!,
      transactionId: newTxn.id,
      amount: data.amount!,
      type: 'Transaction',
      status: InvoiceStatus.PAID,
      createdAt: new Date().toISOString()
    };
    setInvoices([newInvoice, ...invoices]);
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900">Dashboard Overview</h2>
        <div className="flex gap-2">
           <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
             <Download size={16} /> Export Report
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Deposits" 
          value={`₹${totalBalance.toLocaleString()}`} 
          icon={<IndianRupee className="text-blue-600" size={24} />} 
          color="bg-blue-100"
          trend={{ value: '12%', isUp: true }}
        />
        <StatCard 
          title="Active Customers" 
          value={activeCustomers} 
          icon={<Users className="text-emerald-600" size={24} />} 
          color="bg-emerald-100"
          trend={{ value: '4.5%', isUp: true }}
        />
        <StatCard 
          title="Monthly Txns" 
          value={monthTransactions} 
          icon={<ArrowRightLeft className="text-amber-600" size={24} />} 
          color="bg-amber-100"
          trend={{ value: '1.2%', isUp: false }}
        />
        <StatCard 
          title="Pending KYC" 
          value={customers.filter(c => c.kycStatus === KYCStatus.PENDING).length} 
          icon={<ShieldCheck className="text-purple-600" size={24} />} 
          color="bg-purple-100"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
             <h3 className="font-bold text-slate-800">Transaction Volume</h3>
             <select className="text-sm border-slate-200 rounded-md focus:ring-blue-500">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
             </select>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                <Tooltip />
                <Area type="monotone" dataKey="amount" stroke="#2563eb" fillOpacity={1} fill="url(#colorAmount)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {transactions.slice(0, 5).map(txn => (
              <div key={txn.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                <div className={`p-2 rounded-full ${txn.type === TransactionType.DEPOSIT ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                   {txn.type === TransactionType.DEPOSIT ? <Plus size={16} /> : <ArrowRightLeft size={16} />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-900">{txn.type}</p>
                  <p className="text-xs text-slate-500">{new Date(txn.createdAt).toLocaleTimeString()}</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-bold ${txn.type === TransactionType.DEPOSIT ? 'text-green-600' : 'text-slate-900'}`}>
                    {txn.type === TransactionType.DEPOSIT ? '+' : '-'} ₹{txn.amount.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
            {transactions.length === 0 && (
              <div className="text-center py-12">
                 <History className="mx-auto text-slate-200 mb-2" size={40} />
                 <p className="text-sm text-slate-400">No recent transactions</p>
              </div>
            )}
          </div>
          <button onClick={() => setActiveTab('transactions')} className="w-full mt-6 text-sm text-blue-600 font-bold hover:text-blue-700">View All Transactions</button>
        </div>
      </div>
    </div>
  );

  const renderCustomers = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900">Customer Management</h2>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-shadow">
          <Plus size={18} /> Add New Customer
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-wrap gap-4 items-center justify-between">
           <div className="relative flex-1 min-w-[300px]">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
             <input type="text" placeholder="Search by name, phone or ID..." className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm" />
           </div>
           <div className="flex gap-2">
             <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-white text-slate-600">
               <Filter size={16} /> Filters
             </button>
           </div>
        </div>
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Customer ID</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Phone / Email</th>
              <th className="px-6 py-4">KYC Status</th>
              <th className="px-6 py-4">Registration</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {customers.map(customer => (
              <tr key={customer.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 font-mono text-xs font-bold text-blue-600">{customer.id}</td>
                <td className="px-6 py-4 font-semibold text-slate-900">{customer.name}</td>
                <td className="px-6 py-4">
                  <p className="text-sm text-slate-700">{customer.phone}</p>
                  <p className="text-xs text-slate-400">{customer.email}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                    customer.kycStatus === KYCStatus.VERIFIED ? 'bg-green-100 text-green-700' : 
                    customer.kycStatus === KYCStatus.PENDING ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {customer.kycStatus}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">{new Date(customer.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-center">
                  <button className="p-2 text-slate-400 hover:text-slate-600"><MoreVertical size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderTransactions = () => {
    const [txnAmount, setTxnAmount] = useState('');
    const [txnAccount, setTxnAccount] = useState('');
    const [txnType, setTxnType] = useState(TransactionType.DEPOSIT);

    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
           <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Post Transaction</h3>
              <div className="space-y-4">
                 <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Account</label>
                    <select 
                      value={txnAccount}
                      onChange={(e) => setTxnAccount(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                       <option value="">Select Account</option>
                       {accounts.map(acc => (
                         <option key={acc.id} value={acc.id}>{acc.accountNumber} - {acc.accountType}</option>
                       ))}
                    </select>
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Type</label>
                    <div className="grid grid-cols-2 gap-2">
                       <button 
                         onClick={() => setTxnType(TransactionType.DEPOSIT)}
                         className={`py-2 text-xs font-bold rounded-lg border transition-all ${txnType === TransactionType.DEPOSIT ? 'bg-green-600 text-white border-green-600' : 'bg-white text-slate-600 border-slate-200'}`}
                       >Deposit</button>
                       <button 
                         onClick={() => setTxnType(TransactionType.WITHDRAWAL)}
                         className={`py-2 text-xs font-bold rounded-lg border transition-all ${txnType === TransactionType.WITHDRAWAL ? 'bg-red-600 text-white border-red-600' : 'bg-white text-slate-600 border-slate-200'}`}
                       >Withdraw</button>
                    </div>
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Amount (₹)</label>
                    <div className="relative">
                      <IndianRupee size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input 
                        type="number" 
                        value={txnAmount}
                        onChange={(e) => setTxnAmount(e.target.value)}
                        placeholder="0.00" 
                        className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm font-bold" 
                      />
                    </div>
                 </div>
                 <button 
                   onClick={() => {
                     handleCreateTransaction({
                       accountId: txnAccount,
                       amount: parseFloat(txnAmount),
                       type: txnType
                     });
                     setTxnAmount('');
                   }}
                   disabled={!txnAccount || !txnAmount}
                   className="w-full py-3 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800 transition-colors disabled:opacity-50"
                 >
                   Confirm Transaction
                 </button>
              </div>
           </div>
           
           <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex gap-3">
              <AlertCircle className="text-amber-600 shrink-0" size={20} />
              <div>
                <p className="text-sm font-bold text-amber-800">Security Alert</p>
                <p className="text-xs text-amber-700 leading-relaxed">Transactions exceeding ₹50,000 require manual manager approval and verified PAN document.</p>
              </div>
           </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
           <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-slate-800">Transaction History</h3>
                <button className="text-sm text-blue-600 font-bold hover:underline">Download PDF</button>
             </div>
             <table className="w-full text-left">
               <thead className="bg-slate-50 text-slate-500 text-[10px] font-extrabold uppercase tracking-widest">
                  <tr>
                    <th className="px-6 py-4">Timestamp</th>
                    <th className="px-6 py-4">Description</th>
                    <th className="px-6 py-4">Account</th>
                    <th className="px-6 py-4 text-right">Amount (₹)</th>
                    <th className="px-6 py-4 text-center">Receipt</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100 text-sm">
                  {transactions.map(txn => (
                    <tr key={txn.id} className="hover:bg-slate-50">
                       <td className="px-6 py-4 text-slate-500">{new Date(txn.createdAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</td>
                       <td className="px-6 py-4 font-medium text-slate-900">{txn.type}</td>
                       <td className="px-6 py-4 font-mono text-xs">{txn.accountId}</td>
                       <td className={`px-6 py-4 text-right font-bold ${txn.type === TransactionType.DEPOSIT ? 'text-green-600' : 'text-slate-900'}`}>
                         {txn.type === TransactionType.DEPOSIT ? '+' : '-'} {txn.amount.toLocaleString()}
                       </td>
                       <td className="px-6 py-4 text-center">
                          <button 
                            onClick={() => {
                              const inv = invoices.find(i => i.transactionId === txn.id);
                              if (inv) {
                                setSelectedInvoice(inv);
                                setActiveTab('invoice_preview');
                              }
                            }}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"
                          >
                             <FileText size={16} />
                          </button>
                       </td>
                    </tr>
                  ))}
                  {transactions.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center py-20 text-slate-400 font-medium">No transactions recorded yet.</td>
                    </tr>
                  )}
               </tbody>
             </table>
           </div>
        </div>
      </div>
    );
  };

  const renderInvoices = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900">Invoice Registry</h2>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Invoice #</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Created At</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {invoices.map(inv => (
              <tr key={inv.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-mono text-xs font-bold">{inv.invoiceNumber}</td>
                <td className="px-6 py-4">
                   <span className="text-sm font-medium text-slate-700">{inv.type}</span>
                </td>
                <td className="px-6 py-4 font-bold text-slate-900">₹{inv.amount.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                    inv.status === InvoiceStatus.PAID ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {inv.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">{new Date(inv.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => {
                      setSelectedInvoice(inv);
                      setActiveTab('invoice_preview');
                    }}
                    className="text-blue-600 font-bold hover:underline text-sm"
                  >View</button>
                </td>
              </tr>
            ))}
            {invoices.length === 0 && (
              <tr><td colSpan={6} className="text-center py-12 text-slate-400">No invoices found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderInvoicePreview = () => {
    if (!selectedInvoice) return null;
    const customer = customers.find(c => c.id === selectedInvoice.customerId)!;
    const account = accounts.find(a => a.id === selectedInvoice.accountId)!;
    const transaction = transactions.find(t => t.id === selectedInvoice.transactionId);

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center no-print">
          <button 
            onClick={() => setActiveTab('invoices')}
            className="flex items-center gap-2 text-slate-500 font-bold hover:text-slate-900"
          >
             <ArrowRightLeft size={18} className="rotate-180" /> Back to Invoices
          </button>
          <div className="flex gap-3">
             <button className="flex items-center gap-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-lg font-bold hover:bg-slate-200">
               <Share2 size={18} /> WhatsApp
             </button>
             <button className="flex items-center gap-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-lg font-bold hover:bg-slate-200">
               <Mail size={18} /> Email
             </button>
             <button 
               onClick={() => window.print()}
               className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 shadow-lg shadow-blue-500/20"
             >
               <Printer size={18} /> Print Invoice
             </button>
          </div>
        </div>

        <div className="print-area">
          <InvoiceTemplate 
            invoice={selectedInvoice}
            customer={customer}
            account={account}
            transaction={transaction}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar 
        currentRole={userRole} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={() => alert('Logout successful')} 
      />
      
      <main className="flex-1 ml-64 p-8 no-print">
        {/* Top Header */}
        <header className="flex justify-between items-center mb-8">
           <div>
              <p className="text-sm text-slate-500 font-medium">Welcome back,</p>
              <h2 className="text-xl font-bold text-slate-900">Branch Administrator</h2>
           </div>
           <div className="flex gap-4 items-center">
              <div className="text-right">
                 <p className="text-sm font-bold text-slate-900">Bangalore Central</p>
                 <p className="text-xs text-slate-500">ID: BR-0101</p>
              </div>
              <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold border-2 border-white shadow-md">
                 AD
              </div>
           </div>
        </header>

        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'customers' && renderCustomers()}
        {activeTab === 'transactions' && renderTransactions()}
        {activeTab === 'invoices' && renderInvoices()}
        {activeTab === 'invoice_preview' && renderInvoicePreview()}
        {activeTab === 'audit' && (
          <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
             <ShieldCheck size={48} className="mx-auto text-slate-200 mb-4" />
             <h3 className="text-lg font-bold text-slate-800">Audit & Log Management</h3>
             <p className="text-slate-500 text-sm">Real-time activity tracking is active for branch code BR-01.</p>
          </div>
        )}
      </main>

      {/* Printer View (Overlay for window.print) */}
      <div className="print-only fixed inset-0 z-[9999] bg-white w-full h-full">
        {selectedInvoice && renderInvoicePreview()}
      </div>
    </div>
  );
};

export default App;
