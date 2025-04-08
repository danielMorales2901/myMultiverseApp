//dataSource.ts
import { CharactersResult } from "./charactersResult";
export class DataSource {
    constructor() { }
    //Este metodo nos ayuda a conocer el contenido de la api por página
    async getCharacters(page: number) : Promise<CharactersResult> {
        const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page||1}`)
        return response.json();
    }
}
