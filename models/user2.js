const mongoose = require('mongoose');
const BooklistSchema = require("./book").default.BooklistSchema;
const PostSchema = require("./post").default.PostSchema;

const UserObject = {
    userName: {
        type: String,
        required: true,
        minlength: 1
    },
    password: {
        type: String,
        required: true,
        minlength: 1
    },
    signature: {
        type: String,
        required: false,
    },
    profilePhoto: {
        type: String,
        required: false,
    },
    postist: [PostSchema],
    booklistList: [BooklistSchema],
    postColectionList: [PostSchema],
    booklistCollectionList: [BooklistSchema],
    userID: {
        type: Number,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        enum: ['true', 'false']
    }
}

// const AdminObject = Object.create(UserObject);
// AdminObject.isAdmin = 'true';

const UserSchema = new mongoose.Schema(UserObject);
// const AdminSchema = new Schema(AdminObject);

const User  = mongoose.model('User', UserSchema);
// const AdminUser = model('AdminUser', AdminSchema)
module.exports = { User };