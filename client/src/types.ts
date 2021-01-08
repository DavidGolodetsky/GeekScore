export interface Error {
  message: string;
  code: string;
}

export interface Player {
  name: string;
  isMe?: boolean;
}

export interface Game {
  name: string;
  user: User;
  coop: boolean;
  favorite: boolean;
  teams: Team[];
  imageUrl?: string;
  bggURL?: string;
  melodiceURL?: string;
  rulesURL?: string;
}

export interface Team {
  name: string;
  user: User;
  coop: boolean;
  favorite: boolean;
  games: Game[];
  players: Player[];
}

export interface Round {
  user: string;
  comment: string;
  date: string;
  winner: string;
  gameId: string;
  teamId: string;
}

export interface User {
  username: string;
}
