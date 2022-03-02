const log = console.log;

/********** Recommendation book display **********/
const recommendedBooks = [];

class Book {
	constructor(bid, title, author, cover, link) {
        this.bookId = bid; // get it from book detail page
		this.title = title;
		this.author = author;
        this.cover = cover;
        this.link = link; // link to book detail page
    }
}

const bookul = document.querySelector('#recommendation ul');
 BooksCallBack()
 displayRecommendations()


function blinkHandler(bid){
    // handler for book Detail page
    const result = ''
        for (let i =0; i<recommendedBooks.length; i++){
            if (recommendedBooks[i].bookId == bid){
                result = '../BookDetail/BookDetail-'+recommendedBooks[i].title+'.html'
                return result;
            }
        } 
        log('error') // OR other actions...     
    }


function BooksCallBack() {
    /// Get recommendaed books from server
    //  code below requires server call
    // books in recommendedBooks list should be added by admin user
    recommendedBooks.push(
        new Book(0, 'Solaris', 'Stanisław Herman Lem', 
        'https://upload.wikimedia.org/wikipedia/en/d/d1/SolarisNovel.jpg',
        )); // currently link is empty
    recommendedBooks.push(
        new Book(1, 'Tres Tristes Tigres', 'Guillermo Cabrera Infante', 
        'https://upload.wikimedia.org/wikipedia/en/0/0f/Tres_tristes_tigres_%28Guillermo_Cabrera_Infante%29.png', 
        )); // need to change to Tres Tristes Tigres
 }


// clean all before display
function cleanRecommendation(){
    const lis = bookul.children;
    for (let i=0; i<3; i++){
        if (lis[i] != null){
            lis[i].remove();
        }
    }
}

function displayRecommendations(){
    cleanRecommendation();

    for (let i=0; i<3; i++){
        if (recommendedBooks[i] != null){
        
        let bookName = recommendedBooks[i].title;
        let bookAuthor = recommendedBooks[i].author;
        let bookCover = recommendedBooks[i].cover;
        let bookLink = recommendedBooks[i].link;
        let bid = recommendedBooks[i].bookId;

        
        }
    }
}



/********** Posts display **********/
const posts = [];

class Post {
	constructor(postID, bookID, booktitle, booklink, poster, posterProfile, pic, content, time, likes) {
		this.postID = postID;
        this.bookID = bookID;
        this.booktitle = booktitle;
        this.booklink = booklink;
		this.poster = poster;
        this.posterProfile = posterProfile;
        this.pic = pic;
        this.content = content; 
        this.time = time;
        this.likes = likes; 
    }
}

function postCallBack() {
    /// Get post from server
    // code below requires server call
    // posts in post list should be added by admin user
    posts.push(new Post(0, 0, 'Solaris','../BookDetail/BookDetail-Solaris.html', 'user',
    'https://avatars.githubusercontent.com/u/71192401?v=4', 
    'https://upload.wikimedia.org/wikipedia/en/d/d1/SolarisNovel.jpg',
    'I really like this book! I really like this book! I really like this book! I really like this book!',
    '2022-03-01 18:05', 1));

    posts.push(new Post(1, 0, 'Solaris','../BookDetail/BookDetail-Solaris.html', 'admin',
    'https://avatars.githubusercontent.com/u/71192401?v=4', 
    null,
    'It was stunning. An ocean with life, a planet covered by an ocean.',
    '2022-02-20 3:02', 0));
  }



const postul = document.querySelector('#posts ul');
postCallBack()
displayPosts()


// clean all before display
function cleanPosts(){
    const lis = postul.children;
    log(lis);
    for (let i=0; i<3; i++){
        if (lis[i] != null){
            lis[i].remove();
        }
    }
}


function displayPosts(){
    // cleanPosts();

    for (let i=0; i<3; i++){
        if (posts[i] != null){
            

            let title = posts[i].booktitle
            let userName = posts[i].poster
            let userProfile = posts[i].posterProfile
            let pic = posts[i].pic
            let content = posts[i].content
            let time = posts[i].time
            let likes = posts[i].likes
            let blink = posts[i].booklink
            let pid = posts[i].postID
            let bid = posts[i].bookID

        
        }
    }
}






