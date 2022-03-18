const log = console.log;


const postul = document.querySelector('#posts ul');
postCallBack()
displayPosts()

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