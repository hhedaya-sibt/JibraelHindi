import React from 'react';
import { UserData, PaymentDetails } from '../types';
import { CheckCircle, Download } from 'lucide-react';

interface SuccessProps {
  user: UserData;
  payment: PaymentDetails;
}

const Success: React.FC<SuccessProps> = ({ user, payment }) => {
  return (
    <div className="text-center space-y-6 animate-fade-in py-8">
      <div className="flex justify-center mb-6">
        <div className="rounded-full bg-green-100 p-4">
          <CheckCircle className="w-16 h-16 text-green-600" />
        </div>
      </div>
      
      <h2 className="text-3xl font-serif font-bold text-slate-900">Thank You</h2>
      
      <div className="space-y-4 text-slate-700 max-w-md mx-auto">
        <p className="text-lg">
          Thank you for signing your settlement documents.
        </p>
        <p className="font-medium text-brand-blue text-lg">
          You can expect to receive payment by March of 2026.
        </p>
      </div>

      <div className="bg-slate-50 rounded-lg border border-slate-200 p-6 max-w-sm mx-auto mt-8 text-left">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-b pb-2">Receipt Details</h3>
        
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-500">Amount</span>
            <span className="font-bold text-slate-900">${user.netAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Method</span>
            <span className="font-medium text-slate-900">{payment.method}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Account</span>
            <span className="font-medium text-slate-900 truncate max-w-[150px]">{payment.accountIdentifier}</span>
          </div>
          <div className="flex justify-between">
             <span className="text-slate-500">Ref ID</span>
             <span className="font-mono text-slate-900">#REF-{Math.floor(Math.random() * 1000000)}</span>
          </div>
        </div>
      </div>

      <div className="pt-8">
         <button className="inline-flex items-center px-4 py-2 border border-slate-300 shadow-sm text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50">
           <Download className="mr-2 h-4 w-4" />
           Download Confirmation PDF
         </button>
      </div>
    </div>
  );
};

export default Success;