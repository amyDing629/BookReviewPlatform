/****************** Index Post ******************/

const posts = []; // all posts
const homeposts = []; // for admin edit
const collectedPosts = []; // collection of posts made by current user

class Post {
	constructor(pid, bid, booktitle, userid, postername, posterProfile, pic, content, time, likes) {
		this.postID = pid;
        this.bookID = bid;
        this.booktitle = booktitle;
        this.userid = userid;
		this.poster = postername;
        this.posterProfile = posterProfile;
        this.pic = pic;
        this.content = content; 
        this.time = time;
        this.likes = likes; 
        this.booklink = null;
        this.posterlink = null;
    }
}

let puser;
let pusertype;
let pusername;
const postul = document.querySelector('#posts ul');

try { 
    puser= String(window.location.href.split('?')[1].split('=')[1])
    //try puser = String ...
    const url3 = '/api/users/'+puser
    fetch(url3).then((res) => { 
        if (res.status === 200) {
           return res.json() 
       } else {
           alert('Could not get this user')
       }   
    }).then((json) => {  //pass json into object locally
        pusertype = json.user.type.toLowerCase()
        pusername = json.user.username
        const url4 = '/api/posts'
        fetch(url4).then((res) => { 
            if (res.status === 200) {
               return res.json() 
           } else {
                console.log("not found")
           }                
        }).then((json) => {  //pass json into object locally
            const jsonposts = json.posts
            for (each of jsonposts){
                posts.push(new Post(each._id, each.bookID, each.booktitle, each.userID, each.username, each.posterProfile, each.pic, each.content, each.time, each.likes))
            }
            log(posts)
            // handle links
            for (let i=0; i<posts.length; i++){
                posts[i].booklink = blinkHandlerinPost(posts[i].bookID, pusertype)
                posts[i].posterlink = ulinkHandler(posts[i].userid, pusertype, puser)
            }
            homepostsCreate()
            displayPosts(pusertype)
            likeHandler()
            collectHandler()

            /////// Admin ///////
            if (pusertype == 'admin'){
                displayPostManagerBar()
            }

            })
        }).catch((error) => {
        log(error)})
} catch { 
    pusertype= 'guest'
    log(pusertype)
    const url5 = '/api/posts'
    fetch(url5).then((res) => { 
        if (res.status === 200) {
           return res.json() 
       } else {
            console.log("not found")
       }                
    }).then((json) => {  //pass json into object locally
        log(json)
        const jsonposts = json.posts
        for (each of jsonposts){
            posts.push(new Post(each._id, each.bookID, each.booktitle, each.userID, each.username, each.posterProfile, each.pic, each.content, each.time, each.likes))
        }
        log(posts)
        
        // handle links
        for (let i=0; i<posts.length; i++){
            posts[i].booklink = blinkHandlerinPost(posts[i].bookID, pusertype, puser)
            posts[i].posterlink = ulinkHandler(posts[i].userid, pusertype, puser)
        }
        homepostsCreate()
        displayPosts(pusertype)
    })
    .catch((error) => {
    log(error)})

}







// helper for index.html & index.html?userID=0 & index.html?userID=0
// function getUserID(){
//     try { 
//         return parseInt(window.location.href.split('?')[1].split('=')[1])
//     } catch { 
//         return 'guest'
//     }
// }

// // helper: check the user type, return 'User' or 'Admin'?
// function checkUserType(userID){
//     // need more dynamic way to search user database, check type
//     // phase 2 task

//     if (userID === 0){ 
//         return('user')
//     } else if (userID === 1) {
//         return('admin')
//     } else {
//         return 'guest'
//     }
// }

// const postid = getUserID()
// const postuser = checkUserType(postid)

/************************ Posts display ************************/


// function blinkHandlerinPost(bid, user){
//     // handler for book Detail page link
//         for (let i =0; i<posts.length; i++){
//             if (posts[i].bookID == bid){
//                 // HERE!
//                 let result;
//                 if (user == 'guest'){
//                     result = '../BookDetail/'+posts[i].bookID+'/BookDetail-'+posts[i].bookID+'.html'
//                 }
//                 else if (user == 'user'){
//                     result = '../BookDetail/'+allBooks[i].bookId+'/'+allBooks[i].bookId+'_end_after.html'
//                 }
//                 else{
//                     result = '../BookDetail/'+allBooks[i].bookId+'/'+allBooks[i].bookId+'_admin_after.html'
//                 }
//                 return result;
//             }
//         }  
//     }

function blinkHandlerinPost(bid, usertype, userid){
        // handler for book *Detail* page link
        let result;
        if (usertype == 'guest'){
            result = '/public/html/BookDetail.html?bookID='+bid
        }
        else{
            result = '/public/html/BookDetail.html?bookID='+bid+"&userID="+userid
        }
        return result; 
    }  


function ulinkHandler(uid, usertype, userid){
        // handler for book *Detail* page link
        let result;
        if (usertype == 'guest'){
            result = '/public/html/login.html'
        }
        else{
            result = '/public/html/BookDetail.html?bookID='+uid+"&userID="+userid // need to change
        }
        return result; 
    }      






//const postul = document.querySelector('#posts ul');
//postCallBack()
//homepostsCreate()
//displayPosts(postuser)


function homepostsCreate(){
    for (let i=0; i<posts.length; i++){
        homeposts.push(posts[i])
    }
}


function displayPosts(userType){

    for (let i=0; i<5; i++){
        if (homeposts[i] != null){
            let li = postul.children[i]
            
            /*clean all before display */
            for (let j =0; j<li.children.length; j++){
                li.removeChild(li.children[j])
            }

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
            let blink = posts[i].booklink

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
                window.location.href=(a1.href) // need to handle user link
            }
            let spanid2 = document.createElement('span')
            if (userType == 'admin'){
                log(userType)
                spanid2.className = 'postIdadmin'
            }
            else{
                spanid2.className = 'postId'
            }
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

            if (pic != ""){
                let img2 = document.createElement('img')
                img2.className='postContentPicture'
                img2.setAttribute('src', pic)
                img2.setAttribute('alt', 'pic')
                contentDiv.appendChild(img2)
            }

            let br = document.createElement('br')
            contentDiv.appendChild(br)

            // ADMIN & USER
            if (userType != 'guest'){
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
            }

            postDiv.appendChild(userDiv)
            postDiv.appendChild(contentDiv)

            li.appendChild(postDiv)
            
        }
    }
}

// ADMIN & USER
    function likeHandler(){
        const likefield = document.querySelector('#posts ul')
        likefield.addEventListener('click', like)     
    }


    function like(e){
        e.preventDefault(); // prevent default action

        const contentDiv = e.target.parentElement.parentElement
        const h3 = contentDiv.children[0]
        const pid = h3.children[1].innerText
        for (let i=0; i<posts.length; i++){
            if(parseInt(posts[i].postID) == pid){
                if (e.target.classList.contains('like')) {
                    posts[i].likes ++
                    let length = contentDiv.children.length
                    length -= 1
                    const target = contentDiv.children[length]
                    const icon = target.children[0]
                    icon.innerText = ' '+ posts[i].likes
                    e.target.classList.remove('like');
                    e.target.classList.add('dislike');
                    e.target.innerText = 'Dislike';
                    break;
                }
                else if (e.target.classList.contains('dislike')){
                    posts[i].likes --
                    let length = contentDiv.children.length
                    length -= 1
                    const target = contentDiv.children[length]
                    const icon = target.children[0]
                    icon.innerText = ' '+ posts[i].likes
                    e.target.classList.remove('dislike');
                    e.target.classList.add('like');
                    e.target.innerText = 'Like';
                    break;
                }
            }
            } 
        }

    function collectHandler(){
        const collectfield = document.querySelector('#posts ul')
        collectfield.addEventListener('click', collect);
    }

    function collect(e){
        e.preventDefault(); // prevent default action

        const contentDiv = e.target.parentElement.parentElement
        const h3 = contentDiv.children[0]
        const pid = h3.children[1].innerText
        for (let i=0; i<posts.length; i++){
            if(parseInt(posts[i].postID) == pid){
                if (e.target.classList.contains('collect')) {
                    collectedPosts.push(posts[i])
                    const h5 = contentDiv.children[contentDiv.children.length-1]
                    h5.children[1].innerText='Collected!'
                    e.target.classList.remove('collect');
                    e.target.classList.add('collected');
                    break;
                }
                else if (e.target.classList.contains('collected')){
                    //collectedPosts.remove(posts[i])
                    for (let j=0; i<collectedPosts.length; i++){
                        if (collectedPosts[j] == posts[i]){
                            collectedPosts.splice(j, 1)
                            break;
                        }
                    }
                    const h5 = contentDiv.children[contentDiv.children.length-1]
                    h5.children[1].innerText='Collect'
                    e.target.classList.remove('collected');
                    e.target.classList.add('collect');
                    break;
                }
                
            }
        } 
    }
    



/************************ Admin manage bar ************************/


    //displayPostManagerBar()

    // function post1Function() {
    //     log('yes')
    //     const bookdropdown = document.querySelector("#modify_post1 #myDropdown")
    //     if (bookdropdown.classList.contains("hide")){
    //         bookdropdown.classList.remove("hide")
    //         bookdropdown.classList.add("postdropdown-content")
    //     }
    //     else{
    //         bookdropdown.classList.remove("postdropdown-content")
    //         bookdropdown.classList.add("hide")
    //     }  
    // }
    
    // function post2Function() {
    //     const listdropdown = document.querySelector("#modify_post2 #myDropdown")
    //     if (listdropdown.classList.contains("hide")){
    //         listdropdown.classList.remove("hide")
    //         listdropdown.classList.add("postdropdown-content")
    //     }
    //     else{
    //         listdropdown.classList.remove("postdropdown-content")
    //         listdropdown.classList.add("hide")
    //     } 
    // }
    
    function adminfilterFunction(type) {
        let input, filter, ul, li, a, i;
        if (type == 1){
            input = document.querySelector("#modify_post1 #myInput")
            div = document.querySelector("#modify_post1 #myDropdown")
        }
        else{
            input = document.querySelector("#modify_post2 #myInput")
            div = document.querySelector("#modify_post2 #myDropdown")
        }
        option = div.getElementsByTagName("option");
        filter = input.value.toUpperCase();
        for (i = 0; i < option.length; i++) {
            txtValue = option[i].textContent || option[i].innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
            option[i].style.display = "";
            } else {
            option[i].style.display = "none";
            }
        }
    }
    
    function displayPostManagerBar(){

        const divadmin = document.createElement("div")
        divadmin.className = 'adminManage'
        const h5 = document.createElement("h5")
        h5.innerText = 'Admin Only: modify Posts listed here'

        const div1 = document.createElement("div")
        div1.id = 'modify_post1'
        div1.className = 'postdropdown'
        const button = document.createElement("button")
        button.addEventListener('click', function(){
            const bookdropdown = document.querySelector("#modify_post1 #myDropdown")
            if (bookdropdown.classList.contains("hide")){
                bookdropdown.classList.remove("hide")
                bookdropdown.classList.add("postdropdown-content")
            }
            else{
                bookdropdown.classList.remove("postdropdown-content")
                bookdropdown.classList.add("hide")
            }  
        })
        button.className = 'dropbtn'
        button.innerText = 'Modify Post#...'

        const div2 = document.createElement("div")
        div2.id = 'myDropdown'
        div2.className = 'hide'
        const input = document.createElement("input")
        input.type = 'text'
        input.placeholder = 'Search..'
        input.id = 'myInput'
        // onkeyup
        input.onkeyup = function(){
            adminfilterFunction(1)
        }
    
        div2.appendChild(input)

        div1.appendChild(button)
        div1.appendChild(div2)
        ///////
        const div3 = document.createElement("div")
        div3.id = 'modify_post2'
        div3.className = 'postdropdown'
        const button2 = document.createElement("button")
        button2.addEventListener('click', function(){
            const listdropdown = document.querySelector("#modify_post2 #myDropdown")
            if (listdropdown.classList.contains("hide")){
                listdropdown.classList.remove("hide")
                listdropdown.classList.add("postdropdown-content")
            }
            else{
                listdropdown.classList.remove("postdropdown-content")
                listdropdown.classList.add("hide")
            } 
        })
        button2.className = 'dropbtn'
        button2.innerText = 'TO post ID..'

        const div4 = document.createElement("div")
        div4.id = 'myDropdown'
        div4.className = 'hide'
        const input2 = document.createElement("input")
        input2.type = 'text'
        input2.placeholder = 'Search..'
        input2.id = 'myInput'
        // onkeyup
        input2.onkeyup = function(){
            adminfilterFunction(2)
        }
        div4.appendChild(input2)

        div3.appendChild(button2)
        div3.appendChild(div4)

        const modify = document.createElement("button")
        modify.className = "btn btn-dark"
        modify.id = 'modify_post_button'
        modify.innerText = 'modify'
        modify.addEventListener('click', function(){
            const toreplace = document.querySelector('#modify_post1 #myInput')
            const replacedwith = document.querySelector('#modify_post2 #myInput')
            // new
            const value1 = toreplace.value
            const value2 = replacedwith.value
            const targetpost = posts[value2]
            homeposts[value1] = targetpost  
            displayPosts()
        })

        divadmin.appendChild(h5)
        divadmin.appendChild(div1)
        divadmin.appendChild(div3)
        divadmin.appendChild(modify)

        const adminarea = document.querySelector("#posts h3")
        adminarea.parentElement.insertBefore(divadmin, adminarea.nextElementSibling)
        /////

        const t = document.querySelector('#modify_post1 #myDropdown')
        for (let i=0; i<homeposts.length; i++){
            if (homeposts[i] != null){
                const postid = homeposts[i].postID
                const option1 = document.createElement("option")
                option1.value = postid;
                option1.innerText = postid
                option1.addEventListener('click', function(){
                    const input = document.querySelector('#modify_post1 #myInput')
                    input.value = option1.innerText;
                })
                t.appendChild(option1)
            }
        }
    
        const t2 = document.querySelector('#modify_post2 #myDropdown')
        for (let j=0; j<posts.length; j++){
            if (posts[j] != null){
                const postid = posts[j].postID
                const option2 = document.createElement("option")
                option2.value = postid;
                option2.innerText = postid
                option2.addEventListener('click', function(){
                    const input = document.querySelector('#modify_post2 #myInput')
                    input.value = option2.innerText;
                })
                t2.appendChild(option2)
            }
        }
        

    }
    






