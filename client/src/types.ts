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

export interface Round extends RoundForm {
  winner: string;
  gameId: string;
  teamId: string;
}

export interface RoundForm {
  turn: string;
  comment: string;
  date: string;
  result?: string;
}

export interface User {
  id: string;
  username: string;
}

export interface DemoStep {
  title: string;
  text: string;
  color: string;
  icon: string;
}

export interface AuthForm {
  title: string;
  icon: string;
  redirectText: string;
  redirectLink: { name: string };
  redirectLinkText: string;
  signUp?: boolean;
}

export interface ToolsDialogTab {
  name: string;
  component: string;
}
