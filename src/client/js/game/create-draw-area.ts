import { Card } from "global";
import { cloneTemplate, getGameId } from "../utils";
import { createCard } from "./create-card";
import { post } from "./fetch-wrapper";
import { getSelectedCardId } from "./get-selected-card-id";

const clickListener = () => {
  fetch(`/games/${getGameId()}/draw`, { method: "post" });
};

export const createDrawArea = (buildPiles: Card[]) => {
  const currentDrawPile = document.querySelector<HTMLDivElement>(
    ".center-area .draw-pile",
  );
  if (currentDrawPile !== null) {
    currentDrawPile.removeEventListener("click", clickListener);
  }

  const area = cloneTemplate("#draw-pile-area-template");

  area
    .querySelector<HTMLDivElement>(".draw-pile")
    ?.addEventListener("click", clickListener);

  area
    .querySelectorAll<HTMLDivElement>(".build-pile")
    .forEach((pileDiv, index) => {
      const card = createCard(buildPiles[index]);
      card.addEventListener("click", (event) => {
        const buildPile = (event.target as HTMLElement).closest(".build-pile");

        const pileId = buildPile
          ? (buildPile as HTMLElement).dataset.pileId
          : undefined;
        const selectedCardId = getSelectedCardId();

        if (!pileId || !selectedCardId) {
          return;
        }

        post(`/games/${getGameId}/play`, { pileId, selectedCardId });
      });

      pileDiv.appendChild(card);
    });

  return area;
};
