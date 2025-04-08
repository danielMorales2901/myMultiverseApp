//charactersResult
import { Location } from "./locationType"

export type LocationsResult = {
    info: {
        count: number,
        pages: number,
        next: string | null
        prev: string | null
    },
    results: Location[],
}