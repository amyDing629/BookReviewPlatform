const log = console.log
// global variables
let BooklistsNum = 0; 
let BooklistsList = [] 

// temp hardcode for all books:
var BooksNum = 0; 
var BooksList = [] 
class Book {
	constructor(name, author, year, coverURL, description) {
		this.name = name;
		this.author = author;
		this.year = year;
		this.coverURL = coverURL;
        this.description = description       
        this.postCollection = [] // collection of post ids associated with the book
		this.bookID = BooksNum;
		BooksNum++;
	}
}
BooksList.push(new Book('Solaris', 'Stanisław Herman Lem', 1970, 
'https://upload.wikimedia.org/wikipedia/en/d/d1/SolarisNovel.jpg', 
'It follows a crew of scientists on a research station as they attempt to understand an extraterrestrial intelligence, which takes the form of a vast ocean on the titular alien planet.'))

BooksList.push(new Book('Tres Tristes Tigres', 'Guillermo Cabrera Infante', 1971,
'https://upload.wikimedia.org/wikipedia/en/0/0f/Tres_tristes_tigres_%28Guillermo_Cabrera_Infante%29.png',
'It is a highly experimental, Joycean novel, playful and rich in literary allusions.'))

BooksList.push(new Book('The Story of the Lost Child', 'Elena Ferrante', 2014,
'https://www.irishtimes.com/polopoly_fs/1.2348652.1441974000!/image/image.jpg',
'The fourth of Elena Ferrante\'s celebrated Neapolitan novels, has a lot to deliver on.'))

BooksList.push(new Book('War and Peace', 'Leo Tolstoy', 1869,
'https://images-na.ssl-images-amazon.com/images/I/A1aDb5U5myL.jpg',
'The novel chronicles the French invasion of Russia and the impact of the Napoleonic era on Tsarist society through the stories of five Russian aristocratic families.'))

BooksList.push(new Book('Song of Solomon', 'Toni Morrison', 1977,
'https://images-na.ssl-images-amazon.com/images/I/61EKxawb6xL.jpg',
'It tells the story of Macon "Milkman" Dead, a young man alienated from himself and estranged from his family, his community, and his historical and cultural roots.'))
// temp [end]

/************** temp for book [END] ******************/


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
searchArea1.addEventListener('click', searchBook)
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
searchArea2.addEventListener('click', searchList)
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


class Booklist {
	constructor(listName, listDescription, creator, bookCollection, id, likes, collect) {
		this.listName = listName;
        if (listDescription.length === 0){
            this.listDescription = '__The creator hasn\'t add description yet...__'
        } else {
            this.listDescription = listDescription
        }
		this.creator = creator // username, temp
        this.books = bookCollection; // list of Book object
		this.booklistID = id;
		BooklistsNum++;
        this.likes = likes;
        this.collect = collect;
        const date = new Date() 
        this.createTime = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
	}
}

const booklistTable = document.querySelector('#booklistTable')

// get all booklist
function getBooklists(){
    const url = '/api/booklists'
    fetch(url).then((res) => { 
        if (res.status === 200) {
           return res.json() 
       } else {
            res.status(500).send("Internal Server Error") // not sure
       }                
    }).then((json) => {  //pass json into object locally
        const booklists = json.booklists
        for (each of booklists){
            BooklistsList.push(new Booklist(each.listName, each.listDescription, each.creator, each.books, each._id, each.likes, each.collect))
        }
        displaySearchbox() // for search bar function 
        displayAllBooklists(BooklistsList, getUserID())
        addFormForDelete()
    }).catch((error) => {
        log(error)
    })
}
// Display all availble booklists:
function displayAllBooklists(BooklistsList, userID) {
    const url = '/api/users/'+userID
    fetch(url).then((res) => { 
        if (res.status === 200) {
           return res.json() 
       } else {
            log('faild to get user info. as guest.')
       }                
    }).then((json) => {  //pass json into object locally
        //log(JSON.stringify(json).split("\"type\":\"")[1].split("\"")[0])
        //return JSON.stringify(json).split("\"type\":\"")[1].split("\"")[0]
        return JSON.stringify(json)
    }).then((userInfo)=>{
        const userType = userInfo.split("\"type\":\"")[1].split("\"")[0]
        const username = userInfo.split("\"username\":\"")[1].split("\"")[0]
        //log(userType)
        if (userType === 'Admin' | userType === 'User'){
            booklistTable.addEventListener('click', deleteBooklist)
            const endUserActionsWrap = document.querySelector('#endUserActionsWrap')
            endUserActionsWrap.addEventListener('click', addNewBooklist)
            // change navi bar username
            document.querySelector('#userLoginInfo').innerText = username

            // set navi bar link
            document.querySelector('#home').href = "../HomeAndLogin/index.html?userID="+userID
            document.querySelector('#bookmain').href = "../BookMainPage/BookMainPage.html?userID="+userID
            document.querySelector('#booklistmain').href = "./BooklistMainPage.html?userID="+userID
            document.querySelector('#userLoginInfo').href = "../user/user.html?userID="+userID // need check
        } else {
            try{
                document.querySelector('#endUserActionsWrap').style.visibility = 'hidden'
                document.querySelector('.quit').parentElement.removeChild(document.querySelector('.quit'))
            } catch {
                log('changed the sorting way!')
            }
        }
        const tableResultTBODY = document.querySelector('#tableResultTBODY')
        for(let i = 0; i < BooklistsNum; i++) {
            const tr = addBooklistCard(BooklistsList[i],userID, userType)
            tableResultTBODY.appendChild(tr)
        }
        flipPage(1,3)
    }).catch((error) => {
        log(error)
    })
    
}


function alertLike(e){
    e.preventDefault();
    if (e.target.className == 'collectIcon') {
        if (confirm("Please login to complete the collect action.") == true) {
            window.location.href = "../HomeAndLogin/login.html"
        } 
    }
    
}

function alertCollect(e){
    e.preventDefault();
    if (e.target.className == 'likeIcon') {
        if (confirm("Please login to complete the like action.") == true) {
            window.location.href = "../HomeAndLogin/login.html"
        } 
    }
    
}

function flipPage(pageNo, pageLimit) {
    const allBooks = document.getElementById("tableResultTBODY")
    const totalSize = allBooks.rows.length
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
    let previousStr = "Previous"
    let nextStr = "Next"
    let setupStr = "<li class=\"page-item\"><a class=\"page-link\" href=\"#\" onClick=\"flipPage("
    let disabled = "<li class=\"page-item disabled\"> <span class=\"page-link\">" 
    // single page is enough
    if (totalPage <= 1){
        strHolder = disabled + previousStr + "</span></li>"+
        setupStr + totalPage + "," + pageLimit + ")\">" + "1" + "</a></li>" + disabled + nextStr + "</span></li>"
    } else { //multipages
        if (curr > 1) {
            strHolder += setupStr + (curr - 1) + "," + pageLimit + ")\">"+previousStr+"</a></li>"
            for (let j = 1; j <= totalPage; j++) {
                strHolder += setupStr+ j + "," + pageLimit + ")\">" + j + "</a></li>"
            }
        } else {
            strHolder += disabled + previousStr + "</span></li>"
            for (let j = 1; j <= totalPage; j++) {
                strHolder += setupStr+ j + "," + pageLimit + ")\">" + j +"</a></li>"
            }
        }
        if (curr < totalPage) {
            strHolder += setupStr + (curr + 1) + "," + pageLimit + ")\">"+nextStr+"</a></li>"
            
        } else { strHolder += disabled + nextStr + "</span></li>"}
    }


    //separate different display style for different tr element
    for (let i = 1; i < (totalSize + 1); i++) {
        const each = allBooks.rows[i - 1];
        if (i >= startRow && i <= endRow) {
            each.className="normalTR"
        } else {
            each.className="endTR"
        }
    }
    document.querySelector("#pageFliperUL").innerHTML = strHolder;

    // set up current page 
    const allPageButton = document.querySelectorAll(".page-item")
    for (each of allPageButton){
        if (each.children[0].innerText == pageNo){
            each.className = "page-item active"
            each.ariaCurrent = "page"
        }
    }
}

// select the list sorting way
const sort_default = document.querySelector('#sort_default')
const sort_a_z = document.querySelector('#sort_a_z')
sort_default.addEventListener("click",sortDefault)
sort_a_z.addEventListener("click", sortByAtoZ)

function sortDefault() {
    document.querySelector('#sort_a_z').className = "btn btn-secondary"
    document.querySelector('#sort_default').className = "btn btn-secondary active"
    const nowBooks = document.querySelector('#tableResultTBODY')
    const allBooklists = document.querySelectorAll('.booklist')
    for (each of allBooklists){
        nowBooks.removeChild(each.parentElement)
    }
    displayAllBooklists(BooklistsList, getUserID())
  }

function sortByAtoZ(){
    document.querySelector('#sort_a_z').className = "btn btn-secondary active"
    document.querySelector('#sort_default').className = "btn btn-secondary"
    let nameArr = BooklistsList.map((list)=> list.listName)
    let sortedBooklistsList = []
    const num = BooklistsList.length
    nameArr = nameArr.sort((x,y)=>x.localeCompare(y))
    for (let i=0; i<num; i++) {
        for (let j=0; j<num; j++){
            if (nameArr[i] == BooklistsList[j].listName) {
                sortedBooklistsList.push(BooklistsList[j])
            }
        }
    }
    log(sortedBooklistsList)
    const nowBooks = document.querySelector('#tableResultTBODY')
    const allBooklists = document.querySelectorAll('.booklist')
    for (each of allBooklists){
        nowBooks.removeChild(each.parentElement)
    }
    displayAllBooklists(sortedBooklistsList, getUserID())
    addFormForDelete()
}

function renewPage() {
    BooklistsList = []
    getBooklists()
    if (document.querySelector("#sort_a_z").className === 'btn btn-secondary active'){
        sortByAtoZ()
    } else { // sort by default
        sortDefault()
    }
}

// helper: get user id
function getUserID(){
    try{
        return (window.location.href.split('?')[1].split('userID=')[1])
    } catch{
        return 'guest'
    }
}

/* // helper: check the user type, return 'User' or 'Admin'?
function checkUserType(userID){
    // need more dynamic way to search user database, check type
    // phase 2 task

    const url = '/api/users/'+userID
    fetch(url).then((res) => { 
        if (res.status === 200) {
           return res.json() 
       } else {
            log('faild to get user info. as guest.')
       }                
    }).then((json) => {  //pass json into object locally
        log(JSON.stringify(json).split("\"type\":\"")[1].split("\"")[0])
        return JSON.stringify(json).split("\"type\":\"")[1].split("\"")[0]
    }).catch((error) => {
        log(error)
    })
} */

//helper: delete icon for each booklist card
function addDeleteButton(){
    const div1 = document.createElement('div')
    div1.className = 'delete'
    const button3 = document.createElement('button')
    button3.className = "deleteButton, btn btn-danger" 
    button3.appendChild(document.createTextNode("Delete this list"))
    div1.appendChild(button3)
    return div1
}

//helper: get user name by user id
function getUserName(userID){
    return document.querySelector('#userLoginInfo').innerText 
}

// helper for addBooklistCard: li element for booklist info
function addBooklistInfo(booklistID, listName, userID, userType){
    const li1 = document.createElement('li')
    li1.className = "listname"
    const strong1 = document.createElement('strong')
    const name = document.createTextNode("Booklist Name: ")
    strong1.appendChild(name)
    const span1 = document.createElement('span')
    const a1 = document.createElement('a')
    a1.className = "linkColor"
    if (userType === 'Admin' | userType === 'User'){
        a1.href = "./public/html/BooklistDetail.html?booklistID=" + booklistID + "&userID="+ userID+".html"
    } else {
        a1.href = "./public/html/BooklistDetail.html?booklistID=" + booklistID + ".html"
    }
    a1.onclick = function open(e){e.preventDefault(); window.location.href = a1.href}
    const nameContent = document.createTextNode(listName)
    a1.appendChild(nameContent)
    span1.appendChild(a1)
    li1.appendChild(strong1)
    li1.appendChild(span1)
    return li1
}

// helper for addBooklistCard: li element for creator info (className=listCreator)
function addCreator(creatorName, selfName, userType){
    const li2 = document.createElement('li')
    li2.className = "listCreator"
    const strong2 = document.createElement('strong')
    const creator = document.createTextNode("Created by: ")
    strong2.appendChild(creator)
    const span2 = document.createElement('span')
    const a2 = document.createElement('a')
    a2.className = "linkColor"
    if (userType === 'Admin'){
        if (creatorName === selfName){ 
            a2.href = "../user/admin.html" // need modify, go to self-user-main-page
        } else { // visit other user
            a2.href = "../user/user.html?visit=0" // need more dynamically fix on phase 2
        }
    } else if (userType === 'User'){
        a2.href = "../user/user.html"
        if (creatorName === selfName){// need more dynamically fix on phase 2
            a2.href = "../user/user.html"
        } else {
            a2.href = "../user/user.html?visit=1" // need fix
        }   
    } else { // guest
        a2.href = "../HomeAndLogin/login.html" //// need fix later 
    }
    a2.onclick = function open(e){e.preventDefault(); window.location.href = a2.href}
    const creatorContent = document.createTextNode(creatorName)
    a2.appendChild(creatorContent)
    span2.appendChild(a2)
    li2.appendChild(strong2)
    li2.appendChild(span2)
    return li2
}

// helper for addBooklistCard: table element for bookshelf
function addBookShelf(books, userID, userType){
    const table = document.createElement('table')
    table.className = "bookshelf"
    const tbody = document.createElement('tbody')
    tbody.className = 'bookshelf tbody'
    const tr1 = document.createElement('tr')
    const tr2 = document.createElement('tr')

    let bookNum = books.length
    if (books.length > 3){
        bookNum = 3
    }

    for (let j = 0; j < bookNum; j++){
        const newImg = document.createElement('th')
        const img = document.createElement('img')
        img.className = "bookimg"
        img.src = books[j].coverURL
        newImg.appendChild(img)
        tr1.appendChild(newImg)
        const newBookLink = document.createElement('th')
        const bookLink = document.createElement('a')
        bookLink.className = "book"
        if (userType === 'Admin' | userType === 'User'){
            bookLink.href = "./public/html/BookDetail.html?bookID=" + books[j]._id +"&userID="+ getUserID() // need check phase 2
        } else {
            bookLink.href = "./public/html/BookDetail.html?bookID=" + books[j]._id
        }
        bookLink.onclick = function open(e){e.preventDefault(); window.location.href = bookLink.href}
        bookLink.appendChild(document.createTextNode(books[j].name))
        newBookLink.appendChild(bookLink)
        tr2.appendChild(newBookLink)
    }
    if (books.length > 3){
        const more = document.createElement('th')
        more.appendChild(document.createTextNode('......'))
        tr2.appendChild(more)
    }
    tbody.appendChild(tr1)
    tbody.appendChild(tr2)
    table.appendChild(tbody)
    return table
}

// helper for addBooklistCard: like/collect icon
function addIconBar(userType, likes, collect){
    // icon wrap
    const ul2 = document.createElement('ul')
    ul2.className = "iconWrap"

    // li1: like
    const liLike = document.createElement('li')
    liLike.className = "infoElement"
    const button1 = document.createElement('button')
    button1.className = "likeButton, btn btn-light"
    const iconImgLike = document.createElement('img')
    iconImgLike.className = "likeIcon"
    iconImgLike.src = "../img/static/like_icon.png"

    if (userType === 'Admin' | userType === 'User'){
        if (likes > 0){ // need fix on phase 2 // already liked status
            iconImgLike.src = "../img/static/heart_icon.png"
            button1.className = "likeButton, btn btn-outline-success"
        } 
    }
    button1.appendChild(iconImgLike)
    liLike.appendChild(button1)

    const spanLike = document.createElement('span')
    spanLike.className = "likeNum"
    let likeNum = document.createTextNode("Likes: "+likes)
    if (userType === 'Admin' | userType === 'User'){
        if (likes > 0){ // need fix on phase 2 // already liked status
            likeNum = document.createTextNode("Liked: "+likes)
        }
    } else {
        likeNum = document.createTextNode("Liked: "+likes)
    }
    spanLike.appendChild(likeNum)
    liLike.appendChild(spanLike)

    // li2: collect
    const liCollect = document.createElement('li')
    liCollect.className = "infoElement"
    const button2 = document.createElement('button')
    button2.className = "collectButton, btn btn-light" 
    const iconImgCollect = document.createElement('img')
    iconImgCollect.className = "collectIcon"
    iconImgCollect.src = "../img/static/click-&-collect.png"
    if (userType === 'Admin' | userType === 'User'){
        if (collect > 0){ // need fix on phase 2 // already collect status
            button2.className = "collectButton, btn btn-success"
        } 
    }
    button2.appendChild(iconImgCollect)
    liCollect.appendChild(button2)

    const spanCollect = document.createElement('span')
    spanCollect.className = "collectNum"
    let collectNum = document.createTextNode("Collected: " + collect)
    if (userType === 'Admin' | userType === 'User'){
        collectNum = document.createTextNode("Collects: " + collect)
        if (collect > 0){ // need fix on phase 2 // already collect status
            collectNum = document.createTextNode("Collected: " + collect)
        }
    }
    spanCollect.appendChild(collectNum)
    liCollect.appendChild(spanCollect)
    
    ul2.appendChild(liLike)
    ul2.appendChild(liCollect)

    // event listener
    if (userType === 'Admin' | userType === 'User'){
        booklistTable.addEventListener('click', increaseLikeOrCollect)
    } else { // guest
        booklistTable.addEventListener('click', alertLike);
        booklistTable.addEventListener('click', alertCollect)
    }
    return ul2
}

// helper: build invidual booklist card
function addBooklistCard(booklist, userID, userType){
    const tr = document.createElement('tr')
    const div = document.createElement('div')
    div.className = 'booklist'

    // <p>  list id
    const id = document.createElement('p')
    id.className = "listID"
    id.appendChild(document.createTextNode("List ID: "))
    const IDcontent = document.createElement('span')
    IDcontent.appendChild(document.createTextNode(booklist.booklistID))
    id.appendChild(IDcontent)

    const userInfo = getUserName(userID)
    if (userInfo === booklist.creator){ // both users, creator is self
        id.appendChild(addDeleteButton())
    } else if (userType === 'Admin'){// admin only: delete booklist
        id.appendChild(addDeleteButton())
    } 
    div.appendChild(id)

    // infoWrap
    const ul1 = document.createElement('ul')
    ul1.className = "infoWrap"

    // li1: booklist name
    const li1 = addBooklistInfo(booklist.booklistID,booklist.listName,userID,userType)
    ul1.appendChild(li1)

    // li2: list creator
    const selfName = getUserName(userID)
    const li2 = addCreator(booklist.creator, selfName, userType)
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
    const table = addBookShelf(booklist.books, userID, userType)
    div.appendChild(table)

    // icon bar for like and collect
    const ul2 = addIconBar(userType, booklist.likes, booklist.collect)
    div.appendChild(ul2)

    tr.appendChild(div)
    return tr
}

// increase like or collect 
function increaseLikeOrCollect(e){
    e.preventDefault();
    const iconName = e.target.className
    if (iconName == 'collectIcon' || iconName == 'likeIcon') {
        const index = (e.target.parentElement.parentElement.parentElement.parentElement.children[0].children[0].innerText)
        const selectedBookList = BooklistsList.filter((booklist) => booklist.booklistID == index)
        const allBooklists = document.querySelectorAll('.booklist')
        for (let i = 0; i < allBooklists.length; i++){
            const pageIndex = (allBooklists[i].children[0].children[0].innerHTML)
            const type = e.target.parentElement.nextSibling.innerText
            if (pageIndex === index && iconName == 'collectIcon' && type.includes("Collects")){ // haven't collected
                selectedBookList[0].collect++
                // put a collect add
                modifyLikeOrCollect(index, "collect", "add")
                allBooklists[i].children[4].children[1].children[1].innerText = "Collected: " + selectedBookList[0].collect
                allBooklists[i].children[4].children[1].children[1].previousSibling.className = 'collectedButton, btn btn-success' // for button color change
            } else if (pageIndex === index && iconName == 'likeIcon' && type.includes("Likes")){ // haven't liked
                selectedBookList[0].likes++
                // put a like add
                modifyLikeOrCollect(index, "likes", "add")
                allBooklists[i].children[4].children[0].children[1].innerText = "Liked: " + selectedBookList[0].likes
                allBooklists[i].children[4].children[0].children[1].previousSibling.className = 'likedButton, btn btn-outline-success' // for button color change
                allBooklists[i].children[4].children[0].children[1].previousSibling.children[0].src = "../img/static/heart_icon.png"
            } else if (pageIndex === index && iconName == 'collectIcon' && type.includes('Collected')){ // collected already
                selectedBookList[0].collect--
                // put a collect reduce
                modifyLikeOrCollect(index, "collect", "reduce")
                allBooklists[i].children[4].children[1].children[1].innerText = "Collects: " + selectedBookList[0].collect
                allBooklists[i].children[4].children[1].children[1].previousSibling.className = 'collectedButton, btn btn-light' // for button color change
            } else if (pageIndex === index && iconName == 'likeIcon' && type.includes('Liked')){ // liked already
                selectedBookList[0].likes--
                // put a like reduce
                modifyLikeOrCollect(index, "likes", "reduce")
                allBooklists[i].children[4].children[0].children[1].innerText = "Likes: " + selectedBookList[0].likes
                allBooklists[i].children[4].children[0].children[1].previousSibling.className = 'likedButton, btn btn-light' // for button color change
                allBooklists[i].children[4].children[0].children[1].previousSibling.children[0].src = "../img/static/like_icon.png"
            }
        }
    }
    
}

// patch modify
function modifyLikeOrCollect(id, target, operation){
    const book = BooklistsList.filter((list)=> list.booklistID == id )
    const url = '/api/booklist/'+id

    let data = {
        target: target,
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

// admin & creator only: delete list
function deleteBooklist(e){
    e.preventDefault();
    if (e.target.className == 'deleteButton, btn btn-danger'){
        const ID = e.target.parentElement.parentElement.children[0].innerText
        const form = document.getElementById("deleteForm")
        form.children[0].children[0].innerText="Confirm to delete this booklist?"
        form.name = ID
        form.style.display="block"
    }
}
// admin only action: remove book---form for confirming delete
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
            const list = BooklistsList.filter((list)=> list.booklistID == ID )
            const url = '/api/booklist/'+ID
        
            let data = {
                _id: list[0].booklistID
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

            for (let i=0; i<BooklistsNum; i++){
                if (BooklistsList[i].booklistID == ID){
                    BooklistsList.splice(i, 1)
                    BooklistsNum--
                }
            }
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

// admin & end user action: create new booklist
function openForm() {
    document.getElementById("myForm").style.display = "block";
}
  
function closeForm() {
    document.getElementById("myForm").style.display = "none"
    document.querySelector('#bookInputHelp').innerText = "Please enter book ID list and using ; to seperate"
}

function changeBooks(){
    let result = []
    const url = '/api/books'
    fetch(url).then((res) => { 
        if (res.status === 200) {
           return res.json() 
       } else {
            res.status(500).send("Internal Server Error") // not sure
       }                
    }).then((json) => {  //pass json into object locally
        const books = json.books

        for (each of books){
            result.push({
                "bookID": each._id,
                "name": each.name
            })
        }
        return result
    }).then((result)=>{
    const ul = document.querySelector('#randomBooks')
    const random3 = []
    while (random3.length<3){
        const idx = Math.floor(Math.random() * result.length)
        if (!random3.includes(idx)){
            random3.push(idx)
        }
    }
    for (let i=0;i<3;i++){
        ul.children[i].children[0].innerHTML =  result[random3[i]].name
        const span = document.createElement('span')
        span.className = 'bookIDhide'
        span.innerText = result[random3[i]].bookID
        ul.children[i].appendChild(span)
    }
    }).catch((error) => {
        log(error)
    })
}

const ul = document.querySelector('#randomBooks')
ul.addEventListener('click', loadBook)
function loadBook(e){
    e.preventDefault;
    if(e.target.className == 'addListID btn btn-outline-info'){
        document.querySelector("#booklists").value += (e.target.nextSibling.innerText+';')
        e.target.className += " active"
    } else if (e.target.className == 'addListID btn btn-outline-info active'){
        let curr = document.querySelector("#booklists").value
        curr = curr.replace((e.target.nextSibling.innerText+';'),'')
        document.querySelector("#booklists").value = curr
        e.target.className = "addListID btn btn-outline-info"
    }
    
}

function addNewBooklist(e){
    e.preventDefault();
    if (e.target.className == 'addSubmit, btn'){
        const listName = document.getElementById('booklistNameInput').value
        if (listName.length === 0){
            const bookInputHelp = document.querySelector('#bookInputHelp')
            bookInputHelp.innerText = ("No list name, your booklist name cannot be empty.")
            //return;
        }
        const description = document.getElementById('descriptionInput').value
        let result = document.getElementById('booklists').value
        let ids = []
        const url = '/api/books'
        fetch(url).then((res) => { 
            if (res.status === 200) {
            return res.json() 
        } else {
                res.status(500).send("Internal Server Error") // not sure
        }                
        }).then((json) => {
            const all = json.books

            for (each of all){
                ids.push({
                    "bookID": each._id
                })
            }
            return ids
        }).then((ids)=>{
            const books = result.split(";").pop()
            log(books)
            // check id validation
            let validInputs = []
            for (item of books) {
                const valid = ids.filter((each) => item == each.bookID)
                if (valid.length === 1) {
                    validInputs.push(valid[0])
                }
            }
            if (validInputs.length === books.length){
                // avoid duplicates
                const uniqueInput = Array.from(new Set(validInputs))
                const bookinput = uniqueInput.map((each)=>each.bookID)
                addBooklist(listName, description, bookinput)
                document.getElementById('booklistNameInput').value =""
                document.getElementById('descriptionInput').value = ""
                closeForm()
                location.reload() 
            } else {
                document.querySelector('#bookInputHelp').innerText = ("Invalid input! Please re-check all your book IDs.")
                //return
            }
        }).catch((error)=>{
            log(error)
        })
    }
}

function addBooklist(bookname, description, books){
    const url = '/api/booklist'
    let data = {
        listName: bookname,
        listDescription: description,
        creator: getUserName(getUserID()),
        books: books
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
        log(res)
    }).catch((error) => {
        log(error)
    })
}
// load page
getBooklists()