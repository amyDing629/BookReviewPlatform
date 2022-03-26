
/*************** Books & Booklists Data ********************/

const allBooks = [];

class Bookopt {
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
    allBooks.push(new Bookopt(0, 'Solaris', 'Stanisław Herman Lem', 
        'https://upload.wikimedia.org/wikipedia/en/d/d1/SolarisNovel.jpg',
        'It follows a crew of scientists on a research station as they attempt to understand an extraterrestrial intelligence, which takes the form of a vast ocean on the titular alien planet.',
        )); // currently link is empty
    allBooks.push(
        new Bookopt(1, 'Tres Tristes Tigres', 'Guillermo Cabrera Infante', 
        'https://upload.wikimedia.org/wikipedia/en/0/0f/Tres_tristes_tigres_%28Guillermo_Cabrera_Infante%29.png', 
        'It is a highly experimental, Joycean novel, playful and rich in literary allusions.',
        ));
    allBooks.push(
        new Bookopt(2, 'The Story of the Lost Child', 'Elena Ferrante', 
        'https://www.irishtimes.com/polopoly_fs/1.2348652.1441974000!/image/image.jpg', 
        "The fourth of Elena Ferrante’s celebrated Neapolitan novels, has a lot to deliver on.",
        ));    
    allBooks.push(
            new Bookopt(3, 'War and Peace', 'Leo Tolstoy', 
            'https://images-na.ssl-images-amazon.com/images/I/A1aDb5U5myL.jpg', 
            'The novel chronicles the French invasion of Russia and the impact of the Napoleonic era on Tsarist society through the stories of five Russian aristocratic families.',
            )); 
    allBooks.push(
            new Bookopt(4, 'Song of Solomon', 'Toni Morrison', 
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
            const link = '../'+value+'/'+value+'_end_after.html'
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
            const link = '../../BooklistDetail/BooklistDetail.html?booklistID='+value+'&userID=0.html' // end userID: 0 'User'
            window.location.href = (link)
        }
    }  
}

const postul = document.querySelector('#posts ul');
postCallBack()
displayPosts()


// clean all before display
function cleanPosts(){
    postul.innerHTML = ''
}

function displayPosts(){
    cleanPosts();

    for (let i=0; i<1000; i++){
        if (posts[i] != null){
            let li = document.createElement('li')

            let postDiv = document.createElement('div')
            postDiv.className = 'post'
            let userDiv = document.createElement('div')
            userDiv.className = 'userProfileContainer'
            let contentDiv = document.createElement('div')
            contentDiv.className ='postContent'

            let title = posts[i].booktitle
            let userName = posts[i].poster
            let userProfile = posts[i].posterProfile
            let pic = posts[i].pic
            let content = posts[i].content
            let time = posts[i].time
            let likes = posts[i].likes
            let plink = posts[i].posterlink
            let pid = posts[i].postID
            let bid = posts[i].bookID
            let userid = posts[i].userid

            // need to handle user link
            // let plink = plinkHandler...

            // let blink = blinkHandlerinPost(bid)

            let img1 = document.createElement('img')
            img1.className='userProfile'
            img1.setAttribute('src', userProfile)
            img1.setAttribute('alt', 'profile')
            userDiv.appendChild(img1)

            let userh3 = document.createElement('h3')
            let a1 = document.createElement('a')
            a1.className = 'linkColor'
            
            // need to handle user link
            // temporary use
            if (userName == 'admin'){
                plink = '../../user/admin.html'
            }
            else{ // userid is user, visit myself
                plink = '../../user/user.html'
            }

            a1.setAttribute('href', plink)
            a1.innerText = userName
            a1.onclick = function open(e){
                e.preventDefault();
                window.location.href=(a1.href) // need to handle user link
            }
            let spanid2 = document.createElement('span')
            spanid2.className = 'postId'
            spanid2.innerText = pid
            userh3.appendChild(a1)
            userh3.appendChild(spanid2) // Post id is here

            contentDiv.appendChild(userh3)

            let pbook = document.createElement('p')
            pbook.innerText = 'Book Name: '
            let span1 = document.createElement('span')
            let a2 = document.createElement('a')
            a2.className = 'linkColor'
            a2.setAttribute('href', '0_end_after.html')
            a2.innerText = title
            a2.onclick = function open(e){
                e.preventDefault();
                window.location.href=(a2.href)
            }
            span1.appendChild(a2)
            let span2 = document.createElement('span')
            span2.className = 'postTime'
            span2.innerText = time

            let spanid3 = document.createElement('span')
            spanid3.className = 'bookId'
            spanid3.innerText = ' bookID: '
            let spanid4 = document.createElement('span')
            spanid4.className = 'bookId'
            spanid4.innerText = bid

            pbook.appendChild(span1)
            pbook.appendChild(span2)
            pbook.appendChild(spanid3) 
            pbook.appendChild(spanid4) // Book id is here
            contentDiv.appendChild(pbook)

            let p = document.createElement('p')
            p.innerText = content
            contentDiv.appendChild(p)

            if (pic != null){
                // let img2 = document.createElement('img')
                // img2.className='postContentPicture'
                // img2.setAttribute('src', pic)
                // img2.setAttribute('alt', 'pic')
                log(pic)
                contentDiv.appendChild(pic)
            }

            let br = document.createElement('br')
            contentDiv.appendChild(br)

            let likeh5 = document.createElement('h5')
            let icon = document.createElement('i')
            icon.className = 'fa fa-heart'
            icon.innerText = ' '+likes
            let button = document.createElement('button')
            button.className = 'btn btn-outline-primary'
            button.classList.add('like')
            button.innerText = 'Like'
            let button2 = document.createElement('button')
            button2.className = 'btn btn-outline-success'
            button2.classList.add('collect')
            button2.innerText = 'Collect'

            likeh5.appendChild(icon)
            likeh5.appendChild(button2)
            likeh5.appendChild(button)
            contentDiv.appendChild(likeh5)


            postDiv.appendChild(userDiv)
            postDiv.appendChild(contentDiv)

            li.appendChild(postDiv)
            postul.appendChild(li)
        }
    }
    filpPage(1,3)
}
