// characterType.ts

/**
 * Tipo que define un personaje
 */

export type Character = {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  gender: string;
  image: string;
  episode: [];
  url: string;
  created: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };

}