import express, { Application, Request, Response } from "express";
import { booksRouter } from "./app/controller/books.controller";

export const app: Application = express();

app.use(express.json());
app.use("/books", booksRouter);

app.get("/", async (req: Request, res: Response) => {
  res.send("Welcome to late join assignment");
});
