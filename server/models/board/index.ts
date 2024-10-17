import { IBoard } from "./interface";
import { model, Schema } from "mongoose";

const boardSchema = new Schema<IBoard>({
  name: { type: String, required: true },
  description: { type: String },
  prefix: { type: String, required: true, unique: true },
  users: [{ type: Schema.Types.ObjectId, ref: "User" }],
  columns: [{ type: Schema.Types.ObjectId, ref: "Column" }],
});

boardSchema.methods.isUserInBoard = async function (userId: string) {
  return this?.users.some((user: any) => user._id.toHexString() === userId);
};

const Board = model<IBoard>("Board", boardSchema);

export default Board;
