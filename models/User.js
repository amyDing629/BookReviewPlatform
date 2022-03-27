import { Schema, model } from "mongoose";
const BooklistSchema = require("./Book").default.BooklistSchema;
const PostSchema = require("./Post").default.PostSchema;

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

const UserSchema = new Schema(UserObject);
// const AdminSchema = new Schema(AdminObject);

const User  = model('User', UserSchema);
// const AdminUser = model('AdminUser', AdminSchema)

export default { User, UserSchema };