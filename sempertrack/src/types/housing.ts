// types/housing.ts
export interface BAHRate {
    zipCode: string;
    rank: Rank;
    withDependents: number;
    withoutDependents: number;
    year: number;
}