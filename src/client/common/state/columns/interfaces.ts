import { FetchPolicyType } from "../constants";

export interface IColumnsData {
  _id: string;
  name: string;
}

export interface IColumnsState {
  data?: IColumnsData[];
  error?: string;
  loading?: boolean;
}

export interface IColumnsActions {
  getColumns: (fetchPolicy?: FetchPolicyType) => void;
  updateColumns: (values: { id: string; name: string }) => void;
}
