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
exports.booksRouter = void 0;
const express_1 = __importDefault(require("express"));
const books_models_1 = require("../models/books.models");
exports.booksRouter = express_1.default.Router();
exports.booksRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { filter, sortBy, sort, limit } = req.query;
        // defaults
        const query = {};
        limit = limit ? parseInt(limit, 10) : 10;
        sortBy = sortBy ? sortBy : "createdAt";
        sort = sort === "asc" ? 1 : -1;
        // filter by genre if provided
        if (filter) {
            query.genre = filter;
        }
        const data = yield books_models_1.Book.find(query)
            .sort({ [sortBy]: sort })
            .limit(limit);
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Validation failed",
            success: false,
            error,
        });
    }
}));
exports.booksRouter.get("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const data = yield books_models_1.Book.findById(bookId);
        res.status(200).json({
            success: true,
            message: "Book retrieved successfully",
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
exports.booksRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const data = yield books_models_1.Book.create(body);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
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
exports.booksRouter.patch("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const body = req.body;
        const data = yield books_models_1.Book.findByIdAndUpdate(bookId, body, { new: true });
        res.status(201).json({
            success: true,
            message: "Book updated successfully",
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
exports.booksRouter.delete("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const body = req.body;
        yield books_models_1.Book.findByIdAndDelete(bookId, body);
        res.status(201).json({
            success: true,
            message: "Book deleted successfully",
            data: null,
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
