// get 'posts' variable

/********** global variables **********/
let numberOfUsers = 0;
let numberOfPosts = 0;
var BooklistsNum = 0; 
var BooksNum = 0; 
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

class Book {
	constructor(name, author, year, coverURL, description) {
		this.name = name;
		this.author = author;
		this.year = year;
		this.coverURL = coverURL; 
        this.description = description;
        this.postCollection = [] // collection of post ids associated with the book
		this.bookID = BooksNum;
		BooksNum++;
	}
}

class Booklist {
	constructor(listName, listDescription, creator, bookCollection) {
		this.listName = listName;
		this.listDescription = listDescription;
		this.creator = creator; // user id?
        this.books = bookCollection; // list of bids
		this.booklistID = BooklistsNum;
		BooklistsNum++;
        this.likes = 0;
        this.collect = 0;
        const date = new Date() 
        this.createTime = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
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
        if (user.userID == userID) {
            console.log(user);
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
    let userInfo = e.target.parentElement;
    let profileButton = document.getElementById('profileButton');
    if (e.target.innerHTML == 'Edit Signature') {
        userInfo.removeChild(document.getElementById('signature'));
        let sigForm = document.createElement('input');
        sigForm.type = 'text';
        sigForm.id = 'sigForm';
        userInfo.insertBefore(sigForm, profileButton);
        profileButton.innerHTML = 'Submit';
    }
    else if (e.target.innerHTML == 'Submit') {
        let signature = document.getElementById('sigForm').value;
        let userID = parseInt(document.getElementById('id').innerText.replace('user ID: ', ''))
        let user;
        for (user in users) {
            if (user.userID == userID) {
                user.signature = signature;
            }
        }
        userInfo.removeChild(document.getElementById('sigForm'));
        let newSignature = document.createElement('div');
        newSignature.id = 'signature';
        newSignature.innerHTML = signature;
        userInfo.insertBefore(newSignature, profileButton);
        profileButton.innerHTML = 'Edit Signature';
    }
}


/********************** DOM Functions ************************/
function displayUserInfo(user, isVisit) {
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
    if (isVisit == true) {
        document.getElementById('userInfo').removeChild(document.getElementById('profileButton'));
    }
    document.getElementById('userName').innerHTML = user.userName;
    document.getElementById('id').innerHTML = 'user ID: ' + String(user.userID);
    if (user.signature != null) {
        document.getElementById('signature').innerHTML = user.signature;
    }
    if (user.profilePhoto != null) {
        userInfo.getElementsByClassName('profilePic')[0].src = user.profilePhoto;
    }
    if (user.isAdmin == true && isVisit == false) {
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

function _createPostDiv(post) {
    let postDiv = document.createElement('div');
    postDiv.className = 'userPost';

    let contentName = document.createElement('div');
    contentName.className = 'contentName';

    let a = document.createElement('a');
    a.className = 'linkColor';
    a.setAttribute('href', post.booklink);
    a.innerText = post.booktitle;

    contentName.innerHTML = 'Book Name: ';
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
    return postDiv;

}
function displayUserPosts(user) {
    let content = document.getElementById('contents');
    content.innerHTML = ''; // Clean up contents
    let ul = document.createElement('ul');
    let post;
    // TODO: flip page
    for (post of user.postList) {
        let li = document.createElement('li');
        li.appendChild(_createPostDiv(post));
        ul.appendChild(li);
    }
    content.appendChild(ul);
}

function _createUserBooklists(booklist) {
    const div = document.createElement('div')
    div.className = 'booklist'

    // <p>  list id
    const id = document.createElement('p')
    id.className = "listID"
    id.appendChild(document.createTextNode("List ID: "))
    const IDcontent = document.createElement('span')
    IDcontent.appendChild(document.createTextNode(booklist.booklistID))
    id.appendChild(IDcontent)
    div.appendChild(id)

    // infoWrap
    const ul1 = document.createElement('ul')
    ul1.className = "infoWrap"

    // li1: booklist name
    const li1 = document.createElement('li')
    li1.className = "listname"
    const strong1 = document.createElement('strong')
    const name = document.createTextNode("Booklist Name: ")
    strong1.appendChild(name)
    const span1 = document.createElement('span')
    const a1 = document.createElement('a')
    a1.className = "linkColor"
    a1.href = ""
    const nameContent = document.createTextNode(booklist.listName)
    a1.appendChild(nameContent)
    span1.appendChild(a1)
    li1.appendChild(strong1)
    li1.appendChild(span1)
    ul1.appendChild(li1)

    // li2: list creator
    const li2 = document.createElement('li')
    li2.className = "listCreator"
    const strong2 = document.createElement('strong')
    const creator = document.createTextNode("Created by: ")
    strong2.appendChild(creator)
    const span2 = document.createElement('span')
    const a2 = document.createElement('a')
    a2.className = "linkColor"
    a2.href = ""
    const creatorContent = document.createTextNode(booklist.creator)
    a2.appendChild(creatorContent)
    span2.appendChild(a2)
    li2.appendChild(strong2)
    li2.appendChild(span2)
    ul1.appendChild(li2)

    // li3: creat time
    const li3 = document.createElement('li')
    li3.className = "createTime"
    const strong3 = document.createElement('strong')
    const time = document.createTextNode("Created when: ")
    strong3.appendChild(time)
    const span3 = document.createElement('span')
    const a3 = document.createElement('a')
    a3.className = "timeContent"
    a3.href = ""
    const timeContent = document.createTextNode(booklist.createTime)
    a3.appendChild(timeContent)
    span3.appendChild(a3)
    li3.appendChild(strong3)
    li3.appendChild(span3)
    ul1.appendChild(li3)

    div.appendChild(ul1)

    // list description
    const p = document.createElement('p')
    p.className = "descriptionsBox"
    const strong4 = document.createElement('strong')
    const descri = document.createTextNode("List Description: ")
    strong4.appendChild(descri)
    p.appendChild(strong4)
    const span4 = document.createElement('span')
    const descriContent = document.createTextNode(booklist.listDescription)
    span4.appendChild(descriContent)
    p.appendChild(span4)
    div.appendChild(p)

    // bookshelf
    const table = document.createElement('table')
    table.className = "bookshelf"
    const tbody = document.createElement('tbody')
    const tr1 = document.createElement('tr')
    const tr2 = document.createElement('tr')
    
    // TODO: flip pages
    if (booklist.books.length <= 4){
        bookNum = booklist.books.length
    } else {
        bookNum = 4
    }
    let book;
    for (book of booklist.books){
        const newImg = document.createElement('th')
        const img = document.createElement('img')
        img.className = "bookimg"
        img.src = book.coverURL
        newImg.appendChild(img)
        tr1.appendChild(newImg)
        const newBookLink = document.createElement('th')
        const bookLink = document.createElement('a')
        bookLink.className = "book"
        bookLink.href = "../BookDetail/BookDetail-" + book.name + ".html"
        bookLink.onclick = function open(e){e.preventDefault(); window.location.replace(bookLink.href)}
        bookLink.appendChild(document.createTextNode(book.name))
        newBookLink.appendChild(bookLink)
        tr2.appendChild(newBookLink)
    }
    tbody.appendChild(tr1)
    tbody.appendChild(tr2)
    table.appendChild(tbody)
    div.appendChild(table)

    // icon wrap
    const ul2 = document.createElement('ul')
    ul2.className = "iconWrap"

    // li1: like
    const liLike = document.createElement('li')
    liLike.className = "infoElement"
    const button1 = document.createElement('button')
    button1.className = "likeButton"
    const iconImgLike = document.createElement('img')
    iconImgLike.className = "likeIcon"
    iconImgLike.src = "../static/like_icon.png"
    button1.appendChild(iconImgLike)
    liLike.appendChild(button1)

    const spanLike = document.createElement('span')
    spanLike.className = "likeNum"
    const likeNum = document.createTextNode("Liked: "+booklist.likes)
    spanLike.appendChild(likeNum)
    liLike.appendChild(spanLike)

    // li2: collect
    const liCollect = document.createElement('li')
    liCollect.className = "infoElement"
    const button2 = document.createElement('button')
    button2.className = "collectButton" 
    const iconImgCollect = document.createElement('img')
    iconImgCollect.className = "collectIcon"
    iconImgCollect.src = "../static/click-&-collect.png"
    button2.appendChild(iconImgCollect)
    liCollect.appendChild(button2)

    const spanCollect = document.createElement('span')
    spanCollect.className = "collectNum"
    const collectNum = document.createTextNode("Collected: " + booklist.collect)
    spanCollect.appendChild(collectNum)
    liCollect.appendChild(spanCollect)
    
    ul2.appendChild(liLike)
    ul2.appendChild(liCollect)

    div.appendChild(ul2)
    
    return div;
    
}

function displayUserBooklists(user) {
    let content = document.getElementById('contents');
    content.innerHTML = ''; // Clean up contents

    let booklistDiv = document.createElement('div');
    booklistDiv.id = 'booklistTable';
    let pageTitle = document.createElement('h2');
    pageTitle.innerHTML = 'All Booklists';
    pageTitle.className = 'pageTitle';
    let sortWrap = document.createElement('div');
    sortWrap.id = 'sortWrap';
    let sortDefaultButton = document.createElement('button');
    sortDefaultButton.innerHTML = 'Sort By ID number';
    let sortByAtoZ = document.createElement('button');
    sortByAtoZ.innerHTML = 'Sort from A to Z';
    sortWrap.appendChild(sortDefaultButton);
    sortWrap.appendChild(sortByAtoZ);
    pageTitle.appendChild(sortWrap);
    booklistDiv.appendChild(pageTitle);
    booklistDiv.appendChild(document.createElement('br'));
    let ul = document.createElement('ul');
    let booklist;
    // TODO: flip page
    console.log(user.booklistList);
    for (booklist of user.booklistList) {
        let li = document.createElement('li');
        li.appendChild(_createUserBooklists(booklist));
        ul.appendChild(li);
    }

    booklistDiv.appendChild(ul);
    content.appendChild(booklistDiv);

}

function displayUserCollections(user){
    let content = document.getElementById('contents');
    content.innerHTML = ''; // Clean up contents
    let ul = document.createElement('ul');
    let collection;
    // TODO: flip page
    for (collection of user.collectionList) {
        let li = document.createElement('li');
        if (collection.constructor.name == 'Post') {
            li.appendChild(_createPostDiv(collection));
        }else {
            li.appendChild(_createUserBooklists(collection));
        }
        ul.appendChild(li);
    }
    content.appendChild(ul); 
}

function displayManageWindow() {
    let content = document.getElementById('contents');
    content.innerHTML = ''; // Clean up contents
    window.location.href = "user_manage.html";
}

function displayEditBooksWindow() {
    let content = document.getElementById('contents');
    content.innerHTML = ''; // Clean up contents
    window.location.href = "../BookMainPage/BookMainPage_admin_after.html";

}


/*************** actions ****************/
let regularUser = new User('user', 'user');
let adminUser = new AdminUser('admin', 'admin');
let postSolarisWithImg = new Post('Solaris', null, 'user', null,
    'https://avatars.githubusercontent.com/u/71192401?v=4', 
    'https://upload.wikimedia.org/wikipedia/en/d/d1/SolarisNovel.jpg',
    'I really like this book! I really like this book! I really like this book! I really like this book!',
    '2022-03-01 18:05', 1)
let postSolarisWithoutImg = new Post('Solaris', null, 'admin', null,
    'https://avatars.githubusercontent.com/u/71192401?v=4', null,
    'It was stunning. An ocean with life, a planet covered by an ocean.',
    '2022-02-20 3:02', 0)

regularUser.postList.push(postSolarisWithImg);
adminUser.postList.push(postSolarisWithoutImg);

let bookSolaris = new Book('Solaris', 'Stanisław Herman Lem', 1970, 
    'https://upload.wikimedia.org/wikipedia/en/d/d1/SolarisNovel.jpg', 
    'It follows a crew of scientists on a research station as they attempt to understand an extraterrestrial intelligence, which takes the form of a vast ocean on the titular alien planet.')

let bookTres = new Book('Tres Tristes Tigres', 'Guillermo Cabrera Infante', 1971,
    'https://upload.wikimedia.org/wikipedia/en/0/0f/Tres_tristes_tigres_%28Guillermo_Cabrera_Infante%29.png',
    'It is a highly experimental, Joycean novel, playful and rich in literary allusions.')

let novelBooklist = new Booklist('novels', 'All novels liked.', 'A01', [bookSolaris,bookTres])
let spanishBooklist = new Booklist('All spanish', 'All Spanish novels.', 'A01', [bookTres])
regularUser.booklistList.push(novelBooklist);
adminUser.booklistList.push(spanishBooklist);

regularUser.collectionList.push(postSolarisWithoutImg);
regularUser.collectionList.push(spanishBooklist);
adminUser.collectionList.push(postSolarisWithImg);
adminUser.collectionList.push(novelBooklist);

users.push(adminUser);
users.push(regularUser);

if (window.location.href.indexOf('visit') == '-1'){
    if (window.location.href.endsWith('user.html')){
        displayUserInfo(regularUser, false);
    }
    else if (window.location.href.endsWith('admin.html')){
        displayUserInfo(adminUser, false)
    }
}
else {
    let user;
    let visitUserId = window.location.href.split('?')[1].split('=')[1];
    for (user of users) {
        if (user.userID == parseInt(visitUserId)){
            displayUserInfo(user, true);
        }
    }
}


// Setup onclick
const menuButtons = document.getElementsByClassName('menuButton');
const profileButtons = document.querySelector('#profileButton');
const menuButtonSelected = document.querySelector('.menuButtonSelected');
let menuButton;
for (menuButton of menuButtons) {
    menuButton.addEventListener('click', menuButtonsOnClick);
}
menuButtonSelected.addEventListener('click', menuButtonsOnClick);
if (profileButtons != null) {
    profileButtons.addEventListener('click', profileButtonsOnClick);
}


