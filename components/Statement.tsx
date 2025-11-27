import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { UserData } from '../types';
import { ArrowRight, FileCheck } from 'lucide-react';

interface StatementProps {
  user: UserData;
  onNext: () => void;
}

const COLORS = ['#1e3a8a', '#94a3b8', '#b45309'];

const Statement: React.FC<StatementProps> = ({ user, onNext }) => {
  const data = useMemo(() => [
    { name: 'Net Payment', value: user.netAmount },
    { name: 'Attorney Fees', value: user.attorneyFees },
    { name: 'Admin Costs', value: user.adminFees },
  ], [user]);

  const currencyFormatter = (value: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-xl font-serif font-bold text-slate-900">Settlement Statement</h2>
        <p className="text-sm text-slate-500 mt-1">
          Case: <span className="font-mono text-slate-700">Smith v. BigCorp Inc.</span>
        </p>
        <p className="text-sm text-slate-500">
          Claimant: <span className="font-medium text-slate-700">{user.firstName} {user.lastName}</span>
        </p>
      </div>

      {/* Chart Visualization */}
      <div className="h-48 w-full bg-slate-50 rounded-lg border border-slate-100 p-2">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={60}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => currencyFormatter(value)} />
            <Legend verticalAlign="middle" align="right" layout="vertical" iconSize={8} wrapperStyle={{ fontSize: '10px' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Detailed Accounting */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <table className="min-w-full divide-y divide-slate-200">
          <tbody className="divide-y divide-slate-200">
            <tr className="bg-slate-50">
              <td className="px-4 py-3 text-sm font-medium text-slate-900">Gross Settlement Amount</td>
              <td className="px-4 py-3 text-sm font-bold text-slate-900 text-right">{currencyFormatter(user.settlementAmount)}</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-sm text-slate-500 pl-8">Less: Attorney Fees</td>
              <td className="px-4 py-3 text-sm text-red-600 text-right">({currencyFormatter(user.attorneyFees)})</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-sm text-slate-500 pl-8">Less: Admin Costs</td>
              <td className="px-4 py-3 text-sm text-red-600 text-right">({currencyFormatter(user.adminFees)})</td>
            </tr>
            <tr className="bg-brand-blue/5">
              <td className="px-4 py-4 text-base font-serif font-bold text-brand-blue">Net Payment to You</td>
              <td className="px-4 py-4 text-base font-bold text-brand-blue text-right border-t-2 border-brand-blue">
                {currencyFormatter(user.netAmount)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="relative pt-6">
        {/* Yellow Sign Here Sticker */}
        <div className="sticky-note absolute -top-2 right-4 bg-yellow-300 text-yellow-900 px-4 py-3 w-32 text-center font-signature text-xl font-bold rounded-sm shadow-md z-10 pointer-events-none border border-yellow-400">
          Sign Next <br/> Page
        </div>

        <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800 mb-6 border border-blue-100">
          <FileCheck className="inline-block w-4 h-4 mr-2 mb-1" />
          By proceeding, you acknowledge receipt of this accounting statement.
        </div>

        <button
          onClick={onNext}
          className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-brand-blue hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue transition-colors"
        >
          Review Release Form <ArrowRight className="ml-2 w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Statement;