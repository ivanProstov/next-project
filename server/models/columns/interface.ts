import { Document } from "mongoose";

export interface IColumn extends Document {
  _id: string;
  name: string;
}
