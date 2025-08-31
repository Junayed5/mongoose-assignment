import express, { Application, Request, Response } from "express";
import { booksRouter } from "./app/controller/books.controller";
import { borrowRouter } from "./app/controller/borrow.controller";
import cors from "cors";
export const app: Application = express();

app.use(express.json());
app.use(
  cors({
    origin: ["https://bookshelf-lemon-pi.vercel.app"],
  })
);
// ""
app.use("/api", booksRouter);
app.use("/api", borrowRouter);

app.get("/", async (req: Request, res: Response) => {
  res.send("Welcome to late join assignment");
});
