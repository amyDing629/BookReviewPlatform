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

/*************************** Functions ***************************/
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
        userInfoDiv.class = 'userInfo';
        let h3 = document.createElement('h3');
        let a = document.createElement('a');
        a.class = 'userLink';
        a.href = user.userName + '.html';
        a.innerHTML = user.userName + '&nbsp#' + user.userID.toString();
        let span = document.createElement('span');
        span.class = 'green';
        span.innerHTML = '&nbsp;&nbsp;&nbsp; activate';
        h3.appendChild(a);
        h3.appendChild(span);
        userInfoDiv.appendChild(h3);

        let inActivateButton = document.createElement('button');
        inActivateButton.class = 'inActivateButton';
        inActivateButton.innerHTML = 'inactivate';

        li.appendChild(userInfoDiv);
        li.appendChild(inActivateButton);
        ul.appendChild(li);
    }
    userList.appendChild(ul);
}

let regularUser = new User('user', 'user');
let adminUser = new AdminUser('admin', 'admin');
users.push(adminUser);
users.push(regularUser);
displayUserList();
