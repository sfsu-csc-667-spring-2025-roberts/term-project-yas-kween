import { Card } from "global";
import { cloneTemplate } from "../utils";

const createSkipboCard = (card: Card) => {
  const div = cloneTemplate("#card-skipbo-template");

  div.querySelector<HTMLDivElement>(".card")!.dataset.cardId = `${card.id}`;

  return div;
};

const createNumberCard = (card: Card) => {
  const div = cloneTemplate("#card-number-template");

  div.querySelector<HTMLDivElement>(".card")!.dataset.cardId = `${card.id}`;
  div.querySelector<HTMLDivElement>(".card")!.dataset.number = `${card.value}`;

  div.querySelector<HTMLDivElement>(".card-number")!.innerText =
    `${card.value}`;

  return div;
};

const createBlankCard = () => {
  const div = cloneTemplate("#card-number-template");
  div.querySelector<HTMLDivElement>(".card")!.classList.add("blank");

  return div;
};

export const createCard = (card?: Card) => {
  if (!card) {
    return createBlankCard();
  } else if (card.value == 0) {
    return createSkipboCard(card);
  } else {
    return createNumberCard(card);
  }
};
