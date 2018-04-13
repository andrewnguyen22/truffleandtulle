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
import Loading from './loading/Loading.js'
import axios from "axios/index";

//Global Wordpress URLs to query
const SEARCHURL = "http://8.9.5.159:8080/wp-json/wp/v2/posts?search=";
const WPURL = "http://8.9.5.159:8080/wp-json/wp/v2/posts?";
const RECIPEURL = "http://8.9.5.159:8080/wp-json/wp/v2/posts?categories=2";
const RECIPESEARCHURL = "http://8.9.5.159:8080/wp-json/wp/v2/posts?categories=2&search=";
const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            recipes: [],
            youtube: false,
            onHome: false,
            onBlog: false,
            loading: true
        };
        this.startLoading = this.startLoading.bind(this);
        this.doneLoading = this.doneLoading.bind(this);
        this.youtubeLoaded = this.youtubeLoaded.bind(this);
        this.setOnHome = this.setOnHome.bind(this);
        this.setOnBlog = this.setOnBlog.bind(this);
    }

    MyBlogPage = (props) => {
        return (
            <Blog
                parseDate={this.parseDate}
                posts={this.state.posts}
                wpurl={WPURL}
                searchurl={SEARCHURL}
                setOnBlog={this.setOnBlog}
                doneLoading={this.doneLoading}
                startLoading={this.startLoading}
                {...props}
            />
        );
    };

    MyHomePage = (props) => {
        return (
            <Home
                parseDate={this.parseDate}
                posts={this.state.posts}
                recipes={this.state.recipes}
                wpurl={WPURL}
                searchurl={SEARCHURL}
                recurl={RECIPEURL}
                youtubeLoaded={this.youtubeLoaded}
                rsearchurl={RECIPESEARCHURL}
                setOnHome={this.setOnHome}
                doneLoading={this.doneLoading}
                startLoading={this.startLoading}
                {...props}
            />
        );
    };

    youtubeLoaded(bool) {
        this.setState({youtube: bool})
    }

    setOnHome(bool) {
        this.setState({onHome: bool})
    }

    setOnBlog(bool) {
        this.setState({onBlog: bool})
    }

    doneLoading() {
        if (this.state.loading === true)
            this.setState({loading: false})
    }

    startLoading() {
        if (this.state.loading !== true)
            this.setState({loading: true})
    }

    /**
     * Function To Retrieve the posts
     */
    getPosts() {
        axios.get(WPURL + "&per_page=" + 6).then(
            response => this.setState({posts: response.data})
        ).catch(e => {
            console.log(e);
        });
    }

    getRecipes() {
        axios.get(RECIPEURL + "&per_page=" + 10).then(
            response => this.setState({recipes: response.data})
        ).catch(e => {
            console.log(e);
        });
    }

    // noinspection JSMethodCanBeStatic
    /**
     * Function to parse data from iso to readable
     * @param iso_string iso date
     * @returns {string}
     */
    parseDate(iso_string) {
        let b = iso_string.split(/\D/);
        let d = (new Date(b[0], b[1] - 1, b[2], b[3], b[4], b[5]));
        return (MONTHS[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear())
    }

    componentDidMount() {
        this.getPosts();
        this.getRecipes();
    }

    render() {
        let loading;
        if (this.state.onHome !== true && this.state.onBlog !== true && this.state.loading === true) {
            this.setState({loading: false})
        }
        if (this.state.loading === true || this.state.recipes.length === 0
            || this.state.posts.length === 0 || (this.state.onHome === true && this.state.youtube === false)) {
            loading = <Loading className='App-loading'/>;
        } else {
            loading = '';
        }
        return (
            <div>
                {loading}
                <div className='App-content'>
                    <NavComponent/>
                    <Route exact path="/" component={this.MyHomePage}/>
                    <Route path="/about" component={About}/>
                    <Route path="/blog" component={this.MyBlogPage}/>
                    <Route path="/portfolio" component={Portfolio}/>
                    <Route path="/contact" component={Contact}/>
                    <Route path="/post" component={Post}/>
                    <Route path="/link" component={Link}/>
                </div>
            </div>
        );
    }
}

export default App