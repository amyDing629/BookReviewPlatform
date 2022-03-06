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

    const bookAuthor = document.createElement('span');
    bookAuthor.className = "bookAuthor";
    bookAuthor.innerText = 'Author: ' + BooksList[0].author;
    const bookId = document.createElement('span');
    bookId.className = "bookId";
    bookId.innerText = 'bookID: ' + BooksList[0].bookID; 
    const publish = document.createElement('span');
    publish.className = "publish" ;
    publish.innerText = "publish: " + BooksList[0].year;

    bookIntro.appendChild(bookAuthor);
    bookIntro.appendChild(document.createElement('br'));
    bookIntro.appendChild(bookId);
    bookIntro.appendChild(document.createElement('br'));
    bookIntro.appendChild(publish);
    bookInfo.appendChild(bookIntro);

    const bookDescription = document.querySelector('#bookDescription');

    const descriContent = document.createTextNode(BooksList[0].description)
    bookDescription.appendChild(descriContent)
}