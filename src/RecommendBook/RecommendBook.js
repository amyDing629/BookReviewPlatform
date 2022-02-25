import React from "react";
import '../General.css'
import './RecommendBook.css'

class RecommendBook extends React.Component{
    render(){
        return (
            <div id="recommendation"> 
                <h1 id="textDecoration">  Recommended books </h1>
                <ul>
                    <li> <h2 className="bookTitle">Solaris<br/><span id="text">Stanisław Herman Lem</span></h2><br/>
                        <span>
                            <img className="bookCover" src="https://upload.wikimedia.org/wikipedia/en/d/d1/SolarisNovel.jpg" alt="book picture"/>
                        </span>
                    </li>
                    <li> <h2 className="bookTitle">Solaris<br/><span id="text">Stanisław Herman Lem</span></h2><br/>
                        <span>
                            <img className="bookCover" src="https://upload.wikimedia.org/wikipedia/en/d/d1/SolarisNovel.jpg" alt="book picture"/>
                        </span>
                    </li>
                </ul>
            </div>
        )
    }
}

export default RecommendBook;