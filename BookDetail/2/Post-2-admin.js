const log = console.log;

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
    posts.push(new Post(0, 2, 'The Story of the Lost Child',null,1, 'admin', null,
    "https://avatars.githubusercontent.com/u/73209681?v=4", 
    null,
    'It was stunning. An ocean with life, a planet covered by an ocean.',
    '2022-02-20 3:02', 0));

    posts.push(new Post(1, 2, 'The Story of the Lost Child',null,0, 'user', null,
    'https://avatars.githubusercontent.com/u/71192401?v=4', 
    'https://www.irishtimes.com/polopoly_fs/1.2348652.1441974000!/image/image.jpg', 
    'I really like this book! I really like this book! I really like this book! I really like this book!',
    '2022-03-01 18:05', 1));

    posts.push(new Post(2, 2, 'The Story of the Lost Child',null,0,'user', null,
    'https://avatars.githubusercontent.com/u/71192401?v=4', 
    'https://reviewed-com-res.cloudinary.com/image/fetch/s--vRlwGaKY--/b_white,c_limit,cs_srgb,f_auto,fl_progressive.strip_profile,g_center,h_668,q_auto,w_1187/https://reviewed-production.s3.amazonaws.com/1615411074746/EreadersBG3.jpg',
    'I have to read it every day otherwise I cannot sleep',
    '2022-03-05 00:05', 5));

    posts.push(new Post(3, 2, 'The Story of the Lost Child',null,0, 'user', null,
    'https://avatars.githubusercontent.com/u/71192401?v=4', 
    null,
    "I have a version of The Story of the Lost Child that's been lying around for years on my desk. The French dialogues aren't translated in the footnotes. I read that the use of Frech in this book functions as a 'literary device', but I really want to know what is being said. How important are these dialogues in French?",
    '2022-03-05 16:00', 0));
  }


// page flip
function filpPage(pageNo, pageLimit) {
    const allPosts = document.getElementById("post-body")
    log(allPosts)
    const totalSize = allPosts.children.length
    log(totalSize)
    let totalPage = 0
    const pageSize = pageLimit
    // log(pageLimit)
    
    // calculate the page num and set up every page:
    if (totalSize / pageSize > parseInt(totalSize / pageSize)) {
        totalPage = parseInt(totalSize / pageSize) + 1;
    } else {
        totalPage = parseInt(totalSize / pageSize);
    }
    // log(totalPage)

    // build every page label and assign onclick function
    const curr = pageNo
    const startRow = (curr - 1) * pageSize + 1
    log(startRow)
    let endRow = curr * pageSize
    endRow = (endRow > totalSize) ? totalSize : endRow;
    log(endRow)
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


const postul = document.querySelector('#posts ul');
postCallBack()
displayPosts()
// clean all before display
function cleanPosts(){
    postul.innerHTML = ''
}

function displayPosts(){
    cleanPosts();
    // log(posts)

    for (let i=0; i<5; i++){
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
            let blink = posts[i].bookLink


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
            if (userid){
                plink = '../../user/user.html?visit='+userid
            }
            else{ // userid is user, visit myself
                plink = '../../user/user.html'
            }

            a1.setAttribute('href', plink)
            a1.innerText = userName
            a1.onclick = function open(e){
                e.preventDefault();
                window.location.replace(a1.href) // need to handle user link
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
            a2.setAttribute('href', '2_admin_after.html')
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
            button.className = 'btn btn-outline-primary'
            button.classList.add('like')
            button.innerText = 'Like'
            let button2 = document.createElement('button')
            button2.className = 'btn btn-outline-success'
            button2.classList.add('collect')
            button2.innerText = 'Collect'
            let button3 = document.createElement('button')
            button3.innerText = 'Delete'
            button3.className = 'btn btn-outline-danger'
            button3.id = 'delete'
            button3.classList.add('delete')

            likeh5.appendChild(icon)
            likeh5.appendChild(button3)
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
        log(100)
        for (let i=0; i<posts.length; i++){
            if(parseInt(posts[i].postID) == pid){
                collectedPosts.push(posts[i])
                const h5 = contentDiv.children[contentDiv.children.length-1]
                h5.children[2].innerText='Collected!'

            }
        } 
	}
}


const deletefield = document.querySelector('#posts')
deletefield.addEventListener('click', delete_post)
// log(posts)
function delete_post(e){
    e.preventDefault(); // prevent default action
    log('delete post')

    if (e.target.classList.contains('delete')) {
        const contentDiv = e.target.parentElement.parentElement
        log(contentDiv)
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

function addNewPost(e){
    e.preventDefault();
    log(1)
    if (e.target.classList.contains('addSubmit,')){
        log(2)
        const postContent = document.getElementById('postContent').value
        log(postContent)
        const picUrl = document.getElementById('picInput').value

        const today = new Date();
        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() + ' ' + today.getHours()+':'+today.getMinutes();

        if(picUrl.length > 0){
            log(3)
            posts.push(new Post(posts.length, 2, 'The Story of the Lost Child', null, 0, 'user', null,
            'https://avatars.githubusercontent.com/u/71192401?v=4', picUrl, postContent, date, 0))
        }else{
            posts.push(new Post(posts.length, 2, 'The Story of the Lost Child', null, 0, 'user', null,
            'https://avatars.githubusercontent.com/u/71192401?v=4', null, postContent, date, 0))
        }

        displayPosts();
        const postContentInput = document.getElementById('postContent')
        const picUrlInput = document.getElementById('picInput')
        postContentInput.value = ''
        picUrlInput.value = ''
    }
}