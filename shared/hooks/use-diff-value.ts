import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { RateResponseData } from "../types/rate-types";

export function useDiffValue(
  rate: RateResponseData | undefined,
  token: string,
  curency: string,
) {
  const searchParams = useSearchParams();
  const [diffValue, setDiffValue] = useState<string | undefined>("");

  const formatedToken = token.toUpperCase();
  const formatedCurency = curency.toUpperCase();

  useEffect(() => {
    if (searchParams.get("period") === "daily") {
      setDiffValue(rate?.rates?.[formatedToken]?.diff_24h?.[formatedCurency]);
    } else if (searchParams.get("period") === "weekly") {
      setDiffValue(rate?.rates?.[formatedToken]?.diff_7d?.[formatedCurency]);
    } else if (searchParams.get("period") === "monthly") {
      setDiffValue(rate?.rates?.[formatedToken]?.diff_30d?.[formatedCurency]);
    }
  }, [formatedCurency, rate, formatedToken, searchParams]);

  return { diffValue };
}
