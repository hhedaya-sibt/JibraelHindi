import React, { useState } from 'react';
import { UserData } from '../types';
import { ArrowLeft, ArrowRight, PenTool } from 'lucide-react';

interface ReleaseProps {
  user: UserData;
  onNext: () => void;
  onBack: () => void;
}

const Release: React.FC<ReleaseProps> = ({ user, onNext, onBack }) => {
  const [signature, setSignature] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [scrolledToBottom, setScrolledToBottom] = useState(false);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight - 50) {
      setScrolledToBottom(true);
    }
  };

  const isFormValid = signature.length > 2 && agreed; // Removed scrolledToBottom constraint for UX ease in demo, but usually required.

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-xl font-serif font-bold text-slate-900">Settlement Release</h2>
        <p className="text-sm text-slate-500 mt-1">
          Please read carefully and sign below to release claims and receive payment.
        </p>
      </div>

      {/* Legal Text Scroll Area */}
      <div 
        className="bg-white border border-slate-300 rounded-lg p-4 h-64 overflow-y-auto legal-scroll text-justify text-xs text-slate-600 leading-relaxed shadow-inner"
        onScroll={handleScroll}
      >
        <p className="font-bold text-slate-800 mb-2">FULL AND FINAL RELEASE OF ALL CLAIMS</p>
        <p className="mb-2">
          IN CONSIDERATION of the payment of the Net Settlement Amount set forth in the Settlement Statement, 
          receipt of which is hereby acknowledged, I, <strong>{user.firstName} {user.lastName}</strong> ("Claimant"), 
          hereby release, acquit, and forever discharge Jibrael S. Hindi Law, the Defendant(s), and their respective agents, 
          employees, successors, insurers, and assigns (collectively, the "Released Parties") from any and all actions, 
          causes of action, claims, demands, damages, costs, loss of services, expenses, and compensation, on account of, 
          or in any way growing out of, any and all known and unknown personal injuries and property damage resulting or 
          to result from the incident that is the subject of the arbitration.
        </p>
        <p className="mb-2">
          I understand that this is a full and final compromise adjustment and settlement of any and all claims, disputed or otherwise, 
          and that the payment of said amount is not to be construed as an admission of liability on the part of the Released Parties, 
          by whom liability is expressly denied.
        </p>
        <p className="mb-2">
          I further declare and represent that no promise, inducement or agreement not herein expressed has been made to me, 
          and that this Release contains the entire agreement between the parties hereto, and that the terms of this Release are contractual and not a mere recital.
        </p>
        <p className="mb-2">
          THE UNDERSIGNED HAS READ THE FOREGOING RELEASE AND FULLY UNDERSTANDS IT.
        </p>
        <p className="mt-4 font-mono text-[10px] text-slate-400">ID: {user.uniqueId} | DATE: {new Date().toLocaleDateString()}</p>
      </div>

      {/* Signature Section */}
      <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 space-y-4">
        <div>
          <label htmlFor="signature" className="block text-sm font-medium text-slate-800 mb-2">
            Digital Signature
          </label>
          <div className="relative">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <PenTool className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              id="signature"
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
              placeholder="Type your full legal name"
              className="block w-full pl-10 pr-3 py-3 border border-slate-600 bg-slate-700 rounded-md focus:ring-brand-blue focus:border-brand-blue font-signature text-2xl text-white placeholder-slate-400"
            />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            By typing your name, you are executing this release electronically.
          </p>
        </div>

        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="agree"
              name="agree"
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="focus:ring-brand-blue h-5 w-5 text-brand-blue border-slate-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="agree" className="font-medium text-slate-700">
              I agree to the terms of the release.
            </label>
            <p className="text-slate-500">I certify that I am the individual named in this claim.</p>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="flex-1 py-4 px-4 border border-slate-300 rounded-lg shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none"
        >
          <div className="flex items-center justify-center">
            <ArrowLeft className="mr-2 w-4 h-4" /> Back
          </div>
        </button>
        <button
          onClick={onNext}
          disabled={!isFormValid}
          className="flex-1 py-4 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-brand-blue hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <div className="flex items-center justify-center">
            Sign & Continue <ArrowRight className="ml-2 w-4 h-4" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Release;