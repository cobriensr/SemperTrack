// types/bases.ts
export interface MarineBase {
    id: string;
    name: string;
    location: {
        lat: number;
        lng: number;
        address: string;
    };
    units: string[];
    facilities: string[];
    history: string;
    commands: string[];
}