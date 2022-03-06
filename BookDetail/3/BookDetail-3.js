let BooksNum = 3; 
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

BooksList.push(new Book('War and Peace', 'Leo Tolstoy', 1869, 
'https://images-na.ssl-images-amazon.com/images/I/A1aDb5U5myL.jpg', 
'The novel chronicles the French invasion of Russia and the impact of the Napoleonic era on Tsarist society through the stories of five Russian aristocratic families.'))
