//episodesResult
import { Episode } from "./episodesType"
export type EpisodesResult = {
  info: {
    count: number,
    pages: number,
    next: string | null
    prev: string | null
  },
  results: Episode[],
}