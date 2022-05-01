import { User } from './user';

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

export interface Player {
  name: string;
  isMe?: boolean;
}
