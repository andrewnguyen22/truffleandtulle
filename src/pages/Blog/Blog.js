import React, {Component} from 'react'
import './Blog.css'
import Footer from '../../footer/Footer'
import axios from 'axios'
import {Redirect} from 'react-router';
import history from '../../history/History'
import SearchBar from './SearchBar/SearchBar'
import seoImage from '../../images/kelsey/kelsey28-min.jpeg'
import Meta from '../../meta/Meta'
class Tile extends Component {
    constructor() {
        super();
        this.state = {
            redirect: 0
        };
    }

    handleOnClick = () => {
        this.setState({redirect: 1});
    };


    render() {
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
                    <div className="Blog-img-container">
                        <img alt="Featured" src={this.props.parentPassesPost.better_featured_image.source_url}
                             className="Blog-img"/>
                    </div>
                    <div className="Blog-title-container">
                        <h1 className="Blog-title">{this.props.parentPassesPost.title.rendered}</h1>
                    </div>
                    <div className="Blog-details-container">
                        <h3 className="Blog-details">
                    <span className="Blog-date">
                        {this.props.parseDate(this.props.parentPassesPost.date)}
                    </span>
                        </h3>
                    </div>
                    <div className="Blog-tags-container">
                        <span className="Blog-tags">
                            {this.props.parentPassesPost.acf.tags}
                            </span>
                    </div>
                </div>
            </div>
        );
    }
}

class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {width: 0, height: 0, posts: [], currentURL: '', query: ''};
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.setParentPosts = this.setParentPosts.bind(this);
    }

    componentDidMount() {
        //Receive Initial 6 posts from parent
        if (this.props.posts !== undefined && this.props.more === undefined) {
            this.setState({posts: this.props.posts, currentURL: this.props.wpurl})
        }
        //Load More If More Button Pressed
        else if (this.state.currentURL === this.props.wpurl && this.props.more !== undefined) {
            this.more(this.props);
        }
        //Search On Page If Button Pressed
        else {
            this.search(this.props);
        }
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillReceiveProps(nextProps) {
        //Receive Initial 6 posts from parent
        if (nextProps.posts !== undefined && nextProps.more === undefined) {
            this.setState({posts: nextProps.posts, currentURL: this.props.wpurl})
        }
        //Load More If More Button Pressed
        else if (this.state.currentURL === this.props.wpurl && nextProps.more !== undefined) {
            this.more(nextProps);
        }
        //Search On Page If Button Pressed
        else {
            this.search(nextProps);
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({width: window.innerWidth, height: window.innerHeight});
    }

    /**
     * Function to load more
     */
    more(props) {
        axios.get(this.props.wpurl + "&per_page=" + 6 * props.more).then(
            response => this.setState({posts: response.data})
        ).catch(e => {
            console.log(e);
        });
    }

    /**
     * Function to search
     */
    search(props) {
        axios.get(this.props.searchurl + this.state.query + "&per_page=" + 6 * props.more).then(
            response => this.setState({posts: response.data})
        ).catch(e => {
            console.log(e);
        });
    }

    setParentPosts(data) {
        axios.get(this.props.searchurl + data + "&per_page=" + 6).then(
            response => this.setState({query: data, posts: response.data, currentURL: this.props.searchurl})
        ).catch(e => {
            console.log(e);
        });
    };

    render() {
        let tiles = this.state.posts.map((d, i) => <Tile {...this.props} parentPassesPost={d} key={i}/>);
        if (this.state.posts.length === 0) {
            tiles = "I'm Sorry! No Results Found :("
        }
        let style;
        if (this.state.width > 700) {
            style = {width: this.state.width + "px", height: this.state.height - 100 + "px"}
        }
        else {
            style = {width: "100%", height: "600px"};
        }
        return (
            <div>
                <div className="Blog-page" style={style}>
                    <div className="Blog-page-inner">
                        <center>
                            <div className="Blog-header-title">TRUFFLE&TULLE</div>
                            <hr/>
                            <h3 className="Blog-header-subtitle">The Blog.</h3>
                        </center>
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

    componentWillMount() {
        this.props.startLoading();
        this.props.setOnBlog(true);
        console.log('will mount')
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    morePosts() {
        this.setState({more: this.state.more + 1});
    }

    componentWillUnmount() {
        this.props.setOnBlog(false);
    }

    render() {
        if (this.props.posts.length !== 0) {
            this.props.doneLoading()
        }
        const description = 'Welcome to the blog page of Truffle and Tulle. It is here where you will find my latest blog' +
            'posts consisting of many delightful recipes as well as stories to accompany them. I' +
            'hope you enjoy this blog and I promise to my readers to always keep it real, ' +
            'because that is what baking is about! '
        return (
            <div className="Blog-container">
                <Meta title='Blog' description={description} image={seoImage} url='truffleandtulle.com/blog'/>
                <Page {...this.props} more={this.state.more}/>
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