import { Address } from "@ton/core";

export const convertAddress = (
  address: string,
  urlSafe: boolean = true,
  bounceable: boolean = false,
  testOnly: boolean = true,
) => {
  return Address.parse(address).toString({
    urlSafe,
    bounceable,
    testOnly,
  });
};
