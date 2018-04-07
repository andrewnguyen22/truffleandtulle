import React, {Component} from 'react'
import {Parallax, Background} from 'react-parallax';
import {Scrollbars} from 'react-custom-scrollbars';
import './Page4.css'
import axios from "axios/index";

const searchurl = "http://localhost:8888/wordpress/wp-json/wp/v2/posts?categories=10&search";
const wordpressurl = "http://localhost:8888/wordpress/wp-json/wp/v2/posts?";
const tagsurl = "http://localhost:8888/wordpress/wp-json/wp/v2/tags?include=";
class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.state = {
            inputField: ''
        };
    }

    submitHandler(evt) {
        evt.preventDefault();
        this.props.setParentPosts(this.state.inputField)
        this.setState({
            inputField: ''
        });
    }

    handleChange(event) {
        this.setState({
            inputField: event.target.value
        });
    }

    render() {
        return (
            <div className='P4-searchbar-container'>
                <form className="P4-searchbar-form" onSubmit={e => e.preventDefault()}>
                    <input className="P4-searchbar-input"
                           placeholder='Search My Recipes'
                           onChange={this.handleChange}/>
                    <button className="P4-searchbar-button"
                            type='submit'
                            onClick={this.submitHandler}>
                        Search
                    </button>
                </form>
            </div>
        )
    }
}

class Recipe extends Component {
    constructor(props) {
        super(props);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.state = {
            width: 0,
            height: 0,
            tags: '',
            redirect: 0,
            recipeurl: ''
        };
    }

    componentDidMount() {
        this.setRecipeUrl(this.props.parentPassesPost.content.rendered)
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({width: window.innerWidth, height: window.innerHeight});
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

    setRecipeUrl = (recipe) => {
        const res = recipe.toString().split("\"");
        for (var i = 0; i < res.length; ++i) {
            console.log(res[i])
            if (res[i].includes(".pdf") && res[i].includes("http")) {
                this.setState({recipeurl: res[i]})
            }
        }
    }
    openInNewTab(url) {
        var win = window.open(url, '_blank');
        win.focus();
    }
    render() {
        axios.get(tagsurl + this.props.parentPassesPost.tags).then(
            response => this.setTags(response.data)
        ).catch(e => {
            console.log(e);
        });
        var title = this.props.parentPassesPost.title.rendered.toString().substr(0, 20)
        var shortenedTitle = title.substr(0, Math.min(title.length, title.lastIndexOf(" ")));
        if (title.length >= 19)
            shortenedTitle += "...";
        if (this.state.redirect === 1) {
            this.setState({redirect: 0});
            this.openInNewTab(this.state.recipeurl)
        }

        return (
            <div className="Recipe-card" onClick={this.handleOnClick}>
                <div className="Recipe-img"
                     style={{
                         backgroundImage: 'url(' +
                         this.props.parentPassesPost.better_featured_image.source_url + ')'
                     }}/>
                <h1>{shortenedTitle}</h1>
                <div className="Recipe-categories">
                    <h3>{this.state.tags}</h3>
                </div>
            </div>
        );
    }
}

class RecipeBox extends Component {
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
        const tiles = this.state.posts.map((d) => <Recipe parentPassesPost={d}/>);
        return (
            <div className="Recipe-box">
                {tiles}
            </div>
        );
    }
}

export class PageFour extends Component {
    constructor(props) {
        super(props);
        this.state = {width: 0, height: 0};
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
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

    render() {
        return (
            <Scrollbars style={{width: this.state.width, height: this.state.height}}>
                <div className="pagefour">
                    <div onClick={this.props.prevclick} style={{top: this.state.height * .47}}
                         className="left-arrow left-arrow_b animate bounce"/>
                    <h1>TRUFFLE&TULLE</h1>
                    <hr/>
                    <h3>The Recipes.</h3>
                    <SearchBar/>
                    <RecipeBox/>
                </div>
            </Scrollbars>
        );
    }
}