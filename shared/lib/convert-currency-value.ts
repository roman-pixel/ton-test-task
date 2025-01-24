import { TON_MULTIPLIER } from "../constants";

/**
 * Converts nano Tons to Tons
 *
 * @param balance - balance in nano Tons
 * @param rounded - flag for rounding
 * @returns Object with whole part and decimal part
 */
export const convertTonsValue = (balance: string, rounded: boolean = true) => {
  const parsedData = rounded
    ? Math.floor((Number(balance) / TON_MULTIPLIER) * 100) / 100
    : Number(balance) / TON_MULTIPLIER;
  const [wholePart, decimalPart] = String(parsedData).split(".");

  return {
    wholePart,
    decimalPart,
    fullPart: parsedData,
  };
};

/**
 * Converts Tons to Usd
 *
 * @param balance - balance in nano Tons
 * @param currencyPrice - currency price
 * @returns converted value
 */
export const convertUsdValue = (balance: number, currencyPrice: number) => {
  return String(Math.floor(balance * currencyPrice * 100) / 100).replace(
    ".",
    ",",
  );
};
