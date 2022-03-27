const log = console.log;
/****** Back ******/
const backTohome = document.querySelector('.back')
backTohome.addEventListener('click', back)
function back(e){
    e.preventDefault();
    if (e.target.className == 'btn btn-dark'){
        log('hi')
        window.location.href=('index.html')
    }  
}

/****** Register ******/
const register = document.querySelector('.register')
register.addEventListener('click', benewacc)
function benewacc(e){
    e.preventDefault();
    if (e.target.className == 'btn btn-dark'){
        log('hi')
        window.location.href=('register.html')
    }  
}

/****** User signin ******/
let numberOfUsers = 0;
const users = [];

class User {
	constructor(userName, password) {
		this.userName = userName;
        this.password = password;
        this.signature = null;
        this.profilePhoto = null;
        this.postList = [];
        this.booklistList = [];
        this.collectionList = [];
        this.userID = numberOfUsers;
        this.isAdmin = false;
		numberOfUsers++;
    }
}

class AdminUser extends User {
    constructor(userName, password) {
        super(userName, password);
        this.isAdmin = true;
    }
}

function UserCallBack() {
    /// Get users from server
    // code below requires server call
    users.push(new User('user', 'user'));
    users.push(new AdminUser('admin', 'admin'));
 }

// button trigger
if (window.location.href.indexOf('login.html') !== -1) {
    UserCallBack();
    const signin = document.querySelector('#signin');
    signin.addEventListener('click', change_page);
}

// press key enter trigger
const usernamefield = document.querySelector('#username')
usernamefield.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        change_page();
    }
});
const passwordfield = document.querySelector('#password')
passwordfield.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        change_page();
    }
});


function change_page(){ 
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;     
    for (let i=0; i<users.length; i++){
        let user = users[i].userName;
        let pass = users[i].password;
        console.log(user, pass);
        if (user == username && password == pass){
            if (users[i].isAdmin == true) {
                window.location.href = "index_admin_after.html?userID=" + users[i].userID;
            }
            else{
                window.location.href = "index_end_after.html?userID=" + users[i].userID;
            } 
            return;
        }
    }
    const p = document.querySelector('p')
    p.innerText = 'username or password not correct, please try again'
    
}
    

  