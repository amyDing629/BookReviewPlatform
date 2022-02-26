// get 'posts' variable

/********** global variables **********/
let numberOfUsers = 0;
const users = [];

/********************** User object ***********************/
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

/********************** Functions ************************/
function displayUserInfo(user) {
    document.getElementById('userName').innerHTML = user.userName;
    document.getElementById('id').innerHTML = 'user ID: ' + String(user.userID);
    if (user.signature != null) {
        document.getElementById('signature').innerHTML = user.signature;
    }
    if (user.profilePhoto != null) {
        userInfo.getElementsByClassName('profilePic')[0].src = user.profilePhoto;
    }
    if (user.isAdmin == true) {
        let buttons = document.getElementById('menubar').children[0];
        let manageButtonLi = document.createElement("li");
        let manageButton = document.createElement("button");
        manageButton.innerHTML = 'Manage';
        manageButton.classList.add('menuButton');
        manageButtonLi.appendChild(manageButton);
        buttons.appendChild(manageButtonLi);
        let editBookButtonLi = document.createElement("li");
        let editBookButton = document.createElement("button");
        editBookButton.classList.add('menuButton');
        editBookButton.innerHTML = 'Edit Books';
        editBookButtonLi.appendChild(editBookButton);
        buttons.appendChild(editBookButtonLi);
    }
}

function menuButtonsOnClick(e) {
    let changeBackTarget = document.getElementsByClassName('menuButtonSelected')[0];
    changeBackTarget.classList.add('menuButton');
    changeBackTarget.classList.remove('menuButtonSelected');
    let target = e.target;
    target.classList.add('menuButtonSelected');
    target.classList.remove('menuButton');
    
}

function profileButtonsOnClick(e) {

}

/*************** actions ****************/
// Display admin user
let adminUser = new AdminUser('admin', 'admin');
let regularUser = new User('user', 'user');
users.push(adminUser);
users.push(regularUser);
displayUserInfo(adminUser);

// Setup onclick
const menuButtons = document.getElementsByClassName('menuButton');
const profileButtons = document.querySelector('#profileButton');
const menuButtonSelected = document.querySelector('.menuButtonSelected');

let menuButton;
for (menuButton of menuButtons) {
    menuButton.addEventListener('click', menuButtonsOnClick);
}
menuButtonSelected.addEventListener('click', menuButtonsOnClick);
profileButtons.addEventListener('click', profileButtonsOnClick);






