// global variables
var BooklistsNum = 0; 
var BooklistsList = [] 

/************** temp hardcode for all books ******************/
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
/************** temp for book [END] ******************/


/************** temp for search bar ******************/
function displaySearchbox(){
    const searchbookArea = document.querySelector('.search-book')
    const t = searchbookArea.children[0]
    for (let i=0; i<BooksNum; i++){
        if (BooksList[i] != null){
            const id = BooksList[i].bookID
            const name = BooksList[i].name
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
            const name = "[" + BooklistsList[i].listName + "] -- " + BooklistsList[i].creator
            const option = document.createElement('option')
            option.value = id
            option.innerText = name
            column.appendChild(option)
        }
    }
}

/********** Search Book **********/
const searchArea1 = document.querySelector('#search-button1')
searchArea1.addEventListener('click', searchBook)
function searchBook(e){
    e.preventDefault();
    if (e.target.id == 'search-button1'){
        const select = document.getElementById('search-book');
        if (select.selectedIndex!=0 ){
            const value = select.options[select.selectedIndex].value;
            const user = document.querySelector('.right').innerText
            let link = '../BookDetail/'
            if (user.length === 1){ // ['Login/Register']
                link+=value+'/BookDetail-'+value+'.html'
            } else if (user === 'Admin'){
                link+=value+'/'+value+'_admin_after.html'
            } else if (user === 'User'){
                link+=value+'/'+value+'_end_after.html'
            }
            window.location.href = (link)
        }
    }  
}

/********** Search List **********/
const searchArea2 = document.querySelector('#search-button2')
searchArea2.addEventListener('click', searchList)
function searchList(e){
    e.preventDefault();
    if (e.target.id == 'search-button2'){
        console.log("here")
        const select = document.getElementById('search-list');
        if (select.selectedIndex!=0 ){
            const value = select.options[select.selectedIndex].value;
        const user = document.querySelector('.right').innerText
        let link = "../BooklistDetail/BooklistDetail.html?booklistID=" + value
        if (user.length === 1){ // ['Login/Register']
            link += ".html"
        } else if (user === 'Admin'){
            link += "&userID=1.html"
        } else if (user === 'User'){
            link += "&userID=0.html"
        }
        window.location.href = (link)
        }
    }  
}
/************** temp for search bar [END] ******************/

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
    const desc = document.createElement('span')
    desc.id = 'descriptionText'
    desc.appendChild(document.createTextNode(booklist.listDescription))
    description.appendChild(desc)

    // fill books in the list
    fillBooklistBooks(booklist,user)
}

function fillBooklistBooks(booklist, user){
    const bookUL = document.querySelector('#bookUL')

	for(let i = 0; i < booklist.books.length; i++) {
        const li = document.createElement('li')
        li.className = 'bookli'

        // <a> content
        const a = document.createElement('a')
        a.className = "book"
        a.href = '../BookDetail/'+ booklist.books[i].bookID +"/"+ booklist.books[i].bookID
        if(user === 'User'){ // end user
            a.href+='_end_after.html'
        } else if (user === 'Admin'){ // admin  
            a.href+='_admin_after.html'
        } else { // guest
            a.href='../BookDetail/'+booklist.books[i].bookID+'/BookDetail-' + booklist.books[i].bookID+ '.html'
        }
        a.onclick = function open(e){e.preventDefault(); window.location.href = a.href}
        a.appendChild(document.createTextNode(booklist.books[i].name))
        li.appendChild(a)
        bookUL.appendChild(li)
        bookUL.appendChild(document.createElement('br'))
    }
}

function selectBooklistToPlay(){
    if (window.location.href.split('?')[1] == null){
        return;
    } else if (window.location.href.split('?')[1].split('&').length === 1){ // guest visit any booklist
        const currentListID = parseInt(window.location.href.split('?')[1].split('booklistID=')[1].split('.')[0])
        const list = BooklistsList.filter((list) => list.booklistID == currentListID)
        displayBooklistDetail(list[0], 'guest')
        selectNarviBarUser('guest')
    } else { // admin & user
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
}

function selectNarviBarUser(user){
    const userColumn = document.querySelector('.right')
    if (user === 'User'){//end user, need more dynamiclly fix on phase 2
        userColumn.innerHTML =''
        const newLI = document.createElement('li')
        newLI.className = "quit"
        newLI.innerHTML = "<a href=\"../HomeAndLogin/index.html\">QUIT</a>"
        const a = document.createElement('a')
        a.id = 'userLoginInfo'
        a.className = 'addUserIdToLink'
        a.href = "../user/user.html"
        a.onclick = function open(e){e.preventDefault(); window.location.href = a.href}
        a.appendChild(document.createTextNode('User'))
        userColumn.appendChild(a)
        userColumn.before(newLI)
    } else if (user === 'Admin'){ // admin
        userColumn.innerHTML =''
        const newLI = document.createElement('li')
        newLI.className = "quit"
        newLI.innerHTML = "<a href=\"../HomeAndLogin/index.html\">QUIT</a>"
        const a = document.createElement('a')
        a.id = 'userLoginInfo'
        a.className = 'addUserIdToLink'
        a.href = "../user/admin.html"
        a.onclick = function open(e){e.preventDefault(); window.location.href = a.href}
        a.appendChild(document.createTextNode('Admin'))
        userColumn.appendChild(a)
        userColumn.before(newLI)
    } //else guest
}

// edit booklist
function editBooklist(user){
    // get self info (for booklist exist reference)
    let entireBooklist = document.querySelectorAll('.bookli')
    const listID = BooklistsList.filter((booklist) => 
    booklist.booklistID === parseInt(document.querySelector(".listId").innerText.split(': ')[1])
    )
    let currList = ''
    const currIDs = BooklistsList[listID[0].booklistID].books.filter((book) => currList += (book.bookID+";"))
    const creator = document.querySelector('.creator').innerHTML.split(': ')[1]
    const description = document.querySelector('#descriptionText')
    const bookUL = document.querySelector('#bookUL')
    const button1 = addEditElement('editDescription','Modify the description:', document.querySelector('#descriptionText').innerText)
    const button2 = addEditElement('editBooks','Modify the booklist content:', currList)
    if (creator === user){ // creator only 
        const div1 = document.createElement('div')
        div1.className = 'editDiv'
        div1.id ='edit_description'
        div1.appendChild(button1)

        description.before(div1)
        const div2 = document.createElement('div')
        div2.className = 'editDiv'
        div2.id='edit_books'
        div2.appendChild(button2)
        bookUL.before(div2)
    } 
}

function addEditElement(id, text, inner){
    const outter = document.createElement('div')
    const button = document.createElement('button')
    button.className = id + ', btn btn-outline-info'
    button.appendChild(document.createTextNode('Edit'))
    outter.appendChild(button)
    //pop up element
    const wrapper = document.createElement('div')
    wrapper.id ='myForm_'+id
    wrapper.className='form-popup'


    const form = document.createElement('form')
    form.className='form-container'
    form.action = '/action_page.php'

    const h5 = document.createElement('h5')
    h5.innerText= text
    form.appendChild(h5)

    const input = document.createElement('input')
    input.type ='text'
    input.id = id+'_input'
    input.value = inner
    input.name =id+'_input'
    form.appendChild(input)

    const submit = document.createElement('button')
    submit.type = "submit"
    submit.className='addSubmit, btn'
    submit.id = 'submit_'+id
    submit.innerText='Save'
    form.appendChild(submit)

    const cancel = document.createElement('button')
    cancel.type = "button"
    cancel.className='btn cancel'
    cancel.id = "cancel_"+id
    cancel.innerText='Cancel'
    form.appendChild(cancel)
    wrapper.appendChild(form)

    outter.appendChild(wrapper)
    return outter
}

// DOM modifying functions:

// creator only: edit description
const description = document.querySelector('#description')
description.addEventListener("click", editDescription)
description.addEventListener('click', saveDescription)
description.addEventListener('click', cancelEditDescription)

function saveDescription(e){
    e.preventDefault()
    if (e.target.className =='editDescription, btn btn-outline-info'){
        document.getElementById("myForm_editDescription").style.display="block";
    }
}
function cancelEditDescription(e){
    if (e.target.id =='cancel_editDescription'){
        document.getElementById("myForm_editDescription").style.display="none";
    }
}
function editDescription(e){
    e.preventDefault()
    if (e.target.id ==='submit_editDescription'){
        let textSpan = document.querySelector('#descriptionText')
        let request = document.querySelector('#editDescription_input').value
        //let request = prompt("Please edit the new description:",textSpan.innerText)
        let curr = document.querySelector('#descriptionText').innerText
        while (request == null || request.length === 0 || request === curr){
            if (request == null) {
                return;
            } else if (request === curr){
                alert('Failed, the description is still same. Please re-enter.')
                //request = prompt("Please edit the new description:",textSpan.innerText)
                return
            } else {
                alert('Failed, the new description cannot be empty. Please re-enter.')
                //request = prompt("Please edit the new description:",textSpan.innerText)
                return
            }
        }
        textSpan.innerText = request
        const self = BooklistsList.filter((booklist)=>
        booklist.listId === parseInt(document.querySelector(".listId").innerText.split(': ')[1])
        )
        self.description = request
        document.getElementById("myForm_editDescription").style.display="none";
    }
}

// creator only: edit books in the booklist
const books = document.querySelector('#books')
books.addEventListener("click", saveEditBooksContent)
books.addEventListener('click', clickEditBooks)
books.addEventListener('click', cancelEdit)
function clickEditBooks(e){
    e.preventDefault()
    if (e.target.className =='editBooks, btn btn-outline-info'){
        document.getElementById("myForm_editBooks").style.display="block";
    }
}
function cancelEdit(e){
    if (e.target.id =='cancel_editBooks'){
        document.getElementById("myForm_editBooks").style.display="none";
    }
}
function saveEditBooksContent(e){
    e.preventDefault()
    if (e.target.id ==='submit_editBooks'){
        // get self info
        let entireBooklist = document.querySelectorAll('.bookli')
        const listID = BooklistsList.filter((booklist) => 
        booklist.booklistID === parseInt(document.querySelector(".listId").innerText.split(': ')[1])
        )

        // set up book id reference list
        let listString = "Book IDs Reference List: \n"
        let names = BooksList.map((book) =>  '[ID: '+ book.bookID + ']--' + book.name + '\n')
        let ids = BooksList.map((book) =>  book.bookID)
        for (each of names){ listString+=each }
        listString+="\n     Please edit your book IDs collection:\n     [Note]: use space or , to separate every ID."

        // prompt input default: self curr book ids
        let currList = Array() 
        const currIDs = BooklistsList[listID[0].booklistID].books.filter((book) => currList.push(book.bookID))
        
        
        let request = document.querySelector('#editBooks_input').value
        let uniqueCurrInput = uniqueSortedIDsArrayGenerator(request)
        
        // error check for input format and repeatness 
        while (uniqueCurrInput === "null" || uniqueCurrInput.length === 0 || JSON.stringify(uniqueCurrInput) === JSON.stringify(currList.sort())){
            if (uniqueCurrInput === "null") {
                return;
            } else if (JSON.stringify(uniqueCurrInput) === JSON.stringify(currList.sort())){
                alert('Failed, all books are still same. Please re-enter.')
                //request = prompt(listString,currList)
                uniqueCurrInput = uniqueSortedIDsArrayGenerator(request)
                return
            } else {
                alert('Failed, booklist cannot be empty. Please re-enter.')
                //request = prompt(listString,currList)
                uniqueCurrInput = uniqueSortedIDsArrayGenerator(request)
                return
            }
        }

        // error check for input id validation:
        const idCollection = BooksList.map((book)=>book.bookID)
        const Invalid = uniqueCurrInput.filter(inputID => !idCollection.includes(inputID))
        if(Invalid.length > 0){
            alert('Failed, you have invalid ID input. Please check the above reference table and re-enter.')
                return;
        } else { // valid
            // modify books in object
            let newBooksAttribute = Array()
            const iterate = uniqueCurrInput.map((eachInputID) => {
                const selected = BooksList.filter((bookObject) => bookObject.bookID === eachInputID)
                newBooksAttribute.push(selected[0])
            })
            BooklistsList[listID[0].booklistID].books = newBooksAttribute
            
            // display on page
            const table = document.querySelector('#bookUL').innerHTML=''
            fillBooklistBooks(BooklistsList[listID[0].booklistID], document.querySelector('.creator').innerHTML.split(': ')[1])
            document.getElementById("myForm_editBooks").style.display="none";
        }
    }
}

function uniqueSortedIDsArrayGenerator(str){
    if (str == null){
        return "null"
    }
    const valids = str.replace(/[^0-9\.]+/g, '').split('').map((each) => {
        const element = parseInt(each)
        if (isNaN(element) == false){
            return element
        }
    })
    return Array.from(new Set(valids.sort()))
}

//helper: for edit button pop up form
function createForm(){
    const wrapper = document.createElement('div')
    wrapper.id ='myForm'
    wrapper.className='form-popup'

    const div1 = document.createElement('div')
    div1.className = 'div_form'
    const form = document.createElement('form')
    form.className='form-container'
    form.action = '/action_page.php'

    const h5 = document.createElement('h5')
    h5.innerText='Please edit the new description:'
    form.appendChild(h5)


    const label1 = document.createElement('label')
    label1.for = 'new_input'
    const b = document.createElement('b')
    b.innerText='New description: '
    form.appendChild(label1)

    const input = document.createElement('input')
    input.type ='text'
    input.id = 'new_input'
    input.placeholder = '<new description...>'
    input.name ='new_input'
    form.appendChild(input)

    const submit = document.createElement('button')
    submit.type = "submit"
    submit.className='addSubmit, btn'
    submit.innerText='Submit'
    form.appendChild(submit)

    const cancel = document.createElement('button')
    cancel.type = "button"
    cancel.className='btn cancel'
    cancel.innerText='Cancel'
    cancel.onclick = 'closeForm()'
    form.appendChild(cancel)
    div1.appendChild(form)
    wrapper.appendChild(div1)
    document.querySelector('#edit_description').append(wrapper)
}

displaySearchbox() // for navi bar search function
selectBooklistToPlay()