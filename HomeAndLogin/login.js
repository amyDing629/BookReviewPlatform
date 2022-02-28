
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

if (window.location.href.endsWith("login.html")) {
    UserCallBack();
    const signin = document.querySelector('#signin');
    signin.addEventListener('click', change_page);
}

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
  }

  