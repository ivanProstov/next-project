// models/User.ts
import mongoose, { Schema } from "mongoose";
import { IUser } from "./interface";

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

export default mongoose.model<IUser>("User", UserSchema);
