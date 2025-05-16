export const post = async (endpoint: string, data: object) => {
  await fetch(endpoint, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};
