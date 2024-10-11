import { Schema, model } from "mongoose";
import { ITask } from "./interface";

const taskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String },
  creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
  executor: { type: Schema.Types.ObjectId, ref: "User" },
  comments: [
    {
      comment: { type: String },
      user: { type: Schema.Types.ObjectId, ref: "User" },
    },
  ],
});

const Task = model<ITask>("Task", taskSchema);

export default Task;
