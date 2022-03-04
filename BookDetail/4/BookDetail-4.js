let BooksNum = 4; 
const BooksList = [] 

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

const bookInfo = document.querySelector('#bookInfo');
const bookDescription = document.querySelector('#bookDescription');

BooksList.push(new Book('Song of Solomon', 'Toni Morrison', 1977, 
'https://images-na.ssl-images-amazon.com/images/I/61EKxawb6xL.jpg', 
'It tells the story of Macon "Milkman" Dead, a young man alienated from himself and estranged from his family, his community, and his historical and cultural roots.'))

window.onload = function displayAllBooks() {
    const bookInfo = document.querySelector('#bookInfo');

    const coverContainer = document.createElement('div');

    coverContainer.className = 'coverContainer';
    const bookCover = document.createElement('img');
    bookCover.className = 'cover';
    bookCover.src = BooksList[0].coverURL;
    coverContainer.appendChild(bookCover);
    bookInfo.appendChild(coverContainer);

    const bookIntro = document.createElement('div');
    bookIntro.className = 'bookIntro';

    const bookAuthor = document.createElement('span');
    bookAuthor.className = "bookAuthor";
    bookAuthor.innerText = 'Author: ' + BooksList[0].author;
    const bookId = document.createElement('span');
    bookId.className = "bookId";
    bookId.innerText = 'bookID: ' + BooksList[0].bookID; 
    const publish = document.createElement('span');
    publish.className = "publish" ;
    publish.innerText = "publish: " + BooksList[0].year;

    bookIntro.appendChild(bookAuthor);
    bookIntro.appendChild(document.createElement('br'));
    // bookIntro.appendChild(document.createElement('br'));
    bookIntro.appendChild(bookId);
    bookIntro.appendChild(document.createElement('br'));
    // bookIntro.appendChild(document.createElement('br'));
    bookIntro.appendChild(publish);
    bookInfo.appendChild(bookIntro);

    const bookDescription = document.querySelector('#bookDescription');

    const des = document.createElement('strong');
    des.className = 'des';
    des.innerText = 'Description: ';
    bookDescription.appendChild(des);

    const descriContent = document.createTextNode(BooksList[0].description)
    bookDescription.appendChild(descriContent)



}