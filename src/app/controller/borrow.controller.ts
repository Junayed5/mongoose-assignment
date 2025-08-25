import express, { Request, Response } from "express";
import { Borrow } from "../models/borrow.models";
import { Book } from "../models/books.models";

export const borrowRouter = express.Router();

borrowRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { book, quantity, dueDate } = req.body;

    const bookFind: any = await Book.findById(book);

    if (bookFind?.copies < quantity) {
      return res
        .status(400)
        .json({ success: false, message: "Not enough copies available" });
    }

    bookFind.copies -= quantity;

    if (bookFind?.copies === 0) {
      bookFind.available = false;
    }

    await bookFind?.save();

    const borrow = new Borrow({
      book,
      quantity,
      dueDate,
    });

    const data = await Borrow.create(borrow);

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Validation failed",
      success: false,
      error,
    });
  }
});

borrowRouter.get("/", async (req: Request, res: Response) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "book",
        },
      },
      { $unwind: "$book" },
      {
        $project: {
          _id: 0,
          totalQuantity: 1,
          "book.title": 1,
          "book.isbn": 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: summary,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Validation failed",
      success: false,
      error,
    });
  }
});
