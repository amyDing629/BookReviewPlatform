// global variables
var BooklistsNum = 0; 
var BooklistsList = [] 

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

class Booklist {
	constructor(listName, listDescription, creator, bookCollection) {
		this.listName = listName;
        if (listDescription.length === 0){
            this.listDescription = '__The creator hasn\'t add description yet...__'
        } else {
            this.listDescription = listDescription
        }
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

// Load default booklist data
BooklistsList.push(new Booklist('novels', 'All novels liked.', 'Admin',[BooksList[0],BooksList[1]]))
BooklistsList.push(new Booklist('All spanish', 'All Spanish novels.', 'Admin',[BooksList[1]]))
BooklistsList.push(new Booklist('Before 20th', '', 'User',[BooksList[1], BooksList[3], BooksList[4],BooksList[0]]))

const booklistTable = document.querySelector('#booklistTable')
booklistTable.addEventListener('click', alertLike);
booklistTable.addEventListener('click', alertCollect);

// Display all availble booklists:
function displayAllBooklists(BooklistsList) {
    const tableResultTBODY = document.querySelector('#tableResultTBODY')
	for(let i = 0; i < BooklistsNum; i++) {
        const tr = document.createElement('tr')
        const div = document.createElement('div')
        div.className = 'booklist'

        // <p>  list id
        const id = document.createElement('p')
        id.className = "listID"
        id.appendChild(document.createTextNode("List ID: "))
        const IDcontent = document.createElement('span')
        IDcontent.appendChild(document.createTextNode(BooklistsList[i].booklistID))
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
        a1.href = "../BooklistDetail/BooklistDetail.html?booklistID=" + BooklistsList[i].booklistID + ".html"
        a1.onclick = function open(e){e.preventDefault(); window.location.href = a1.href}
        const nameContent = document.createTextNode(BooklistsList[i].listName)
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
        a2.href = "../user/user.html" //// need fix later 
        if (BooklistsList[i].creator === 'User'){
            a2.href+="?visit=1"
        } 
        a2.onclick = function open(e){e.preventDefault(); window.location.href = a2.href}
        const creatorContent = document.createTextNode(BooklistsList[i].creator)
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
        const timeContent = document.createTextNode(BooklistsList[i].createTime)
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
        const descriContent = document.createTextNode(BooklistsList[i].listDescription)
        span4.appendChild(descriContent)
        p.appendChild(span4)
        div.appendChild(p)

        // bookshelf
        const table = document.createElement('table')
        table.className = "bookshelf"
        const tbody = document.createElement('tbody')
        const tr1 = document.createElement('tr')
        const tr2 = document.createElement('tr')

        if (BooklistsList[i].books.length <= 3){
            bookNum = BooklistsList[i].books.length
        } else {
            bookNum = 3
        }

        for (let j = 0; j < bookNum; j++){
            const newImg = document.createElement('th')
            const img = document.createElement('img')
            img.className = "bookimg"
            img.src = BooklistsList[i].books[j].coverURL
            newImg.appendChild(img)
            tr1.appendChild(newImg)
            const newBookLink = document.createElement('th')
            const bookLink = document.createElement('a')
            bookLink.className = "book"
            bookLink.href = "../BookDetail/"+BooklistsList[i].books[j].bookID+"/BookDetail-" + BooklistsList[i].books[j].bookID + ".html"
            bookLink.onclick = function open(e){e.preventDefault(); window.location.href = bookLink.href}
            bookLink.appendChild(document.createTextNode(BooklistsList[i].books[j].name))
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
        button1.className = "likeButton, btn btn-light"
        const iconImgLike = document.createElement('img')
        iconImgLike.className = "likeIcon"
        iconImgLike.src = "../static/like_icon.png"
        button1.appendChild(iconImgLike)
        liLike.appendChild(button1)

        const spanLike = document.createElement('span')
        spanLike.className = "likeNum"
        const likeNum = document.createTextNode("Liked: "+BooklistsList[i].likes)
        spanLike.appendChild(likeNum)
        liLike.appendChild(spanLike)

        // li2: collect
        const liCollect = document.createElement('li')
        liCollect.className = "infoElement"
        const button2 = document.createElement('button')
        button2.className = "collectButton, btn btn-light" 
        const iconImgCollect = document.createElement('img')
        iconImgCollect.className = "collectIcon"
        iconImgCollect.src = "../static/click-&-collect.png"
        button2.appendChild(iconImgCollect)
        liCollect.appendChild(button2)

        const spanCollect = document.createElement('span')
        spanCollect.className = "collectNum"
        const collectNum = document.createTextNode("Collected: " + BooklistsList[i].collect)
        spanCollect.appendChild(collectNum)
        liCollect.appendChild(spanCollect)
        
        ul2.appendChild(liLike)
        ul2.appendChild(liCollect)
        div.appendChild(ul2)

        tr.appendChild(div)
        tableResultTBODY.appendChild(tr)
    }
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

function filpPage(pageNo, pageLimit) {
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
    let previousStr = "Previous&nbsp;&nbsp;&nbsp;&nbsp;"
    let spaceStr = "&nbsp;&nbsp;&nbsp;&nbsp;"
    let nextStr = "Next&nbsp;&nbsp;&nbsp;&nbsp;"
    let setupStr = "<a class=\"pagelink\" href=\"#\" onClick=\"filpPage("
    // single page is enough
    if (totalPage <= 1){
        strHolder = previousStr + setupStr + totalPage + "," + pageLimit + ")\">" + "1" + spaceStr + "</a>" + nextStr
    } else {
        if (curr > 1) {
            strHolder += setupStr + (curr-1) + "," + pageLimit + ")\">"+previousStr+"</a>"
            for (let j = 1; j <= totalPage; j++) {
                strHolder += setupStr + j + "," + pageLimit + ")\">" + j + spaceStr +"</a>"
            }
        } else { // multipages
            strHolder += previousStr
            for (let m = 1; m <= totalPage; m++) {
                strHolder += setupStr + m + "," + pageLimit + ")\">" + m + spaceStr + "</a>"
            }
            strHolder += setupStr + totalPage + "," + pageLimit + ")\">" + nextStr +"</a>"
        }
        if (curr < totalPage) {
            strHolder += setupStr + (curr+1) + "," + pageLimit + ")\"" + nextStr+ "</a>"
        } else {
            strHolder += nextStr
        }
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
    document.getElementById("pageFliper").innerHTML = strHolder;
}

// select the list sorting way
const sort_default = document.querySelector('#sort_default')
const sort_a_z = document.querySelector('#sort_a_z')
sort_default.addEventListener("click",sortDefault)
sort_a_z.addEventListener("click", sortByAtoZ)


function sortDefault() {
    const nowBooks = document.querySelector('#tableResultTBODY')
    const allBooklists = document.querySelectorAll('.booklist')
    for (each of allBooklists){
        nowBooks.removeChild(each.parentElement)
    }
    displayAllBooklists(BooklistsList)
    filpPage(1,3)
  }

function sortByAtoZ(){
    let nameArr = []
    let sortedBooklistsList = []
    for (let i=0; i<BooklistsNum; i++){
        nameArr.push(BooklistsList[i].listName)
    }
    nameArr = nameArr.sort()
    for (let i=0; i<BooklistsNum; i++) {
        for (let j=0; j<BooklistsNum; j++){
            if (nameArr[i] == BooklistsList[j].listName) {
                sortedBooklistsList.push(BooklistsList[j])
            }
        }
    }
    const nowBooks = document.querySelector('#tableResultTBODY')
    const allBooklists = document.querySelectorAll('.booklist')
    for (each of allBooklists){
        nowBooks.removeChild(each.parentElement)
    }
    displayAllBooklists(sortedBooklistsList)
    filpPage(1,3)
}


// load main list
displayAllBooklists(BooklistsList)
filpPage(1,3)