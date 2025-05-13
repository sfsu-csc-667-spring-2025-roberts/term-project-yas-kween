export const START_GAME_BUTTON = "#start-game-button";
export const OVERLAY = "#game-table-waiting-overlay";
export const PLAY_AREA = "#play-area";
export const CHAT_FORM = "#chat form";
export const CHAT_INPUT = "#chat input";
export const CHAT_MESSAGES = "#chat #messages";
export const DRAW_PILE = ".draw-pile";

const elements = {
  START_GAME_BUTTON:
    document.querySelector<HTMLButtonElement>(START_GAME_BUTTON)!,
  OVERLAY: document.querySelector<HTMLDivElement>(OVERLAY),
  DRAW_PILE: document.querySelector<HTMLDivElement>(DRAW_PILE),
  PLAY_AREA: document.querySelector<HTMLDivElement>(PLAY_AREA)!,
  CHAT_FORM: document.querySelector<HTMLFormElement>(CHAT_FORM)!,
  CHAT_INPUT: document.querySelector<HTMLInputElement>(CHAT_INPUT)!,
  CHAT_MESSAGES: document.querySelector<HTMLDivElement>(CHAT_MESSAGES)!,
};

export default elements;
