// types/physical.ts
export interface HeightWeight {
    gender: 'male' | 'female';
    height: number; // in inches
    maxWeight: number;
    minWeight: number;
    bodyFat?: number;
}