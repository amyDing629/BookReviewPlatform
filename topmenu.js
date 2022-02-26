

const menu = document.querySelector('#topMenu')
menu.addEventListener('submit', search)

function search(e){
    e.preventDefault(); // prevent default form action

   log('search for')
   const content = document.querySelector('#search').value

   // reference: https://dev.to/am20dipi/how-to-build-a-simple-search-bar-in-javascript-4onf
   if (content && content.trim().length > 0){
        // redefine 'content' to exclude white space and change input to all lowercase
        content = content.trim().toLowerCase()
        log(content)



   }
   

   
}

function analyze(content){

}