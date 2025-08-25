"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
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
        enum: {
            values: [
                "FICTION",
                "NON_FICTION",
                "SCIENCE",
                "HISTORY",
                "BIOGRAPHY",
                "FANTASY",
            ],
            message: "You give ${VALUE}, is note correct",
        },
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
    },
}, {
    versionKey: false,
    timestamps: true,
});
exports.Book = (0, mongoose_1.model)("Book", bookSchema);
