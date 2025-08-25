import mongoose, { model, Schema } from "mongoose";
import { IBorrow } from "../interfaces/borrow.interfaces";

const borrowSchema = new Schema<IBorrow>({
  book: {
    type: mongoose.ObjectId,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
});

export const Borrow = model("Borrow", borrowSchema);
