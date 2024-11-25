import { TON_MULTIPLIER } from "../components/constants/ton";

/**
 * Converts nano Tons to Tons
 *
 * @param balance - balance in nano Tons
 * @returns Object with whole part and decimal part
 */
export const convertTonsValue = (balance: string) => {
  const parsedData = Math.floor((Number(balance) / TON_MULTIPLIER) * 100) / 100;
  const [wholePart, decimalPart] = String(parsedData).split(".");

  return {
    wholePart,
    decimalPart,
  };
};
