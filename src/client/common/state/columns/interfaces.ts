export interface IColumnsData {
  _id: string;
  name: string;
}

export interface IColumnsState {
  data?: IColumnsData[];
  error?: string;
  loading?: boolean;
}
