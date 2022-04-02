const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    bookID: {
        type: Number,
        required: true,
        minlength: 1
    },
    bookTitle: {
        type: String,
        required: true,
    },
    bookLink: {
        type: String,
        required: false,
    },
    poster: {
        type: String,
        required: true,
    },
    posterProfile: {
        type: String,
        required: false
    },
    pic: {
        type: String,
        required: false,
        minlength: 1
    },
    content: {
        type: String,
        required: false,
        validate: {
            validator: function(price) {
                return price >= 0;
            },
            message: price => `${price} is not a valid price`
        }
    },
    time: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        required: true
    }
});

const Post = mongoose.model("Post", PostSchema);

module.exports = { Post };