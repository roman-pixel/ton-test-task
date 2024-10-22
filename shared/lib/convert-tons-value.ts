const TON_MULTIPLIER = 1000000000;

/**
 * Converts nano Tons to Tons
 *
 * @param balance - balance in nano Tons
 * @returns Object with whole part and decimal part
 */
export const convertTonsValue = (balance: string) => {
  const parsedData = (Number(balance) / TON_MULTIPLIER).toFixed(2);
  const [wholePart, decimalPart] = parsedData.split(".");

  return {
    wholePart,
    decimalPart,
  };
};
