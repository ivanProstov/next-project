import { IBoard } from "./interface";
import { model, Schema } from "mongoose";

const boardSchema = new Schema<IBoard>({
  name: { type: String, required: true },
  prefix: { type: String, required: true, unique: true },
  users: [{ type: Schema.Types.ObjectId, ref: "User" }],
  columns: [{ type: Schema.Types.ObjectId, ref: "Column" }],
});

const Board = model<IBoard>("Board", boardSchema);

export default Board;
