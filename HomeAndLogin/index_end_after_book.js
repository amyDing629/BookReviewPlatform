/****************************** END USER index-books js ******************************/

/*************** Books & Booklists Data ********************/

const allBooks = [];

class Book {
	constructor(bid, title, author, cover, description, link) {
        this.bookId = bid; // get it from book detail page
		this.title = title;
		this.author = author;
        this.cover = cover;
        this.description = description;
        this.link = link; // link to book detail page
    }
}

let BooklistsNum = 0; 
let BooklistsList = [] 

class DataBooklist {
	constructor(listName, creator, bookCollection) {
		this.listName = listName
		this.creator = creator; 
        this.books = bookCollection; // list of DataBook here, list of Book object in BooklistMain
		this.booklistID = BooklistsNum;
		BooklistsNum++;
	}
}


BooksCallBack()
BookListsCallBack()
displaySearchbox()

function blinkHandler(bid){
    // handler for book Detail page
        for (let i =0; i<allBooks.length; i++){
            if (allBooks[i].bookId == bid){
                let result = '../BookDetail/'+allBooks[i].bookId+'/'+allBooks[i].bookId+'_end_after.html'
                return result;
            }
        }   
    }


function BooksCallBack(){
    // Get all books in database
    allBooks.push(new Book(0, 'Solaris', 'Stanisław Herman Lem', 
        'https://upload.wikimedia.org/wikipedia/en/d/d1/SolarisNovel.jpg',
        'It follows a crew of scientists on a research station as they attempt to understand an extraterrestrial intelligence, which takes the form of a vast ocean on the titular alien planet.',
        )); // currently link is empty
    allBooks.push(
        new Book(1, 'Tres Tristes Tigres', 'Guillermo Cabrera Infante', 
        'https://upload.wikimedia.org/wikipedia/en/0/0f/Tres_tristes_tigres_%28Guillermo_Cabrera_Infante%29.png', 
        'It is a highly experimental, Joycean novel, playful and rich in literary allusions.',
        ));
    allBooks.push(
        new Book(2, 'The Story of the Lost Child', 'Elena Ferrante', 
        'https://www.irishtimes.com/polopoly_fs/1.2348652.1441974000!/image/image.jpg', 
        "The fourth of Elena Ferrante’s celebrated Neapolitan novels, has a lot to deliver on.",
        ));    
    allBooks.push(
            new Book(3, 'War and Peace', 'Leo Tolstoy', 
            'https://images-na.ssl-images-amazon.com/images/I/A1aDb5U5myL.jpg', 
            'The novel chronicles the French invasion of Russia and the impact of the Napoleonic era on Tsarist society through the stories of five Russian aristocratic families.',
            )); 
    allBooks.push(
            new Book(4, 'Song of Solomon', 'Toni Morrison', 
            'https://images-na.ssl-images-amazon.com/images/I/61EKxawb6xL.jpg', 
            'It tells the story of Macon "Milkman" Dead, a young man alienated from himself and estranged from his family, his community, and his historical and cultural roots.',
            ));   
            
    // handle links
    for (let i=0; i<allBooks.length; i++){
    allBooks[i].link = blinkHandler(allBooks[i].bookId)
    }        
}

function BookListsCallBack(){
    // Load default booklist data
    BooklistsList.push(new DataBooklist('novels', 'Admin',[allBooks[0],allBooks[1]]))
    BooklistsList.push(new DataBooklist('All spanish', 'Admin',[allBooks[1]]))
    BooklistsList.push(new DataBooklist('Before 20th', 'User',[allBooks[1], allBooks[3], allBooks[4],allBooks[0]]))
    }

function displaySearchbox(){
    const searchbookArea = document.querySelector('.search-book')
    const t = searchbookArea.children[0]
    for (let i=0; i<allBooks.length; i++){
        if (allBooks[i] != null){
            const id = allBooks[i].bookId
            const name = allBooks[i].title
            const option = document.createElement('option')
            option.value = id
            option.innerText = name
            t.appendChild(option)
        }
    }
    

    const searchlistArea = document.querySelector('.search-list')
    const column = searchlistArea.children[0]
    for (let i=0; i<BooklistsNum; i++){
        if (BooklistsList[i] != null){
            const id = BooklistsList[i].booklistID
            const name = "[" + BooklistsList[i].listName + "] -- " +BooklistsList[i].creator
            const option = document.createElement('option')
            option.value = id
            option.innerText = name
            column.appendChild(option)
        }
    }
}

// Search Book 
const searchArea1 = document.querySelector('#search-button1')
searchArea1.addEventListener('click', searchBook)
function searchBook(e){
    e.preventDefault();
    if (e.target.id == 'search-button1'){
        console.log("here")
        const select = document.getElementById('search-book');
        if (select.selectedIndex!=0){
            const value = select.options[select.selectedIndex].value;
            const link = '../BookDetail/'+value+'/'+value+'_end_after.html'
            window.location.href = (link)
        }
        
    }  
}

// Search List 
const searchArea2 = document.querySelector('#search-button2')
searchArea2.addEventListener('click', searchList)
function searchList(e){
    e.preventDefault();
    if (e.target.id == 'search-button2'){
        console.log("here")
        const select = document.getElementById('search-list');
        if (select.selectedIndex!=0){
            const value = select.options[select.selectedIndex].value;
            const link = '../BooklistDetail/BooklistDetail.html?booklistID='+value+'&userID=0.html' // end userID: 0 'User'
            window.location.href = (link)
        }
    }  
}

/********** Recommendation book display **********/
const recommendedBooks = [];

RecommendBooksCreate()
displayTop()
displayRecommendations()



function RecommendBooksCreate() {
    //Create RecommendedBooklist according to the frequency of the book put in some booklists
    let popularity = new Array(allBooks.length).fill(0)
    for(let i=0; i<allBooks.length; i++){
            const bid = allBooks[i].bookId
            for (let j=0; j<BooklistsList.length; j++){
                const result = BooklistsList[j].books.filter((Book) => Book.bookId == bid)
                popularity[i] += result.length;
            }
        }
        for (let k=0; k<3; k++){
            let max = popularity.reduce(function(a, b) {
                return Math.max(a, b);
            }, -Infinity);
            let index = popularity.indexOf(max)
            recommendedBooks.push(allBooks[index])
            popularity[index] = -1
        }
    
    }

 function displayTop(){

        const div = document.getElementsByClassName('p-4 p-md-5 mb-4 text-white rounded bg-dark')
        if (recommendedBooks[0] !=null){
            const bookName = recommendedBooks[0].title;
            const bookAuthor = recommendedBooks[0].author;
            const bookCover = recommendedBooks[0].cover;
            const description = recommendedBooks[0].description;
            const bid = recommendedBooks[0].bookId;

            const booklink = recommendedBooks[0].link;

            let img = document.createElement('img')
            img.className = 'TopbookCover'
            img.setAttribute('src', bookCover)

            let h1 = document.createElement('h1')
            h1.className = 'display-4 fst-italic'
            h1.classList.add('fancychar1')
            h1.innerText = bookName
            let span = document.createElement('span')
            span.className = 'transparent'
            span.innerText = bid
            h1.appendChild(span)

            let h4 = document.createElement('h4')
            h4.className = 'fancychar2'
            h4.innerText = bookAuthor

            let p1 = document.createElement('p')
            p1.className = 'lead my-3'
            p1.innerText = description

            let p2 = document.createElement('p')
            p2.className = 'lead mb-0'
            let a = document.createElement('a')
            a.className = 'text-white fw-bold'
            a.setAttribute('href', booklink)
            a.onclick = function open(e){
                e.preventDefault();
                window.location.href = (a.href)
            }
            a.innerText = 'Learn more about it...'
            p2.appendChild(a)

            div[0].appendChild(img)
            div[0].appendChild(h1)
            div[0].appendChild(h4)
            div[0].appendChild(p1)
            div[0].appendChild(p2)
        }
 }


function displayRecommendations(){

    for (let i=1; i<3; i++){
        if (recommendedBooks[i] != null){
        const area = document.getElementsByClassName('row mb-2')

        const bookName = recommendedBooks[i].title;
        const bookAuthor = recommendedBooks[i].author;
        const bookCover = recommendedBooks[i].cover;
        const description = recommendedBooks[i].description;
        const booklink = recommendedBooks[i].link;
        const bid = recommendedBooks[i].bookId;

        let outerdiv = document.createElement('div')
        outerdiv.className = 'col-md-6'
        let innerdiv1 = document.createElement('div')
        innerdiv1.className = 'row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative'
        let innerdiv2 = document.createElement('div')
        innerdiv2.className = 'col p-4 d-flex flex-column position-static'
        
        let h3 = document.createElement('h3')
        h3.className = 'fancychar2'
        h3.innerText = bookName
        let span = document.createElement('span')
        span.className = 'transparent'
        span.innerText = bid
        h3.appendChild(span)

        let div1 = document.createElement('div')
        div1.className = 'mb-1 text-muted'
        div1.innerText = bookAuthor

        let img = document.createElement('img')
        img.className = 'RecommendationbookCover'
        img.setAttribute('src', bookCover)

        let br = document.createElement('br')

        let p = document.createElement('p')
        p.className = 'card-text mb-auto'
        p.classList.add('justify')
        p.innerText = description
        
        let a = document.createElement('a')
        a.setAttribute('href', booklink)
        a.className = 'stretched-link'
        a.innerText = 'Learn more'
        a.onclick = function open(e){
            e.preventDefault();
            window.location.href = (a.href)
        }

        innerdiv2.appendChild(h3)
        innerdiv2.appendChild(div1)
        innerdiv2.appendChild(img)
        innerdiv2.appendChild(br)
        innerdiv2.appendChild(p)
        innerdiv2.appendChild(a)

        innerdiv1.appendChild(innerdiv2)
        outerdiv.appendChild(innerdiv1)

        area[0].appendChild(outerdiv)

        }
    }
}
