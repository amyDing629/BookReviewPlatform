// global variables
let BooksNum = 0; 
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

const bookTable = document.querySelector('#bookTable')

// Load default book data
BooksList.push(new Book('Solaris', 'Stanisław Herman Lem', 1970, 
'https://upload.wikimedia.org/wikipedia/en/d/d1/SolarisNovel.jpg', 
'It follows a crew of scientists on a research station as they attempt to understand an extraterrestrial intelligence, which takes the form of a vast ocean on the titular alien planet.'))

BooksList.push(new Book('Tres Tristes Tigres', 'Guillermo Cabrera Infante', 1971,
'https://upload.wikimedia.org/wikipedia/en/0/0f/Tres_tristes_tigres_%28Guillermo_Cabrera_Infante%29.png',
'It is a highly experimental, Joycean novel, playful and rich in literary allusions.'))

// Display all books in the book main page
window.onload = function displayAllBooks() {
    const bookTable = document.querySelector('#bookTable')
	for(let i = 0; i < BooksNum; i++) {
		const div = document.createElement('div')
        div.className = 'book'
        
        // book name 
        const p1 = document.createElement('p')
        const strong1 = document.createElement('strong')
        const name = document.createTextNode("Book Name: ")
        strong1.appendChild(name)
        p1.appendChild(strong1)

        const span1 = document.createElement('span')
        const nameContent = document.createTextNode(BooksList[i].name)
        span1.appendChild(nameContent)
        p1.appendChild(span1)
        div.appendChild(p1)

        // cover img
        const img = document.createElement('img')
        img.className = "cover"
        img.src = BooksList[i].coverURL
        img.alt = "cover"
        div.appendChild(img)

        // description
        const p2 = document.createElement('p')
        p2.className = "descriptionsBox"
        const strong2 = document.createElement('strong')
        const descri = document.createTextNode("Descriptions: ")
        strong2.appendChild(descri)
        p2.appendChild(strong2)

        const span2 = document.createElement('span')
        const descriContent = document.createTextNode(BooksList[i].description)
        span2.appendChild(descriContent)
        p2.appendChild(span2)
        div.appendChild(p2)

        // info table
        const table = document.createElement('table')
        const tbody = document.createElement('tbody')
        const tr1 = document.createElement('tr')
	    const ID = document.createElement('th')
        ID.innerText = 'Book ID'
        const author = document.createElement('th')
	    author.innerText = 'Author'
        const year = document.createElement('th')
	    year.innerText = 'Publish year'
        tr1.appendChild(ID)
        tr1.appendChild(author)
        tr1.appendChild(year)
        tbody.appendChild(tr1)

        const tr2 = document.createElement('tr')
        const IDcontent = document.createElement('td')
        IDcontent.innerText = BooksList[i].bookID
        const authorContent = document.createElement('td')
        authorContent.innerText = BooksList[i].author
        const yearContent = document.createElement('td')
	    yearContent.innerText = BooksList[i].year
        tr2.appendChild(IDcontent)
        tr2.appendChild(authorContent)
        tr2.appendChild(yearContent)
        tbody.appendChild(tr2)
        table.appendChild(tbody)
        div.appendChild(table)

        bookTable.appendChild(div)
        bookTable.appendChild(document.createElement('br'))
	}
}

