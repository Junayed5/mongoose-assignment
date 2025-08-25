"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowRouter = void 0;
const express_1 = __importDefault(require("express"));
const borrow_models_1 = require("../models/borrow.models");
const books_models_1 = require("../models/books.models");
exports.borrowRouter = express_1.default.Router();
exports.borrowRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book, quantity, dueDate } = req.body;
        const bookFind = yield books_models_1.Book.findById(book);
        if ((bookFind === null || bookFind === void 0 ? void 0 : bookFind.copies) < quantity) {
            return res
                .status(400)
                .json({ success: false, message: "Not enough copies available" });
        }
        bookFind.copies -= quantity;
        if ((bookFind === null || bookFind === void 0 ? void 0 : bookFind.copies) === 0) {
            bookFind.available = false;
        }
        yield (bookFind === null || bookFind === void 0 ? void 0 : bookFind.save());
        const borrow = new borrow_models_1.Borrow({
            book,
            quantity,
            dueDate,
        });
        const data = yield borrow_models_1.Borrow.create(borrow);
        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Validation failed",
            success: false,
            error,
        });
    }
}));
exports.borrowRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const summary = yield borrow_models_1.Borrow.aggregate([
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Validation failed",
            success: false,
            error,
        });
    }
}));
