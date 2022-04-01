
/******************* Index Book *******************/
const log = console.log

let user;
let usertype;
let username;
const allBooks = [];
let BooklistsList = [];
const recommendedBooks = [];

class Book {
	constructor(bid, title, author, cover, description) {
        this.bookId = bid; // get it from book detail page
		this.title = title;
		this.author = author;
        this.cover = cover;
        this.description = description;
        this.link = null; // link to book detail page
    }
}
 
class DataBooklist {
	constructor(lid, listName, creator, bookCollection) {
        this.booklistID = lid;
		this.listName = listName
		this.creator = creator; 
        this.books = bookCollection; // list of DataBook here, list of Book object in BooklistMain
        this.link = null;
	}
}


try { 
    user= String(window.location.href.split('?')[1].split('=')[1])
    //try user = String ...
    const url = '/api/users/'+user
    fetch(url).then((res) => { 
        if (res.status === 200) {
           return res.json() 
       } else {
           alert('Could not get this user')
       }   
    }).then((json) => {  //pass json into object locally
        usertype = json.user.type.toLowerCase()
        username = json.user.username
        log(usertype)
        log(username)

        const url2 = '/api/two'
        fetch(url2).then((res) => { 
            if (res.status === 200) {
               return res.json() 
           } else {
                console.log("not found")
           }                
        }).then((json) => {  //pass json into object locally
            log(json)
            const books = json.books
            for (each of books){
                allBooks.push(new Book(each._id, each.name, each.author, each.coverURL, each.description))
            }
            const lists = json.lists
            for (each of lists){
            BooklistsList.push(new DataBooklist(each._id, each.listName, each.creator, each.books))
            }

            // handle links
            for (let i=0; i<allBooks.length; i++){
                allBooks[i].link = blinkHandler(allBooks[i].bookId, usertype)
            }
            for (let i=0; i<BooklistsList.length; i++){
                BooklistsList[i].link = llinkHandler(BooklistsList[i].booklistID, usertype)
            }  

            /******************* Index Book *******************/
            welcome(username)
            displayMenu(usertype, username, user)
            displaySearchbox()
            RecommendBooksCreate()
            displayTop()
            displayRecommendations()


            })
        }).catch((error) => {
        log(error)})
} catch { 
    usertype= 'guest'
    log(usertype)
    const url0 = '/api/two'
    fetch(url0).then((res) => { 
        if (res.status === 200) {
           return res.json() 
       } else {
            console.log("not found")
       }                
    }).then((json) => {  //pass json into object locally
        log(json)
        const books = json.books
        for (each of books){
            allBooks.push(new Book(each._id, each.name, each.author, each.coverURL, each.description))
        }
        const lists = json.lists
        for (each of lists){
            BooklistsList.push(new DataBooklist(each._id, each.listName, each.creator, each.books))
        }

        // handle links
        for (let i=0; i<allBooks.length; i++){
            allBooks[i].link = blinkHandler(allBooks[i].bookId, usertype, user)
        }
        for (let i=0; i<BooklistsList.length; i++){
            BooklistsList[i].link = llinkHandler(BooklistsList[i].booklistID, usertype, user)
        }  

        /******************* Index Book *******************/
        displayMenu(usertype, username, user)
        displaySearchbox()
        RecommendBooksCreate()
        displayTop()
        displayRecommendations()
       
        })
    .catch((error) => {
    log(error)})
}



/*************** Menu Handler ********************/
function displayMenu(usertype, username, userid){
    const ul = document.querySelector("#topMenu").children[0]
    const lis = ul.children
    const homea = lis[1].firstChild
    const booksa = lis[2].firstChild
    const booklistsa = lis[3].firstChild
    const li = document.createElement("li")
    const a = document.createElement("a")   
    const li2 = document.createElement("li")
    li2.className = 'addUserIdToLink'
    li2.id = 'userLoginInfo'
    const a2 = document.createElement("a")   
    if (usertype == 'guest'){
        homea.setAttribute('href', '/index.html')
        booksa.setAttribute('href', '/public/html/BookMainPage.html') // here
        booklistsa.setAttribute('href', '/public/html/BooklistMainPage.html') // here
        a.setAttribute("href", "/public/html/login.html")
        a.innerText = 'Login/Register'
        li.appendChild(a)
        ul.appendChild(li)
    }
    else{
        homea.setAttribute('href', '/index.html?userID='+userid) // here 
        booksa.setAttribute('href', '/public/html/BookMainPage.html?userID='+userid) // here
        booklistsa.setAttribute('href', '/public/html/BooklistMainPage.html?userID='+userid) // here
        a.setAttribute("href","/logout")
        a.innerText = 'QUIT'
        li.append(a)
        li.className = 'quit'
        a2.setAttribute("href", "../user/user.html") // user link?
        a2.innerText = username // dynamic?
        li2.append(a2)
        ul.appendChild(li)
        ul.appendChild(li2)
    }
}

/*************** Welcome Section ********************/
function welcome(username){
    const div = document.createElement("div")
    div.className = 'welcome'
    const h2 = document.createElement("h2")
    h2.className = "fancychar2"
    h2.innerText = 'Hello '
    const span = document.createElement("span")
    const b = document.createElement("b")
    b.innerText = username+ ','
    span.appendChild(b)
    h2.appendChild(span)

    const h4 = document.createElement("h4")
    h4.className = "fancychar2"
    h4.innerText = 'what would you like to read today?'
    div.appendChild(h2)
    div.appendChild(h4)

    const top = document.querySelector(".search-list")
    top.parentElement.insertBefore(div, top.nextElementSibling)
}

/*************** Books & Booklists Data ********************/

function blinkHandler(bid, usertype, userid){
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

function llinkHandler(lid, usertype, userid){
    // handler for book *list* page link
    let result;
    if (usertype == 'guest'){
        result = '/public/html/BooklistDetail.html?booklistID='+lid // guest
    }
    else{
        result = '/public/html/BooklistDetail.html?booklistID='+lid+'&userID='+userid
    }
    return result;
}   

function ulinkHandler(uid, usertype, userid){
    // handler for book *Detail* page link
    let result;
    if (usertype == 'guest'){
        result = '/public/html/BookDetail.html?bookID='+uid // need to change
    }
    else{
        result = '/public/html/BookDetail.html?bookID='+uid+"&userID="+userid // need to change
    }
    return result; 
}      


function displaySearchbox(){
    const bookoptionfield = document.querySelector(".search-book #myDropdown")
    for (let i=0; i<allBooks.length; i++){
        if (allBooks[i] != null){
            const id1 = allBooks[i].bookId
            const name1 = allBooks[i].title
            const a1 = document.createElement("a")
            // HERE!
            let link1 = blinkHandler(id1, usertype)

            a1.setAttribute("href", link1)
            a1.innerText = name1
            bookoptionfield.appendChild(a1)
        }
    }

    const listoptionfield = document.querySelector('.search-list #myDropdown')
    for (let i=0; i<BooklistsList.length; i++){
        if (BooklistsList[i] != null){
            const id2 = BooklistsList[i].booklistID
            const name2 = "[" + BooklistsList[i].listName + "] -- " +BooklistsList[i].creator
            const a2 = document.createElement("a")
            // HERE!
            let link2 = llinkHandler(id2, usertype)
            a2.setAttribute("href", link2)
            a2.innerText = name2
            listoptionfield.appendChild(a2)
        }
    }
}

function bookFunction() {
    const bookdropdown = document.querySelector(".search-book #myDropdown")
    if (bookdropdown.classList.contains("hide")){
        bookdropdown.classList.remove("hide")
        bookdropdown.classList.add("dropdown-content")
    }
    else{
        bookdropdown.classList.remove("dropdown-content")
        bookdropdown.classList.add("hide")
    }  
}

function listFunction() {
    const listdropdown = document.querySelector(".search-list #myDropdown")
    if (listdropdown.classList.contains("hide")){
        listdropdown.classList.remove("hide")
        listdropdown.classList.add("dropdown-content")
    }
    else{
        listdropdown.classList.remove("dropdown-content")
        listdropdown.classList.add("hide")
    } 
}

function filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropdown");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
        } else {
        a[i].style.display = "none";
        }
    }
}



/********** Recommendation book display **********/

function RecommendBooksCreate() {
    //Create RecommendedBooklist according to the frequency of the book put in some booklists
    let popularity = new Array(allBooks.length).fill(0)
    for(let i=0; i<allBooks.length; i++){
            const bid = allBooks[i].bookId
            for (let j=0; j<BooklistsList.length; j++){
                const result = BooklistsList[j].books.filter((Book) => Book.bookId == bid)
                popularity[i] += result.length;
            }
        }
        for (let k=0; k<3; k++){
            let max = popularity.reduce(function(a, b) {
                return Math.max(a, b);
            }, -Infinity);
            let index = popularity.indexOf(max)
            recommendedBooks.push(allBooks[index])
            popularity[index] = -1
        }
        }
    

function displayTop(){
        const div = document.getElementsByClassName('p-4 p-md-5 mb-4 text-white rounded bg-dark')
        if (recommendedBooks[0] !=null){
            const bookName = recommendedBooks[0].title;
            const bookAuthor = recommendedBooks[0].author;
            const bookCover = recommendedBooks[0].cover;
            const description = recommendedBooks[0].description;
            const bid = recommendedBooks[0].bookId;
            const booklink = recommendedBooks[0].link;

            let img = document.createElement('img')
            img.className = 'TopbookCover'
            img.setAttribute('src', bookCover)

            let h1 = document.createElement('h1')
            h1.className = 'display-4 fst-italic'
            h1.classList.add('fancychar1')
            h1.innerText = bookName
            let span = document.createElement('span')
            span.className = 'transparent'
            span.innerText = bid
            h1.appendChild(span)

            let h4 = document.createElement('h4')
            h4.className = 'fancychar2'
            h4.innerText = bookAuthor

            let p1 = document.createElement('p')
            p1.className = 'lead my-3'
            p1.innerText = description

            let p2 = document.createElement('p')
            p2.className = 'lead mb-0'
            let a = document.createElement('a')
            a.className = 'text-white fw-bold'
            a.setAttribute('href', booklink)
            a.onclick = function open(e){
                e.preventDefault();
                window.location.href=(a.href)
            }
            a.innerText = 'Learn more about it...'
            p2.appendChild(a)

            div[0].appendChild(img)
            div[0].appendChild(h1)
            div[0].appendChild(h4)
            div[0].appendChild(p1)
            div[0].appendChild(p2)
        }
 }


function displayRecommendations(){

    for (let i=1; i<3; i++){
        if (recommendedBooks[i] != null){
        const area = document.getElementsByClassName('row mb-2')

        const bookName = recommendedBooks[i].title;
        const bookAuthor = recommendedBooks[i].author;
        const bookCover = recommendedBooks[i].cover;
        const description = recommendedBooks[i].description;
        const bid = recommendedBooks[i].bookId;

        const booklink = recommendedBooks[i].link

        let outerdiv = document.createElement('div')
        outerdiv.className = 'col-md-6'
        let innerdiv1 = document.createElement('div')
        innerdiv1.className = 'row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative'
        let innerdiv2 = document.createElement('div')
        innerdiv2.className = 'col p-4 d-flex flex-column position-static'
        
        let h3 = document.createElement('h3')
        h3.className = 'fancychar2'
        h3.innerText = bookName
        let span = document.createElement('span')
        span.className = 'transparent'
        span.innerText = bid
        h3.appendChild(span)

        let div1 = document.createElement('div')
        div1.className = 'mb-1 text-muted'
        div1.innerText = bookAuthor

        let img = document.createElement('img')
        img.className = 'RecommendationbookCover'
        img.setAttribute('src', bookCover)

        let br = document.createElement('br')

        let p = document.createElement('p')
        p.className = 'card-text mb-auto'
        p.classList.add('justify')
        p.innerText = description
        
        let a = document.createElement('a')
        a.setAttribute('href', booklink)
        a.className = 'stretched-link'
        a.innerText = 'Learn more'
        a.onclick = function open(e){
            e.preventDefault();
            window.location.href=(a.href)
        }

        innerdiv2.appendChild(h3)
        innerdiv2.appendChild(div1)
        innerdiv2.appendChild(img)
        innerdiv2.appendChild(br)
        innerdiv2.appendChild(p)
        innerdiv2.appendChild(a)

        innerdiv1.appendChild(innerdiv2)
        outerdiv.appendChild(innerdiv1)

        area[0].appendChild(outerdiv)

        }
    }
}

/************************ Posts display ************************/

// function homepostsCreate(){
//     for (let i=0; i<posts.length; i++){
//         homeposts.push(posts[i])
//     }
// }

// function displayPosts(userType){

//     for (let i=0; i<3; i++){
//         if (homeposts[i] != null){
//             let li = postul.children[i]
            
//             /*clean all before display */
//             for (let j =0; j<li.children.length; j++){
//                 li.removeChild(li.children[j])
//             }

//             let postDiv = document.createElement('div')
//             postDiv.className = 'post'
//             let userDiv = document.createElement('div')
//             userDiv.className = 'userProfileContainer'
//             let contentDiv = document.createElement('div')
//             contentDiv.className ='postContent'

//             let title = posts[i].booktitle
//             let userName = posts[i].poster
//             let userProfile = posts[i].posterProfile
//             let pic = posts[i].pic
//             let content = posts[i].content
//             let time = posts[i].time
//             let likes = posts[i].likes
//             let plink = posts[i].posterlink
//             let pid = posts[i].postID
//             let bid = posts[i].bookID
//             let userid = posts[i].userid
//             let blink = posts[i].booklink

//             let img1 = document.createElement('img')
//             img1.className='userProfile'
//             img1.setAttribute('src', userProfile)
//             img1.setAttribute('alt', 'profile')
//             userDiv.appendChild(img1)

//             let userh3 = document.createElement('h3')
//             let a1 = document.createElement('a')
//             a1.className = 'linkColor'

//             a1.setAttribute('href', plink)
//             a1.innerText = userName
//             a1.onclick = function open(e){
//                 e.preventDefault();
//                 window.location.href=(a1.href) // need to handle user link
//             }
//             let spanid2 = document.createElement('span')
//             spanid2.className = 'postId'
//             spanid2.innerText = pid
//             userh3.appendChild(a1)
//             userh3.appendChild(spanid2) // Post id is here

//             contentDiv.appendChild(userh3)

//             let pbook = document.createElement('p')
//             pbook.innerText = 'Book Name: '
//             let span1 = document.createElement('span')
//             let a2 = document.createElement('a')
//             a2.className = 'linkColor'
//             a2.setAttribute('href', blink)
//             a2.innerText = title
//             a2.onclick = function open(e){
//                 e.preventDefault();
//                 window.location.href=(a2.href)
//             }
//             span1.appendChild(a2)
//             let span2 = document.createElement('span')
//             span2.className = 'postTime'
//             span2.innerText = time

//             let spanid3 = document.createElement('span')
//             spanid3.className = 'bookId'
//             spanid3.innerText = ' bookID: '
//             let spanid4 = document.createElement('span')
//             spanid4.className = 'bookId'
//             spanid4.innerText = bid

//             pbook.appendChild(span1)
//             pbook.appendChild(span2)
//             pbook.appendChild(spanid3) 
//             pbook.appendChild(spanid4) // Book id is here
//             contentDiv.appendChild(pbook)

//             let p = document.createElement('p')
//             p.innerText = content
//             contentDiv.appendChild(p)

//             if (pic != null){
//                 let img2 = document.createElement('img')
//                 img2.className='postContentPicture'
//                 img2.setAttribute('src', pic)
//                 img2.setAttribute('alt', 'pic')
//                 contentDiv.appendChild(img2)
//             }

//             let br = document.createElement('br')
//             contentDiv.appendChild(br)

//             // ADMIN & USER
//             if (userType != 'guest'){
//                 let likeh5 = document.createElement('h5')
//                 let icon = document.createElement('i')
//                 icon.className = 'fa fa-heart'
//                 icon.innerText = ' '+likes
//                 let button = document.createElement('button')
//                 button.className = 'btn btn-outline-primary'
//                 button.classList.add('like')
//                 button.innerText = 'Like'
//                 let button2 = document.createElement('button')
//                 button2.className = 'btn btn-outline-success'
//                 button2.classList.add('collect')
//                 button2.innerText = 'Collect'

//                 likeh5.appendChild(icon)
//                 likeh5.appendChild(button2)
//                 likeh5.appendChild(button)
//                 contentDiv.appendChild(likeh5)
//             }

//             postDiv.appendChild(userDiv)
//             postDiv.appendChild(contentDiv)

//             li.appendChild(postDiv)
            
//         }
//     }
// }