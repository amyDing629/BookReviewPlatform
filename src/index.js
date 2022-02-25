import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import NavigationBar from './NavigationBar/NavigationBar';
import RecommendBook from './RecommendBook/RecommendBook';
import Post from './MainPost/Post';

ReactDOM.render(
  <React.StrictMode>
    <NavigationBar />
    <RecommendBook />
    <Post />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();