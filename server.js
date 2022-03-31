/* server.js - user & resource authentication */
// Modular version, with express routes imported separately.
'use strict';
const log = console.log
const path = require('path')

const express = require('express')
//const exphbs = require('express-handlebars');
// starting the express server
const app = express();

// mongoose and mongo connection
const { ObjectID, ObjectId } = require('mongodb')
const { mongoose } = require('./db/mongoose');
const { Post } = require('./models/post')
const { Book, BookList } = require('./models/book')
const { User } = require('./models/user')

/*** handlebars: server-side templating engine ***/
//const hbs = require('hbs')
// Set express property 'view engine' to be 'hbs'
//app.set('view engine', 'hbs')
// setting up partials directory
//hbs.registerPartials(path.join(__dirname, '/views/partials'))

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


/*** Session handling **************************************/
// express-session for managing user sessions
const session = require('express-session')

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

app.post('/users/login', mongoChecker, async (req, res) => {
	const username = req.body.username
    const password = req.body.password

    try {
		const user = await User.findByNamePassword(username, password);
		if (!user) {
            res.redirect('/public/html/login');
        } else {
            req.session.user = user._id;
            req.session.username = user.username
            res.redirect('/public/index.html?userID='+user._id);
        }
    } catch (error) {
    	// redirect to login if can't login for any reason
    	if (isMongoError(error)) {
			res.status(500).redirect('/public/html/login');
		} else {
			log(error)
			res.status(400).redirect('/public/html/login');
		}
    }
})

// A route to logout a user
app.get('/users/logout', (req, res) => {
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

/*******************************************************************/

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/index.html')
})


app.get('/login', (req, res) => {
    /* if (req.session.user) {
        res.sendFile(__dirname + '/public/index.html?userID='+req.session.user._id) // not sure
    } else { */
        res.sendFile(__dirname + '/public/html/login.html')
    //}
})

app.get('/register', (req, res) => {
	res.sendFile(__dirname + '/public/html/register.html')
})

/*******************************************************************/
/*******************************************************************/

/*********** USERs ************/
// get all users
app.get('/api/users', mongoChecker, async (req, res)=>{
	try {
		const users = await User.find()
		res.send({ users })
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
		signature: "",
		profilePhoto: "",
        postist: [],
    	booklistList: [],
    	postColectionList: [],
    	booklistCollectionList: [],
		isAdmin: req.body.isAdmin
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
			res.status(404).send("no such a book")
		} else {   
			res.send({deleteUser})
		}
	} catch(error) {
		log(error)
		res.status(500).send("server error on delete book") // server error, could not delete.
	}
})

// Modify user info like collection lists
// TODO
app.put('/api/users/:userID',mongoChecker, async (req, res)=>{}) 

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
app.get('/BookMain/:userID?', (req, res) => {
    /* try{
        const user = req.query.userID
        if (!user){
            res.sendFile(__dirname + '/public/html/BookMainPage.html')
        } else {
            res.redirect(__dirname + '/public/html/BookMainPage.html?userID='+user)
        }
    } catch(error){
        log(error)
        res.status(400).redirect('/public/index.html')    
    } */
	
	res.sendFile(__dirname + '/public/html/BookMainPage.html')
    /* try{
        const userID = req.body._id
        if(!userID){
            res.redirect(__dirname + '/public/html/BookMainPage.html')
        } else {
            res.redirect(__dirname + '/public/html/BookMainPage.html?userID='+userID)
        }
    } catch(error){
        log(error)
        res.status(400).redirect('/public/index.html')   
    }  */

})

// fiind one book
app.get('/api/book', mongoChecker, async (req, res) => {
    const query = req.query
    const book = query.bookID
    if (!ObjectID.isValid(book)) {
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
    if (!ObjectID.isValid(book)) {
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
			books: books,
			likes: 0,
			collect: 0
		})
	}
	log(booklist)
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
		res.status(500).send("server error on delete book")
	}
})
app.get('/BooklistMain', (req, res) => {
    /* try{
        const user = req.query.userID
        if (!user){
            res.sendFile(__dirname + '/public/html/BookMainPage.html')
        } else {
            res.redirect(__dirname + '/public/html/BookMainPage.html?userID='+user)
        }
    } catch(error){
        log(error)
        res.status(400).redirect('/public/index.html')    
    } */
	
	res.sendFile(__dirname + '/public/html/BooklistMainPage.html')
    /* try{
        const userID = req.body._id
        if(!userID){
            res.redirect(__dirname + '/public/html/BookMainPage.html')
        } else {
            res.redirect(__dirname + '/public/html/BookMainPage.html?userID='+userID)
        }
    } catch(error){
        log(error)
        res.status(400).redirect('/public/index.html')   
    }  */

})



// 404 route at the bottom for anything not found.
app.get('*', (req, res) => {
    res.status(404).send("404 Error: We cannot find the page you are looking for.");
    // you could also send back a fancy 404 webpage here.
  });


/*************************************************/
// Express server listening...
const port = process.env.PORT || 5001
app.listen(port, () => {
	log(`Listening on port ${port}...`)
}) 

