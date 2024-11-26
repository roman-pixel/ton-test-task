export const getRate = async (tokens: string, currencies: string) => {
  return await fetch(
    `https://tonapi.io/v2/rates?tokens=${tokens}&currencies=${currencies}`,
  );
};
