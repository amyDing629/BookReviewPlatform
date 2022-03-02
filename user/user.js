// get 'posts' variable

/********** global variables **********/
let numberOfUsers = 0;
let numberOfPosts = 0;
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
    let userID = parseInt(document.getElementById('id').innerText.replace('user ID: ', ''))
    // Find user
    let user = null;
    for (user of users) {
        console.log(user.userID);
        console.log(userID);
        if (user.userID == userID) {
            console.log('match');
            // Display contents depending on which button is clicked  
            if (e.target.innerHTML.indexOf('Posts') !== -1) {
                displayUserPosts(user);
            }
            else if (e.target.innerHTML.indexOf('Lists') !== -1) {
                displayUserBooklists(user);
            }
            else if (e.target.innerHTML.indexOf('Collections') !== -1) {
                displayUserCollections(user);
            }
            else if (e.target.innerHTML.indexOf('Manage') !== -1) {
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
    // for phase 2
    // let currentUserID = window.location.href.split('?')[1].split('=')[1];
    // let user;
    // let loopUser;
    // for (loopUser of users){
    //     if (loopUser.userID == parseInt(currentUserID)){
    //         user = loopUser;
    //         break;
    //     }
    // }
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
        manageButton.className = 'menuButton';
        manageButtonLi.appendChild(manageButton);
        buttons.appendChild(manageButtonLi);
        let editBookButtonLi = document.createElement("li");
        let editBookButton = document.createElement("button");
        editBookButton.className = 'menuButton';
        editBookButton.innerHTML = 'Edit Books';
        editBookButtonLi.appendChild(editBookButton);
        buttons.appendChild(editBookButtonLi);
    }
    displayUserPosts(user);
}

function changeButtonColor(target) {
    let changeBackTarget = document.getElementsByClassName('menuButtonSelected')[0];
    changeBackTarget.classList.add('menuButton');
    changeBackTarget.classList.remove('menuButtonSelected');
    target.classList.add('menuButtonSelected');
    target.classList.remove('menuButton');
}

function displayUserPosts(user) {
    let content = document.getElementById('contents');
    content.innerHTML = ''; // Clean up contents
    let ul = document.createElement('ul');
    let post;
    // TODO: flip page
    for (post of user.postList) {
        console.log(post);
        let li = document.createElement('li');
        let postDiv = document.createElement('div');
        postDiv.className = 'userPost';

        let contentName = document.createElement('div');
        contentName.className = 'contentName';

        let a = document.createElement('a')
        a.className = 'linkColor'
        a.setAttribute('href', post.booklink);
        a.innerText = post.booktitle;

        contentName.innerHTML = 'Book Name: '
        contentName.appendChild(a);
        postDiv.appendChild(contentName);

        let contentTime = document.createElement('div');
        contentTime.className = 'contentTime';
        contentTime.innerHTML = post.time;
        postDiv.appendChild(contentTime);

        let contentID = document.createElement('div');
        contentID.className = 'contentID';
        contentID.innerHTML = '#' + post.postID;
        postDiv.appendChild(contentID);

        let contentContext = document.createElement('div');
        contentContext.className = 'contentContext';
        contentContext.innerHTML = post.content;
        postDiv.appendChild(contentContext);
        
        if (post.pic != null){
            let contentPic = document.createElement('img');
            contentPic.className = 'contentPic';
            contentPic.setAttribute('src', post.pic);
            postDiv.appendChild(contentPic);
        }
        
        let h3 = document.createElement('h3');
        let iHeart = document.createElement('i');
        iHeart.className = 'fa fa-heart';
        iHeart.innerHTML = ' ' + post.likes;
        h3.appendChild(iHeart);
        postDiv.appendChild(h3);

        let likeButton = document.createElement('button');
        likeButton.className = 'likeButton';
        likeButton.innerHTML = 'Like';
        postDiv.appendChild(likeButton);

        li.appendChild(postDiv);
        ul.appendChild(li);
        content.appendChild(ul);
    }
}

function displayUserBooklists(user) {
    let content = document.getElementById('contents');
    content.innerHTML = ''; // Clean up contents

}

function displayUserCollections(user){
    let content = document.getElementById('contents');
    content.innerHTML = ''; // Clean up contents

}

function displayManageWindow() {
    let content = document.getElementById('contents');
    content.innerHTML = ''; // Clean up contents

}

function displayEditBooksWindow() {
    let content = document.getElementById('contents');
    content.innerHTML = ''; // Clean up contents

}


/*************** actions ****************/
// Display regular user
let regularUser = new User('user', 'user');
let adminUser = new AdminUser('admin', 'admin');
users.push(adminUser);
users.push(regularUser);
regularUser.postList.push(new Post('Solaris', null, 'user', null,
    'https://avatars.githubusercontent.com/u/71192401?v=4', 
    'https://upload.wikimedia.org/wikipedia/en/d/d1/SolarisNovel.jpg',
    'I really like this book! I really like this book! I really like this book! I really like this book!',
    '2022-03-01 18:05', 1));

adminUser.postList.push(new Post('Solaris', null, 'admin', null,
    'https://avatars.githubusercontent.com/u/71192401?v=4', 
    null,
    'It was stunning. An ocean with life, a planet covered by an ocean.',
    '2022-02-20 3:02', 0));

console.log(window.location.href);
if (window.location.href.endsWith('user.html')){
    displayUserInfo(regularUser);
}
else if (window.location.href.endsWith('admin.html')){
    displayUserInfo(adminUser)
}


// Setup onclick
const menuButtons = document.getElementsByClassName('menuButton');
const profileButtons = document.querySelector('#profileButton');
const menuButtonSelected = document.querySelector('.menuButtonSelected');
let menuButton;
for (menuButton of menuButtons) {
    console.log(menuButton);
    menuButton.addEventListener('click', menuButtonsOnClick);
}
menuButtonSelected.addEventListener('click', menuButtonsOnClick);
profileButtons.addEventListener('click', profileButtonsOnClick);

