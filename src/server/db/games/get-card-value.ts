import db from "../connection";

const SQL = `
SELECT value FROM cards WHERE id=$(cardId)
`;

export const getCardValue = async (cardId: number) => {
  const { value } = await db.one(SQL, { cardId });

  return value;
};
