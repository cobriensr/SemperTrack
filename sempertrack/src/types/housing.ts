// types/housing.ts
export interface BAHRate {
    zipCode: string;
    rank: string;
    withDependents: number;
    withoutDependents: number;
    year: number;
}