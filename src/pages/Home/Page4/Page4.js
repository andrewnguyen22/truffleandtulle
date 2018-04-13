import React, {Component} from 'react'
import {Scrollbars} from 'react-custom-scrollbars';
import './Page4.css'
import axios from "axios/index";

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
        this.props.setParentPosts(this.state.inputField);
        this.setState({
            inputField: ''
        });
        this.refs.input1.value='';
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
                           ref='input1'
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
        this.state = {
            redirect: 0,
        };
    }

    handleOnClick = () => {
        this.setState({redirect: 1});
    };

    // noinspection JSMethodCanBeStatic
    openInNewTab(url) {
        const win = window.open(url, '_blank');
        win.focus();
    }

    render() {
        const title = this.props.parentPassesPost.title.rendered.toString().substr(0, 20);
        let shortenedTitle = title.substr(0, Math.min(title.length, title.lastIndexOf(" ")));
        if (title.length >= 19)
            shortenedTitle += "...";
        if (this.state.redirect === 1) {
            this.setState({redirect: 0});
            this.openInNewTab(this.props.parentPassesPost.acf.recipe)
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
                    <h3>{this.props.parentPassesPost.acf.tags}</h3>
                </div>
            </div>
        );
    }
}

class RecipeBox extends Component {
    constructor(props) {
        super(props);
        this.state = {posts: [], currentURL: '', query: ''};
        this.setParentPosts = this.setParentPosts.bind(this);
    }

    componentDidMount() {
        this.setState({posts: this.props.recipes})
    }

    componentWillReceiveProps(nextProps) {
        //Receive Initial 6 posts from parent
        if (nextProps.recipes !== undefined && nextProps.more === undefined) {
            this.setState({posts: nextProps.recipes, currentURL: this.props.recurl})
        }
        //Load More If More Button Pressed
        else if (this.state.currentURL === this.props.recurl && nextProps.more !== undefined) {
            this.more(nextProps);
        }
        //Search On Page If Button Pressed
        else {
            this.search(nextProps);
        }
    }

    /**
     * Function to load more
     */
    more(props) {
        axios.get(this.props.recurl + "&per_page=" + 6 * props.more).then(
            response => this.setState({posts: response.data})
        ).catch(e => {
            console.log(e);
        });
    }

    /**
     * Function to search
     */
    search(props) {
        axios.get(this.props.rsearchurl + this.state.query + "&per_page=" + 6 * props.more).then(
            response => this.setState({posts: response.data})
        ).catch(e => {
            console.log(e);
        });
    }

    setParentPosts(data) {
        axios.get(this.props.rsearchurl + data + "&per_page=" + 6).then(
            response => this.setState({query: data, posts: response.data, currentURL: this.props.rsearchurl})
        ).catch(e => {
            console.log(e);
        });
    };

    render() {
        let tiles = this.state.posts.map((d, i) => <Recipe {...this.props} parentPassesPost={d} key={i}/>);
        if (this.state.posts.length === 0) {
            tiles = "I'm Sorry! No Results Found :("
        }
        return (
            <div>
                <SearchBar {...this.props} setParentPosts={this.setParentPosts}/>
                <div className="Recipe-box">
                    {tiles}
                </div>
            </div>
        );
    }
}

export class PageFour extends Component {
    constructor(props) {
        super(props);
        this.state = {width: 0, height: 0,redirect: 0, more:1};
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.morePosts = this.morePosts.bind(this);
    }

    morePosts() {
        this.setState({more: this.state.more + 1});
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
        let style;
        if (this.state.width > 700) {
            style = {width: this.state.width + "px", height: this.state.height + "px"}
        }
        else {
            style = {width: "100%", height: "600px"};
        }
        return (
            <Scrollbars style={style}>
                <div className="pagefour">
                    <div onClick={this.props.prevclick} style={{top: this.state.height * .47}}
                         className="left-arrow left-arrow_b animate bounce"/>
                    <h1>TRUFFLE&TULLE</h1>
                    <hr/>
                    <h3>The Recipes.</h3>
                    <RecipeBox {...this.props} more={this.state.more}/>
                    <center>
                        <button className="Blog-load-more-button" onClick={this.morePosts}>
                            LOAD MORE
                        </button>
                    </center>
                </div>
            </Scrollbars>
        );
    }
}