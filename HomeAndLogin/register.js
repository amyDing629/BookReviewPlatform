const log = console.log;
/****** Back ******/
const backTohome = document.querySelector('.back')
backTohome.addEventListener('click', back)
function back(e){
    e.preventDefault();
    if (e.target.className == 'btn btn-dark'){
        log('hi')
        window.location.href=('login.html')
    }  
}

/****** User signUP ******/
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

if (window.location.href.indexOf('register.html') !== -1) {
    UserCallBack();
    const signup = document.querySelector('#signup');
    signup.addEventListener('click', change_page);
}

// press key enter trigger
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
    if (username!='' && password!=''){
        const sameName = users.filter(User => User.userName != username);
        log(sameName)
        if (sameName.length == users.length){
            users.push(new User(username, password))
            window.location.href = "index_end_after.html?userID=" + users[users.length-1].userID;
            }
        else{
            const p = document.querySelector('p')
            p.innerText = 'username already been used, please try again'
        }
    }
    else{
        const p = document.querySelector('p')
            p.innerText = 'username and password cannot be empty'
    }   
   
}
    
