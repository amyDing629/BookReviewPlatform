const log = console.log;

/****** User signUP ******/
const users = [];

class User {
	constructor(userName, password, signature, profilePhoto, postlist, booklistList, postColectionList, booklistCollectionList, isAdmin, id) {
		this.username = userName;
        this.password = password;
        this.signature = signature;
        this.profilePhoto = profilePhoto;
        this.postlist = postlist;
        this.booklistList = booklistList;
        this.postColectionList = postColectionList;
        this.booklistCollectionList = booklistCollectionList;
        this.isAdmin = isAdmin;
        this.userid = id
    }
}


const signup = document.querySelector('#signup');
signup.addEventListener('click', change_page);

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
            //window.location.href = "index_end_after.html?userID=" + users[users.length-1].userID;
            window.location.href = "../public/index.html?userID=" + users[users.length-1].userID;
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
    
