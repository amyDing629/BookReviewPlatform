const log = console.log;
log(document)
/****** User signin ******/
let numberOfenduser = 0;
const endusers = [];
let numberOfadmin = 0;
const admins = [];

let currentUser // I wish to bring this variable to index_end_after.js & index_admin_after.js

class EndUser {
	constructor(username, password) {
		this.username = username;
        this.password = password;

		// set book ID
		this.userID = numberOfenduser;
		numberOfenduser = 0;
    }
}

class Admin {
	constructor(username, password) {
		this.username = username;
        this.password = password;

		// set book ID
		this.adminID = numberOfadmin;
		numberOfadmin = 0;
    }
}

function EndUserCallBack() {
    /// Get endusers from server
    // code below requires server call
    endusers.push(new EndUser('user', 'user'))
 }

function AdimnCallBack() {
    /// Get endusers from server
    // code below requires server call
    endusers.push(new Admin('admin', 'admin'))
 }

EndUserCallBack()
AdimnCallBack()

const signin = document.querySelector('#signin')
signin.addEventListener('click', change_page, {once:true})


function change_page(){
    const username = document.querySelector('#username').value
    const password = document.querySelector('#password').value

    for (let i=0; i<endusers.length; i++){
        const user = endusers[i].username;
        const pass = endusers[i].password;
        if (user == username && password == pass){
            currentUser = endusers[i];
            window.location.href = "index_end_after.html";
            return;
        }
    }
    for (let j=0; j<admins.length;j++){
        const admin = admins[i].username;
        const adminpass = admins[i].password;
        if (admin == username && adminpass == password){
            currentUser = admins[i];
            window.location.href = "index_admin_after.html";
            return;
        }
    }
  } 
  
  
