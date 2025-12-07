import React, { useState } from 'react';
import { UserData, PaymentMethodType, PaymentDetails } from '../types';
import { ArrowLeft, Smartphone, Landmark, Mail, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface PaymentProps {
  user: UserData;
  onSubmit: (details: PaymentDetails) => void;
  onBack: () => void;
}

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
  "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
  "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
  "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
  "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
];

const Payment: React.FC<PaymentProps> = ({ user, onSubmit, onBack }) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType | null>(null);
  
  // Electronic Payment State
  const [identifier, setIdentifier] = useState('');
  const [confirmIdentifier, setConfirmIdentifier] = useState('');

  // Paper Check State
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Florida');
  const [zip, setZip] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = [
    { id: 'ZELLE', name: 'Zelle', color: 'bg-[#6D1ED4]', text: 'text-white', icon: Smartphone, placeholder: 'Mobile Number or Email' },
    { id: 'VENMO', name: 'Venmo', color: 'bg-[#008CFF]', text: 'text-white', icon: Smartphone, placeholder: 'Venmo Handle (@username)' },
    { id: 'PAYPAL', name: 'PayPal', color: 'bg-[#003087]', text: 'text-white', icon: Mail, placeholder: 'PayPal Email' },
    // Cash App removed as requested
    { id: 'CHECK', name: 'Paper Check', color: 'bg-slate-600', text: 'text-white', icon: Landmark, placeholder: 'Confirm Mailing Address' },
  ];

  const isCheck = selectedMethod === 'CHECK';

  // Validation Logic
  const isElectronicValid = !isCheck && identifier && identifier === confirmIdentifier;
  const isCheckValid = isCheck && address.trim() !== '' && city.trim() !== '' && zip.trim() !== '';
  const isValid = selectedMethod && (isCheck ? isCheckValid : isElectronicValid);

  const handleSubmit = () => {
    if (!isValid || !selectedMethod) return;
    
    setIsSubmitting(true);
    
    // Construct the account identifier based on method
    let finalIdentifier = identifier;
    if (selectedMethod === 'CHECK') {
      finalIdentifier = `${address}, ${city}, ${state} ${zip}`;
    }

    setTimeout(() => {
      onSubmit({
        method: selectedMethod,
        accountIdentifier: finalIdentifier,
        confirmed: true
      });
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-xl font-serif font-bold text-slate-900">Select Payment Method</h2>
        <p className="text-sm text-slate-500 mt-1">
          How would you like to receive your <span className="font-bold text-green-600">${user.netAmount.toFixed(2)}</span>?
        </p>
      </div>

      {/* Payment Selection Grid */}
      <div className="grid grid-cols-1 gap-3">
        {methods.map((m) => {
          const isSelected = selectedMethod === m.id;
          const Icon = m.icon;
          return (
            <button
              key={m.id}
              onClick={() => {
                setSelectedMethod(m.id as PaymentMethodType);
                // Reset states when switching
                setIdentifier('');
                setConfirmIdentifier('');
                // Keep address info if switching back and forth, or reset if desired. Keeping for UX.
              }}
              className={`relative flex items-center p-4 rounded-lg border-2 transition-all duration-200 ${
                isSelected 
                  ? 'border-brand-blue ring-1 ring-brand-blue bg-blue-50' 
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${m.color} ${m.text} shadow-sm`}>
                <Icon size={24} />
              </div>
              <div className="ml-4 text-left">
                <span className={`block text-lg font-bold ${isSelected ? 'text-brand-blue' : 'text-slate-700'}`}>
                  {m.name}
                </span>
                <span className="text-xs text-slate-500">
                    {m.id === 'CHECK' ? 'Mailed via USPS (7-10 days)' : 'Instant Transfer (1-3 days)'}
                </span>
              </div>
              {isSelected && (
                <div className="absolute right-4 text-brand-blue">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Input Fields for Selected Method */}
      {selectedMethod && (
        <div className="bg-slate-50 p-5 rounded-lg border border-slate-200 space-y-4 animate-slide-down">
          <h3 className="font-medium text-slate-900 flex items-center">
            {isCheck ? 'Mailing Address for Check' : `Enter ${methods.find(m => m.id === selectedMethod)?.name} Details`}
          </h3>
          
          {isCheck ? (
            // Paper Check Fields
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-500 uppercase mb-1">Street Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="block w-full px-3 py-3 border border-slate-300 rounded-md focus:ring-brand-blue focus:border-brand-blue"
                  placeholder="123 Main St, Apt 4B"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-500 uppercase mb-1">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="block w-full px-3 py-3 border border-slate-300 rounded-md focus:ring-brand-blue focus:border-brand-blue"
                    placeholder="City"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 uppercase mb-1">State</label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="block w-full px-3 py-3 border border-slate-300 rounded-md focus:ring-brand-blue focus:border-brand-blue bg-white"
                  >
                    {US_STATES.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 uppercase mb-1">Zip Code</label>
                <input
                  type="text"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  className="block w-full px-3 py-3 border border-slate-300 rounded-md focus:ring-brand-blue focus:border-brand-blue"
                  placeholder="12345"
                />
              </div>
            </div>
          ) : (
            // Electronic Payment Fields
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 uppercase mb-1">
                  {methods.find(m => m.id === selectedMethod)?.placeholder}
                </label>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="block w-full px-3 py-3 border border-slate-300 rounded-md focus:ring-brand-blue focus:border-brand-blue"
                  placeholder={methods.find(m => m.id === selectedMethod)?.placeholder}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 uppercase mb-1">
                  Confirm {methods.find(m => m.id === selectedMethod)?.placeholder}
                </label>
                <input
                  type="text"
                  value={confirmIdentifier}
                  onChange={(e) => setConfirmIdentifier(e.target.value)}
                  onPaste={(e) => e.preventDefault()}
                  className={`block w-full px-3 py-3 border rounded-md focus:ring-brand-blue focus:border-brand-blue ${
                     identifier && confirmIdentifier && identifier !== confirmIdentifier 
                     ? 'border-red-300 bg-red-50' 
                     : 'border-slate-300'
                  }`}
                  placeholder="Re-enter to confirm"
                />
                {identifier && confirmIdentifier && identifier !== confirmIdentifier && (
                  <p className="text-xs text-red-600 mt-1">Fields do not match.</p>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Disclaimer Box */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-5 w-5 text-red-700" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Important Disclaimer</h3>
            <div className="mt-2 text-xs text-red-700 leading-relaxed">
              <p>
                By selecting this payment method and entering your account information, you are accepting responsibility 
                for accurately entering your details. You further agree to hold The Law Offices of Jibrael S. Hindi 
                and Power Admin harmless for any claims arising out of the use of the account or electronic payment platform, 
                including funds sent to an incorrect account/address due to user error.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 pt-2">
        <button
          onClick={onBack}
          disabled={isSubmitting}
          className="flex-1 py-4 px-4 border border-slate-300 rounded-lg shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none"
        >
          <div className="flex items-center justify-center">
            <ArrowLeft className="mr-2 w-4 h-4" /> Back
          </div>
        </button>
        <button
          onClick={handleSubmit}
          disabled={!isValid || isSubmitting}
          className="flex-1 py-4 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-brand-blue hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
           {isSubmitting ? 'Processing...' : `Submit`}
        </button>
      </div>
    </div>
  );
};

export default Payment;