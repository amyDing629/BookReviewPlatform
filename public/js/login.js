const log = console.log;

/****** User signin ******/

// const users = [];

// class User {
// 	constructor(userName, password, signature, profilePhoto, postlist, booklistList, postColectionList, booklistCollectionList, type, id) {
// 		this.username = userName;
//         this.password = password;
//         this.signature = signature;
//         this.profilePhoto = profilePhoto;
//         this.postlist = postlist;
//         this.booklistList = booklistList;
//         this.postColectionList = postColectionList;
//         this.booklistCollectionList = booklistCollectionList;
//         this.type = type;
//         this.userid = id
//     }
// }


// button trigger
const signin = document.querySelector('#signin');
signin.addEventListener('click', change_page);

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
    const url = '/login/'+username+'/'+password
    fetch(url).then((res) => { 
        if (res.status === 200) {
           return res.json() 
       } 
       else {
            const p = document.querySelector('p')
            p.innerText = 'username or password not correct, please try again'
            log("invalid input")
       }   
    }).then((json) => {  //pass json into object locally
        window.location.href = "/index.html?userID=" + json.user._id
    }).catch((error) => {
        log(error)
    })
}
    // for (let i=0; i<users.length; i++){
    //     let user = users[i].username;
    //     let pass = users[i].password;
    //     console.log(user, pass);
    //     if (user == username){
    //         bcrypt.compare(password, pass, function(err, res) {
    //             if(password != pass){
    //                 const p = document.querySelector('p')
    //                 p.innerText = 'username or password not correct, please try again'
    //             } else {
    //                 // window.location.href = "/public/index.html?userID=" + users[i].userID;
    //                 window.location.href = "/public/index.html";
    //             }
    //         })
    //     }
    //     else{
    //         const p = document.querySelector('p')
    //         p.innerText = 'username or password not correct, please try again'
    //     }
        
    // }
        // if (user == username && password == pass){
        //     //window.location.href = "/public/index.html?userID=" + users[i].userID;
        //     window.location.href = "/public/index.html";
        //     return;
        // }
    

    

  