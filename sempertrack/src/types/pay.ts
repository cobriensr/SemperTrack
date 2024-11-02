// types/pay.ts
export interface PayCalculation {
    rank: Rank;
    yearsOfService: number;
    basePayRate: number;
    specialPay: SpecialPay[];
    allowances: Allowance[];
    deductions: Deduction[];
    totalPay: number;
  }