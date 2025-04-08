//charactersResult
import { Character } from "./characterType"
/* En este type definimos las propiedades de la información de este apartado de la api, es decir,
el numero de páginas, la página en la que nos encontramos,,, si hay una página siguiente o una previa 
de la que nos encontramos, y más aparte de este a la estructura le asignamos las propiedades del personaje*/
export type CharactersResult = {
  info: {
    count: number,
    pages: number,
    next: string | null
    prev: string | null
  },
  results: Character[],
}