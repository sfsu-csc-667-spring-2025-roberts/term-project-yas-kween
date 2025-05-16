export const getSelectedCardId = () => {
  const selectedCards =
    document.querySelectorAll<HTMLDivElement>(".card.selected");

  if (selectedCards.length === 1) {
    const selectedCardId = selectedCards[0].dataset.cardId;

    return selectedCardId;
  }
};
