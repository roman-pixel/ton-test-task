import { create } from "zustand";

import { getBalance } from "../services/getBalance";

// Успешный ответ с балансом
interface AccountInfoResponse {
  balance: string;
  last_transaction_hash: string;
  last_transaction_lt: string;
  seqno: number;
  status: string;
  wallet_id: number;
  wallet_type: string;
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
    balance: "",
    last_transaction_hash: "",
    last_transaction_lt: "",
    seqno: 0,
    status: "",
    wallet_id: 0,
    wallet_type: "",
    code: 0,
    error: "",
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
