/* server.js - user & resource authentication */
// Modular version, with express routes imported separately.
'use strict';
const log = console.log
const path = require('path')

const express = require('express')
// starting the express server
const app = express();

// mongoose and mongo connection
const { ObjectID, ObjectId } = require('mongodb')
const { mongoose } = require('./db/mongoose');
const { Post } = require('./models/post')
const { Book, BookList } = require('./models/book')
const { User } = require('./models/user')


// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require('body-parser') 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));


/*****************************************/
function isMongoError(error) { // checks for first error returned by promise rejection if Mongo database suddently disconnects
	return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
}

// helper: check mongo connection error
const mongoChecker = (req, res, next) => {
	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	} else {
		next()	
	}	
}

//helper: check session cookies
const sessionChecker = (req, res, next) => {
    if (req.session.user) {
        res.redirect('/index.html?userID='+req.session.user._id); // not sure
    } else {
        next(); // next() moves on to the route.
    }    
};

// Middleware for authentication of resources
const authenticate = (req, res, next) => {

	if (req.session.user) {
		User.findById(req.session.user).then((user) => {
			if (!user) {
				return Promise.reject()
			} else {
				req.user = user
				next()
			}
		}).catch((error) => {
			res.status(401).send("Unauthorized")
		})
	} else {
		res.status(401).send("Unauthorized")
	}
}

// Middleware for update booklist operation checking
const booklistModifyValidation = (req, res, next) =>{
	const validTargets =['likedBy','collectedBy','listDescription','books']
	const validOperation = ['add', 'reduce', 'new']
	if (!validTargets.includes(req.body.target) | !validOperation.includes(req.body.operation)){
		res.status(400).send("bad request on checking booklistModifyValidation")
		return Promise.reject() 
	} else {
		next()
	}
}


/*** Session handling **************************************/
// express-session for managing user sessions
const session = require('express-session');

/// Middleware for creating sessions and session cookies.
// A session is created on every request, but whether or not it is saved depends on the option flags provided.
app.use(session({
    secret: '309BookLand', // later we will define the session secret as an environment variable for production. for now, we'll just hardcode it.
    cookie: { // the session cookie sent, containing the session id.
        expires: 24 * 60 * 60 * 1000, // 24 hours
        httpOnly: true // important: saves it in only browser's memory - not accessible by javascript (so it can't be stolen/changed by scripts!).
    },
    // Session saving options
    saveUninitialized: false, // don't save the initial session if the session object is unmodified (for example, we didn't log in).
    resave: false, // don't resave an session that hasn't been modified.
}));



// A route to logout a user
app.get('/logout', (req, res) => {
	// Remove the session
	req.session.destroy((error) => {
		if (error) {
			res.status(500).send(error)
		} else {
			res.redirect('/')
		}
	})
})

/*******************************************************************/
/** Import the various routes **/
// Webpage routes
// app.use(require('./routes/webpage'))
// User and login routes
// app.use(require('./routes/users'))
// Student API routes
// app.use(require('./routes/student'))

app.use("/", express.static(path.join(__dirname + '/public')));
app.use("/public/html", express.static(path.join(__dirname + '/public/html')));
app.use('/public/css', express.static(path.join(__dirname + '/public/css')));
app.use('/public/js', express.static(path.join(__dirname + '/public/js')));
app.use('/public/img/static', express.static(path.join(__dirname + '/public/img/static')));
app.use('/user', express.static(path.join(__dirname + '/user')))

/*******************************************************************/

app.get('/', sessionChecker, (req, res) => {
	res.sendFile(__dirname + '/index.html')
})

app.get('/login',sessionChecker, (req, res) => {
	res.sendFile(__dirname + '/public/html/login.html') 
})

app.get('/register', sessionChecker, (req, res) => {
	res.sendFile(__dirname + '/public/html/register.html')
})

/*******************************************************************/
/*******************************************************************/
// login verify
app.get('/login/:username/:password', mongoChecker, async (req, res) => {
	const username = req.params.username
	const password = req.params.password

    try {
		const user = await User.findByNamePassword(username, password);
		if (!user) {
			res.status(404).send(error)
		} else {   
			// Add the user's id and username to the session.
            // We can check later if the session exists to ensure we are logged in.
            req.session.user = user._id;
            req.session.username = user.username
			res.send({user})
		}
    } catch (error) {
    	if (isMongoError(error)) {
			res.status(500).send(error)
		} else {
			res.status(400).send(error)
		}
    }
})

/*********** USERs ************/
// get all users
app.get('/api/users', mongoChecker, async (req, res)=>{
	try {
		const users = await User.find()
		res.send({users})
	} catch(error) {
		log(error)
		res.status(500).send("Internal Server Error")
	}
})

// get user by id
app.get('/api/users/:id', mongoChecker, async (req, res)=>{
	const id = req.params.id

	if (!ObjectId.isValid(id)) {
		res.status(404).send() 
		return;
	}
	try {
		const user = await User.findOne({_id: id})
		if (!user) {
			res.status(404).send('Resource not found')  // could not find this user
		} else { 
			res.send({user})
		}
	} catch(error) {
		log(error)
		res.status(500).send('Internal Server Error')  // server error
	}
})


app.post('/api/addUser', mongoChecker, async (req, res)=>{ 
    const newUser = new User({
		username: req.body.username,
        password: req.body.password,
		type: req.body.type
	})

    try {
		const user = await newUser.save()
		res.send({user})
	} catch(error) {
		if (isMongoError(error)) {
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request')
		}
	}
})


app.delete('/api/deleteUser/:userID',mongoChecker, async (req, res)=>{ 
    const user = req.params.userID

	try {
		const deleteUser = await User.findOneAndRemove({_id: user})
		if (!deleteUser) {
			res.status(404).send("no such a user")
		} else {   
			res.send({deleteUser})
		}
	} catch(error) {
		log(error)
		res.status(500).send("server error on delete user") // server error, could not delete.
	}
})



app.get('/user/template', mongoChecker, async (req, res)=>{
	try {
		res.sendFile(__dirname + '/public/html/user.html');
	} catch(error) {
		log(error)
		res.status(500).send('Internal Server Error');
	}
})

// get user by id
app.get('/user/:userID', mongoChecker, async (req, res)=>{
	const id = req.params.userID
	if (!ObjectId.isValid(id)) {
		res.status(404).send() 
		return;
	}
	try {
		const user = await User.findOne({_id: id}) 
		if (!user) {
			res.status(404).send('Resource not found')  // could not find this user
		} else { 
			res.redirect('/user/template?userID=' + id);
		}
	} catch(error) {
		log(error)
		res.status(500).send('Internal Server Error')  // server error
	}
})

//todo
app.get('/user/:userID/:visitID', mongoChecker, async (req, res)=>{

})

// update user information (signature, profilePhoto, isActivate, lists)
app.patch('/api/users/:userID', async (req, res)=>{
    const userID = req.params.userID
    if (!ObjectId.isValid(userID)) {
		res.status(404).send('invalid user id type') 
		return
	}
	const operation = req.body.operation
	const value = req.body.value
	
	try {
		const user = await User.findOne({_id: userID})
		if (!user) {
			res.status(404).send("no such a user")
		} else {  
			if (operation == 'signature'){
				user.signature = value
			} else if (operation == 'profile') {
				user.profilePhoto = value
			} else if (operation == 'postList') {
				user.postList = value
			} else if (operation == 'booklistList') {
				user.booklistList = value
			} else if (operation == 'postCollection') {
				user.postCollection = value
			} else if (operation == 'booklistCollection') {
				user.booklistCollection = value
			}else if (operation == 'isActivate') {
				user.isActivate = value
			} else {
				res.status(404).send('invalid operation')
			}
		}
		user.save().then((updatedUser) => {
			res.send({user: updatedUser})
		})
	} catch(error) {
		log(error)
		res.status(500).send("server error on find user")
	}
})



/************** POSTS ************/
app.get('/api/posts', mongoChecker, async (req, res) => {
	try {
		const posts = await Post.find()
		res.send({ posts })
	} catch(error) {
		log(error)
		res.status(500).send("Internal Server Error")
	}
})


app.get('/api/posts/:postID', mongoChecker, async (req, res) => {
	const postID = req.params.postID

	if (!ObjectId.isValid(postID)) {
		res.status(404).send() 
		return;
	}
	try {
		const post = await Post.findOne({_id: postID})
		if (!post) {
			res.status(404).send('Resource not found')  // could not find this post
		} else { 
			res.send({post});
		}
	} catch(error) {
		log(error)
		res.status(500).send('Internal Server Error')  // server error
	}
})

// delete post
app.delete('/api/posts/:postID', mongoChecker, async (req, res)=>{
    const postID = req.params.postID
    if (!ObjectId.isValid(postID)) {
		res.status(404).send('invalid post id type') 
		return
	}
	try {
		const deletePost = await Post.findOneAndRemove({_id: postID})
		if (!deletePost) {
			res.status(404).send("no such a post")
		} else {   
			res.send(deletePost)
		}
	} catch(error) {
		log(error)
		res.status(500).send('Internal Server Error')
	}
})

// create post
app.post('/api/addPost', mongoChecker, async (req, res)=>{
	const newPost = new Post({
		bookID: req.body.bookID,
		userID: req.body.userID,
		booktitle: req.body.booktitle,
		username: req.body.username,
	})
	if (req.body.pic){
		newPost.pic = req.body.pic
	}
	// if (req.body.booktitle){
	// 	newPost.booktitle = req.body.booktitle
	// }
	// if (req.body.username){
	// 	newPost.username = req.body.username
	// }
	if (req.body.posterProfile){
		newPost.posterProfile = req.body.posterProfile
	}
	if (req.body.content){
		newPost.content = req.body.content
	}

    try {
		const result = await newPost.save()	
		res.send({result})
	} catch(error) {
		log(error)
		if (isMongoError(error)) { 
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request') 
		}
	}  
})

// update post
app.patch('/api/posts/:postID', async (req, res)=>{
    const postID = req.params.postID
    if (!ObjectId.isValid(postID)) {
		res.status(404).send('invalid post id type') 
		return
	}
	const operation = req.body.operation // operation: add, reduce
	const value = req.body.value // value: userID
	const target = req.body.target // target: likes, collects
	
	try {
		const post = await Post.findOne({_id: postID})
		const user = await User.findOne({_id:value})
		if (!post || !user) {
			res.status(404).send("no such a post or user")
		}
		 else { 
			if (target == 'likes') {
				if (operation == 'add'){
					if (!post.likedBy.includes(value)){
						post.likedBy.push(value);
					}
				} else if (operation == 'reduce'){
					let user_index = post.likedBy.indexOf(value);
					if (user_index != -1){
						post.likedBy.splice(user_index, 1);
					}
				} else {
					res.status(404).send('invalid operation in request body')
				}	
			} 
			else if (target == 'collects') {
				if (operation == 'add') {
					if (!post.collectedBy.includes(value) && !user.postCollection.includes(postID)){
						post.collectedBy.push(value);
						user.postCollection.push(postID);
					}
				} else if (operation == 'reduce') {
					let user_index = post.collectedBy.indexOf(value);
					let post_index = user.postCollection.indexOf(postID);
					if ((user_index != -1) && (post_index != -1)) {
						post.collectedBy.splice(user_index, 1)
						user.postCollection.splice(post_index, 1)
					}
				} else {
					res.status(404).send('invalid operation in request body')
				}
			} else {
				res.status(404).send('invalid target in request body')
			}
			
		}
		post.save().then((updatedPost) => {
			user.save().then((updatedUser) => {
				res.send({post: updatedPost, user: updatedUser})
			})
		})
	} catch(error) {
		log(error)
		res.status(500).send("server error on find post")
	}
})

// update post likes
// target: likes, collects
// operation: add, reduce
// value: userID
app.patch('/api/booklists/:booklistID', async (req, res)=>{
    const booklistID = req.params.booklistID;
    if (!ObjectId.isValid(booklistID)) {
		res.status(404).send('invalid booklist id type') 
	}
	const operation = req.body.operation
	const value = req.body.value
	const target = req.body.target
	
	try {
		const booklist = await BookList.findOne({_id: booklistID})
		if (!booklist) {
			res.status(404).send("no such a book")
		} else { 
			if (target == 'likes') {
				if (operation == 'add'){
					booklist.likedBy.push(value);
				} else if (operation == 'reduce'){
					let user_index = booklist.likedBy.indexOf(value);
					if (user_index != -1){
						booklist.likedBy.splice(user_index, 1);
					}
				} else {
					res.status(404).send('invalid operation in request body')
				}	
			} else if (target == 'collects') {
				if (operation == 'add') {
					booklist.collectedBy.push(value);
				} else if (operation == 'reduce') {
					let user_index = booklist.collectedBy.indexOf(value);
					if (user_index != -1) {
						booklist.collectedBy.splice(user_index, 1)
					}
				} else {
					res.status(404).send('invalid operation in request body')
				}
			} else {
				res.status(404).send('invalid target in request body')
			}
			
		}
		booklist.save().then((updatedBooklist) => {
			res.send({updatedBooklist})
		})
	} catch(error) {
		log(error)
		res.status(500).send("server error on find booklist")
	}
})


/*********** BOOKs ************/

// get all books 
app.get('/api/books', mongoChecker, async (req, res)=>{
	try {
		const books = await Book.find()
		res.send({ books })
	} catch(error) {
		log(error)
		res.status(500).send("Internal Server Error")
	}
})

// display book main page
app.get('/BookMain/:userID?', async (req, res) => {
	const query = req.query
	const user = query.userID

	if (!user){
		res.sendFile(__dirname + '/public/html/BookMainPage.html')
	} else {
		try {
			const target = await User.findOne({_id: user})
			res.sendFile(__dirname + '/public/html/BookMainPage.html')
		} catch(error) {
			log(error)
			res.status(500).send("server error on find a book")
		}
	}
})

// find one book
app.get('/api/book', mongoChecker, async (req, res) => {
    const query = req.query
    const book = query.bookID
    if (!ObjectId.isValid(book)) {
		res.status(404).send('invalid book id type') 
		return
	}
	try {
		const target = await Book.findOne({_id: book})
		if (!target) {
			res.status(404).send("no such a book")
		} else {   
			res.send(target)
		}
	} catch(error) {
		log(error)
		res.status(500).send("server error on find a book")
	}
})

// delete book
app.delete('/api/book/:bookID', async (req, res)=>{
    const book = req.params.bookID
    if (!ObjectId.isValid(book)) {
		res.status(404).send('invalid book id type') 
		return
	}
	try {
		const deleteBook = await Book.findOneAndRemove({_id: book})
		if (!deleteBook) {
			res.status(404).send("no such a book")
		} else {   
			res.send(deleteBook)
		}
	} catch(error) {
		log(error)
		res.status(500).send("server error on delete book")
	}
})

app.post('/api/book', async (req, res)=>{ // not sure the config for book id

    const newBook = new Book({
		name: req.body.name,
        author: req.body.author,
		year: req.body.year,
		coverURL: req.body.coverURL,
        description: req.body.description,
        postCollection: []
	})
    try {
		const result = await newBook.save()	
		res.send(result)
	} catch(error) {
		log(error) // log server error to the console, not to the client.
		if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
		}
	}
})


/*********** Booklist ************/

// get all booklists
app.get('/api/booklists', mongoChecker, async (req, res)=>{
	try {
		const booklists = await BookList.find()
		res.send({ booklists })
	} catch(error) {
		log(error)
		res.status(500).send("Internal Server Error")
	}
})

app.get('/api/booklists/:booklistID', mongoChecker, async(req, res)=>{
    const booklistID = req.params.booklistID
    if (!ObjectId.isValid(booklistID)) {
		res.status(404).send('invalid book id type') 
		return
	}
	try {
		const booklist = await BookList.findOne({_id: booklistID})
		if (!booklist) {
			res.status(404).send("no such a booklist")
		} else {   
			res.send(booklist)
		}
	} catch(error) {
		log(error)
		res.status(500).send("server error on find a booklist")
	}
})

// add booklist
app.post('/api/booklist', async (req, res)=>{
	const booksIDs = req.body.books
	let books = []
	for (let i=0;i<booksIDs.length;i++){
		const book = await Book.findOne({_id: booksIDs[i]})
		if (!ObjectId.isValid(book)) {
			res.status(404).send("invalid book id")
		} else {   
			books.push(book)
		}
	}
	let booklist = null
	if (books.length != booksIDs.length){
		res.status(404).send("Fail, has unfound book")
		return;
	} else {
		booklist = new BookList({
			listName: req.body.listName,
			listDescription: req.body.listDescription,
			creator: req.body.creator,
			creatorID: req.body.creatorID,
			books: books
		})
	}
    try {
		const result = await booklist.save()	
		res.send(result)
	} catch(error) {
		log(error) 
		if (isMongoError(error)) { 
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request') 
		}
	}
})

// delete a booklist
app.delete('/api/booklist/:booklistID', async (req, res)=>{
    const booklist = req.params.booklistID
    if (!ObjectID.isValid(booklist)) {
		res.status(404).send('invalid booklist id type') 
		return
	}
	try {
		const forDelete = await BookList.findOneAndRemove({_id: booklist})
		if (!forDelete) {
			res.status(404).send("no such a book")
		} else {   
			res.send(forDelete)
		}
	} catch(error) {
		log(error)
		res.status(500).send("server error on delete booklist")
	}
})

// update like/collect
app.patch('/api/booklist/:booklistID', booklistModifyValidation, async (req, res)=>{
    const booklist = req.params.booklistID
    if (!ObjectID.isValid(booklist)) {
		res.status(404).send('invalid booklist id type') 
		return
	}
	const target = req.body.target
	const operation = req.body.operation
	const fieldsToUpdate = {}
	//let curr = 0
	let curr = []

	// check booklist validation
	try {
		const item = await BookList.findOne({_id: booklist})
		if (!item) {
			res.status(404).send("no such a booklist")
		} else {   
			curr = item[target]
		}
	} catch(error) {
		log(error)
		res.status(500).send("server error on find booklist")
	}

	// check the validation of the user who performs this update
	try {
		const who = req.body.who
		const user = await User.findOne({_id: who})
		if (!user) {
			res.status(404).send("no such a book")
		} else { // valid user, do valid operation
			// target = likedBy/collectedBy
			if (operation == 'add'){
				curr.push(user._id)
				fieldsToUpdate[target] = curr
			} else if(operation == 'reduce'){
				const newValue = curr.filter((userID) => !userID.equals(user._id))
				fieldsToUpdate[target] = newValue
			} else if(operation == 'new'){
				fieldsToUpdate[target] = req.body.value
			} else {
				res.status(404).send('invalid request body') 
				return;
			}
		}
	} catch(error) {
		log(error)
		res.status(500).send("server error on find user")
	}
    
	try {
		const list = await BookList.findOneAndUpdate({_id: booklist}, {$set: fieldsToUpdate}, {new: true})
		if (!list) {
			res.status(404).send('Resource not found')
		} else {   
			res.send(list)
		}
	} catch (error) {
		log(error)
		if (isMongoError(error)) {
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request')
		}
	}
})

app.get('/BooklistMain', async (req, res) => {
	const query = req.query
	const user = query.userID

	if (!user){
		res.sendFile(__dirname + '/public/html/BooklistMainPage.html')
	} else {
		try {
			const target = await User.findOne({_id: user})
			res.sendFile(__dirname + '/public/html/BooklistMainPage.html')
		} catch(error) {
			log(error)
			res.status(500).send("server error on find a book")
		}
	}

})

/*********** Booklist detail ************/
app.get('/Booklist/Detail', async (req, res) => {
	const query = req.query
	const booklist = query.booklistID
	try{
		const user = query.userID
		if (!booklist){
			res.status(500).send("server error on display booklist detail page")
		}
		else { 
			res.sendFile(__dirname + '/public/html/BooklistDetail.html')
		}
	} catch {
			res.sendFile(__dirname + '/public/html/BooklistDetail.html')
		}
		
	})

app.patch('/api/booklist/content/:booklistID', booklistModifyValidation, async(req, res)=>{
	const booklist = req.params.booklistID
    if (!ObjectID.isValid(booklist)) {
		res.status(404).send('invalid booklist id type') 
		return
	}
	const target = req.body.target
	const operation = req.body.operation
	const fieldsToUpdate = {}
	try {
		const value = req.body.value
		if (!value) {
			res.status(404).send("no value")
		} else { // valid user, do valid operation
			// target = listDescription / books
			fieldsToUpdate[target] = value
		}
	} catch(error) {
		log(error)
		res.status(500).send("server error on find user")
	}
	
	try {
		const list = await BookList.findOneAndUpdate({_id: booklist}, {$set: fieldsToUpdate}, {new: true})
		if (!list) {
			res.status(404).send('Resource not found')
		} else {   
			res.send(list)
		}
	} catch (error) {
		log(error)
		if (isMongoError(error)) {
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request')
		}
	}
})

/*********** Book detail ************/
app.get('/BookDetail/Detail', async (req, res) => {
	const query = req.query
	const book = query.bookID
	const user = query.userID

	if (!book){
		res.status(500).send("server error on display book detail page2")
	}else {
		res.sendFile(__dirname + '/public/html/BookDetail.html')
	}
})

app.patch('/api/book/:bookID', async (req, res)=>{
	const bookID = req.params.bookID
	if (!ObjectID.isValid(bookID)) {
		res.status(404).send('invalid booklist id type') 
		return
	}
	
	const target = req.body.target
	const content = req.body.content
	const fieldsToUpdate = {}
	try {
		const item = await Book.findOne({_id: bookID})
		if (!item) {
			res.status(404).send("no such a book")
		}
	} catch(error) {
		log(error)
		res.status(500).send("server error on find booklist")
	}

	if (content){
		fieldsToUpdate[target] = content
	} else {
		res.status(404).send('invalid request body') 
		return;
 	}
	try {
		const book = await Book.findOneAndUpdate({_id: bookID}, {$set: fieldsToUpdate}, {new: true})
		if (!book) {
			res.status(404).send('Resource not found')
		} else {   
			res.send(book)
		}
	} catch (error) {
		log(error)
		if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request') // bad request for changing the student.
		}
	}
	
})

app.patch('/api/post/:postID', async (req, res)=>{
	const post = req.params.postID
    if (!ObjectID.isValid(post)) {
		res.status(404).send('invalid booklist id type') 
		return
	}
	
	// const target = req.body.target
	const operation = req.body.operation
	const fieldsToUpdate = {}
	let curr = 0
	try {
		const item = await Post.findOne({_id: post})
		if (!item) {
			res.status(404).send("no such a book")
		} else {   
			curr = item['likes']
		}
	} catch(error) {
		log(error)
		res.status(500).send("server error on find booklist")
	}

	if (operation == 'add'){
		fieldsToUpdate['likes'] = curr+1
	} else if(operation == 'reduce'){
		fieldsToUpdate['likes'] = curr-1
	} else {
		res.status(404).send('invalid request body') 
		return;
 	}
	try {
		const list = await Post.findOneAndUpdate({_id: post}, {$set: fieldsToUpdate}, {new: true})
		if (!list) {
			res.status(404).send('Resource not found')
		} else {   
			res.send(list)
		}
	} catch (error) {
		log(error)
		if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request') // bad request for changing the student.
		}
	}
})


/*************************************************/
// get all book and lists
app.get('/api/two', mongoChecker, async (req, res)=>{
	try {
		const books = await Book.find()
		const lists = await BookList.find()
		res.send({ books, lists})
	} catch(error) {
		log(error)
		res.status(500).send("Internal Server Error")
	}
})


/*************************************************/

// 404 route at the bottom for anything not found.
app.get('*', (req, res) => {
    res.status(404).send("404 Error: We cannot find the page you are looking for.");
    // you could also send back a fancy 404 webpage here.
  });


/*************************************************/
// Express server listening...
const port = process.env.PORT || 50001
app.listen(port, () => {
	log(`Listening on port ${port}...`)
}) 

