export interface IUsersData {
  userId: string;
  name: string;
  users: Array<{ _id: string; email: string; name: string }>;
}

export interface IUsersState {
  data?: IUsersData;
  error?: string;
  loading?: boolean;
}
