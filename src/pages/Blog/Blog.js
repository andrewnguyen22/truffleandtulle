import React, {Component} from 'react'
import './Blog.css'
import Footer from '../../footer/Footer'
import axios from 'axios'
import {Redirect} from 'react-router';
import history from '../../history/History'
import SearchBar from './SearchBar/SearchBar'

const searchurl = "http://localhost:8888/wordpress/wp-json/wp/v2/posts?search=";
const wordpressurl = "http://localhost:8888/wordpress/wp-json/wp/v2/posts?_embed";
const tagsurl = "http://localhost:8888/wordpress/wp-json/wp/v2/tags?include=";
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

class Tile extends Component {
    constructor(props) {
        super(props);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.state = {
            width: 0,
            height: 0,
            tags: '',
            redirect: 0
        };
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({width: window.innerWidth, height: window.innerHeight});
    }

    parseISOLocal(s) {
        var b = s.split(/\D/);
        var d = (new Date(b[0], b[1] - 1, b[2], b[3], b[4], b[5]));
        return (MONTH_NAMES[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear())
    }

    setTags(response) {
        var tags = '';
        for (var i = 0; i < response.length; ++i) {
            if (i == 0) {
                tags = response[i].name.toUpperCase();
            }
            else {
                tags = tags + ' + ' + response[i].name.toUpperCase();
            }
        }
        this.setState({tags: tags});
    }

    handleOnClick = () => {
        this.setState({redirect: 1});
    }

    render() {
        axios.get(tagsurl + this.props.parentPassesPost.tags).then(
            response => this.setTags(response.data)
        ).catch(e => {
            console.log(e);
        });
        if (this.state.redirect === 1) {
            this.setState({redirect: 0});
            history.push('/blog');
            return (<Redirect to={{
                pathname: '/post',
                state: {referrer: this.props.parentPassesPost}
            }}/>);
        }
        return (
            <div className="Blog-tile" onClick={this.handleOnClick}>
                <div className="Blog-tile-content">
                    <div className="Blog-title-container">
                        <h1 className="Blog-title">{this.props.parentPassesPost.title.rendered}</h1>
                    </div>
                    <div className="Blog-details-container">
                        <h3 className="Blog-details">
                    <span className="Blog-date">
                        {this.parseISOLocal(this.props.parentPassesPost.date)}
                    </span>
                        </h3>
                    </div>
                    <div className="Blog-tags-container">
                        <span className="Blog-tags">
                            {this.state.tags}
                            </span>
                    </div>
                    <div className="Blog-img-container">
                        <img src={this.props.parentPassesPost.better_featured_image.source_url} className="Blog-img"/>
                    </div>
                    <div className="Blog-readthispost-container">
                        <h3 className="Blog-readthispost">Read This Post</h3>
                    </div>
                </div>
            </div>
        );
    }
}

class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {width: 0, height: 0, posts: [], currentURL: wordpressurl, query: ''};
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.setParentPosts = this.setParentPosts.bind(this);
    }

    componentDidMount() {
        axios.get(wordpressurl + "&per_page=" + 6).then(
            response => this.setState({posts: response.data})
        ).catch(e => {
            console.log(e);
        });
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.currentURL === wordpressurl) {
            axios.get(wordpressurl + "&per_page=" + 6 * nextProps.more).then(
                response => this.setState({posts: response.data})
            ).catch(e => {
                console.log(e);
            });
            ;
        }
        else {//Search URL
            axios.get(searchurl + this.state.query + "&per_page=" + 6 * nextProps.more).then(
                response => this.setState({posts: response.data})
            ).catch(e => {
                console.log(e);
            });
            ;
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({width: window.innerWidth, height: window.innerHeight});
    }

    setParentPosts(data) {
        axios.get(searchurl + data + "&per_page=" + 6).then(
            response => this.setState({query: data, posts: response.data, currentURL: searchurl})
        ).catch(e => {
            console.log(e);
        });
    };

    render() {
        const tiles = this.state.posts.map((d) => <Tile parentPassesPost={d}/>);
        return (
            <div>
                <div className="preloader">
                    {tiles}
                </div>
                <div className="Blog-page" style={{height: this.state.height - 100 + "px"}}>
                    <div className="Blog-page-inner">
                        <SearchBar setParentPosts={this.setParentPosts}/>
                        <center>
                            {tiles}
                        </center>
                    </div>
                </div>
            </div>
        );
    }
}

class Blog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            more: 1
        };
        this.morePosts = this.morePosts.bind(this);
    }

    morePosts() {
        this.setState({more: this.state.more + 1});
        console.log(this.state.more)
    }

    render() {
        return (
            <div className="Blog-container">
                <Page more={this.state.more}/>
                <center>
                    <button className="Blog-load-more-button" onClick={this.morePosts}>
                        LOAD MORE
                    </button>
                </center>
                <Footer/>
            </div>
        );
    }
}

export default Blog;