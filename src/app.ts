import express, { Application, Request, Response } from "express";
import { booksRouter } from "./app/controller/books.controller";
import { borrowRouter } from "./app/controller/borrow.controller";

export const app: Application = express();

app.use(express.json());
app.use("/books", booksRouter);
app.use("/borrow", borrowRouter);

app.get("/", async (req: Request, res: Response) => {
  res.send("Welcome to late join assignment");
});
