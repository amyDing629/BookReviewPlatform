const mongoose = require('mongoose');

// Connect to our database
// NOTE: This is a cloud deployed database, the username and password are both "server"
const mongoDB = process.env.DATABASE_TOKEN;

mongoose.connect(mongoDB, { useNewUrlParser: true }).catch((error) => {
    console.log("Error Connecting Database Server!");
});


module.exports = { mongoose };