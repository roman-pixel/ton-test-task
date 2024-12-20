import { create } from "zustand";

import { getBalance } from "../services/getBalance";

// Успешный ответ с балансом
interface AccountInfoResponse {
  ok: boolean;
  result: string;
  code: number;
  error: string;
}

export interface StoreState {
  loading: boolean;
  error: boolean;
  data: AccountInfoResponse;

  fetchBalance: (address: string) => Promise<void>;
}

export const useBalanceStore = create<StoreState>((set) => ({
  error: false,
  loading: true,
  data: {
    error: "",
    code: 0,
    result: "",
    ok: true,
  },

  fetchBalance: async (address: string) => {
    try {
      set({ loading: true, error: false });
      const data = await getBalance(address);
      set({ data });
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
}));
