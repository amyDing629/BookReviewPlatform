
const log = console.log;


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

            let blink = blinkHandlerinPost(bid)

            let img1 = document.createElement('img')
            img1.className='userProfile'
            img1.setAttribute('src', userProfile)
            img1.setAttribute('alt', 'profile')
            userDiv.appendChild(img1)

            let userh3 = document.createElement('h3')
            let a1 = document.createElement('a')
            a1.className = 'linkColor'
            
            // need to handle user link
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
            a2.setAttribute('href', '4_end_after.html')
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
            posts.push(new Post(posts.length, 4, 'Song of Solomon', null, 0, 'user', null,
            'https://avatars.githubusercontent.com/u/71192401?v=4', picUrl, postContent, date, 0))
        }else{
            posts.push(new Post(posts.length, 4, 'Song of Solomon', null, 0, 'user', null,
            'https://avatars.githubusercontent.com/u/71192401?v=4', null, postContent, date, 0))
        }

        displayPosts();
        const postContentInput = document.getElementById('postContent')
        const picUrlInput = document.getElementById('picInput')
        postContentInput.value = ''
        picUrlInput.value = ''
    }
}