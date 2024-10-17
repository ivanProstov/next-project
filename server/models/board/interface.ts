import { Schema } from "mongoose";

export interface IBoard extends Document {
  _id: string;
  name: string;
  description?: string;
  prefix: string;
  columns: Schema.Types.ObjectId[];
  users: Schema.Types.ObjectId[];
  isUserInBoard(userId?: string): Promise<boolean>;
}
