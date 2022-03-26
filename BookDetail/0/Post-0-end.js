function addNewPost(e){
    e.preventDefault();
    if (e.target.classList.contains('addSubmit,')){
        log(2)
        const postContent = document.getElementById('postContent').value
        log(postContent)
        const x = document.getElementById('myFile')
        const img = document.createElement("img");
        img.src = URL.createObjectURL(x.files[0]);
        img.className = 'postContentPicture'

        const today = new Date();
        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() + ' ' + today.getHours()+':'+today.getMinutes();

        if(x){
            log(3)
            posts.push(new Post(posts.length, 0, 'Solaris', null, 'user',
            'https://avatars.githubusercontent.com/u/71192401?v=4', img, postContent, date, 0))
        }else{
            posts.push(new Post(posts.length, 0, 'Solaris', null, 'user',
            'https://avatars.githubusercontent.com/u/71192401?v=4', null, postContent, date, 0))
        }
        displayPosts();
        const postContentInput = document.getElementById('postContent')
        postContentInput.value = ''
        x.value = ''
    }
}