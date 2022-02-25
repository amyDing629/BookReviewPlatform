import React from "react";
import './NavigationBar.css';
import '../General.css';

class NavigationBar extends React.Component{
    render(){
        return (
            <div id="topMenu">
                <ul>
                    <li>
                        <div className="logoContainer">
                            <img className="logo" src="https://avatars.githubusercontent.com/u/71192401?v=4" alt="xyy"/>
                        </div>
                    </li>
                    <li><a className="active" href="">Home</a></li>
                    <li><a href="">Books</a></li>
                    <li><a href="">Booklists</a></li>
                    <li>
                        <form>
                        <input type="text" name="search" placeholder="Search for books, booklists, and users.."/>
                        </form>
                    </li>
                    <li className="right"><a href="">Login / Register</a></li>
                </ul>
            </div>
        )
    }
}



export default NavigationBar;