const mongoose = require('mongoose');
const PostSchema = require("./post").default.PostSchema;

const BookSchema = new mongoose.Schema({
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

const BooklistSchema = new mongoose.Schema({
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

const Book = mongoose.model("Book", BookSchema);
const BookList = mongoose.model("Booklist", BooklistSchema);

module.exports ={ Book, BookList};

