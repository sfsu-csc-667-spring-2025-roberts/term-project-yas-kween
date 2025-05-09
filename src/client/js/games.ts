import { Card, PlayerGameState } from "global";
import { socket } from "./sockets";
import { cloneTemplate, getGameId } from "./utils";

const startGameButton =
  document.querySelector<HTMLButtonElement>("#start-game-button");

const playArea = document.querySelector<HTMLDivElement>("#play-area")!;

startGameButton?.addEventListener("click", (event) => {
  event.preventDefault();

  fetch(`/games/${getGameId()}/start`, {
    method: "post",
  });
});

const hideEl = (el: HTMLElement | null) => {
  if (!el) {
    return;
  }

  el.classList.remove("shown");
  el.classList.add("hidden");
};

const showEl = (el: HTMLElement | null) => {
  if (!el) {
    return;
  }

  el.classList.remove("hidden");
  el.classList.add("shown");
};

const makeCard = (card: Card) => {
  const cardDiv = cloneTemplate("#card-template");

  const numberCardDiv = cardDiv.querySelector<HTMLElement>(".number-card")!;
  numberCardDiv.dataset.number = `${card.value}`;
  numberCardDiv.dataset.cardId = `${card.id}`;

  cardDiv.querySelector<HTMLElement>(".card-number")!.innerText =
    `${card.value}`;

  return cardDiv;
};

socket.on(`game:${getGameId()}:updated`, (gameState: PlayerGameState) => {
  hideEl(startGameButton);
  showEl(playArea);

  console.log(gameState);

  const currentPlayerArea =
    cloneTemplate("#player-template").querySelector<HTMLDivElement>(".player")!;
  currentPlayerArea.classList.add("bottom");

  const stockPile =
    currentPlayerArea.querySelector<HTMLDivElement>(".stock-pile");
  stockPile?.appendChild(makeCard(gameState.currentPlayer.stockPileTop));

  playArea.appendChild(currentPlayerArea);
});
