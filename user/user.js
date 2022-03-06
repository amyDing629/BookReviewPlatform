// get 'posts' variable

/********** global variables **********/
let numberOfUsers = 0;
let numberOfPosts = 0;
var BooklistsNum = 0; 
var BooksNum = 0; 
const users = [];
const posts = [];
const booklists = [];
const books = [];

/********************** Object ***********************/
class User {
	constructor(userName, password) {
		this.userName = userName;
        this.password = password;
        this.signature = null;
        this.profilePhoto = null;
        this.postList = [];
        this.booklistList = [];
        this.postCollectionList = [];
        this.booklistCollectionList = []
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
	constructor(postID, bookID, booktitle, booklink, poster, posterProfile, pic, content, time, likes) {
		this.postID = postID;
        this.bookID = bookID;
        this.booktitle = booktitle;
        this.booklink = booklink;
		this.poster = poster;
        this.posterProfile = posterProfile;
        this.pic = pic;
        this.content = content; 
        this.time = time;
        this.likes = likes; 
    }
}

class Book {
	constructor(name, author, coverURL, description) {
		this.name = name;
		this.author = author;
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
            // Display contents depending on which button is clicked  
            if (e.target.innerHTML.indexOf('Posts') !== -1) {
                displayUserPosts(user);
            }
            else if (e.target.innerHTML.indexOf('Booklists') !== -1) {
                displayUserBooklists(user);
            }
            else if (e.target.innerHTML.indexOf('Post Collections') !== -1) {
                displayCollectedPost(user);
            }
            else if (e.target.innerHTML.indexOf('Booklist Collections') != -1) {
                displayCollectedBooklist(user);
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
        let sigForm = document.createElement('textarea');
        sigForm.id = 'sigForm';
        sigForm.innerHTML = "Enter signature here..";
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
        manageButton.className = 'btn btn-light';
        manageButtonLi.appendChild(manageButton);
        buttons.appendChild(manageButtonLi);
        let editBookButtonLi = document.createElement("li");
        let editBookButton = document.createElement("button");
        editBookButton.className = 'btn btn-light';
        editBookButton.innerHTML = 'Edit Books';
        editBookButtonLi.appendChild(editBookButton);
        buttons.appendChild(editBookButtonLi);
    }
    displayUserPosts(user);
}

function changeButtonColor(target) {
    let changeBackTarget = document.getElementsByClassName('selected')[0];
    changeBackTarget.className = 'btn btn-light';
    target.className = 'selected btn btn-dark';
}

// function _sortList(itemList, isByID, isPost) {
//     let sortHelperList = [];
//     let sortedList = [];
//     let item;
//     for (item of itemList){
//         if (isPost == true){
//             if (isByID == true) {
//                 sortHelperList.push(item.postID);
//             }
//             else if (isByID == false) {
//                 sortHelperList.push(item.bookTitle);
//             }
//         }
//         else if (isPost == false) {
//             if (isByID == true) {
//                 sortHelperList.push(item.booklistID);
//             }
//             else if (isByID == false) {
//                 sortHelperList.push(item.listName);
//             }
//         }
//     }
//     sortHelperList = sortHelperList.sort()
//     let ele;
//     for (ele of sortHelperList){
//         if (isPost == true) {
//             let post;
//             for (post of itemList) {
//                 if (isByID == true) {
//                     if (post.postID == ele) {
//                         sortedList.push(post);
//                         break;
//                     }
//                 }
//                 else {
//                     if (post.bookTitle == ele) {
//                         sortedList.push(post);
//                         break;
//                     }
//                 }
//             }
//         }
//         else {
//             let booklist;
//             for (booklist of itemList) {
//                 if (isByID == true) {
//                     if (booklist.booklistID == ele) {
//                         sortedList.push(booklist);
//                         break;
//                     }
//                 }
//                 else {
//                     if (booklist.listName == ele) {
//                         sortedList.push(booklist);
//                         break;
//                     }
//                 }
//             }
//         }
//     }
//     return sortedList;
//   }
/************ Search Bar Functions */
function blinkHandler(bid){
    // handler for book Detail page
        for (let i =0; i<books.length; i++){
            if (books[i].bookId == bid){
                let result;
                if (window.location.href.indexOf('user.html') != -1) {
                    return '../BookDetail/'+books[i].bookId+'/'+books[i].bookId+'_end_after.html'
                } else if (window.location.href.indexOf('admin.html') != -1){
                    return '../BookDetail/'+books[i].bookId+'/'+books[i].bookId+'_admin_after.html'
                } else{
                    return '../BookDetail/'+books[i].bookId+'/BookDetail-'+books[i].bookId+'.html';
                }
            }
        }   
    }
function displaySearchbox(){
    const searchbookArea = document.querySelector('.search-book')
    const t = searchbookArea.children[0]
    for (let i=0; i<books.length; i++){
        if (books[i] != null){
            const id = books[i].bookID
            const name = books[i].name
            const option = document.createElement('option')
            option.value = id
            option.innerText = name
            t.appendChild(option)
        }
    }
    const searchlistArea = document.querySelector('.search-list')
    const column = searchlistArea.children[0]
    for (let i=0; i<BooklistsNum; i++){
        if (booklists[i] != null){
            const id = booklists[i].booklistID
            const name = "[" + booklists[i].listName + "] -- " + booklists[i].creator
            const option = document.createElement('option')
            option.value = id
            option.innerText = name
            column.appendChild(option)
        }
    }
}

/********** Display functions ************ */
function _getUserByName(userName) {
    let user;
    for (user of users) {
        if (user.userName == userName) {
            return user;
        }
    }
}
function _createPostDiv(post) {
    function likeOnClick(e){
        e.preventDefault(); // prevent default action
        let contentDiv = e.target.parentElement.parentElement
        let pid = contentDiv.getElementsByClassName('postId')[0].innerHTML
        let post;
        let icon = e.target.parentElement.getElementsByClassName('fa fa-heart')[0];
        for (post of posts){
            if (parseInt(post.postID) == pid){
                if (e.target.classList.contains('like')){
                    post.likes ++;
                    icon.innerText = ' '+ post.likes;
                    e.target.classList.remove('like');
                    e.target.classList.add('dislike');
                    e.target.innerText = 'Dislike';
                    break;
                }
                else if (e.target.classList.contains('dislike')){
                    post.likes --;
                    icon.innerText = ' '+ post.likes;
                    e.target.classList.remove('dislike');
                    e.target.classList.add('like');
                    e.target.innerText = 'Like';
                    break;
                }    
            } 
        }
    }

    function collectOnClick(e){
        e.preventDefault(); // prevent default action
        if (e.target.classList.contains('collect')){
            e.target.classList.remove('collect');
            e.target.classList.add('collected');
            e.target.innerText = 'Collected!';
        }
        else if (e.target.classList.contains('collected')){
            e.target.classList.remove('collected');
            e.target.classList.add('collect');
            e.target.innerText = 'Collect';
        }    
    }

    function deletePostButtonOnClick(e) {
        let deletePostDiv = e.target.parentElement.parentElement.parentElement.parentElement;
        document.getElementById('contents').children[0].removeChild(deletePostDiv);
    }

    let postDiv = document.createElement('div');
    postDiv.className = 'post';
    let userDiv = document.createElement('div');
    userDiv.className = 'userProfileContainer';
    let contentDiv = document.createElement('div');
    contentDiv.className ='postContent';

    let title = post.booktitle;
    let userName = post.poster;
    let userProfile = post.posterProfile;
    let pic = post.pic;
    let content = post.content;
    let time = post.time;
    let likes = post.likes;
    let plink = post.posterlink;
    let pid = post.postID;
    let bid = post.bookID;
    
    let blink;
    if (window.location.href.indexOf('user.html') != -1) {
        blink = '../BookDetail/'+bid+'/'+bid+'_end_after.html';
    }else if (window.location.href.indexOf('admin.html') != -1) {
        blink = '../BookDetail/'+bid+'/'+bid+'_admin_after.html';
    }else{
        blink = '../BookDetail/'+bid+'/BookDetail-'+bid+'.html';
    }
    

    let img1 = document.createElement('img');
    img1.className='userProfile';
    img1.setAttribute('src', userProfile);
    img1.setAttribute('alt', 'profile');
    userDiv.appendChild(img1);

    let userh3 = document.createElement('h3');
    let a1 = document.createElement('a');
    a1.className = 'linkColor';
    a1.innerText = userName;
    a1.onclick = function open(e){
        e.preventDefault();
        if (window.location.href.indexOf(userName+'.html') != -1){
            window.location.href = userName + ".html";
        }else{
            if (window.location.href.indexOf('user.html') != -1) {
                window.location.href = "user.html?visit=" + _getUserByName('admin').userID;
            }else {
                window.location.href = "admin.html?visit=" + _getUserByName('user').userID;
            }
            

        }
    }
    let spanid2 = document.createElement('span');
    spanid2.className = 'postId';
    spanid2.innerText = pid;
    userh3.appendChild(a1);
    userh3.appendChild(spanid2); // Post id is here

    contentDiv.appendChild(userh3);

    let pbook = document.createElement('p');
    pbook.innerText = 'Book Name: ';
    let span1 = document.createElement('span');
    let a2 = document.createElement('a');
    a2.className = 'linkColor';
    a2.setAttribute('href', blink);
    a2.innerText = title;
    a2.onclick = function open(e){
        e.preventDefault();
        window.location.href = a2.href;
    }
    span1.appendChild(a2);
    let span2 = document.createElement('span');
    span2.className = 'postTime';
    span2.innerText = time;

    let spanid3 = document.createElement('span');
    spanid3.className = 'bookId';
    spanid3.innerText = ' bookID: ';
    let spanid4 = document.createElement('span');
    spanid4.className = 'bookId';
    spanid4.innerText = bid;

    pbook.appendChild(span1);
    pbook.appendChild(span2);
    pbook.appendChild(spanid3); 
    pbook.appendChild(spanid4); // Book id is here
    contentDiv.appendChild(pbook);

    let p = document.createElement('p');
    p.innerText = content;
    contentDiv.appendChild(p);

    if (pic != null){
        let img2 = document.createElement('img');
        img2.className='postContentPicture';
        img2.setAttribute('src', pic);
        img2.setAttribute('alt', 'pic');
        contentDiv.appendChild(img2);
    }

    let br = document.createElement('br');
    contentDiv.appendChild(br);

    let likeh5 = document.createElement('h5')
    likeh5.className = 'likeBar'
    let icon = document.createElement('i')
    icon.className = 'fa fa-heart'
    icon.innerText = ' '+likes
    let button = document.createElement('button')
    button.className = 'btn btn-outline-primary'
    button.classList.add('like')
    button.innerText = 'Like'
    button.addEventListener('click', likeOnClick);
    let button2 = document.createElement('button')
    button2.className = 'btn btn-outline-success'
    button2.classList.add('collect')
    button2.innerText = 'Collect'
    button2.addEventListener('click', collectOnClick);
    // end user: delete button only for lists created by self
    const userInfo = document.querySelector('#userLoginInfo').innerText

    likeh5.appendChild(icon)
    if (userInfo.toLowerCase() === post.poster.toLowerCase() || userInfo.toLowerCase() == 'admin') {
        let button3 = document.createElement('button');
        button3.className = "btn btn-outline-danger";
        button3.classList.add('delete');
        button3.addEventListener('click', deletePostButtonOnClick);
        button3.innerText = 'Delete';
        likeh5.appendChild(button3);
    }
    likeh5.appendChild(button2)
    likeh5.appendChild(button)
    contentDiv.appendChild(likeh5)

    postDiv.appendChild(userDiv);
    postDiv.appendChild(contentDiv);
    return postDiv;

}
function displayUserPosts(user) {
    let content = document.getElementById('contents');
    content.innerHTML = ''; // Clean up contents
    if (user.postList.length == 0){
        content.innerHTML = "Don't have any post.";
        return
    }

    let ul = document.createElement('ul');
    //ul.id = 'posts';
    let post;
    for (post of user.postList) {
        let li = document.createElement('li');
        li.appendChild(_createPostDiv(post));
        ul.appendChild(li);
    }
    content.appendChild(ul);
    let pageFliper = document.createElement('div');
    pageFliper.id = 'pageFliper';
    content.appendChild(pageFliper);
    filpPage(1, 2);
}

function _createUserBooklists(booklist) {
    function likeOnClick(e){
        e.preventDefault(); // prevent default action
        let booklistDiv = e.target.parentElement.parentElement.parentElement.parentElement;
        let booklistID = booklistDiv.getElementsByClassName('listID')[0].children[0].innerHTML;
        let booklist;
        let likeNum = e.target.parentElement.parentElement.getElementsByClassName('likeNum')[0];
        for (booklist of booklists){
            if (parseInt(booklist.booklistID) == booklistID){
                if (e.target.parentElement.classList.contains('likeButton')){
                    booklist.likes ++;
                    likeNum.innerText = 'Liked: '+ booklist.likes;
                    e.target.parentElement.classList.remove('likeButton');
                    e.target.parentElement.classList.add('dislikeButton');
                    break;
                }
                else if (e.target.parentElement.classList.contains('dislikeButton')){
                    booklist.likes --;
                    likeNum.innerText = 'Liked: '+ booklist.likes;
                    e.target.parentElement.classList.remove('dislikeButton');
                    e.target.parentElement.classList.add('likeButton');
                    break;
                }    
            } 
        }
    }

    function collectOnClick(e){
        e.preventDefault(); // prevent default action
        let booklistDiv = e.target.parentElement.parentElement.parentElement.parentElement;
        let booklistID = booklistDiv.getElementsByClassName('listID')[0].children[0].innerHTML;
        let booklist;
        let likeNum = e.target.parentElement.parentElement.getElementsByClassName('collectNum')[0];
        for (booklist of booklists){
            if (parseInt(booklist.booklistID) == booklistID){
                if (e.target.parentElement.classList.contains('collectButton')){
                    booklist.collect ++;
                    likeNum.innerText = 'Collected: '+ booklist.collect;
                    e.target.parentElement.classList.remove('collectButton');
                    e.target.parentElement.classList.add('uncollectButton');
                    break;
                }
                else if (e.target.parentElement.classList.contains('uncollectButton')){
                    booklist.collect --;
                    likeNum.innerText = 'Collected: '+ booklist.collect;
                    e.target.parentElement.classList.remove('uncollectButton');
                    e.target.parentElement.classList.add('collectButton');
                    break;
                }    
            } 
        }
    }

    function deleteBooklistButtonOnClick(e) {
        let booklistDiv = e.target.parentElement.parentElement.parentElement.parentElement;
        document.getElementById('contents').children[0].removeChild(booklistDiv);
    }

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

    // end user: delete button only for lists created by self
    const userInfo = document.querySelector('#userLoginInfo').innerText
    if (userInfo.toLowerCase() === booklist.creator.toLowerCase() || userInfo.toLowerCase() == 'admin') {
        const div1 = document.createElement('div')
        div1.className = 'delete'
        const button3 = document.createElement('button')
        button3.className = "deleteButton, btn btn-danger" 
        button3.appendChild(document.createTextNode("Delete this list"))
        button3.addEventListener('click', deleteBooklistButtonOnClick);
        div1.appendChild(button3)
        id.appendChild(div1)


        div.appendChild(id)
    }

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
    if (window.location.href.indexOf('user.html') != -1) {
        a1.href = "../BooklistDetail/BooklistDetail.html?booklistID=" + booklist.booklistID + '&userID=0.html';
    }else if (window.location.href.indexOf('admin.html') != -1){
        a1.href = "../BooklistDetail/BooklistDetail.html?booklistID=" + booklist.booklistID + '&userID=1.html';
    }else{
        a1.href = "../BooklistDetail/BooklistDetail.html?booklistID=" + booklist.booklistID;
    }
    console.log(a1.href);
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
    if (window.location.href.indexOf(booklist.creator + '.html') != -1){
            a2.href = booklist.creator + ".html";
    }else{
        if (window.location.href.indexOf('user.html') != -1) {
            a2.href = "user.html?visit=" + _getUserByName('admin').userID;
        }else {
            a2.href = "admin.html?visit=" + _getUserByName('user').userID;
        }
    }
    
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
    span3.className = "timeContent"
    const timeContent = document.createTextNode(booklist.createTime)
    span3.appendChild(timeContent)
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
        let bid = book.bookID;
        if (window.location.href.indexOf('user.html') != -1) {
            bookLink.href = '../BookDetail/'+bid+'/'+bid+'_end_after.html';
        }else if (window.location.href.indexOf('admin.html') != -1) {
            bookLink.href = '../BookDetail/'+bid+'/'+bid+'_admin_after.html';
        }else{
            bookLink.href = '../BookDetail/'+bid+'/BookDetail-'+bid+'.html';
        }

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
    button1.addEventListener('click', likeOnClick);
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
    button2.addEventListener('click', collectOnClick);
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
    if (user.booklistList.length == 0){
        content.innerHTML = "Don't have any booklist.";
        return;
    }
    let ul = document.createElement('ul');
    let booklist;
    // TODO: flip page
    for (booklist of user.booklistList) {
        let li = document.createElement('li');
        li.appendChild(_createUserBooklists(booklist));
        ul.appendChild(li);
    }
    content.appendChild(ul);
    let pageFliper = document.createElement('div');
    pageFliper.id = 'pageFliper';
    content.appendChild(pageFliper);
    filpPage(1, 2);

}

function displayCollectedPost(user){
    let content = document.getElementById('contents');
    content.innerHTML = ''; // Clean up contents
    if (user.postCollectionList.length == 0) {
        content.innerHTML = "Don't have any post collection.";
        return;
    }

    let ul = document.createElement('ul');
    let postCollection;
    for (postCollection of user.postCollectionList) {
        let li = document.createElement('li');
        li.appendChild(_createPostDiv(postCollection));
        ul.appendChild(li);
    }
    content.appendChild(ul); 
    let pageFliper = document.createElement('div');
    pageFliper.id = 'pageFliper';
    content.appendChild(pageFliper);
    filpPage(1, 2);
}

function displayCollectedBooklist(user){
    let content = document.getElementById('contents');
    content.innerHTML = ''; // Clean up contents
    if (user.booklistCollectionList.length == 0) {
        content.innerHTML = "Don't have any booklist collection.";
        return;
    }

    let ul = document.createElement('ul');
    let booklistCollection;
    for (booklistCollection of user.booklistCollectionList) {
        let li = document.createElement('li');
        li.appendChild(_createUserBooklists(booklistCollection));
        ul.appendChild(li);
    }
    content.appendChild(ul); 
    let pageFliper = document.createElement('div');
    pageFliper.id = 'pageFliper';
    content.appendChild(pageFliper);
    filpPage(1, 2);
}


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

function displayManageWindow() {
    function manageButtonOnClick(e) {
        if (e.target.innerHTML == 'inactivate'){
            e.target.className = 'activate';
            e.target.innerHTML = 'activate';
            e.target.parentElement.getElementsByClassName('green')[0].innerHTML = '&nbsp; inactive';
            e.target.parentElement.getElementsByClassName('green')[0].className = 'red';
        }else{
            e.target.className = 'inactivate';
            e.target.innerHTML = 'inactivate';

            e.target.parentElement.getElementsByClassName('red')[0].innerHTML = '&nbsp; active';
            e.target.parentElement.getElementsByClassName('red')[0].className = 'green';
        }
        
    }   
    let content = document.getElementById('contents');
    content.innerHTML = ''; // Clean up contents

    let ul = document.createElement('ul');
    ul.id = 'userManage';
    let user;
    for (user of _getRegularUserList()) {
        let li = document.createElement('li');

        let userInfoDiv = document.createElement('div');
        userInfoDiv.className = 'userInfo';
        let h3 = document.createElement('h3');
        let a = document.createElement('a');
        a.className = 'userLink linkColor';
        a.href = 'admin.html?visit=' + user.userID;
        a.innerHTML = user.userName + '&nbsp#' + user.userID.toString();
        let span1 = document.createElement('span');
        span1.innerHTML = '&nbsp;&nbsp;&nbsp; status:'
        let span2 = document.createElement('span');
        span2.className = 'green';
        span2.innerHTML = '&nbsp; active';
        h3.appendChild(a);
        h3.appendChild(span1);
        h3.appendChild(span2);
        userInfoDiv.appendChild(h3);

        let inActivateButton = document.createElement('button');
        inActivateButton.className = 'manageButton';
        inActivateButton.innerHTML = 'inactivate';
        inActivateButton.addEventListener('click', manageButtonOnClick);

        li.appendChild(userInfoDiv);
        li.appendChild(inActivateButton);
        ul.appendChild(li);
    }
    content.appendChild(ul);
    let pageFliper = document.createElement('div');
    pageFliper.id = 'pageFliper';
    content.appendChild(pageFliper);
    filpPage(1, 8);
}

function displayEditBooksWindow() {
    let content = document.getElementById('contents');
    content.innerHTML = ''; // Clean up contents
    if (window.location.href.indexOf('user.html') != -1) {
        window.location.href = "../BookMainPage/BookMainPage_end_after.html";
    }else if (window.location.href.indexOf('admin.html') != -1) {
        window.location.href = "../BookMainPage/BookMainPage_admin_after.html";
    }
}

// page flip
function filpPage(pageNo, pageLimit) {
    const contents = document.getElementById("contents").children[0];
    const totalSize = contents.children.length;
    let totalPage = 0
    const pageSize = pageLimit
    
    // calculate the page num and set up every page:
    if (totalSize / pageSize > parseInt(totalSize / pageSize)) {
        totalPage = parseInt(totalSize / pageSize) + 1;
    } else {
        totalPage = parseInt(totalSize / pageSize);
    }
    // log(totalPage)

    // build every page label and assign onclick function
    const curr = pageNo
    const startRow = (curr - 1) * pageSize + 1
    // log(startRow)
    let endRow = curr * pageSize
    endRow = (endRow > totalSize) ? totalSize : endRow;
    // log(endRow)
    let strHolder = ""
    let previousStr = "Previous&nbsp;&nbsp;&nbsp;&nbsp;"
    let spaceStr = "&nbsp;&nbsp;&nbsp;&nbsp;"
    let nextStr = "Next&nbsp;&nbsp;&nbsp;&nbsp;"
    let setupStr = "<a class=\"pagelink\" href=\"#\" onClick=\"filpPage("
    // single page is enough
    if (totalPage <= 1){
        strHolder = previousStr + setupStr + totalPage + "," + pageLimit + ")\">" + "1" + spaceStr + "</a>" + nextStr
    } else { //multipages
        if (curr > 1) {
            strHolder += setupStr + (curr - 1) + "," + pageLimit + ")\">"+previousStr+"</a>"
            for (let j = 1; j <= totalPage; j++) {
                strHolder += setupStr+ j + "," + pageLimit + ")\">" + j + spaceStr + "</a>"
            }
        } else {
            strHolder += previousStr;
            for (let j = 1; j <= totalPage; j++) {
                strHolder += setupStr+ j + "," + pageLimit + ")\">" + j + spaceStr +"</a>"
            }
        }
        if (curr < totalPage) {
            strHolder += setupStr + (curr + 1) + "," + pageLimit + ")\">"+nextStr+"</a>"
            
        } else { strHolder += nextStr }
    }

    // separate different display style for different tr element
    for (let i = 1; i < (totalSize + 1); i++) {
        const each = contents.children[i - 1];
        if (i >= startRow && i <= endRow) {
            each.className="normalTR"
        } else {
            each.className="endTR"
        }
    }
    document.getElementById("pageFliper").innerHTML = strHolder;
}


/*************** actions ****************/
let regularUser = new User('user', 'user');
regularUser.profilePhoto = 'https://avatars.githubusercontent.com/u/71192401?v=4';
let adminUser = new AdminUser('admin', 'admin');
adminUser.profilePhoto = 'https://avatars.githubusercontent.com/u/73209681?v=4';
let regularAmy = new User('amy', 'amy');
let postSolarisWithImg = new Post(1, 0, 'Solaris',null, 'user',
    'https://avatars.githubusercontent.com/u/71192401?v=4', 
    'https://upload.wikimedia.org/wikipedia/en/d/d1/SolarisNovel.jpg',
    'I really like this book! I really like this book! I really like this book! I really like this book!',
    '2022-03-01 18:05', 1);
let postSolarisWithoutImg = new Post(0, 0, 'Solaris',null, 'admin',
    "https://avatars.githubusercontent.com/u/73209681?v=4", 
    null,
    'It was stunning. An ocean with life, a planet covered by an ocean.',
    '2022-02-20 3:02', 0);
let postSongOfSolomon = new Post(2, 4, 'Song of Solomon',null, 'user',
    'https://avatars.githubusercontent.com/u/71192401?v=4', 
    'https://reviewed-com-res.cloudinary.com/image/fetch/s--vRlwGaKY--/b_white,c_limit,cs_srgb,f_auto,fl_progressive.strip_profile,g_center,h_668,q_auto,w_1187/https://reviewed-production.s3.amazonaws.com/1615411074746/EreadersBG3.jpg',
    'I have to read it every day otherwise I cannot sleep',
    '2022-03-05 00:05', 5);
let postWarAndPeace = new Post(3, 3, 'War and Peace',null, 'user',
    'https://avatars.githubusercontent.com/u/71192401?v=4', 
    null,
    "I have a version of War and Peace that's been lying around for years on my desk. The French dialogues aren't translated in the footnotes. I read that the use of Frech in this book functions as a 'literary device', but I really want to know what is being said. How important are these dialogues in French?",
    '2022-03-05 16:00', 0);

regularUser.postList.push(postSolarisWithImg);
regularUser.postList.push(postSongOfSolomon);
regularUser.postList.push(postWarAndPeace);
adminUser.postList.push(postSolarisWithoutImg);
posts.push(postSolarisWithImg);
posts.push(postSongOfSolomon);
posts.push(postWarAndPeace);
posts.push(postSolarisWithoutImg);

books.push(new Book('Solaris', 'Stanisław Herman Lem', 
        'https://upload.wikimedia.org/wikipedia/en/d/d1/SolarisNovel.jpg',
        'It follows a crew of scientists on a research station as they attempt to understand an extraterrestrial intelligence, which takes the form of a vast ocean on the titular alien planet.',
        )); // currently link is empty
books.push(
    new Book('Tres Tristes Tigres', 'Guillermo Cabrera Infante', 
    'https://upload.wikimedia.org/wikipedia/en/0/0f/Tres_tristes_tigres_%28Guillermo_Cabrera_Infante%29.png', 
    'It is a highly experimental, Joycean novel, playful and rich in literary allusions.',
    ));
books.push(
    new Book('The Story of the Lost Child', 'Elena Ferrante', 
    'https://www.irishtimes.com/polopoly_fs/1.2348652.1441974000!/image/image.jpg', 
    "The fourth of Elena Ferrante’s celebrated Neapolitan novels, has a lot to deliver on.",
    ));    
books.push(
        new Book('War and Peace', 'Leo Tolstoy', 
        'https://images-na.ssl-images-amazon.com/images/I/A1aDb5U5myL.jpg', 
        'The novel chronicles the French invasion of Russia and the impact of the Napoleonic era on Tsarist society through the stories of five Russian aristocratic families.',
        )); 
books.push(
        new Book('Song of Solomon', 'Toni Morrison', 
        'https://images-na.ssl-images-amazon.com/images/I/61EKxawb6xL.jpg', 
        'It tells the story of Macon "Milkman" Dead, a young man alienated from himself and estranged from his family, his community, and his historical and cultural roots.',
        ));   


let novelBooklist = new Booklist('novels', 'All novels liked.', 'admin', [books[0],books[1]]);
let spanishBooklist = new Booklist('All spanish', 'All Spanish novels.', 'admin', [books[1]]);
let before20list = new Booklist('Before 20th', 'Before 20 centuries', 'user', [books[0],books[1], books[3], books[4]]);
adminUser.booklistList.push(novelBooklist);
adminUser.booklistList.push(spanishBooklist);
regularUser.booklistList.push(before20list);
booklists.push(novelBooklist);
booklists.push(spanishBooklist);
booklists.push(before20list);

regularUser.postCollectionList.push(postSolarisWithoutImg);
regularUser.booklistCollectionList.push(spanishBooklist);
regularUser.booklistCollectionList.push(novelBooklist);
adminUser.postCollectionList.push(postSolarisWithImg);
adminUser.postCollectionList.push(postSongOfSolomon);
adminUser.postCollectionList.push(postWarAndPeace);
adminUser.booklistCollectionList.push(novelBooklist);
adminUser.booklistCollectionList.push(before20list);

users.push(adminUser);
users.push(regularUser);
users.push(regularAmy);

            
// handle links
for (let i=0; i<books.length; i++){
    books[i].link = blinkHandler(books[i].bookId)
}        

if (window.location.href.indexOf('visit') == '-1'){
    if (window.location.href.indexOf('user.html') != -1){
        displayUserInfo(regularUser, false);
    }
    else if (window.location.href.indexOf('admin.html') != -1){
        displayUserInfo(adminUser, false);
    }
    else if (window.location.href.indexOf('amy.html') != -1){
        displayUserInfo(regularAmy, false);
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
const menuButtons = document.getElementsByClassName('btn btn-light');
const profileButtons = document.querySelector('#profileButton');
const menuButtonSelected = document.querySelector('.selected');
let menuButton;
for (menuButton of menuButtons) {
    menuButton.addEventListener('click', menuButtonsOnClick);
}
menuButtonSelected.addEventListener('click', menuButtonsOnClick);
if (profileButtons != null) {
    profileButtons.addEventListener('click', profileButtonsOnClick);
}

// Search Book 
const searchArea1 = document.querySelector('#search-button1')
searchArea1.addEventListener('click', searchBook)
function searchBook(e){
    e.preventDefault();
    if (e.target.id == 'search-button1'){
        const select = document.getElementById('search-book');
        if (select.selectedIndex!=0){
            const value = select.options[select.selectedIndex].value;
            let link;
            if (window.location.href.indexOf('user') != -1) {
                link = '../BookDetail/'+value+'/'+value+'_end_after.html';
            }else if (window.location.href.indexOf('admin') != -1) {
                link = '../BookDetail/'+value+'/'+value+'_admin_after.html';
            }else{
                link = '../BookDetail/'+value+'/BookDetail-'+value+'.html';
            }
            window.location.href = (link)
        }
        
    }  
}

// Search List 
const searchArea2 = document.querySelector('#search-button2')
searchArea2.addEventListener('click', searchList)
function searchList(e){
    e.preventDefault();
    if (e.target.id == 'search-button2'){
        const select = document.getElementById('search-list');
        if (select.selectedIndex!=0){
            const value = select.options[select.selectedIndex].value;
            let link;
            if (window.location.href.indexOf('user.html') != -1) {
                link = '../BooklistDetail/BooklistDetail.html?booklistID='+value+'&userID=0.html';
            }else if (window.location.href.indexOf('admin.html') != -1) {
                link = '../BooklistDetail/BooklistDetail.html?booklistID='+value+'&userID=1.html';
            }else{
                link = '../BooklistDetail/BooklistDetail.html?booklistID='+value;
            }
            window.location.href = (link)
        }
    }  
}
displaySearchbox()


