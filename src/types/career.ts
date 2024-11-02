export interface MOS {
    code: string;
    title: string;
    category: string;
    description: string;
    requirements: string[];
    relatedCivilian: string[];
}

export interface PromotionPoints {
    rifle: number;
    pft: number;
    cft: number;
    marineCorpsInstitute: number;
    offDutyEducation: number;
    awards: [];
}