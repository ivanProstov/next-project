import { Schema } from "mongoose";

export interface IComment {
  comment: string;
  user: Schema.Types.ObjectId;
}

export interface ITask extends Document {
  title: string;
  description?: string;
  creator: Schema.Types.ObjectId;
  executor?: Schema.Types.ObjectId;
  comments?: IComment[];
}
