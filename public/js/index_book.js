
/******************* Index Book *******************/
const log = console.log

let user;
let usertype;
let username;
const allBooks = [];
let BooklistsList = [];
const recommendedBooks = [];

class Book {
	constructor(bid, title, author, cover, description, link) {
        this.bookId = bid; // get it from book detail page
		this.title = title;
		this.author = author;
        this.cover = cover;
        this.description = description;
        this.link = link; // link to book detail page
    }
}
 
class DataBooklist {
	constructor(lid, listName, creator, bookCollection) {
        this.booklistID = lid;
		this.listName = listName
		this.creator = creator; 
        this.books = bookCollection; // list of DataBook here, list of Book object in BooklistMain
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
        usertype = json.user.type
        username = json.user.username
        log(usertype)
        log(username)
        welcome(username)
        // BooksCallBack(usertype)
        // BookListsCallBack(usertype)
        const url2 = '/api/booksAndlists'
        fetch(url2).then((res) => { 
            if (res.status === 200) {
               return res.json() 
           } else {
                console.log("not found")
           }                
        }).then((json) => {  //pass json into object locally
            const books = json.books
            for (each of books){
                allBooks.push(new Book(each._id, each.name, each.author, each.coverURL, each.description))
            }
            log(allBooks)
            const lists = json.lists
            for (each of lists){
            BooklistsList.push(new DataBooklist(each._id, each.listName, each.creator, each.books))
            }
            log(BooklistsList)
            // handle links
            for (let i=0; i<allBooks.length; i++){
                allBooks[i].link = blinkHandler(allBooks[i].bookId, usertype)
            }
            // handle links
            for (let i=0; i<BooklistsList.length; i++){
                BooklistsList[i].link = llinkHandler(BooklistsList[i].booklistID, usertype)
            }  
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
    //BooksCallBack(usertype)
    //BookListsCallBack(usertype)
    const url3 = '/api/booksAndlists'
    fetch(url3).then((res) => { 
        if (res.status === 200) {
           return res.json() 
       } else {
            console.log("not found")
       }                
    }).then((json) => {  //pass json into object locally
        const books = json.books
        for (each of books){
            allBooks.push(new Book(each._id, each.name, each.author, each.coverURL, each.description))
        }
        log(allBooks)
        const lists = json.lists
        for (each of lists){
        BooklistsList.push(new DataBooklist(each._id, each.listName, each.creator, each.books))
        }
        log(BooklistsList)
        // handle links
        for (let i=0; i<allBooks.length; i++){
            allBooks[i].link = blinkHandler(allBooks[i].bookId, usertype)
        }
        // handle links
        for (let i=0; i<BooklistsList.length; i++){
            BooklistsList[i].link = llinkHandler(BooklistsList[i].booklistID, usertype)
        }  
        displayMenu(usertype, username, user)
        displaySearchbox()
        RecommendBooksCreate()
        displayTop()
        displayRecommendations()
        })
    .catch((error) => {
    log(error)})
    // displayMenu(usertype)
    // displaySearchbox()
    // RecommendBooksCreate()
    // displayTop()
    // displayRecommendations()
}


// helper for index.html & index.html?userID= 
// function getUserID(){
//     try { 
//         return String(window.location.href.split('?')[1].split('=')[1])
//     } catch { 
//         return 'guest'
//     }
// }

// let user;
// function checkType(userID){
//     const url = '/api/users/'+userID
//     fetch(url).then((res) => { 
//         if (res.status === 200) {
//            return res.json() 
//        } else {
//             assert("cannot find user")
//        }   
//     }).then((json) => {  //pass json into object locally

//     }).catch((error) => {
//         log(error)
//     })
// }


// displayMenu(user)

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
    // else if(usertype == 'user'){
    //     homea.setAttribute('href', '/index.html?userID=0') // here 
    //     booksa.setAttribute('href', '/public/html/BookMainPage.html?userID=0') // here
    //     booklistsa.setAttribute('href', '/public/html/BooklistMainPage.html?userID=0') // here
        
    //     // a.setAttribute("href", "/index.html")
    //     a.setAttribute("href","/logout")
    //     a.innerText = 'QUIT'
    //     li.append(a)
    //     li.className = 'quit'
    //     a2.setAttribute("href", "../user/user.html") // user link?
    //     a2.innerText = username // dynamic?
    //     li2.append(a2)
    //     ul.appendChild(li)
    //     ul.appendChild(li2)
    // }
    // else{
    //     homea.setAttribute('href', '/public/index.html?userID=1') // here
    //     booksa.setAttribute('href', '/public/html/BookMainPage.html?userID=1') // here
    //     booklistsa.setAttribute('href', '/public/html/BooklistMainPage_admin_after.html?userID=1') // here
        
    //     // a.setAttribute("href", "/public/index.html")
    //     a.setAttribute("href","/logout")
    //     a.innerText = 'QUIT'
    //     li.append(a)
    //     li.className = 'quit'
    //     a2.setAttribute("href", "../user/admin.html") // user link?
    //     a2.innerText = username // dynamic?
    //     li2.append(a2)
    //     ul.appendChild(li)
    //     ul.appendChild(li2)
    // }
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

    const top = document.querySelector("#topMenu")
    top.parentElement.insertBefore(div, top.nextElementSibling)
}

/*************** Books & Booklists Data ********************/


// BooksCallBack(user)
// BookListsCallBack(user)
// displaySearchbox()

function blinkHandler(bid, user){
    // handler for book *Detail* page link
    let result;
    if (user == 'guest'){
        result = '../BookDetail/'+bid+'/BookDetail-'+bid+'.html'
    }
    else if (user == 'user'){
        result = '../BookDetail/'+bid+'/'+bid+'_end_after.html'
    }
    else{
        result = '../BookDetail/'+bid+'/'+bid+'_admin_after.html'
    }
    return result; 
}  

function llinkHandler(lid, usertype, userid){
    // handler for book *list* page link
    let result;
    if (usertype == 'guest'){
        result = '/public/html/BooklistDetail.html?booklistID='+lid+'.html' // guest
    }
    else{
        result = '/public/html/BooklistDetail.html?booklistID='+lid+'&userID='+userid+'.html' 
    }
    return result;
}    

// function getBooks(){
//     const url = '/api/books'
//     fetch(url).then((res) => { 
//         if (res.status === 200) {
//            return res.json() 
//        } else {
//             console.log("not found")
//        }                
//     }).then((json) => {  //pass json into object locally
//         const books = json.books
//         for (each of books){
//             allBooks.push(new Book(each._id, each.name, each.author, each.coverURL, each.description))
//         }
//         log(allBooks)
//     }).catch((error) => {
//         log(error)
//     })
// }

// function getLists(){
//     const url = '/api/booklists'
//     fetch(url).then((res) => { 
//         if (res.status === 200) {
//            return res.json() 
//        } else {
//             console.log("not found")
//        }                
//     }).then((json) => {  //pass json into object locally
//         const lists = json.booklists
//         for (each of lists){
//             BooklistsList.push(new DataBooklist(each._id, each.listName, each.creator, each.books))
//         }
//         log(BooklistsList)
//     }).catch((error) => {
//         log(error)
//     }) 
// }


// function BooksCallBack(user){
//     // Get all books in database
//     getBooks()

//     // handle links
//     for (let i=0; i<allBooks.length; i++){
//         allBooks[i].link = blinkHandler(allBooks[i].bookId, user)
//     }
// }

// function BookListsCallBack(){
//     // Get all booklists in database
//     getLists()

//     // handle links
//     for (let i=0; i<BooklistsList.length; i++){
//         BooklistsList[i].link = llinkHandler(BooklistsList[i].booklistID, user)
//     }  
// }

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


// RecommendBooksCreate()
// displayTop()
// displayRecommendations()


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


