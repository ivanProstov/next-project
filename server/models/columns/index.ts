import { model, Schema } from "mongoose";
import { IColumn } from "./interface";

const columnSchema = new Schema<IColumn>({
  name: { type: String, required: true },
});

const Column = model<IColumn>("Column", columnSchema);

export default Column;
