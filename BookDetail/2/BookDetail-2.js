let BooksNum = 2; 
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

BooksList.push(new Book('The Story of the Lost Child', 'Elena Ferrante', 2014, 
'https://www.irishtimes.com/polopoly_fs/1.2348652.1441974000!/image/image.jpg', 
'The fourth of Elena Ferrante’s celebrated Neapolitan novels, has a lot to deliver on.'))