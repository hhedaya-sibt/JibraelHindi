export type Step = 'login' | 'statement' | 'release' | 'payment' | 'success';

export type PaymentMethodType = 'ZELLE' | 'VENMO' | 'PAYPAL' | 'CASHAPP' | 'CHECK';

export interface UserData {
  uniqueId: string;
  pin: string;
  firstName: string;
  lastName: string;
  settlementAmount: number;
  attorneyFees: number;
  adminFees: number;
  netAmount: number;
}

export interface PaymentDetails {
  method: PaymentMethodType;
  accountIdentifier: string; // Phone, Email, or Handle
  confirmed: boolean;
}

export interface SettlementStatementItem {
  description: string;
  amount: number;
  type: 'credit' | 'debit';
}