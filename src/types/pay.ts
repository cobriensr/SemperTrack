// types/pay.ts
export interface PayCalculation {
    rank: string;
    yearsOfService: number;
    basePayRate: number;
    specialPay: [];
    allowances: [];
    deductions: [];
    totalPay: number;
  }