import { Card } from "global";
import { cloneTemplate, getGameId } from "../utils";
import { createCard } from "./create-card";

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
      pileDiv.appendChild(createCard(buildPiles[index]));
    });

  return area;
};
