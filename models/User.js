const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const Post = mongoose.model('Post').schema
const BookList = mongoose.model('Booklist').schema;


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 1,
		maxlength: 10
    },
    password: {
        type: String,
        required: true,
        minlength: 1,
		maxlength: 10
    },
    signature: {
        type: String,
		required:true,
        default: ''
    },
    profilePhoto: {
        type: String,
		required:true,
        default: ''
    },
    postList: {
        type: [String],
        default: []
    },
    booklistList: {
        type: [String],
        default: []
    },
    postCollection: {
        type: [String],
        default: []
    },
    booklistCollection: {
        type: [String],
        default: []
    },
    type:{
        type: String,
        required: true,
        enum: ['Admin', 'User']
    },
    isActivate:{
        type: Boolean,
        required: true,
        default: true
    }
})


// This function will run immediately prior to saving the document
// in the database.
UserSchema.pre('save', function(next) {
	const user = this; // binds this to User document instance

	// checks to ensure we don't hash password more than once
	if (user.isModified('password')) {
		// generate salt and hash the password
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash
				next()
			})
		})
	} else {
		next()
	}
})

UserSchema.statics.findByNamePassword = function(username, password) {
	const User = this // binds this to the User model

	// First find the user by their username
	return User.findOne({ username: username }).then((user) => {
		if (!user) {
			return Promise.reject()  // a rejected promise
		}
		// if the user exists, make sure their password is correct
		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (err, result) => {
				if (result) {
					resolve(user)
				} else {
					reject()
				}
			})
		})
	})
}


const User  = mongoose.model('User', UserSchema);
// const AdminUser = model('AdminUser', AdminSchema)
module.exports = { User };