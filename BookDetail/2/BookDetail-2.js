const log = console.log;
let BooksNum = 2; 
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

BooksList.push(new Book('The Story of the Lost Child', 'Elena Ferrante', 2014, 
'https://www.irishtimes.com/polopoly_fs/1.2348652.1441974000!/image/image.jpg', 
'The fourth of Elena Ferrante’s celebrated Neapolitan novels, has a lot to deliver on.'))


/****************************** END USER index-posts js ******************************/

/** After log in, end user can like others' posts **/
/********** Posts display **********/
const posts = [];
const collectedPosts = []; // collection of posts made by current user


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
    posts.push(new Post(0, 2, 'The Story of the Lost Child',null, 'admin',
    "https://avatars.githubusercontent.com/u/73209681?v=4", 
    null,
    'It was stunning. An ocean with life, a planet covered by an ocean.',
    '2022-02-20 3:02', 0));

    posts.push(new Post(1, 2, 'The Story of the Lost Child',null, 'user',
    'https://avatars.githubusercontent.com/u/71192401?v=4', 
    null, 
    'I really like this book! I really like this book! I really like this book! I really like this book!',
    '2022-03-01 18:05', 1));

    posts.push(new Post(2, 2, 'The Story of the Lost Child',null,'user', 
    'https://avatars.githubusercontent.com/u/71192401?v=4', 
   null,
    'I have to read it every day otherwise I cannot sleep',
    '2022-03-05 00:05', 5));

    posts.push(new Post(3, 2, 'The Story of the Lost Child',null, 'user', 
    'https://avatars.githubusercontent.com/u/71192401?v=4', 
    null,
    "I have a version of The Story of the Lost Child that's been lying around for years on my desk. The French dialogues aren't translated in the footnotes. I read that the use of Frech in this book functions as a 'literary device', but I really want to know what is being said. How important are these dialogues in French?",
    '2022-03-05 16:00', 0));
  }