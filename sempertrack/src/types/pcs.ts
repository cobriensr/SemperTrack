// types/pcs.ts
export interface PCSCalculation {
    origin: Location;
    destination: Location;
    dependents: number;
    weight: number;
    distanceMiles: number;
    totalAllowance: number;
    breakdowns: {
        travel: number;
        transportation: number;
        dislocation: number;
        temporary: number;
    };
}