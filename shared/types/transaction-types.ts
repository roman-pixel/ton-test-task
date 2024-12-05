export type TransactionDescription = {
  type: string;
  aborted: boolean;
  destroyed: boolean;
  credit_first: boolean;
  storage_ph: StoragePh;
  compute_ph: ComputePh;
  action: Action;
};

export type StoragePh = {
  storage_fees_collected: string;
  status_change: string;
};

export type ComputePh = {
  skipped: boolean;
  success: boolean;
  msg_state_used: boolean;
  account_activated: boolean;
  gas_fees: string;
  gas_used: string;
  gas_limit: string;
  gas_credit: string;
  mode: number;
  exit_code: number;
  vm_steps: number;
  vm_init_state_hash: string;
  vm_final_state_hash: string;
};

export type Action = {
  success: boolean;
  valid: boolean;
  no_funds: boolean;
  status_change: string;
  total_fwd_fees: string;
  total_action_fees: string;
  result_code: number;
  tot_actions: number;
  spec_actions: number;
  skipped_actions: number;
  msgs_created: number;
  action_list_hash: string;
  tot_msg_size: MsgSize;
};

export type MsgSize = {
  cells: string;
  bits: string;
};

export type BlockRef = {
  workchain: number;
  shard: string;
  seqno: number;
};

export type InMsg = {
  hash: string;
  source: string | null;
  destination: string;
  value: string | null;
  fwd_fee: string | null;
  ihr_fee: string | null;
  created_lt: string | null;
  created_at: number | null;
  opcode: string;
  ihr_disabled: boolean | null;
  bounce: boolean | null;
  bounced: boolean | null;
  import_fee: string | null;
  message_content: MessageContent;
  init_state: string | null;
};

export type OutMsg = {
  hash: string;
  source: string;
  destination: string;
  value: string;
  fwd_fee: string;
  ihr_fee: string;
  created_lt: string;
  created_at: number;
  opcode: string;
  ihr_disabled: boolean;
  bounce: boolean;
  bounced: boolean;
  import_fee: string | null;
  message_content: MessageContent;
  init_state: string | null;
};

export type MessageContent = {
  hash: string;
  body: string;
  decoded: DecodedContent | null;
};

export type DecodedContent = {
  type: string;
  comment?: string;
};

export type Transaction = {
  account: string;
  hash: string;
  lt: string;
  now: number;
  mc_block_seqno: number;
  trace_id: string;
  prev_trans_hash: string;
  prev_trans_lt: string;
  orig_status: string;
  end_status: string;
  total_fees: string;
  description: TransactionDescription;
  block_ref: BlockRef;
  in_msg: InMsg;
  out_msgs: OutMsg[];
  account_state_before: AccountState;
  account_state_after: AccountState;
};

export type AccountState = {
  hash: string;
  balance: string;
  account_status: string;
  frozen_hash: string | null;
  data_hash: string;
  code_hash: string;
};

export type AddressBookEntry = {
  user_friendly: string;
  domain: string | null;
};

export type AddressBook = {
  [key: string]: AddressBookEntry;
};

export type TransactionsResponse = {
  transactions: Transaction[];
  address_book: AddressBook;
};
