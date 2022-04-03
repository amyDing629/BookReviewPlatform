const log = console.log;
// global variables
var BooklistsNum = 0;
/************** temp for search bar ******************/
function displaySearchbox(){
    const searchbookArea = document.querySelector('.search-book')
    const t = searchbookArea.children[0]
    for (let i=0; i<BooksNum; i++){
        if (BooksList[i] != null){
            const id = BooksList[i].bookID
            const name = BooksList[i].name
            const option = document.createElement('option')
            option.value = id
            option.innerText = name
            t.appendChild(option)
        }
    }
    const searchlistArea = document.querySelector('.search-list')
    const column = searchlistArea.children[0]
    for (let i=0; i<BooklistsNum; i++){
        if (BooklistsList[i] != null){
            const id = BooklistsList[i].booklistID
            const name = "[" + BooklistsList[i].listName + "] -- " + BooklistsList[i].creator
            const option = document.createElement('option')
            option.value = id
            option.innerText = name
            column.appendChild(option)
        }
    }
}

/********** Search Book **********/
const searchArea1 = document.querySelector('#search-button1')
if(searchArea1){
    searchArea1.addEventListener('click', searchBook)
}
function searchBook(e){
    e.preventDefault();
    if (e.target.id == 'search-button1'){
        const select = document.getElementById('search-book');
        if (select.selectedIndex!=0 ){
            const value = select.options[select.selectedIndex].value;
            const user = document.querySelector('.right').innerText
            let link = '../BookDetail/'
            if (user.length === 1){ // ['Login/Register']
                link+=value+'/BookDetail-'+value+'.html'
            } else if (user === 'Admin'){
                link+=value+'/'+value+'_admin_after.html'
            } else if (user === 'User'){
                link+=value+'/'+value+'_end_after.html'
            }
            window.location.href = (link)
        }
    }  
}

/********** Search List **********/
const searchArea2 = document.querySelector('#search-button2')
if(searchArea2){
    searchArea2.addEventListener('click', searchList)
}
function searchList(e){
    e.preventDefault();
    if (e.target.id == 'search-button2'){
        const select = document.getElementById('search-list');
        if (select.selectedIndex!=0 ){
            const value = select.options[select.selectedIndex].value;
            const user = getUserID()
            let link = "../BooklistDetail/BooklistDetail.html?booklistID=" + value
            if (!isNaN(user)){
                link += ("&userID="+user)
            }
            window.location.href = (link)
        }
    }  
}
/************** temp for search bar [END] ******************/


/************** temp hardcode for all books ******************/
var BooksNum = 0; 
let BooksList = [] 
var booksID = []
class Book {
	constructor(name, author, year, coverURL, description, id) {
		this.name = name;
		this.author = author;
		this.year = year;
		this.coverURL = coverURL;
        this.description = description       
        this.postCollection = [] // collection of post ids associated with the book
		this.bookID = id;
		BooksNum++;
	}
}
// get all books 
function getBooks(){
    const url = '/api/books'
    fetch(url).then((res) => { 
        if (res.status === 200) {
           return res.json() 
       } else {
            alert('faild to get all books.')
       }                
    }).then((json) => {  //pass json into object locally
        const books = json.books
        log(books)

        for (each of books){
            BooksList.push(new Book(each.name, each.author, each.year, each.coverURL, each.description, each._id))
        }
        displaySearchbox()//for search bar function
        selectBookToPlay(BooksList)
        // log(getUserID())
        ifNeedaddButton(getUserID())
        // checkDesButton(getUserID())
        // displayBookDescription(BooksList,getUserID())
        // filpPage(1,3)
    }).catch((error) => {
        log(error)
    })
}

class Post {
	constructor(pid, bid, booktitle, userid, postername, posterProfile, pic, content, time, likes) {
		this.postID = pid;
        this.bookID = bid;
        this.booktitle = booktitle;
        this.userid = userid;
		this.poster = postername;
        this.posterProfile = posterProfile;
        this.pic = pic;
        this.content = content; 
        this.time = time;
        this.likes = likes; 
        this.booklink = null;
        this.posterlink = null;
    }
}

const posts = []; // all posts
const homeposts = []; // for admin edit
const collectedPosts = []; // collection of posts made by current user
const postul = document.querySelector('#posts ul');

let puser;
let pusertype;
let pusername;

function getPosts(){
    puser = getUserID();
    let book = getBookID();
    if (puser != 'guest') {
        const url = '/api/users/' + puser
        fetch(url).then((res) => {
            if (res.status === 200) {
                return res.json()
            } else {
                alert('Could not get this user')
            }
        }).then((json) => {
            pusertype = json.user.type
            pusername = json.user.username
            const url2 = '/api/posts'
            fetch(url2).then((res) => {
                if (res.status === 200) {
                    return res.json()
                } else {
                    console.log("not found")
                }
            }).then((json) => {
                const jsonposts = json.posts
                for (each of jsonposts) {
                    if (each.bookID == book) {
                        posts.push(new Post(each._id, each.bookID, each.booktitle, each.userID, each.username, each.posterProfile, each.pic, each.content, each.time, each.likes))
                    }
                }
                // log(posts)
                for (let i = 0; i < posts.length; i++) {
                    posts[i].booklink = blinkHandlerinPost(posts[i].bookID, pusertype)
                    posts[i].posterlink = ulinkHandler(posts[i].userid, pusertype, puser)
                }
                homepostsCreate();
                displayPosts(pusertype, posts)
                likeHandler()
                collectHandler();
                addHandler();
                addFormForDelete()
                if(pusertype == 'Admin'){
                    deleteHandler();
                }
            })
        })
    }else{
        pusertype= 'guest'
        const url5 = '/api/posts'
        fetch(url5).then((res) => {
            if (res.status === 200) {
                return res.json()
            } else {
                console.log("not found")
            }
        }).then((json) => {  //pass json into object locally
            log(json)
            const jsonposts = json.posts
            for (each of jsonposts) {
                if (each.bookID == book) {
                    posts.push(new Post(each._id, each.bookID, each.booktitle, each.userID, each.username, each.posterProfile, each.pic, each.content, each.time, each.likes))
                }
            }
            // log(posts)

            // handle links
            for (let i = 0; i < posts.length; i++) {
                posts[i].booklink = blinkHandlerinPost(posts[i].bookID, pusertype, puser)
                posts[i].posterlink = ulinkHandler(posts[i].userid, pusertype, puser)
            }
            homepostsCreate()
            displayPosts(pusertype, posts)
        })
            .catch((error) => {
                log(error)
            })
    }
}

function homepostsCreate(){
    for (let i=0; i<posts.length; i++){
        homeposts.push(posts[i])
    }
}

function blinkHandlerinPost(bid, usertype, userid){
    // handler for book *Detail* page link
    let result;
    if (usertype == 'guest'){
        result = '/public/html/BookDetail.html?bookID='+bid
    }
    else{
        result = '/public/html/BookDetail.html?bookID='+bid+"&userID="+userid
    }
    return result; 
} 

function ulinkHandler(uid, usertype, userid){
    // handler for book *Detail* page link
    let result;
    if (usertype == 'guest'){
        result = '/public/html/login.html'
    }
    else{
        result = '/public/html/BookDetail.html?bookID='+uid+"&userID="+userid // need to change
    }
    return result; 
}  

function myFunction(){
    var x = document.getElementById("myFile");
    var txt = "";
    if ('files' in x) {
      if (x.files.length == 0) {
        txt = "Select one or more files.";
      } else {
        for (var i = 0; i < x.files.length; i++) {
          txt += "<br><strong>" + (i+1) + ". file</strong><br>";
          var file = x.files[i];
          if ('name' in file) {
            txt += "name: " + file.name + "<br>";
          }
          if ('size' in file) {
            txt += "size: " + file.size + " bytes <br>";
          }
        }
      }
    } 
    else {
      if (x.value == "") {
        txt += "Select one or more files.";
      } else {
        txt += "The files property is not supported by your browser!";
        txt  += "<br>The path of the selected file: " + x.value; // If the browser does not support the files property, it will return the path of the selected file instead. 
      }
    }
    document.getElementById("demo").innerHTML = txt;
}

function displayBookDetail(BooksList, bookID) {
    displayBookDescription(BooksList, bookID);
    // displayPosts(bookID, user);
    flipPage(1, 3);
}

// // display the book information like book cover, author...
function displayBookDescription(BooksList, id) {
    const book = BooksList.filter((book)=> book.bookID == id)
    const bookInfo = document.querySelector('#bookInfo');

    const coverContainer = document.createElement('div');

    coverContainer.className = 'coverContainer';
    const bookCover = document.createElement('img');
    bookCover.className = 'cover';
    bookCover.src = book[0].coverURL;
    coverContainer.appendChild(bookCover);
    bookInfo.appendChild(coverContainer);

    const bookIntro = document.createElement('div');
    bookIntro.className = 'bookIntro';

    const bookName = document.createElement('span');
    bookName.innerText = 'Name: ' + book[0].name

    const bookAuthor = document.createElement('span');
    bookAuthor.className = "bookAuthor";
    bookAuthor.innerText = 'Author: ' + book[0].author;
    const bookId = document.createElement('span');
    bookId.className = "bookId";
    bookId.innerText = 'bookID: ' + book[0].bookID; 
    const publish = document.createElement('span');
    publish.className = "publish" ;
    publish.innerText = "publish: " + book[0].year;

    bookIntro.appendChild(bookName);
    bookIntro.appendChild(document.createElement('br'));
    bookIntro.appendChild(bookAuthor);
    bookIntro.appendChild(document.createElement('br'));
    bookIntro.appendChild(publish);
    bookInfo.appendChild(bookIntro);

    const bookDescription = document.querySelector('#bookDescription');

    const descriContent = document.createTextNode(book[0].description)
    bookDescription.appendChild(descriContent)
    // if(user == 'Admin'){
    //     const editDes = document.createElement('button');
    //     editDes.id = "DesButton"
    //     editDes.className = "btn btn-light"
    //     editDes.innerText = "Edit Description"
    //     editDes.addEventListener('click', profileButtonsOnClick)
    //     insertAfter(editDes, bookDescription)
    // }
    // addDesButton()
}

function addDesButton(){
    const bookDescription = document.querySelector('#bookDescription');
    const editDes = document.createElement('button');
    editDes.id = "DesButton"
    editDes.className = "btn btn-light"
    editDes.innerText = "Edit Description"
    editDes.addEventListener('click', profileButtonsOnClick)
    insertAfter(editDes, bookDescription)
}

function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}


function displayPosts(user, newposts){
    // clean all before display
    postul.innerHTML = ''
    
    for (let i=0; i<100; i++){
        if (newposts[i] != null){
            let li = document.createElement('li')

            let postDiv = document.createElement('div')
            postDiv.className = 'post'
            let userDiv = document.createElement('div')
            userDiv.className = 'userProfileContainer'
            let contentDiv = document.createElement('div')
            contentDiv.className ='postContent'

            let title = newposts[i].booktitle
            let userName = newposts[i].poster
            let userProfile = newposts[i].posterProfile
            let pic = newposts[i].pic
            let content = newposts[i].content
            let time = newposts[i].time
            let likes = newposts[i].likes
            let plink = newposts[i].posterlink
            let pid = newposts[i].postID
            let bid = newposts[i].bookID
            let userid = newposts[i].userid
            let blink = newposts[i].booklink

            let img1 = document.createElement('img')
            img1.className='userProfile'
            img1.setAttribute('src', userProfile)
            img1.setAttribute('alt', 'profile')
            userDiv.appendChild(img1)

            let userh3 = document.createElement('h3')
            let a1 = document.createElement('a')
            a1.className = 'linkColor'
            a1.setAttribute('href', plink)
            a1.innerText = userName
            a1.onclick = function open(e){
                e.preventDefault();
                window.location.replace("../../HomeAndLogin/login.html")
            }
            let spanid2 = document.createElement('span')
            spanid2.className = 'postId'
            spanid2.innerText = pid
            userh3.appendChild(a1)
            userh3.appendChild(spanid2) // Post id is here

            contentDiv.appendChild(userh3)

            let pbook = document.createElement('p')
            pbook.innerText = 'Book Name: '
            let span1 = document.createElement('span')
            let a2 = document.createElement('a')
            a2.className = 'linkColor'
            a2.setAttribute('href', blink)
            a2.innerText = title
            a2.onclick = function open(e){
                e.preventDefault();
                window.location.replace(a2.href)
            }
            span1.appendChild(a2)
            let span2 = document.createElement('span')
            span2.className = 'postTime'
            span2.innerText = time

            let spanid3 = document.createElement('span')
            spanid3.className = 'bookId'
            spanid3.innerText = ' bookID: '
            let spanid4 = document.createElement('span')
            spanid4.className = 'bookId'
            spanid4.innerText = bid

            pbook.appendChild(span1)
            pbook.appendChild(span2)
            pbook.appendChild(spanid3) 
            pbook.appendChild(spanid4) // Book id is here
            contentDiv.appendChild(pbook)

            let p = document.createElement('p')
            p.innerText = content
            contentDiv.appendChild(p)

            if (pic != ''){
                let img2 = document.createElement('img')
                img2.className='postContentPicture'
                img2.setAttribute('src', pic)
                img2.setAttribute('alt', 'pic')
                contentDiv.appendChild(img2)
            }

            let br = document.createElement('br')
            contentDiv.appendChild(br)

            if(user != 'guest'){
                let likeh5 = document.createElement('h5')
                let icon = document.createElement('i')
                icon.className = 'fa fa-heart'
                icon.innerText = ' '+likes
                let button = document.createElement('button')
                button.className = 'btn btn-outline-primary'
                button.classList.add('like')
                button.innerText = 'Like'
                let button2 = document.createElement('button')
                button2.className = 'btn btn-outline-success'
                button2.classList.add('collect')
                button2.innerText = 'Collect'
                likeh5.appendChild(icon)

                let button3 = document.createElement('button')
                if(user == 'Admin'){
                    button3.innerText = 'Delete'
                    button3.className = 'btn btn-outline-danger'
                    button3.id = 'delete3'
                    likeh5.appendChild(button3)
                }
                likeh5.appendChild(button2)
                likeh5.appendChild(button)
                contentDiv.appendChild(likeh5)
            }

            postDiv.appendChild(userDiv)
            postDiv.appendChild(contentDiv)

            li.appendChild(postDiv)
            postul.appendChild(li)
        }
    }
    flipPage(1,3)
}

function displayAddPost(){
    let addPostTitle = document.getElementById('addPostTitle');
    addPostTitle.innerText = 'Add Post';
    let addPostContent = document.getElementsByClassName("mb-0, justify")[0];

    addPostContent.innerHTML = '';

    let br = document.createElement('br');
    addPostContent.innerHTML += 'Thoughts:' +'<br>'

    let textarea = document.createElement('textarea');
    textarea.id = 'postContent';
    textarea.rows = '5';
    textarea.cols = '40';
    textarea.name = 'description';
    textarea.placeholder = 'Enter details here...';
    addPostContent.appendChild(textarea)
    addPostContent.appendChild(br)

    addPostContent.innerHTML += 'Picture:' +'<br>'
    addPostContent.appendChild(br)

    let pic = document.createElement('input');
    pic.type = 'file';
    pic.id = 'myFile';
    pic.size = '50';
    pic.onchange = "myFunction()";
    pic.multiple = true;
    addPostContent.appendChild(pic) 

    let demo = document.createElement('p');
    demo.id = 'demo';
    addPostContent.appendChild(demo);
    addPostContent.appendChild(br)

    let submit = document.createElement('input');
    submit.type = 'submit';
    submit.id = 'addPost';
    submit.value = 'Add';
    submit.className = "addSubmit, btn btn-outline-dark";
    addPostContent.appendChild(submit) 
}


// page flip
function flipPage(pageNo, pageLimit) {
    const allPosts = document.getElementById("post-body")
    const totalSize = allPosts.children.length
    let totalPage = 0
    const pageSize = pageLimit
    
    // calculate the page num and set up every page:
    if (totalSize / pageSize > parseInt(totalSize / pageSize)) {
        totalPage = parseInt(totalSize / pageSize) + 1;
    } else {
        totalPage = parseInt(totalSize / pageSize);
    }

    // build every page label and assign onclick function
    const curr = pageNo
    const startRow = (curr - 1) * pageSize + 1
    let endRow = curr * pageSize
    endRow = (endRow > totalSize) ? totalSize : endRow;
    let strHolder = ""
    let previousStr = "Previous&nbsp;&nbsp;&nbsp;&nbsp;"
    let spaceStr = "&nbsp;&nbsp;&nbsp;&nbsp;"
    let nextStr = "Next&nbsp;&nbsp;&nbsp;&nbsp;"
    let setupStr = "<a class=\"pagelink\" href=\"#\" onClick=\"flipPage("
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
        const each = allPosts.children[i - 1];
        if (i >= startRow && i <= endRow) {
            each.className="normalTR"
        } else {
            each.className="endTR"
        }
    }
    document.getElementById("pageFliper").innerHTML = strHolder;
}

function selectBookToPlay(BooksList){
    if (window.location.href.split('?')[1] == null){
        return;
    } else if (window.location.href.split('?')[1].split('&').length === 1){ // guest visit any booklist
        const currentBookID = window.location.href.split('?')[1].split('bookID=')[1].split('.')[0]
        // log(bookIndex)
        // log(BooksList)
        // const book = BooksList[currentBookID]
        displayBookDetail(BooksList, currentBookID)
        // selectNarviBarUser('guest')
    } else { // admin & user
        const currentBookID = getBookID()
        // log(currentBookID)
        // const currentUser = getUserID()
        
        // const userType = checkUserType(currentUser)
        displayBookDetail(BooksList, currentBookID)
        // selectNarviBarUser(userType)
        // displayAddPost();
    }
}

function selectNarviBarUser(userType){
    const userColumn = document.querySelector('.right')
    if (userType === 'User'){//end user
        userColumn.innerHTML =''
        const newLI = document.createElement('li')
        newLI.className = "quit"
        newLI.innerHTML = "<a href=\"../HomeAndLogin/index.html\">QUIT</a>"
        const a = document.createElement('a')
        a.id = 'userLoginInfo'
        a.className = 'addUserIdToLink'
        a.href = "../user/user.html" // need more dynamiclly link fix on phase 2
        a.onclick = function open(e){e.preventDefault(); window.location.href = a.href}
        a.appendChild(document.createTextNode('User')) // need more dynamiclly get username
        userColumn.appendChild(a)
        userColumn.before(newLI)
        document.querySelector('#home').href = "../HomeAndLogin/index.html?userID="+getUserID()
        document.querySelector('#bookmain').href = "./BookMainPage.html?userID="+getUserID()
        document.querySelector('#booklistmain').href = "../BooklistMainPage/BooklistMainPage.html?userID="+getUserID()
        document.querySelector('#userLoginInfo').href = "../user/user.html?userID="+getUserID() // need check
    } else if (userType === 'Admin'){ // admin
        userColumn.innerHTML =''
        const newLI = document.createElement('li')
        newLI.className = "quit"
        newLI.innerHTML = "<a href=\"../HomeAndLogin/index.html\">QUIT</a>"
        const a = document.createElement('a')
        a.id = 'userLoginInfo'
        a.className = 'addUserIdToLink'
        a.href = "../user/admin.html" // need more dynamiclly link fix on phase 2
        a.onclick = function open(e){e.preventDefault(); window.location.href = a.href}
        a.appendChild(document.createTextNode('Admin')) // need more dynamiclly get username
        userColumn.appendChild(a)
        userColumn.before(newLI)
        document.querySelector('#home').href = "../HomeAndLogin/index.html?userID="+getUserID()
        document.querySelector('#bookmain').href = "./BookMainPage.html?userID="+getUserID()
        document.querySelector('#booklistmain').href = "../BooklistMainPage/BooklistMainPage.html?userID="+getUserID()
        document.querySelector('#userLoginInfo').href = "../user/user.html?userID="+getUserID() // need check
    } //else guest
}

// getBooks()
// displaySearchbox()
// selectBookToPlay()

// const desButton = document.querySelector('#DesButton');
// if(desButton){
//     desButton.addEventListener('click', profileButtonsOnClick);
// }

/* If 'Edit' is clicked, display edition page.
   If 'Submit' is clicked, display confirmed information */
   function profileButtonsOnClick(e) {
    let userInfo = e.target.parentElement;
    let profileButton = document.getElementById('DesButton');
    if (e.target.innerHTML == 'Edit Description') {
        userInfo.removeChild(document.getElementById('bookDescription'));
        let sigForm = document.createElement('input');
        sigForm.type = 'text';
        sigForm.id = 'sigForm';
        userInfo.insertBefore(sigForm, profileButton);
        profileButton.innerHTML = 'Submit';
    }
    else if (e.target.innerHTML == 'Submit') {
        let signature = document.getElementById('sigForm').value;
        const selectedBook = BooksList.filter((book) => book.bookID == getBookID())
        modifyDescription(getBookID(), 'description', signature)
        userInfo.removeChild(document.getElementById('sigForm'));
        let newSignature = document.createElement('div');
        newSignature.id = 'bookDescription';
        newSignature.className = 'bookDescription';
        // log(selectedBook[0].description)
        newSignature.innerHTML = selectedBook[0].description;
        userInfo.insertBefore(newSignature, profileButton);
        profileButton.innerHTML = 'Edit Description';
    }
}

function likeHandler(){
    const likefield = document.querySelector('#left-part')
    likefield.addEventListener('click', like)
}

// const likefield = document.querySelector('#left-part')
// if(likefield){
//     likefield.addEventListener('click', like)
// }

function like(e){
    e.preventDefault(); // prevent default action
    let contentDiv
    if(e.target.parentElement){
        contentDiv = e.target.parentElement.parentElement
    }
    // let pid
    // if(contentDiv && contentDiv.getElementsByClassName('postId')[0]){
    //     pid = contentDiv.getElementsByClassName('postId')[0].innerText
    // }
    // let post;
    let icon
    if(e.target.parentElement){
        icon = e.target.parentElement.getElementsByClassName('fa fa-heart')[0];
    }
    let onePost 
    if(e.target.parentElement){
        onePost = e.target.parentElement.parentElement.parentElement.parentElement
    } 
    let i
    if(e.target.parentElement){
        i = Array.from(onePost.parentElement.children).indexOf(onePost)
    }
    // log(posts[i])
    if (e.target.classList.contains('like')) {
        posts[i].likes++;
        icon.innerText = ' ' + posts[i].likes;
        e.target.classList.remove('like');
        e.target.classList.add('dislike');
        e.target.innerText = 'Dislike';
        // log(posts[i].postID)
        modifyLike(posts[i].postID, "add")
    }
    else if (e.target.classList.contains('dislike')) {
        posts[i].likes--;
        icon.innerText = ' ' + posts[i].likes;
        e.target.classList.remove('dislike');
        e.target.classList.add('like');
        e.target.innerText = 'Like';
        modifyLike(posts[i].postID, "reduce")
    }
    
    // for(var i = 0; i < posts.length; i++){
    //     if (parseInt(posts[i].postID) == pid) {
    //         if (e.target.classList.contains('like')) {
    //             posts[i].likes++;
    //             icon.innerText = ' ' + posts[i].likes;
    //             e.target.classList.remove('like');
    //             e.target.classList.add('dislike');
    //             e.target.innerText = 'Dislike';
    //         }
    //         else if (e.target.classList.contains('dislike')) {
    //             posts[i].likes--;
    //             icon.innerText = ' ' + posts[i].likes;
    //             e.target.classList.remove('dislike');
    //             e.target.classList.add('like');
    //             e.target.innerText = 'Like';
    //         }
    //     }
    // }
}

function collectHandler(){
    const collectfield = document.querySelector('#left-part')
    collectfield.addEventListener('click', collect);
    // log(111111111111)
}


function collect(e){
    e.preventDefault(); // prevent default action

    if (e.target.classList.contains('collect')) {
        // log(1111)
		const contentDiv = e.target.parentElement.parentElement
        const h3 = contentDiv.children[0]
        const pid = h3.children[1].innerText
        // for (let i=0; i<posts.length; i++){
        //     if(parseInt(posts[i].postID) == pid){
        //         e.target.classList.remove('collect');
        //         e.target.classList.add('collected');
        //         e.target.innerText = 'Collected!';

        //     }
        // } 
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
function deleteHandler(){
    const deletefield = document.querySelector('#left-part')
    deletefield.addEventListener('click', delete_post)
}

function delete_post(e){
    e.preventDefault(); // prevent default action
    if (e.target.className == 'btn btn-outline-danger') {
        const contentDiv = e.target.parentElement.parentElement
        // log(100)
        const h3 = contentDiv.children[0]
        const pid = h3.children[1].innerText
        // log(pid)
        if(e.target.innerText == 'Delete'){
            // e.target.innerText = 'Confirm?'
            // setTimeout(()=>{
            //     e.target.innerText = 'Delete';
            // }, 7 * 1000)
            const ID = e.target.parentElement.parentElement.children[0].children[1].innerText
            log(ID)
            const form = document.getElementById("deleteForm")
            form.children[0].children[0].innerText="Confirm to delete this Post?"
            form.name = ID
            form.style.display="block"
        }
        // else if(e.target.innerText == 'Confirm?'){
        //     setTimeout(()=>{
        //         for (let i=0; i<posts.length; i++){
        //             if(parseInt(posts[i].postID) == pid){
        //                 posts.splice(i, 1) // start from index=i, remove 1 item
        
        //                 const ul = contentDiv.parentElement.parentElement.parentElement
        //                 const li = contentDiv.parentElement.parentElement
        //                 ul.removeChild(li)
        //                 displayPosts()
        //                 break;
        //             }
        //         }
        //     }, 3 * 1000)
        // }
    }
}

function addHandler() {
    const addArea = document.querySelector('#addPost');
    if (addArea) {
        addArea.addEventListener('click', addNewPost)
    }
}
function addNewPost(e){
    e.preventDefault();
    const userID = getUserID();
    const currentBookID = getBookID()
    const url = '/api/books'
    const url2 = '/api/users/'+userID
    const url3 = '/api/posts'
    let book = []
    let likes = 0
    let filterPosts = []
    if (e.target.classList.contains('addSubmit,')){
        const postContent = document.getElementById('postContent').value
        fetch(url).then((res) => { 
            if (res.status === 200) {
            return res.json() 
        } else {
                res.status(500).send("Internal Server Error") // not sure
        }                
        }).then((json) => {
            const all = json.books
            for(each of all){
                if(each._id == currentBookID){
                    book.push(new Book(each.name, each.author, each.year, each.coverURL, each.description, each._id))
                }
            }
            // log(book)
            fetch(url2).then((res) => { 
                if (res.status === 200) {
                   return res.json() 
               } else {
                    console.log("not found")
               }                
            }).then((json) => {
                pusertype = json.user.type
                pusername = json.user.username
                posterProfile = json.user.profilePhoto
                // log(posterProfile)
                pic = '' //gonna change in future
                booktitle = book[0].name
                const today = new Date();
                const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() + ' ' + today.getHours()+':'+today.getMinutes();
                modifyPost(currentBookID,userID,booktitle, pusername,posterProfile,pic,postContent, date);
                fetch(url3).then((res) => { 
                    if (res.status === 200) {
                       return res.json() 
                   } else {
                        console.log("not found")
                   }                
                }).then((json) =>{
                    const jsonposts = json.posts
                    for(each of jsonposts){
                        if(each.content == postContent && each.userID == userID){
                            filterPosts.push(new Post(each._id, each.bookID, each.booktitle, each.userID, each.username, each.posterProfile, each.pic, each.content, each.time, each.likes))
                        }
                    }
                    // log(filterPosts[0].postID)
                    const newPost = new Post(filterPosts[0].postID, currentBookID, booktitle, userID, pusername,posterProfile, pic, postContent, date, likes)
                    posts.push(newPost);
                    // log(posts)
                    displayPosts(pusertype, posts)
                    const postContentInput = document.getElementById('postContent')
                    postContentInput.value = 'add successfully!'
                    postContentInput.style = 'color: red'
                    setTimeout(() => {
                        postContentInput.value = '';
                        postContentInput.style = 'color: black'
                    }, 3 * 1000)
                })
            })
        })
        // const x = document.getElementById('myFile')
        // const img = document.createElement("img");
        // if(x.files.length > 0){
        //     img.src = URL.createObjectURL(x.files[0]);
        //     img.className = 'postContentPicture'
        // }

        // const today = new Date();
        // const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() + ' ' + today.getHours()+':'+today.getMinutes();
        // const userType = checkUserType(getUserID())
        // var url;
        // if(userType == 'Admin'){
        //     url = 'https://avatars.githubusercontent.com/u/73209681?v=4'
        // }else if(userType == 'User'){
        //     url = 'https://avatars.githubusercontent.com/u/71192401?v=4'
        // }

        // if(x.files.length > 0){
        //     // log(3)
        //     posts.push(new Post(bookID, userID, posts.length, currentBookID, BooksList[currentBookID].name, null, userType,
        //     url, img, postContent, date, 0))
        // }else{
        //     posts.push(new Post(bookID, userID,  posts.length, 0, 'Solaris', null, 'user',
        //     url, null, postContent, date, 0))
        // }
        // displayPosts();
        // const postContentInput = document.getElementById('postContent')
        // postContentInput.value = 'add successfully!'
        // postContentInput.style = 'color: red'
        // document.getElementById('myFile').value = null
        // document.getElementById('demo').innerHTML = ''
        // setTimeout(()=>{
        //     postContentInput.value = '';
        //     postContentInput.style = 'color: black'
        // }, 3 * 1000)
    }
}

// helper: get user id
function getUserID(){
    try { 
        return (window.location.href.split('?')[1].split('&')[1].split('=')[1].split('.')[0])
    } catch { 
        return 'guest'
    }
}

// helper: get book id
function getBookID(){
    return window.location.href.split('?')[1].split('&')[0].split('=')[1]
}

function ifNeedaddButton(userID){
    const url = '/api/users/'+userID
    fetch(url).then((res) => { 
        if (res.status === 200) {
           return res.json() 
       } else {
            log('faild to get user info. as guest.')
       }                
    }).then((json) => {
        return JSON.stringify(json)
    }).then((userInfo)=>{
        try{
            const userType = userInfo.split("\"type\":\"")[1].split("\"")[0]
            if(userType == 'User'){
                displayAddPost()
            }else if(userType == 'Admin'){
                addDesButton();
                displayAddPost()
            }
        } catch {
            log("guest")
        }
        
    }).catch((error)=>{
        log(error)
        return
    })
}

// patch modify
function modifyDescription(id, target, content){
    // const book = getBookID()
    const url = '/api/book/'+id

    let data = {
        target: target,
        content: content
    }
    const request = new Request(url, {
        method: 'PATCH', 
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });
    fetch(request)
    .then(function(res) {
        log(res)
        if (res.status === 200) {
            console.log('updated')    
        } else {
            console.log('Failed to updated')
        }
        log(res)
    }).catch((error) => {
        log(error)
    })
}

function modifyLike(id, operation){
    // const book = BooklistsList.filter((list)=> list.booklistID == id )
    const url = '/api/post/'+id

    let data = {
        operation: operation
    }
    const request = new Request(url, {
        method: 'PATCH', 
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });
    fetch(request)
    .then(function(res) {
        if (res.status === 200) {
            console.log('updated')    
        } else {
            console.log('Failed to updated')
        }
        log(res)
    }).catch((error) => {
        log(error)
    })
}

function modifyPost(bid, uid, bookName, username, posterProfile, pic, content, time){
    const url = '/api/addPost'
    let data = {
        bookID: bid,
        userID: uid,
		booktitle: bookName,
        username: username,
		posterProfile: posterProfile,
		pic: pic,
        content: content,
        time: time,
    }
    const request = new Request(url, {
        method: 'post', 
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });
    fetch(request)
    .then(function(res) {
        if (res.status === 200) {
            console.log('added book')    
        } else {
            console.log('Failed to add')
        }
        // log(res)
    }).catch((error) => {
        log(error)
    })
}

function addFormForDelete(){
    //// dialog modal
    const wrapper = document.createElement('div')
    wrapper.id ='deleteForm'
    wrapper.className='form-popup'

    const form = document.createElement('form')
    form.className='form-container'

    const h5 = document.createElement('h5')
    h5.innerText= 'Confirm to delete the book?'
    form.appendChild(h5)

    const submit = document.createElement('button')
    submit.type = "submit"
    submit.className='addSubmit, btn'
    submit.id = 'submit_delete'
    submit.innerText='Confirm'
    submit.onclick = function confirmDelete(e){
        e.preventDefault();
        if (e.target.id == 'submit_delete'){
            const ID =document.getElementById("deleteForm").name
            const list = posts.filter((post)=> post.postID == ID )
            log(ID)
            const url = '/api/posts/'+ID
        
            let data = {
                _id: list[0].postID
            }
            const request = new Request(url, {
                method: 'delete', 
                body: JSON.stringify(data),
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
            });
            fetch(request)
            .then(function(res) {
                if (res.status === 200) {
                    console.log('delete booklist')    
                } else {
                    console.log('Failed to delete the booklist')
                }
                log(res)
            }).catch((error) => {
                log(error)
            })

            for (let i=0; i<posts.length; i++){
                if (posts[i].postID == ID){
                    posts.splice(i, 1)
                    // BooklistsNum--
                }
            }
            log(posts)
            //renewPage()
            document.getElementById("deleteForm").style.display="none"
            location.reload()
        }
    }
    form.appendChild(submit)

    const cancel = document.createElement('button')
    cancel.type = "button"
    cancel.className='btn cancel'
    cancel.id = "cancel"
    cancel.onclick = function cancelDelete(e){e.preventDefault; document.getElementById("deleteForm").style.display='none'}
    cancel.innerText='Cancel'
    form.appendChild(cancel)
    wrapper.appendChild(form)
    document.querySelector('body').appendChild(wrapper)
    ///
}

getBooks();
getPosts();
flipPage(1,3)