import { Schema } from "mongoose";

export interface IBoard extends Document {
  name: string;
  prefix: string;
  columns: Schema.Types.ObjectId[];
  users: Schema.Types.ObjectId[];
}
