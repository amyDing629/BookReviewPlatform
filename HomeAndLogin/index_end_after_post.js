
const log = console.log;

/****************************** END USER index-posts js ******************************/

/** After log in, end user can like others' posts **/
/********** Posts display **********/
const posts = [];
const collectedPosts = []; // collection of posts made by current user


class Post {
	constructor(pid, bid, booktitle, booklink, poster, posterlink, posterProfile, pic, content, time, likes) {
		this.postID = pid;
        this.bookID = bid;
        this.booktitle = booktitle;
        this.booklink = booklink;
		this.poster = poster;
        this.posterlink = posterlink;
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
    posts.push(new Post(0, 0, 'Solaris', '../BookDetail/Solaris_end_after.html', 'user', null,
    'https://avatars.githubusercontent.com/u/71192401?v=4', 
    'https://upload.wikimedia.org/wikipedia/en/d/d1/SolarisNovel.jpg',
    'I really like this book! I really like this book! I really like this book! I really like this book!',
    '2022-03-01 18:05', 1));

    posts.push(new Post(1, 0, 'Solaris', '../BookDetail/Solaris_end_after.html', 'admin', null,
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
    for (let i=0; i<3; i++){
        if (lis[i] != null){
            lis[i].remove();
        }
    }
}

function displayPosts(){
    cleanPosts();

    for (let i=0; i<3; i++){
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
            let blink = posts[i].booklink
            let plink = posts[i].posterlink
            let pid = posts[i].postID
            let bid = posts[i].bookID

            let img1 = document.createElement('img')
            img1.className='userProfile'
            img1.setAttribute('src', userProfile)
            img1.setAttribute('alt', 'profile')
            userDiv.appendChild(img1)

            let userh3 = document.createElement('h3')
            let a1 = document.createElement('a')
            a1.className = 'linkColor'
            a1.setAttribute('href', plink)
            a1.innerText = userName
            a1.onclick = function open(e){
                e.preventDefault();
                window.location.replace("login.html")
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
            a2.setAttribute('href', blink)
            a2.innerText = title
            a2.onclick = function open(e){
                e.preventDefault();
                window.location.replace(a2.href)
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
                let img2 = document.createElement('img')
                img2.className='postContentPicture'
                img2.setAttribute('src', pic)
                img2.setAttribute('alt', 'pic')
                contentDiv.appendChild(img2)
            }

            let br = document.createElement('br')
            contentDiv.appendChild(br)

            let likeh5 = document.createElement('h5')
            let icon = document.createElement('i')
            icon.className = 'fa fa-heart'
            icon.innerText = ' '+likes
            let button = document.createElement('button')
            button.className = 'like'
            button.innerText = 'Like this post'
            let button2 = document.createElement('button')
            button2.className = 'collect'
            button2.innerText = 'Collect this post'

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
}

const likefield = document.querySelector('#posts')
likefield.addEventListener('click', like)

function like(e){
    e.preventDefault(); // prevent default action

    if (e.target.classList.contains('like')) {
	
		const contentDiv = e.target.parentElement.parentElement
        const h3 = contentDiv.children[0]
        const pid = h3.children[1].innerText
        for (let i=0; i<posts.length; i++){
            if(parseInt(posts[i].postID) == pid){
                posts[i].likes ++
                let length = contentDiv.children.length
                length -= 1
                const target = contentDiv.children[length]
                const icon = target.children[0]

                icon.innerText = ' '+ posts[i].likes
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
                collectedPosts.push(posts[i])
                log(contentDiv)
                const length = contentDiv.children.length -1
                log(length)
                const target = contentDiv.children[length]
                log(target)
                const button = target.children[1]
                button.className = 'aftercollect'

            }
        } 
	}
}

 