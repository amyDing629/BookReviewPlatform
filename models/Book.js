import { Schema, model } from "mongoose";
const PostSchema = require("./Post").default.PostSchema;

const BookSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 1
    },
    author: {
        type: String,
        required: true,
        minlength: 1
    },
    coverURL: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    postCollection: [PostSchema],
    bookID: {
        type: Number,
        required: true
    },
});

const BooklistSchema = new Schema({
    listName: {
        type: String,
        required: true,
        minlength: 1
    },
    listDescription: {
        type: String,
        required: true,
        minlength: 1
    },
    creator: {
        type: String,
        required: false,
    },
    books: [BookSchema],
    booklistID: {
        type: Number,
        required: true
    },
    likes: {
        type: Number,
        required: true,
        minlength: 1
    },
    collect: {
        type: Number,
        required: true,
        minlength: 1
    }
});

const Book = model("Book", BookSchema);
const Booklist = model("Booklist", BooklistSchema);

export default { Book, BookSchema, BookList, BooklistSchema };

