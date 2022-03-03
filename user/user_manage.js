const users = [];
let numberOfUsers = 0;
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

/*************************** DOM Functions ***************************/
function _getRegularUserList() {
    let user;
    let regularUserList = [];
    for (user of users) {
        if (user.isAdmin == false) {
            regularUserList.push(user);
        }
    }
    return regularUserList;
}

function displayUserList() {
    let userList = document.getElementById('userList');
    userList.innerHTML = '';
    let ul = document.createElement('ul');
    let user;
    for (user of _getRegularUserList()) {
        let li = document.createElement('li');

        let userInfoDiv = document.createElement('div');
        userInfoDiv.className = 'userInfo';
        let h3 = document.createElement('h3');
        let a = document.createElement('a');
        a.class = 'userLink';
        a.href = user.userName + '.html';
        a.innerHTML = user.userName + '&nbsp#' + user.userID.toString();
        let span1 = document.createElement('span');
        span1.innerHTML = '&nbsp;&nbsp;&nbsp; Status:'
        let span2 = document.createElement('span');
        span2.className = 'green';
        span2.innerHTML = '&nbsp; activate';
        h3.appendChild(a);
        h3.appendChild(span1);
        h3.appendChild(span2);
        userInfoDiv.appendChild(h3);

        let inActivateButton = document.createElement('button');
        inActivateButton.className = 'manageButton';
        inActivateButton.innerHTML = 'inactivate';

        li.appendChild(userInfoDiv);
        li.appendChild(inActivateButton);
        ul.appendChild(li);
    }
    userList.appendChild(ul);
}

/*************************** Functions ************************/

function manageButtonOnClick(e) {
    if (e.target.innerHTML == 'inactivate'){
        e.target.className = 'activate';
        e.target.innerHTML = 'activate';
        e.target.parentElement.parentElement.getElementsByClassName('green')[0].innerHTML = '&nbsp; inactivate';
        e.target.parentElement.parentElement.getElementsByClassName('green')[0].className = 'red';
    }else{
        e.target.className = 'inactivate';
        e.target.innerHTML = 'inactivate';

        e.target.parentElement.parentElement.getElementsByClassName('red')[0].innerHTML = '&nbsp; activate';
        e.target.parentElement.parentElement.getElementsByClassName('red')[0].className = 'green';
    }
    
}   

/**************************  Actions  *************************/
let regularUser = new User('user', 'user');
let adminUser = new AdminUser('admin', 'admin');
users.push(adminUser);
users.push(regularUser);
displayUserList();
let manageButtons = document.getElementsByClassName('manageButton');
let manageButton;
for (manageButton of manageButtons) {
    manageButton.addEventListener('click', manageButtonOnClick);
}
