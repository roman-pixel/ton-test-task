import { create } from "zustand";

import { getBalance } from "../services/getBalance";

type AccountInfoResponse = {
  ok: boolean;
  result: string;
  code: number;
  error: string;
};

type Action = {
  updateHide: (hide: boolean) => void;
  fetchBalance: (address: string) => Promise<void>;
};

export type StoreState = {
  loading: boolean;
  error: boolean;
  data: AccountInfoResponse;
  hide: boolean;
};

export const useBalanceStore = create<StoreState & Action>((set) => ({
  error: false,
  loading: true,
  data: {
    error: "",
    code: 0,
    result: "",
    ok: true,
  },
  hide: false,

  updateHide: (hide) => set(() => ({ hide })),

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
