import "express-session";

export type User = {
  id: number;
  email: string;
  gravatar: string;
};

export type DbGameUser = {
  game_id: number;
  user_id: number;
  seat: number;
  is_current: boolean;
};

export type ChatMessage = {
  message: string;
  sender: User;
  timestamp: Date;
};

export type GameInfo = {
  id: number;
  name: string;
  min_players: number;
  max_players: number;
  password: string;
  created_at: Date;
};

export type Card = {
  id: number;
  value: number;
};

export type Player = {
  id: number;
  email: string;
  gravatar: string;
  seat: number;
  isCurrent: boolean;
};

export type PlayerInfo = Player & {
  hand?: Card[];
  stockPileTop: Card;
  discardPiles: Card[][];
  stockPileCount: number;
  isCurrent?: boolean;
};

export type OtherPlayerInfo = Player & {
  handCount: number;
  stockPileCount: number;
  discardPiles: Card[][];
  stockPileTop: Card;
};

export type GameState = {
  name: string;
  buildPiles: Card[];
  players: Record<string, PlayerInfo>;
};

export type PlayerGameState = {
  currentPlayer: PlayerInfo;
  players: Record<string, OtherPlayerInfo>;
  buildPiles: Card[];
};

export type GetGameInfoResponse = Pick<
  GameInfo,
  "name" | "password" | "min_players" | "max_players"
> & {
  player_count: number;
};

declare module "express-session" {
  interface SessionData {
    user: User;
  }
}
