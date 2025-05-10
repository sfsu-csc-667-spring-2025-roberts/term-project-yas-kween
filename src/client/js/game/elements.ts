export const START_GAME_BUTTON = "#start-game-button";
export const OVERLAY = "#game-table-waiting-overlay";
export const PLAY_AREA = "#play-area";

const elements = {
  START_GAME_BUTTON:
    document.querySelector<HTMLButtonElement>(START_GAME_BUTTON)!,
  OVERLAY: document.querySelector<HTMLDivElement>(OVERLAY),
  PLAY_AREA: document.querySelector<HTMLDivElement>(PLAY_AREA)!,
};

export default elements;
