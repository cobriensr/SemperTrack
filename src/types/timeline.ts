// types/timeline.ts
export interface HistoricalEvent {
    id: string;
    date: Date;
    title: string;
    description: string;
    location?: string;
    images?: string[];
    significance: string;
    category: 'battle' | 'milestone' | 'award' | 'other';
}