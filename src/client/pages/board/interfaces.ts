export interface IBoardsData {
  _id?: string;
  name: string;
  prefix: string;
  description?: string;
  users?: string[];
  columns?: string[];
}

export interface IBoardsState {
  data?: IBoardsData[];
  error?: string;
  loading?: boolean;
}
