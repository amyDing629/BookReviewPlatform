const log = console.log;
/****** Back ******/
const backTohome = document.querySelector('.back')
backTohome.addEventListener('click', back)
function back(e){
    e.preventDefault();
    if (e.target.className == 'btn btn-dark'){
        log('hi')
        window.location.replace('index.html')
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

if (window.location.href.indexOf('login.html') !== -1) {
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
    // register
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
    


  