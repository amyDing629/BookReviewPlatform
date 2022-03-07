## BookLand

## Overall Purpose
The overall objective of the project is to build a website for readers to share their thoughts on readings with others. Through this platform, readers can view various kinds of book lists made by other readers, create their own book lists, and make friends that have similar reading tastes.

## Specification
### index.html location
* The entrance of the website (index.html) is at *HomeAndLogin* folder: [here](./HomeAndLogin/index.html).
## Main Features
### Regular User
* a basic user profile with a unique username, a signature (a short description of themselves), and a photo (the user's head portrait)
* edit signature
* make posts to share their opinions about books
* collect or like the posts
* customize multiple book lists regarding different demands, as well as a collection of their favorite posts and booklists.

### Admin User
* all regular users' features
* manage the account status of regular users, including deactivating and reactivating accounts
* add or remove books from the database and update book descriptions
* manage posts (specifically, delete the post of all users)

## Temp Structure (leave to phase2)
- **HomeAndLogin**
  - index.html (Home page for guest）
  - index_end_after.html (Home page for end users）
  - index_admin_after.html (Home page for admin users)
  - login.html
  - register.html

- **BookDetail**
  - 6 folders(0-5), each folder name represents the book ID   
  - BookDetail-ID.html (book detail page for guest）
  - ID_end_after.html (book detail page for end users）
  - ID_admin_after.html (book detail page for admin users)

- **user**
  - user.html (Regular user page)
  - admin.html (Admin user page)
  - amy.html (A user that hasn't done anything in her account, can only be accessed from admin's manage user page)

- **BooklistDetail**
  - BooklistDetail.html (All users pages for all booklists. Different booklistID and userID regulates the page displaying and functionalities. Guests don't have userID, they only have booklistID as the path variable.)

- **BookMainPage**
  - BookMainPage.html (Books Main page for guest）
  - BookMainPage_end_after.html (Books Main page for end users）
  - BookMainPage_admin_after.html (Books Main page for admin users)

- **BooklistMainPage**
  - BooklistMainPage.html (Booklists Main page for guest）
  - BooklistMainPage_end_after.html (Booklists Main page for end users）
  - BooklistMainPage_admin_after.html (Booklists Main page for admin users)  


## Page Details
  ### User
  - **Regular User**
    - When logged in as regular user, the right corner of the top menu bar will show as user's name.
    - When a regular user accesses to his own main profile page, user can edit signature and edit his own posts and booklists.
    - When reviewing regular user's profile, the 'edit signature', 'add posts' and 'add booklists' buttons will be hidden.
  - **Admin User**
    - The right corner of the top menu bar will show as 'Admin'.
    - Has all feature as regular user.
    - When accessing to admin's own main profile page, admin has two more buttons than regular user, where they can manage user's status, and direct to 'manage books' page.
    - When reviewing admin user's profile, the two extra buttons will be hidden.
    - When an admin review regular user's profile page, he can still delete their posts and booklists.

  ### BooklistDetail
  - **Guest**
    - All guests have top menu bar that allows to navigate specific book detail or booklist detail pages for guests.
    - All guests have login/register button at the top-right corner that allows to login or register.
    - All information of the booklist is displayed on the main area. Booklist section have links of books that allow the guest navigate to the associated book in guest permission. 
  - **Regular User**
    - All end users have the same functionalities and displayings as the guest.
    - Besides, they could edit their own booklists by changing book collections, or edit the description
  - **Admin User**
    - All admins have the same functionalities and displayings as the end users.
  
  ### BookMainPage
  - **Guest**
    - All guests have top menu bar that allows to navigate specific book detail or booklist detail pages for guests.
    - All guests have login/register button at the top-right corner that allows to login or register.
    - All books are listed on the main section in different pages. Each page have at most 3 book cards. 
    - The bottom of each page has button to flip to different pages.
  - **Regular User**
    - All end users have top menu bar that allows to navigate specific book detail or booklist detail pages for end users.
    - All end users have quit button at the top-right corner that allows to quit the sign-in. Or a grey button that naigate to their own user page.
    - All books are listed on the main section in different pages. Each page have at most 3 book cards. 
    - The bottom of each page has button to flip to different pages.
  - **Admin User**
    - All admin users have top menu bar that allows to navigate specific book detail or booklist detail pages for admin.
    - All admin users have quit button at the top-right corner that allows to quit the sign-in. Or a grey button that naigate to their own user page.
    - All books are listed on the main section in different pages. Each page have at most 3 book cards. 
    - The bottom of each page has button to flip to different pages.
    - All admin users have functions to add or delete books over the website.
    - For adding books, all parameters are required except Cover URL. If no specifying of Cover URL, the default cover picture would be assigned for the new added book.

  ### BooklistMainPage
  - **Guest**
    - All guests have top menu bar that allows to navigate specific book detail or booklist detail pages for guests.
    - All guests have login/register button at the top-right corner that allows to login or register.
    - All booklists are listed on the main section in different pages. Each page have at most 3 booklist cards. 
    - The bottom of each page has button to flip to different pages.
    - Two buttons below the page title that allows to change the sorting ways of all booklist cards, either by list ID or alphabetically. The default soring order is by list ID. 
    - All booklist cards have links that allow to navigate to specific booklist detail, creator, book detail pages for guests.
    - There are like or collect button, but not allow guest to perform the actions. Once they click, it will raise a box and allow guest to register/log-in.
  - **Regular User**
    - All end users have top menu bar as well. 
    - All end users have quit button at the top-right corner that allows to quit the sign-in. Or a grey button that naigate to their own user page.
    - All booklist cards displaying and fliping pages are same as guest. 
    - All booklist cards have links that allow to navigate to specific booklist detail, creator, book detail pages for end users.
    - Like and collect buttons are availble to end users for like or collect. It only allows to like or collect once, double click will cancel the previous action.
    - Below the sorting buttons, Add new booklist columns allows end users to create new booklist. List name is required, description is optional. 
    - Inside adding booklist prompted box, all books are listed as reference, end users will enter the book IDs into a string, and then create.
  - **Admin User**
    - All admin users have all the end users functionalities and displayings. 
    - Besides, admins could delete every booklists.
