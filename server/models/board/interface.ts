import { Schema } from "mongoose";

export interface IBoard extends Document {
  name: string;
  columns: Schema.Types.ObjectId[];
  users: Schema.Types.ObjectId[];
  tasks: {
    task: Schema.Types.ObjectId;
    column: Schema.Types.ObjectId;
  }[];
}
