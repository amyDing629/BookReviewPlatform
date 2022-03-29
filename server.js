/* server.js - user & resource authentication */
// Modular version, with express routes imported separately.
'use strict';
const log = console.log
const path = require('path')

const express = require('express')
const exphbs = require('express-handlebars');
// starting the express server
const app = express();

// mongoose and mongo connection
const { ObjectID, ObjectId } = require('mongodb')
const { mongoose } = require('./db/mongoose');
const { Post } = require('./models/post')
const { Book, BookList } = require('./models/book')
const { User } = require('./models/user')

/*** handlebars: server-side templating engine ***/
const hbs = require('hbs')
// Set express property 'view engine' to be 'hbs'
app.set('view engine', 'hbs')
// setting up partials directory
hbs.registerPartials(path.join(__dirname, '/views/partials'))

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require('body-parser') 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));


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



/** Static directories **/
// static js directory
// app.use("/js", express.static(path.join(__dirname, '/public/js')))
// static image directory
// app.use("/img", express.static(path.join(__dirname, '/static')))


/** Import the various routes **/
// Webpage routes
// app.use(require('./routes/webpage'))
// User and login routes
// app.use(require('./routes/users'))
// Student API routes
// app.use(require('./routes/student'))

/*******************************************************************/

app.use("/", express.static(__dirname + '/public'));
app.use("/public/html", express.static(__dirname + '/public/html'));
app.use('/public/css', express.static(__dirname + '/public/css'));
app.use('/public/js', express.static(__dirname + '/public/js'));
app.use('/public/img/static', express.static(__dirname + '/public/img/static'));


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

app.get('/BookMain', (req, res) => {
    //if (req.session.user){
    //    res.sendFile(__dirname + '/public/html/BookMainPage.html?userID='+req.session.user._id) // not sure
    //} else { // guest
	    res.sendFile(__dirname + '/public/html/BookMainPage.html')
    //}
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

