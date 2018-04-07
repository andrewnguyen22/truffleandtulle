import React, {Component} from 'react';
import './App.css';
import NavComponent from './navbar/Navbar'
import Blog from "./pages/Blog/Blog";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Portfolio from "./pages/Portfolio/Portfolio.jsx"
import Contact from "./pages/Contact/Contact"
import Post from "./pages/Post/Post.jsx"
import Link from "./pages/Link/Link.js"
import {Route} from 'react-router-dom'

class App extends Component {
    render() {
        return (
            <div>
                <NavComponent/>
                <Route exact path="/" component={Home}/>
                <Route path="/about" component={About}/>
                <Route path="/blog" component={Blog}/>
                <Route path="/portfolio" component={Portfolio}/>
                <Route path="/contact" component={Contact}/>
                <Route path="/post" component={Post}/>
                <Route path="/link" component={Link}/>
            </div>
        );
    }
}

export default App