import { Schema } from "mongoose";

export interface IComment {
  comment: string;
  user: Schema.Types.ObjectId;
}

export interface ITask extends Document {
  title: string;
  description?: string;
  board: Schema.Types.ObjectId;
  column: Schema.Types.ObjectId;
  creator: Schema.Types.ObjectId;
  executor?: Schema.Types.ObjectId;
  comments?: IComment[];
  taskNumber?: string;
}
