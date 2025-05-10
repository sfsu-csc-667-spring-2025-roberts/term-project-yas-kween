import { Card, OtherPlayerInfo, PlayerGameState, PlayerInfo } from "global";
import { cloneTemplate } from "../utils";
import { createCard } from "./create-card";

const playerPositions: Record<string, string> = {};

const POSITION_MAPS = [
  [],
  ["bottom"],
  ["bottom", "top"],
  ["bottom", "left", "right"],
  ["bottom", "left", "top", "right"],
];

const initSeatOrder = (gameState: PlayerGameState) => {
  const seatOrder = [
    ...Object.entries(gameState.players).map(([currentId, { seat }]) => ({
      playerId: parseInt(currentId),
      seat,
    })),
    {
      playerId: gameState.currentPlayer.id,
      seat: gameState.currentPlayer.seat,
    },
  ].sort((a, b) => {
    return a.seat - b.seat;
  });

  // Rotate such that current player is front of array;
  // other players will be positioned around
  const currentPlayerIndex = seatOrder.findIndex(
    ({ playerId }) => playerId === gameState.currentPlayer.id,
  );

  const inOrder = seatOrder
    .slice(currentPlayerIndex)
    .concat(seatOrder.slice(0, currentPlayerIndex));

  const map = POSITION_MAPS[1 + Object.keys(gameState.players).length];

  for (let i = 0; i < map.length; i++) {
    playerPositions[inOrder[i].playerId] = map[i];
  }

  console.log({ playerPositions });
};

const getPlayerPosition = (playerId: number, gameState: PlayerGameState) => {
  if (
    Object.keys(playerPositions).length !==
    Object.keys(gameState.players).length + 1
  ) {
    initSeatOrder(gameState);
  }

  return playerPositions[playerId];
};

const getNewPlayerDiv = (
  position: string,
  handCount: number,
  stockCard: Card,
  stockCount: number,
  discardPiles: Card[][],
) => {
  const el =
    cloneTemplate("#player-template").querySelector<HTMLDivElement>(".player")!;

  el.classList.add(position);

  el.querySelector<HTMLDivElement>(".hand-count")!.innerText = `${handCount}`;

  const stock = el.querySelector<HTMLDivElement>(".stock-pile")!;
  stock.querySelector<HTMLDivElement>(".count")!.innerText = `${stockCount}`;
  stock.appendChild(createCard(stockCard));

  const discardDivs = el.querySelectorAll<HTMLDivElement>(".discard-pile")!;

  discardPiles.forEach((pile, index) => {
    const current = discardDivs[index];

    if (pile.length === 0) {
      current.appendChild(createCard());
    }

    pile.forEach((card) => {
      current.appendChild(createCard(card));
    });
  });

  return el;
};

export const currentPlayer = ({
  hand,
  stockPileTop,
  stockPileCount,
  discardPiles,
}: PlayerInfo) => {
  const container = getNewPlayerDiv(
    "bottom",
    hand?.length ?? 0,
    stockPileTop,
    stockPileCount,
    discardPiles,
  );

  const handElements = hand?.map((card: Card) => {
    return createCard(card);
  });

  if (handElements) {
    container.querySelector<HTMLDivElement>(".hand")?.append(...handElements);
  }

  return container;
};

export const otherPlayer = (
  {
    id,
    handCount,
    stockPileTop,
    stockPileCount,
    discardPiles,
  }: OtherPlayerInfo,
  gameState: PlayerGameState,
) => {
  return getNewPlayerDiv(
    getPlayerPosition(id, gameState),
    handCount,
    stockPileTop,
    stockPileCount,
    discardPiles,
  );
};
