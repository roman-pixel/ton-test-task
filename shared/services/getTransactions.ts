export const getTransactions = async (
  address: string,
  sort: string,
  limit?: number,
) => {
  return await fetch(
    `https://testnet.toncenter.com/api/v3/transactions?account=${address}&sort=${sort}${limit ? `&limit=${limit}` : ""}`,
  );
};
