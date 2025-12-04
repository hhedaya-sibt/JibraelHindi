import React, { useState } from 'react';
import { ArrowRight, MapPin } from 'lucide-react';

interface StateSelectionProps {
  onNext: (state: string) => void;
}

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
  "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
  "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
  "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
  "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
];

const StateSelection: React.FC<StateSelectionProps> = ({ onNext }) => {
  const [selectedState, setSelectedState] = useState('Florida');

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-xl font-serif font-bold text-slate-900">Location Confirmation</h2>
        <p className="text-sm text-slate-500 mt-1">
          Please confirm your current location for our records.
        </p>
      </div>

      <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 space-y-4">
        <label htmlFor="state-select" className="block text-sm font-medium text-slate-800">
          What state are you located in?
        </label>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPin className="h-5 w-5 text-slate-400" />
          </div>
          <select
            id="state-select"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="block w-full pl-10 pr-10 py-3 border border-slate-300 bg-white rounded-lg focus:ring-brand-blue focus:border-brand-blue shadow-sm text-slate-900 appearance-none cursor-pointer"
          >
            {US_STATES.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          {/* Custom dropdown arrow to ensure consistent look */}
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      <div className="pt-4">
        <button
          onClick={() => onNext(selectedState)}
          className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-brand-blue hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue transition-colors"
        >
          Next <ArrowRight className="ml-2 w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default StateSelection;