// types/calculator.ts
export interface PFTScore {
    pullUps: number;
    crunches: number;
    runTime: number;
    age: number;
    gender: 'male' | 'female';
}

export interface RifleQualification {
    slowFire: number;
    rapidFire: number;
    position: 'prone' | 'kneeling' | 'standing';
    distance: number;
    weaponType: 'M16' | 'M4' | 'M27';
}