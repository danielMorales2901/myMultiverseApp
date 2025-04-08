// locationType.ts
/**
 * Tipo que define un personaje
 */
export type Location = {
    id: number;
    name: string;
    type: string;
    dimension: string;
    residents: [];
    url: string;
    created: string;
}