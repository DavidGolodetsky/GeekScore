export interface Error {
  message: string
  code: string
}

export interface Game {
  name: string
  user: string
  coop: boolean
  favorite: boolean
  teams: any
  imageUrl?: string
  bggURL?: string
  melodiceURL?: string
  rulesURL?: string
}
