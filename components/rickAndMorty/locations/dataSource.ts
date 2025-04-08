//dataSource.ts
import { LocationsResult } from "./locationsResult";
export class DataSource {
  constructor() { }
  //Metodo para obtener la información de ubicaciones segun el numero de página 
  //ingresemos o directamente se va a la 1
  async getLocations(page: number): Promise<LocationsResult> {
    const response = await fetch(`https://rickandmortyapi.com/api/location?page=${page || 1}`)
    return response.json();
  }
}
