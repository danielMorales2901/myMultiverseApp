//dataSource.ts
import { EpisodesResult } from "./episodesResult";
export class DataSource {
    constructor() { }
    //Metodo para obtener la información de episodios segun el numero de página 
    //ingresemos o directamente se va a la 1
    async getEpisodes(page: number) : Promise<EpisodesResult> {
        const response = await fetch(`https://rickandmortyapi.com/api/episode?page=${page||1}`)
        return response.json();
    }
}
