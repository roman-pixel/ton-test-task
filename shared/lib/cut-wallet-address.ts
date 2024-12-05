/**
 * Cut wallet address
 *
 * @example
 * ```
 * cutWalletAddress("0:0000000000000000000000000000000000000000000000000000000000000000", 15)
 * ```
 *
 * @param text - wallet address
 * @param maxLength - length of cut wallet address
 *
 * @returns cut wallet address
 */
export const cutWalletAddress = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  const start = text.slice(0, maxLength / 2);
  const end = text.slice(-maxLength / 2);

  return `${start}...${end}`;
};
