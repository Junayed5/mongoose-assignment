import express, { Request, Response } from "express";
import { Book } from "../models/books.models";

export const booksRouter = express.Router();

booksRouter.get("/", async (req: Request, res: Response) => {
  try {
    let { filter, sortBy, sort, limit }: any = req.query;

    // defaults
    const query: any = {};
    limit = limit ? parseInt(limit as string, 10) : 10;
    sortBy = sortBy ? (sortBy as string) : "createdAt";
    sort = sort === "asc" ? 1 : -1;

    // filter by genre if provided
    if (filter) {
      query.genre = filter;
    }

    const data = await Book.find(query)
      .sort({ [sortBy]: sort })
      .limit(limit);

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Validation failed",
      success: false,
      error,
    });
  }
});
booksRouter.get("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const data = await Book.findById(bookId);

    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
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

booksRouter.post("/", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const data = await Book.create(body);

    res.status(201).json({
      success: true,
      message: "Book created successfully",
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
booksRouter.patch("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const body = req.body;
    const data = await Book.findByIdAndUpdate(bookId, body, { new: true });

    res.status(201).json({
      success: true,
      message: "Book updated successfully",
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
booksRouter.delete("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const body = req.body;
    await Book.findByIdAndDelete(bookId, body);

    res.status(201).json({
      success: true,
      message: "Book deleted successfully",
      data: null,
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
