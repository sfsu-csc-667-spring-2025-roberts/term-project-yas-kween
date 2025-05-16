import db from "../connection";

const SQL = `
SELECT cards.value
FROM cards, game_cards
WHERE game_id=$(gameId)
  AND pile=$(pileId)
ORDER BY card_order
`;

export const getBuildPileTop = async (gameId: string, pileId: number) => {
  try {
    const cards = await db.many<{ value: number }>(SQL, { gameId, pileId });

    return { value: cards.length, cardValue: cards[cards.length - 1] };
  } catch {
    return { value: -1, cardValue: -1 }; // means empty pile
  }
};
