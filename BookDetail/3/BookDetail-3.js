const log = console.log;
let BooksNum = 3; 
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

BooksList.push(new Book('War and Peace', 'Leo Tolstoy', 1869, 
'https://images-na.ssl-images-amazon.com/images/I/A1aDb5U5myL.jpg', 
'The novel chronicles the French invasion of Russia and the impact of the Napoleonic era on Tsarist society through the stories of five Russian aristocratic families.'))

/****************************** END USER index-posts js ******************************/

/** After log in, end user can like others' posts **/
/********** Posts display **********/
const posts = [];
const collectedPosts = []; // collection of posts made by current user


class Post {
	constructor(pid, bid, booktitle, booklink, userid, postername, posterlink, posterProfile, pic, content, time, likes) {
		this.postID = pid;
        this.bookID = bid;
        this.booktitle = booktitle;
        this.booklink = booklink;
        this.userid = userid;
		this.poster = postername;
        this.posterlink = posterlink;
        this.posterProfile = posterProfile;
        this.pic = pic;
        this.content = content; 
        this.time = time;
        this.likes = likes; 

    }
}

function blinkHandlerinPost(bid){
    // handler for book Detail page link
        for (let i =0; i<posts.length; i++){
            if (posts[i].bookID == bid){
                let result = '../BookDetail/'+posts[i].bookID+'/BookDetail-'+posts[i].bookID+'.html'
                return result;
            }
        } 
         // OR other actions...     
    }

function postCallBack() {
    /// Get post from server
    // code below requires server call
    // posts in post list should be added by admin user
    posts.push(new Post(0, 3, 'War and Peace',null,1, 'admin', null,
    "https://avatars.githubusercontent.com/u/73209681?v=4", 
    null,
    'It was stunning. An ocean with life, a planet covered by an ocean.',
    '2022-02-20 3:02', 0));

    posts.push(new Post(1, 3, 'War and Peace',null,0, 'user', null,
    'https://avatars.githubusercontent.com/u/71192401?v=4', 
    'https://images-na.ssl-images-amazon.com/images/I/A1aDb5U5myL.jpg', 
    'I really like this book! I really like this book! I really like this book! I really like this book!',
    '2022-03-01 18:05', 1));

    posts.push(new Post(2, 3, 'War and Peace',null,0,'user', null,
    'https://avatars.githubusercontent.com/u/71192401?v=4', 
    'https://reviewed-com-res.cloudinary.com/image/fetch/s--vRlwGaKY--/b_white,c_limit,cs_srgb,f_auto,fl_progressive.strip_profile,g_center,h_668,q_auto,w_1187/https://reviewed-production.s3.amazonaws.com/1615411074746/EreadersBG3.jpg',
    'I have to read it every day otherwise I cannot sleep',
    '2022-03-05 00:05', 5));

    posts.push(new Post(3, 3, 'War and Peace',null,0, 'user', null,
    'https://avatars.githubusercontent.com/u/71192401?v=4', 
    null,
    "I have a version of War and Peace that's been lying around for years on my desk. The French dialogues aren't translated in the footnotes. I read that the use of Frech in this book functions as a 'literary device', but I really want to know what is being said. How important are these dialogues in French?",
    '2022-03-05 16:00', 0));
  }
