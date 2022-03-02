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
        this.description = description;
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
// temp [end]

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

// Load default booklist data
BooklistsList.push(new Booklist('novels', 'All novels liked.', 'Admin',[BooksList[0],BooksList[1]]))
BooklistsList.push(new Booklist('All spanish', 'All Spanish novels.', 'Admin',[BooksList[1]]))


// Display the booklist detail page:
function displayBooklistDetail(booklist) {
    // fill list name
    const booklistInfo = document.querySelector('#booklistInfo')
    const title = booklistInfo.children[0]
    const titleContent = document.createElement('span');
    titleContent.id = 'titleContent';
    titleContent.appendChild(document.createTextNode(booklist.listName))
    title.appendChild(titleContent)
    

    // fill list info
    const booklistIntro = document.querySelector('#booklistIntro')
    const listId = booklistIntro.children[0]
    const creator = booklistIntro.children[1]
    const createTime = booklistIntro.children[2]
    const idContent = document.createElement('span');
    idContent.id = 'idContent';
    idContent.appendChild(document.createTextNode(booklist.booklistID))
    listId.appendChild(idContent)

    const creatorContent = document.createElement('span');
    creatorContent.id = 'creatorContent';
    creatorContent.appendChild(document.createTextNode(booklist.creator))
    creator.appendChild(creatorContent)

    const timeContent = document.createElement('span');
    timeContent.id = 'timeContent';
    timeContent.appendChild(document.createTextNode(booklist.createTime))
    createTime.appendChild(timeContent)

    // fill like and collect number
    const likesAndCollects = document.querySelector('#likesAndCollects')
    const likes = likesAndCollects.children[0]
    const collects = likesAndCollects.children[1]
    const likeContent = document.createElement('span');
    likeContent.id = 'likeContent';
    likeContent.appendChild(document.createTextNode(booklist.likes))
    likes.appendChild(likeContent)
    const collectContent = document.createElement('span');
    collectContent.id = 'collectContent';
    collectContent.appendChild(document.createTextNode(booklist.collect))
    collects.appendChild(collectContent)

    // fill description
    const description = document.querySelector('#description')
    const desc = document.createTextNode(booklist.description)
    description.appendChild(desc)

    // fill books in the list
    const books = document.querySelector('#books')
    const bookUnorderedList = books.children[2]

	for(let i = 0; i < booklist.books.length; i++) {
        const li = document.createElement('li')
        li.className = 'bookli'

        // <a> content
        const a = document.createElement('a')
        a.className = "book"
        a.href = '../BookDetail/BookDetail-'+ booklist.books[i].name + '.html'
        a.appendChild(document.createTextNode(booklist.books[i].name))
        li.appendChild(a)
        bookUnorderedList.appendChild(li)
        bookUnorderedList.appendChild(document.createElement('br'))
    }
}

function selectBooklistToPlay(){
    const currentListID = parseInt(window.location.href.split('?')[1].split('=')[1])
    const list = BooklistsList.filter((list) => list.booklistID === currentListID)
    displayBooklistDetail(list[0])
}

window.onload = selectBooklistToPlay()