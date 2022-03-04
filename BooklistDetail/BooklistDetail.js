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


// Display the booklist detail page:
function displayBooklistDetail(booklist, user) {
    // fill list name
    const booklistInfo = document.querySelector('#booklistInfo')
    const title = booklistInfo.children[0]
    const titleContent = document.createElement('span');
    titleContent.id = 'titleContent';
    titleContent.appendChild(document.createTextNode(booklist.listName))
    title.appendChild(titleContent)
    

    // fill list info
    const listId = document.querySelector('.listId')
    const idContent = document.createTextNode(booklist.booklistID)
    idContent.id = 'idContent';
    listId.appendChild(idContent)

    const creator = document.querySelector('.creator')
    const creatorContent = document.createTextNode(booklist.creator)
    creatorContent.id = 'creatorContent'
    creator.appendChild(creatorContent)

    const createTime = document.querySelector('.createTime')
    const timeContent = document.createTextNode(booklist.createTime)
    timeContent.id = 'timeContent'
    createTime.appendChild(timeContent)

    // fill like and collect number
    const likes = document.querySelector('.likes')
    const collects = document.querySelector('.collects')
    const likeContent = document.createTextNode(booklist.likes)
    likeContent.id = 'likeContent'
    likes.appendChild(likeContent)
    const collectContent = document.createTextNode(booklist.collect)
    collectContent.id = 'collectContent'
    collects.appendChild(collectContent)

    // fill description
    const description = document.querySelector('#description')
    const desc = document.createTextNode(booklist.listDescription)
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
        a.href = '../BookDetail/BookDetail-'+ booklist.books[i].bookID + '.html'
        a.appendChild(document.createTextNode(booklist.books[i].name))
        li.appendChild(a)
        bookUnorderedList.appendChild(li)
        bookUnorderedList.appendChild(document.createElement('br'))
    }
}

function selectBooklistToPlay(){
    if (window.location.href.split('?')[1] == null){
        return;
    } 
    const currentListID = parseInt(window.location.href.split('?')[1].split('&')[0].split('=')[1])
    const currentUser = parseInt(window.location.href.split('?')[1].split('&')[1].split('=')[1].split('.')[0])
    const list = BooklistsList.filter((list) => list.booklistID === currentListID)
    if (list.length === 0){ // not ready to connect the database yet, implement on phase 2
        window.location.assign("./UnderConstruction.html")
    } else {
        if (currentUser === 0){ //end user, need more dynamiclly fix on phase 2
            displayBooklistDetail(list[0], 'User')
            selectNarviBarUser('User')
            editBooklist('User')
        } else if (currentUser === 1) {// admin
            displayBooklistDetail(list[0], 'Admin')
            selectNarviBarUser('Admin')
            editBooklist('Admin')
        }
    }
}

function selectNarviBarUser(user){
    const userColumn = document.querySelector('.right')
    const old = userColumn.children[0]
    const newLI = document.createElement('a')
    newLI.id="userLoginInfo" 
        newLI.class="addUserIdToLink"
    if (user === 'User'){//end user, need more dynamiclly fix on phase 2
        newLI.href="../user/user.html"
        newLI.appendChild(document.createTextNode('Hello, User'))
        userColumn.removeChild(old)
        userColumn.appendChild(newLI)
    } else if (user === 'Admin'){ // admin
        newLI.href="../user/admin.html"
        newLI.appendChild(document.createTextNode('Hello, Admin'))
        userColumn.removeChild(old)
        userColumn.appendChild(newLI)
    } //else guest
}

// edit booklist
function editBooklist(user){
    const creator = document.querySelector('.creator').innerHTML.split(': ')[1]
    const booklistIntro = document.querySelector('.title')
    const button = document.createElement('button')
    button.className = 'editButton'
    button.appendChild(document.createTextNode('Edit'))
    if (creator === user || user === 'Admin'){ // creator or admin 
        booklistIntro.after(button)
    } 
}

selectBooklistToPlay()