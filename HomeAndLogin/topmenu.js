

const menu = document.querySelector('#topMenu');
menu.addEventListener('submit', search);

const addUserIdToLinkElements = document.getElementsByClassName('addUserIdToLink');
let element;

// for phase 2
// if (window.location.href.indexOf('userID') !== -1){
//      let userInfo = document.getElementById('userLoginInfo');
//      let userID = window.location.href.split('?')[1].split('=')[1];
//      userInfo.innerHTML = 'Hello, User ' + userID;
// }

// for (element of addUserIdToLinkElements){
//      element.addEventListener('click', addUserIdToLink);
// }

// function addUserIdToLink(e){
//      for (element of addUserIdToLinkElements){
//           if (element.href.indexOf('userID') == -1){
//                element.href = element.href + ('?' + window.location.href.split('?')[1]);
//           } 
//      }
// }

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
