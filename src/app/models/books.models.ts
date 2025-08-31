import { model, Schema } from "mongoose";
import { IBooks } from "../interfaces/books.interfaces";

const bookSchema = new Schema<IBooks>(
  {
    title: {
      type: String,
      required: [true, "title must be given"],
    },
    author: {
      type: String,
      required: [true, "author field is required"],
    },
    genre: {
      type: String,
      required: true,
      uppercase: true,
      // enum: {
      //   values: [
      //     "FICTION",
      //     "NON_FICTION",
      //     "SCIENCE",
      //     "HISTORY",
      //     "BIOGRAPHY",
      //     "FANTASY",
      //   ],
      //   message: "You give ${VALUE}, is note correct",
      // },
    },
    isbn: {
      type: String,
      required: true,
      unique: true,
      min: [5, "isbn length is min 5, you give ${VALUE}"],
      max: [15, "isbn length is max 15, you give ${VALUE}"],
    },
    description: {
      type: String,
      default: "",
    },
    copies: {
      type: Number,
      required: true,
    },
    available: {
      type: Boolean,
      required: true,
      default: true
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Book = model("Book", bookSchema);
