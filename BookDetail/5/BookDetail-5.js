let BooksNum = 5; 
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

BooksList.push(new Book('Added Book', 'Siwei Tang', 2022, 
'https://www.freeiconspng.com/uploads/violet-book-icon--somebooks-icons--softiconsm-11.png', 
'New added book just for show'))
