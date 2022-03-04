// global variables
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

const bookTable = document.querySelector('#bookTable')

// Load default book data
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


// Display all books in the book main page
function displayAllBooks() {
    const tableResultTBODY = document.querySelector('#tableResultTBODY')
	for(let i = 0; i < BooksNum; i++) {
        const tr = document.createElement('tr')
		const div = document.createElement('div')
        div.className = 'book'
        
        // book name 
        const p1 = document.createElement('p')
        const strong1 = document.createElement('strong')
        const name = document.createTextNode("Book Name: ")
        strong1.appendChild(name)
        p1.appendChild(strong1)

        const span1 = document.createElement('span')
        span1.className="bookTitle"
        const a = document.createElement('a')
        a.className = "linkColor"
        a.href = "../BookDetail/"+BooksList[i].bookID +"/" + BooksList[i].bookID + "_end_after.html"
        const nameContent = document.createTextNode(BooksList[i].name)
        a.appendChild(nameContent)
        span1.appendChild(a)
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
        table.className = "bookinfo"
        const tbody = document.createElement('tbody')
        const tr1 = document.createElement('tr')
	    const ID = document.createElement('th')
        ID.innerText = 'Book ID'
        ID.className = 'th'
        const author = document.createElement('th')
	    author.innerText = 'Author'
        author.className = 'th'
        const year = document.createElement('th')
	    year.innerText = 'Publish year'
        year.className = 'th'
        tr1.appendChild(ID)
        tr1.appendChild(author)
        tr1.appendChild(year)
        tbody.appendChild(tr1)

        const tr2 = document.createElement('tr')
        const IDcontent = document.createElement('td')
        IDcontent.innerText = BooksList[i].bookID
        IDcontent.className = 'td'
        const authorContent = document.createElement('td')
        authorContent.innerText = BooksList[i].author
        authorContent.className = 'td'
        const yearContent = document.createElement('td')
	    yearContent.innerText = BooksList[i].year
        yearContent.className = 'td'
        tr2.appendChild(IDcontent)
        tr2.appendChild(authorContent)
        tr2.appendChild(yearContent)
        tbody.appendChild(tr2)
        table.appendChild(tbody)
        div.appendChild(table)

        tr.appendChild(div)
        tableResultTBODY.appendChild(tr)
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
    

displayAllBooks()
window.onload = filpPage(1,3)