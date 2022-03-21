const desButton = document.querySelector('#DesButton');
if(desButton){
    desButton.addEventListener('click', profileButtonsOnClick);
}

/* If 'Edit' is clicked, display edition page.
   If 'Submit' is clicked, display confirmed information */
   function profileButtonsOnClick(e) {
    let userInfo = e.target.parentElement;
    let profileButton = document.getElementById('DesButton');
    if (e.target.innerHTML == 'Edit Description') {
        userInfo.removeChild(document.getElementById('bookDescription'));
        let sigForm = document.createElement('input');
        sigForm.type = 'text';
        sigForm.id = 'sigForm';
        userInfo.insertBefore(sigForm, profileButton);
        profileButton.innerHTML = 'Submit';
    }
    else if (e.target.innerHTML == 'Submit') {
        let signature = document.getElementById('sigForm').value;
        userInfo.removeChild(document.getElementById('sigForm'));
        let newSignature = document.createElement('div');
        newSignature.id = 'bookDescription';
        newSignature.className = 'bookDescription';
        newSignature.innerHTML = signature;
        userInfo.insertBefore(newSignature, profileButton);
        profileButton.innerHTML = 'Edit Description';
    }
}


// display the book information like book cover, author...
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

    const bookName = document.createElement('span');
    bookName.innerText = 'Name: ' + BooksList[0].name

    const bookAuthor = document.createElement('span');
    bookAuthor.className = "bookAuthor";
    bookAuthor.innerText = 'Author: ' + BooksList[0].author;
    const bookId = document.createElement('span');
    bookId.className = "bookId";
    bookId.innerText = 'bookID: ' + BooksList[0].bookID; 
    const publish = document.createElement('span');
    publish.className = "publish" ;
    publish.innerText = "publish: " + BooksList[0].year;

    bookIntro.appendChild(bookName);
    bookIntro.appendChild(document.createElement('br'));
    bookIntro.appendChild(bookAuthor);
    bookIntro.appendChild(document.createElement('br'));
    bookIntro.appendChild(publish);
    bookInfo.appendChild(bookIntro);

    const bookDescription = document.querySelector('#bookDescription');

    const descriContent = document.createTextNode(BooksList[0].description)
    bookDescription.appendChild(descriContent)
}


// page flip
function filpPage(pageNo, pageLimit) {
    const allPosts = document.getElementById("post-body")
    const totalSize = allPosts.children.length
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

    // separate different display style for different tr element
    for (let i = 1; i < (totalSize + 1); i++) {
        const each = allPosts.children[i - 1];
        if (i >= startRow && i <= endRow) {
            each.className="normalTR"
        } else {
            each.className="endTR"
        }
    }
    document.getElementById("pageFliper").innerHTML = strHolder;
}

const likefield = document.querySelector('#posts')
likefield.addEventListener('click', like)

function like(e){
    e.preventDefault(); // prevent default action
    let contentDiv = e.target.parentElement.parentElement
    // log(contentDiv)
    let pid = contentDiv.getElementsByClassName('postId')[0].innerText
    // log(100000)
    // log(pid)
    let post;
    let icon = e.target.parentElement.getElementsByClassName('fa fa-heart')[0];
    for (post of posts) {
        if (parseInt(post.postID) == pid) {
            if (e.target.classList.contains('like')) {
                post.likes++;
                icon.innerText = ' ' + post.likes;
                e.target.classList.remove('like');
                e.target.classList.add('dislike');
                e.target.innerText = 'Dislike';
                break;
            }
            else if (e.target.classList.contains('dislike')) {
                post.likes--;
                icon.innerText = ' ' + post.likes;
                e.target.classList.remove('dislike');
                e.target.classList.add('like');
                e.target.innerText = 'Like';
                break;
            }
        }
    }
}

const collectfield = document.querySelector('#posts')
collectfield.addEventListener('click', collect);

function collect(e){
    e.preventDefault(); // prevent default action

    if (e.target.classList.contains('collect')) {
	
		const contentDiv = e.target.parentElement.parentElement
        const h3 = contentDiv.children[0]
        const pid = h3.children[1].innerText
        for (let i=0; i<posts.length; i++){
            if(parseInt(posts[i].postID) == pid){
                e.target.classList.remove('collect');
                e.target.classList.add('collected');
                e.target.innerText = 'Collected!';

            }
        } 
	}
    else if (e.target.classList.contains('collected')){
            e.target.classList.remove('collected');
            e.target.classList.add('collect');
            e.target.innerText = 'Collect';
    }
}

const deletefield = document.querySelector('#posts')
deletefield.addEventListener('click', delete_post)
// log(posts)
function delete_post(e){
    e.preventDefault(); // prevent default action
    log('delete post')
    if (e.target.className == 'btn btn-outline-danger') {
        const contentDiv = e.target.parentElement.parentElement
        log(100)
        const h3 = contentDiv.children[0]
        const pid = h3.children[1].innerText
        log(pid)
        for (let i=0; i<posts.length; i++){
            if(parseInt(posts[i].postID) == pid){
                posts.splice(i, 1) // start from index=i, remove 1 item

                const ul = contentDiv.parentElement.parentElement.parentElement
                log(ul)
                const li = contentDiv.parentElement.parentElement
                // log(li)
                ul.removeChild(li)
                log(ul)
                log(posts)
                displayPosts()
                break;
            }
        }

    }

}

const addArea = document.querySelector('.col-md-4');
log(addArea)

addArea.addEventListener('click', addNewPost)