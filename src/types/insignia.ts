// types/insignia.ts
export interface Insignia {
    id: string;
    type: 'rank' | 'medal' | 'badge' | 'unit';
    name: string;
    description: string;
    imageUrl: string;
    category: string;
    precedence: number;
    requirements?: string[];
}