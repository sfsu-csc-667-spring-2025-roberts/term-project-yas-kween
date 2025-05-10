import { Card } from "global";
import { cloneTemplate } from "../utils";
import { createCard } from "./create-card";

export const createDrawArea = (buildPiles: Card[]) => {
  const area = cloneTemplate("#draw-pile-area-template");

  area
    .querySelectorAll<HTMLDivElement>(".build-pile")
    .forEach((pileDiv, index) => {
      pileDiv.appendChild(createCard(buildPiles[index]));
    });

  return area;
};
