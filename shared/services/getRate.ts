export const getRate = async (tokens: string, currencies: string) => {
  return await fetch(
    `https://tonapi.io/v2/rates?tokens=${tokens}&currencies=${currencies}`,
  );
};

export const getRateChart = async (
  token: string,
  currency: string,
  startDate: number,
  endDate: number,
  pointsCount: number,
) => {
  return await fetch(
    `https://tonapi.io/v2/rates/chart?token=${token}&currency=${currency}&start_date=${startDate}&end_date=${endDate}&points_count=${pointsCount}`,
  );
};
