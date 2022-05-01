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
