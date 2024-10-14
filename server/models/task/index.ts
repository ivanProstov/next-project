import { Schema, model } from "mongoose";
import { ITask } from "./interface";
import Board from "../board";

const taskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String },
  board: { type: Schema.Types.ObjectId, ref: "Board", required: true },
  column: { type: Schema.Types.ObjectId, ref: "Column" },
  creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
  executor: { type: Schema.Types.ObjectId, ref: "User" },
  comments: [
    {
      comment: { type: String },
      user: { type: Schema.Types.ObjectId, ref: "User" },
    },
  ],
  taskNumber: { type: String },
});

taskSchema.pre("save", async function (next) {
  if (this.isNew) {
    const taskCount = await Task.countDocuments({ board: this.board });
    const board = await Board.findById(this.board);
    this.taskNumber = `${board?.prefix || ""}-${taskCount + 1}`;
  }
  next();
});

const Task = model<ITask>("Task", taskSchema);

export default Task;
