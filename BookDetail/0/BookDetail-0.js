let BooksNum = 0; 
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

BooksList.push(new Book('Solaris', 'Stanisław Herman Lem', 1970, 
'https://upload.wikimedia.org/wikipedia/en/d/d1/SolarisNovel.jpg', 
'It follows a crew of scientists on a research station as they attempt to understand an extraterrestrial intelligence, which takes the form of a vast ocean on the titular alien planet.'))


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
    posts.push(new Post(0, 0, 'Solaris',null, 'admin',
    "https://avatars.githubusercontent.com/u/73209681?v=4", 
    null,
    'It was stunning. An ocean with life, a planet covered by an ocean.',
    '2022-02-20 3:02', 0));

    posts.push(new Post(1, 0, 'Solaris',null, 'user',
    'https://avatars.githubusercontent.com/u/71192401?v=4', 
    'https://upload.wikimedia.org/wikipedia/en/d/d1/SolarisNovel.jpg',
    'I really like this book! I really like this book! I really like this book! I really like this book!',
    '2022-03-01 18:05', 1));

    posts.push(new Post(2, 4, 'Song of Solomon',null, 'user',
    'https://avatars.githubusercontent.com/u/71192401?v=4', 
    'https://reviewed-com-res.cloudinary.com/image/fetch/s--vRlwGaKY--/b_white,c_limit,cs_srgb,f_auto,fl_progressive.strip_profile,g_center,h_668,q_auto,w_1187/https://reviewed-production.s3.amazonaws.com/1615411074746/EreadersBG3.jpg',
    'I have to read it every day otherwise I cannot sleep',
    '2022-03-05 00:05', 5));

    posts.push(new Post(3, 3, 'War and Peace',null, 'user',
    'https://avatars.githubusercontent.com/u/71192401?v=4', 
    null,
    "I have a version of War and Peace that's been lying around for years on my desk. The French dialogues aren't translated in the footnotes. I read that the use of Frech in this book functions as a 'literary device', but I really want to know what is being said. How important are these dialogues in French?",
    '2022-03-05 16:00', 0));
  }
