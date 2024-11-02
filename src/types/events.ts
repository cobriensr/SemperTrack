// types/events.ts
export interface MarineEvent {
    id: string;
    title: string;
    date: Date;
    location?: string;
    description: string;
    type: 'historical' | 'upcoming' | 'recurring';
    category: 'battle' | 'ceremony' | 'training' | 'other';
    significance?: string;
    relatedImages?: string[];
}

export interface ThisDayEvent {
    id: string;
    year: number;
    title: string;
    description: string;
    significance: string;
    mediaUrls?: string[];
    sources?: string[];
}