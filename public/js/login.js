const log = console.log;

/****** User signin ******/
//let numberOfUsers = 0;
const users = [];

class User {
	constructor(userName, password, signature, profilePhoto, postList, booklistList, postColectionList, booklistCollectionList, isAdmin, id) {
		this.userName = userName;
        this.password = password;
        this.signature = signature;
        this.profilePhoto = profilePhoto;
        this.postList = postList;
        this.booklistList = booklistList;
        this.postColectionList = postColectionList;
        this.booklistCollectionList = booklistCollectionList;
        this.isAdmin = isAdmin;
        this.userid = id
        //this.userID = numberOfUsers;
        //this.isAdmin = false;
		//numberOfUsers++;
    }
}

 // class AdminUser extends User {
//     constructor(userName, password) {
//         super(userName, password);
//         this.isAdmin = true;
//     }
// }

// function UserCallBack() {
//     /// Get users from server
//     // code below requires server call
//     users.push(new User('user', 'user'));
//     users.push(new AdminUser('admin', 'admin'));
//  }

// get all users 
function getUsers(){
    const url = '/api/users'
    fetch(url).then((res) => { 
        if (res.status === 200) {
           return res.json() 
       } else {
            res.status(500).send("Internal Server Error") // not sure
       }                
    }).then((json) => {  //pass json into object locally
        const users = json.users
        for (each of users){
            users.push(
                new User(each.username, each.password, each.signature, 
                    each.profilePhoto, each.postlist, each.booklistList,
                    each.postColectionList, each.booklistCollectionList, each.isAdmin, each._id))
        }
    }).catch((error) => {
        log(error)
    })
}

// button trigger
if (window.location.href.indexOf('../public/html/login.html') !== -1) {
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
            window.location.href = "../public/index.html?userID=" + users[i].userID;
            return;
        }
    }
    const p = document.querySelector('p')
    p.innerText = 'username or password not correct, please try again'
    
}
    

  