const mongoose = require('mongoose');
const PostSchema = mongoose.model('Post').schema


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
    year:{
        type: Number,
        required: true,
    },
    coverURL: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    postCollection: {
        type: [PostSchema],
        default: []
    }
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
    books: {
        type: [BookSchema],
        default: []
    },
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

module.exports ={ Book, BookList };

