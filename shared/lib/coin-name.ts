export const coinName = (coin: string) => {
  switch (coin) {
    case "ton":
      return "Toncoin";
    default:
      return coin;
  }
};
