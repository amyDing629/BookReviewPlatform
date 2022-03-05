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

const bookTable = document.querySelector('#bookTable')

// Display all books in the book main page
function displayAllBooks(BooksList) {
    const tableResultTBODY = document.querySelector('#tableResultTBODY')
	for(let i = 0; i < BooksNum; i++) {
        const tr = document.createElement('tr')
		const div = document.createElement('div')
        div.className = 'book'
        
        // admin only: admin delete button
        const div1 = document.createElement('div')
        div1.className = 'delete'
        const button = document.createElement('button')
        button.className = "deleteButton, btn btn-danger" 
        button.appendChild(document.createTextNode("Delete the book"))
        div1.appendChild(button)
        div.appendChild(div1)

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
        a.href = "../BookDetail/" + BooksList[i].bookID +"/"+BooksList[i].bookID+ "_admin_after.html"
        a.onclick = function open(e){e.preventDefault(); window.location.href = (a.href)}
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

        tr.appendChild(div)
        tableResultTBODY.appendChild(tr)
	}
}

// page flip
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
    } else { //multipages
        if (curr > 1) {
            strHolder += setupStr + (curr - 1) + "," + pageLimit + ")\">"+previousStr+"</a>"
            for (let j = 1; j <= totalPage; j++) {
                strHolder += setupStr+ j + "," + pageLimit + ")\">" + j + spaceStr + "</a>"
            }
        } else {
            strHolder += previousStr;
            for (let j = 1; j <= totalPage; j++) {
                strHolder += setupStr+ j + "," + pageLimit + ")\">" + j + spaceStr +"</a>"
            }
        }
        if (curr < totalPage) {
            strHolder += setupStr + (curr + 1) + "," + pageLimit + ")\">"+nextStr+"</a>"
            
        } else { strHolder += nextStr }
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

// update display
function renewBooklist(){
    const nowBooks = document.querySelector('#tableResultTBODY')
    const allBook = document.querySelectorAll('.book')
    for (each of allBook){
        nowBooks.removeChild(each.parentElement)
    }
    displayAllBooks(BooksList)
    filpPage(1,3)
}

// admin only action: add new book to booklist
bookTable.addEventListener('click', addNewBook)
function addNewBook(e){
    e.preventDefault();
    if (e.target.className == 'addSubmit, btn btn-primary'){
        const bookname = document.getElementById('bookNameInput').value
        const author = document.getElementById('bookAuthorInput').value
        const year = parseInt(document.getElementById('publishYearInput').value)
        const description = document.getElementById('descriptionInput').value

        //check validation
        const all = Array(bookname, author, year, description)
        const required = all.filter((each) => each.length === 0)
        if (required.length > 0 ){
            alert('Missing required input, please re-enter information.')
        } else {
            // cover is not required
            const cover = 'https://www.freeiconspng.com/uploads/violet-book-icon--somebooks-icons--softiconsm-11.png'
            if (document.getElementById('coverInput').value.length > 0){
                cover = document.getElementById('coverInput').value.length
            }
            BooksList.push(new Book(bookname,author,year,cover,description))
            renewBooklist()
        }
    }
        
}

// admin only action: remove book
bookTable.addEventListener('click', deleteBook)
function deleteBook(e){
    e.preventDefault();
    if (e.target.className == 'deleteButton, btn btn-danger'){
        const bookElement = e.target.parentElement.parentElement.parentElement
        const ID = parseInt(bookElement.children[0].children[4].children[0].children[1].children[0].innerText)
        for (let i=0; i<BooksNum; i++){
            if (BooksList[i].bookID == ID){
                BooksList.splice(i, 1)
                BooksNum--
            }
        }
        renewBooklist()
    }
}



displayAllBooks(BooksList)
window.onload = filpPage(1,3)