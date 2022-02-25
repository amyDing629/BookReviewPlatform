import React from "react";
import '../General.css'
import './Post.css'

class Post extends React.Component{
    render(){
        return (
            <div>
                <div id="post">
                    <div className="userProfileContainer">
                        <img className="userProfile" src="https://avatars.githubusercontent.com/u/71192401?v=4" alt="xyy"/>
                    </div>
                    <div className="postContent">
                        <h3 className="linkColor">user </h3>
                        <p>Book Name: <span><b>Solaris</b></span></p>
                        <p id="text">I really like this book!</p>
                        <img className="postContentPicture" src="https://upload.wikimedia.org/wikipedia/en/d/d1/SolarisNovel.jpg" alt="book picture"/>
                    </div>
                </div>

                <div id="post">
                    <div class="userProfileContainer">
                        <img className="userProfile" src="https://avatars.githubusercontent.com/u/71192401?v=4" alt="xyy"/>
                    </div>
                    <div class="postContent">
                        <h3 className="linkColor">user </h3>
                        <p>Book Name: <span><b>Solaris</b></span></p>
                        <p id="text">I really like this book!</p>
                        <img className="postContentPicture" src="https://upload.wikimedia.org/wikipedia/en/d/d1/SolarisNovel.jpg" alt="book picture"/>
                    </div>
                </div> 
            </div>
            
        )
    }
}

export default Post;