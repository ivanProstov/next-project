// models/User.ts
import mongoose, { Schema } from "mongoose";
import { IUser } from "./interface";

const UserSchema: Schema = new Schema({
  name: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: { type: String, required: false },
});

export default mongoose.model<IUser>("User", UserSchema);
