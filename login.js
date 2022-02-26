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

		// set user id
		this.userID = numberOfenduser;
		numberOfenduser += 1;
    }
}

class Admin {
	constructor(username, password) {
		this.username = username;
        this.password = password;

		// set admin
		this.adminID = numberOfadmin;
		numberOfadmin += 1;
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
    admins.push(new Admin('admin', 'admin'))
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
        const admin = admins[j].username;
        const adminpass = admins[j].password;
        if (admin == username && adminpass == password){
            currentUser = admins[j];
            window.location.href = "index_admin_after.html";
            return;
        }
    }
  } 
  
  
