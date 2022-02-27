// get 'posts' variable

/********** global variables **********/
let numberOfUsers = 0;
const users = [];

/********************** Object ***********************/
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

class Post {
	constructor(booktitle, booklink, poster, posterlink, posterProfile, pic, content, time, likes) {
		this.booktitle = booktitle;
        this.booklink = booklink;
		this.poster = poster;
        this.posterlink = posterlink // if the current user does not login, cannot visit poster link (unsolved)
        this.posterProfile = posterProfile;
        this.pic = pic;
        this.content = content; 
        this.time = time;
        this.likes = likes; // only logined user can like? (unsolved)

		// set post ID
		this.postID = numberOfPosts;
		numberOfPosts++;
    }
}
/********************** Functions On Click ***********************/
function menuButtonsOnClick(e) {
    // Change button color
    changeButtonColor(e.target);
    
    let userID = parseInt(document.getElementById('id').innterHTML)
    // Find user
    let user = null;
    for (user of users) {
        if (user.userID == userID) {
            // Display contents depending on which button is clicked  
            if (e.target.innerHTML.contains('Posts')) {
                displayUserPosts(user);
            }
            else if (e.target.innerHTML.contains('Lists')) {
                displayUserBooklists(user);
            }
            else if (e.target.innerHTML.contains('Collections')) {
                displayUserCollections(user);
            }
            else if (e.target.innerHTML.contains('Manage')) {
                displayManageWindow();
            }
            else {
                displayEditBooksWindow();
            }
            break;  
        }
    }
}

/* If 'Edit' is clicked, display edition page.
   If 'Submit' is clicked, display confirmed information */
function profileButtonsOnClick(e) {
    // TODO
}


/********************** DOM Functions ************************/
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

function changeButtonColor(target) {
    let changeBackTarget = document.getElementsByClassName('menuButtonSelected')[0];
    changeBackTarget.classList.add('menuButton');
    changeBackTarget.classList.remove('menuButtonSelected');
    target.classList.add('menuButtonSelected');
    target.classList.remove('menuButton');
}

function displayUserPosts(user) {

}

function displayUserBooklists(user) {

}

function displayUserCollections(user){

}

function displayManageWindow() {

}

function displayEditBooksWindow() {

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






