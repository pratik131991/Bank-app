
import React from 'react';
import { Landmark, CheckCircle, Smartphone } from 'lucide-react';
import { Invoice, Customer, BankAccount, Transaction } from '../types';

interface InvoiceTemplateProps {
  invoice: Invoice;
  customer: Customer;
  account: BankAccount;
  transaction?: Transaction;
}

const InvoiceTemplate: React.FC<InvoiceTemplateProps> = ({ invoice, customer, account, transaction }) => {
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  });

  const taxableValue = invoice.taxableAmount || invoice.amount;
  const gstAmount = invoice.gstAmount || 0;
  const total = invoice.amount;

  return (
    <div className="bg-white max-w-4xl mx-auto shadow-2xl p-12 border border-slate-100 my-8">
      {/* Header */}
      <div className="flex justify-between items-start mb-12">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-700 rounded-lg">
            <Landmark className="text-white" size={36} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">PMB Group Co-op Bank</h1>
            <p className="text-slate-500 text-sm">Branch: Bangalore Central | IFSC: PMBG000101</p>
            <p className="text-slate-500 text-sm">GSTIN: 29AAAFP0000A1Z5</p>
            <p className="text-slate-500 text-sm">Main Road, Indiranagar, KA - 560038</p>
          </div>
        </div>
        <div className="text-right">
          <h2 className="text-3xl font-extrabold text-slate-300 uppercase tracking-widest mb-2">Tax Invoice</h2>
          <p className="font-semibold text-slate-800">{invoice.invoiceNumber}</p>
          <p className="text-slate-500 text-sm">Date: {new Date(invoice.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      <hr className="border-slate-100 mb-8" />

      {/* Bill To & Account Details */}
      <div className="grid grid-cols-2 gap-12 mb-12">
        <div>
          <h4 className="text-xs uppercase font-bold text-slate-400 mb-3 tracking-widest">Customer Details</h4>
          <p className="text-lg font-bold text-slate-900">{customer.name}</p>
          <p className="text-slate-600 leading-relaxed text-sm whitespace-pre-line">{customer.address}</p>
          <p className="text-slate-600 text-sm mt-1">ID: {customer.id} | Mob: {customer.phone}</p>
        </div>
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
          <h4 className="text-xs uppercase font-bold text-slate-400 mb-3 tracking-widest">Account Details</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500 text-sm">Account Type:</span>
              <span className="text-slate-900 font-semibold text-sm">{account.accountType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 text-sm">Account Number:</span>
              <span className="text-slate-900 font-semibold text-sm">XXXX XXXX {account.accountNumber.slice(-4)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 text-sm">IFSC Code:</span>
              <span className="text-slate-900 font-semibold text-sm">{account.ifsc}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Item Table */}
      <div className="mb-12">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-900 text-white">
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider rounded-tl-lg">Description</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">HSN/SAC</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-right">Taxable Value</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-right">GST ({invoice.gstRate || 0}%)</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-right rounded-tr-lg">Total (₹)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr className="hover:bg-slate-50/50">
              <td className="px-6 py-6 font-medium text-slate-900">
                {transaction?.description || `${invoice.type} Transaction`}
                <p className="text-xs text-slate-400 mt-1">Txn ID: {transaction?.id || 'N/A'}</p>
              </td>
              <td className="px-6 py-6 text-slate-600 font-mono text-xs">997112</td>
              <td className="px-6 py-6 text-right text-slate-600">{formatter.format(taxableValue)}</td>
              <td className="px-6 py-6 text-right text-slate-600">{formatter.format(gstAmount)}</td>
              <td className="px-6 py-6 text-right font-bold text-slate-900">{formatter.format(total)}</td>
            </tr>
          </tbody>
          <tfoot>
             <tr className="border-t border-slate-100">
              <td colSpan={4} className="px-6 py-4 text-right font-medium text-slate-500">Taxable Amount</td>
              <td className="px-6 py-4 text-right font-semibold text-slate-900">{formatter.format(taxableValue)}</td>
            </tr>
            {gstAmount > 0 && (
              <tr className="border-t border-slate-100">
                <td colSpan={4} className="px-6 py-4 text-right font-medium text-slate-500">CGST @ {(invoice.gstRate || 0) / 2}%</td>
                <td className="px-6 py-4 text-right font-semibold text-slate-900">{formatter.format(gstAmount / 2)}</td>
              </tr>
            )}
            {gstAmount > 0 && (
              <tr className="border-t border-slate-100">
                <td colSpan={4} className="px-6 py-4 text-right font-medium text-slate-500">SGST @ {(invoice.gstRate || 0) / 2}%</td>
                <td className="px-6 py-4 text-right font-semibold text-slate-900">{formatter.format(gstAmount / 2)}</td>
              </tr>
            )}
            <tr className="bg-slate-50 border-t-2 border-slate-900">
              <td colSpan={4} className="px-6 py-6 text-right font-bold text-slate-500 uppercase tracking-widest">Grand Total</td>
              <td className="px-6 py-6 text-right font-extrabold text-2xl text-slate-900">{formatter.format(total)}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Footer / QR / Signature */}
      <div className="grid grid-cols-3 gap-8 items-end">
        <div>
          <h4 className="text-[10px] uppercase font-bold text-slate-400 mb-3 tracking-widest">Digital Verification</h4>
          <div className="flex flex-col items-center p-3 bg-slate-50 border border-slate-100 rounded-lg w-fit">
            <div className="bg-white p-2 border border-slate-200">
              {/* Fake QR Representation */}
              <div className="grid grid-cols-4 gap-1 w-24 h-24">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className={`rounded-sm ${Math.random() > 0.5 ? 'bg-slate-900' : 'bg-transparent'}`} />
                ))}
              </div>
            </div>
            <p className="text-[10px] text-slate-500 mt-2 font-mono">PMB-{invoice.id.slice(0, 8)}</p>
          </div>
        </div>

        <div className="text-center pb-4">
          <div className="flex items-center justify-center gap-2 text-green-600 mb-2">
            <CheckCircle size={16} />
            <span className="text-xs font-bold uppercase">Legally Compliant (GST)</span>
          </div>
          <p className="text-[10px] text-slate-400 italic">This is a system generated tax invoice and does not require a physical signature.</p>
        </div>

        <div className="text-right">
          <div className="mb-12 h-16 flex items-end justify-end">
             <div className="text-center">
                <p className="font-serif italic text-indigo-900 text-lg opacity-80">Authorized Signatory</p>
                <div className="h-0.5 w-full bg-slate-200 mt-1"></div>
                <p className="text-[10px] text-slate-500 mt-1 font-bold">PMB Group - Branch Manager</p>
             </div>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-400">
          <Smartphone size={16} />
          <span className="text-[10px] font-medium tracking-wider">Pay via UPI: pmbgroup@upi</span>
        </div>
        <div className="text-[10px] text-slate-300 font-bold uppercase tracking-[0.2em]">
          Powered by PMB Group Core Banking
        </div>
      </div>
    </div>
  );
};

export default InvoiceTemplate;
