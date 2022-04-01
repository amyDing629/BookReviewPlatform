const mongoose = require('mongoose');
const moment = require('moment');

const PostSchema = new mongoose.Schema({
    bookID: {
        type: mongoose.Schema.Types.ObjectId,
        // type: String,
		required: true
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        // type: String,
		required: true
    },
    booktitle: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    posterProfile: {
        type: String,
        required: true
    },
    pic: {
        type: String,
        required: false,
    },
    content: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        // default: Date.now
    },
    likes: {
        type: Number,
        required: true
    }
});

PostSchema.pre('save', function(next) {
    this.time = moment(this.time).format('MM-DD-YYYY');
    next();
});

const Post = mongoose.model("Post", PostSchema);

module.exports = { Post };