export type Prices = Record<string, number>;

export type Diff = Record<string, string>;

export type TokenData = {
  prices: Prices;
  diff_24h: Diff;
  diff_7d: Diff;
  diff_30d: Diff;
};

export type Rates = Record<string, TokenData>;

export type RateResponseData = {
  rates: Rates;
  error: string;
  error_code: number;
};
