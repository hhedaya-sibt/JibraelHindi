import React, { useState } from 'react';
import { ArrowRight, KeyRound } from 'lucide-react';

interface LoginProps {
  onLogin: (pin: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin) {
      setError('Please enter your Personal Access PIN.');
      return;
    }
    setError('');
    setIsLoading(true);
    
    // Simulate network delay
    setTimeout(() => {
      onLogin(pin);
      setIsLoading(false);
    }, 800);
  };

  const fillDemoData = () => {
    setPin('442910');
    setError('');
  };

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-slate-800 mb-2">Client Access</h2>
        <p className="text-slate-500 text-sm">
          Please enter the PIN provided in your settlement notice text or email.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="pin" className="block text-sm font-medium text-slate-700 mb-1">
            Personal Access PIN:
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <KeyRound className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="password"
              id="pin"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-slate-600 bg-slate-700 rounded-lg focus:ring-brand-blue focus:border-brand-blue transition-colors shadow-sm text-white placeholder-slate-400 font-light"
              placeholder="••••••"
            />
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-brand-blue hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-[0.99]"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">Verifying...</span>
            ) : (
              <span className="flex items-center gap-2">
                Access Portal <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </button>
          
          <button
            type="button"
            onClick={fillDemoData}
            className="text-xs text-slate-400 hover:text-brand-blue underline transition-colors text-center"
          >
            Use Demo Credentials (Click Here)
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;