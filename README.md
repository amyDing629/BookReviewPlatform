## BookLand

## Overall Purpose
The overall objective of the project is to build a website for readers to share their thoughts on readings with others. Through this platform, readers can view various kinds of book lists made by other readers, create their own book lists, and make friends that have similar reading tastes.

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
  - **index.html (Home page for tourist**
  - index_end_after.html (Home page for end users）
  - index_admin_after.html (Home page for admin users)

- **BookDetail**
  - 6 folders(0-5), each folder name represents the book ID   
  - BookDetail-ID.html (book detail page for tourist）
  - ID_end_after.html (book detail page for end users）
  - ID_admin_after.html (book detail page for admin users)

- **user**
  - user.html (Regular user page)
  - admin.html (Admin user page)
  - amy.html (A user that hasn't done anything in her account, can only be accessed from admin's manage user page)


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

 
  
   
