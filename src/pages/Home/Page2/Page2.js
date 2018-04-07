import React, {Component} from 'react'
import {Redirect} from 'react-router';
import {Parallax, Background} from 'react-parallax';
import {Scrollbars} from 'react-custom-scrollbars';
import './Page2.css'
import {SocialIcon} from 'react-social-icons';
import {ViewPager, Frame, Track, View} from 'react-view-pager'
import kelsey0 from '../../../images/kelsey/kelsey20-min.jpeg'
import kelsey1 from '../../../images/kelsey/kelsey30-min.jpeg'
import kelsey2 from '../../../images/kelsey/kelsey4-min.jpeg'
import kelsey3 from '../../../images/kelsey/kelsey23-min.jpeg'
import kelsey4 from '../../../images/kelsey/kelsey1-min.jpeg'
import kelsey5 from '../../../images/kelsey/kelsey28-min.jpeg'
import kelsey6 from '../../../images/kelsey/kelsey18-min.jpeg'

import food0 from '../../../images/kelsey/food/food1.JPG'
import food1 from '../../../images/kelsey/food/food10.jpeg'
import food2 from '../../../images/kelsey/food/food3.jpeg'
import food3 from '../../../images/kelsey/food/food4.jpeg'
import food4 from '../../../images/kelsey/food/food5.jpeg'
import food5 from '../../../images/kelsey/food/food888.jpeg'
import food6 from '../../../images/kelsey/food/food6.jpeg'
import history from "../../../history/History";
import axios from "axios/index";

const searchurl = "http://localhost:8888/wordpress/wp-json/wp/v2/posts?search=";
const wordpressurl = "http://localhost:8888/wordpress/wp-json/wp/v2/posts?_embed";
const tagsurl = "http://localhost:8888/wordpress/wp-json/wp/v2/tags?include=";
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
const kelseyImages = [
    kelsey0,
    kelsey1,
    kelsey2,
    kelsey3,
    kelsey4,
    kelsey5,
    kelsey6
];

const foodImages = [
    food0,
    food1,
    food2,
    food3,
    food4,
    food5,
    food6
];

class P2BlogPost extends Component {
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
        var html = this.props.parentPassesPost.excerpt.rendered;
        html = html.replace("href", "class");
        return (
            <div>
                <hr/>
                <br/><br/>
                <div className="P2-blog-post" onClick={this.handleOnClick}>
                    <div className="P2-blog-post-img"
                         style={{
                             backgroundImage: 'url(' +
                             this.props.parentPassesPost.better_featured_image.source_url + ')'
                         }}/>
                    <h1>{this.props.parentPassesPost.title.rendered}</h1>
                    <p className="Preview-date">{this.parseISOLocal(this.props.parentPassesPost.date)}</p>
                    <div className="Preview-text" dangerouslySetInnerHTML={{__html: html}}>

                    </div>
                    <p>by Kelsey Korfhage</p>
                    <div className="Preview-share-icons">
                        <SocialIcon className="Sidebar-social" style={{
                            width: "25px", height: "25px",
                            margin: "10px", marginLeft: "0px"
                        }}
                                    color="black"
                                    url="http://twitter.com/truffleandtulle"/>
                        <SocialIcon className="Sidebar-social" style={{width: "25px", height: "25px", margin: "10px"}}
                                    color="black"
                                    url="http://instagram.com/truffleandtulle"/>
                        <SocialIcon className="Sidebar-social" style={{width: "25px", height: "25px", margin: "10px"}}
                                    color="black"
                                    url="http://facebook.com/truffleandtulle"/>
                        <SocialIcon className="Sidebar-social" style={{width: "25px", height: "25px", margin: "10px"}}
                                    color="black"
                                    url="https://www.youtube.com/channel/UCg8AlYqRz_eAGH_TL9_kgOw"/>
                        <SocialIcon className="Sidebar-social" style={{width: "25px", height: "25px", margin: "10px"}}
                                    color="black"
                                    url="http://pinterest.com/truffleandtulle"/>
                    </div>
                </div>
                <br/><br/>
            </div>
        );
    }
}

class Carousel extends Component {
    constructor(props) {
        super(props);
        this.count = 0;
        this.dir = 0;
    }

    componentDidMount() {
        this.timer = setInterval(() => this.nextPicture(), 5000);
    }

    nextPicture() {
        if (this.count === 4) {
            this.dir = 1;
        }
        else if (this.count === 0) {
            this.dir = 0
        }
        if (this.dir === 1) {
            this.track.prev();
            this.count--;
        }
        else {
            this.track.next();
            this.count++;
        }
    }

    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer = null;
    }

    render() {
        const animations = [{
            prop: 'scale',
            stops: [
                [-200, 0.85]
            ]
        }]
        return (
            <div>
                <ViewPager className="P2-viewpager" tag="main">
                    <Frame className="frame">
                        <Track
                            ref={c => this.track = c}
                            swipe={false}
                            viewsToShow={this.props.pics}
                            animations={animations}
                            className="track"
                        >
                            <View className="view">
                                <div className="Viewpager-image"
                                     style={{backgroundImage: 'url(' + this.props.images[0] + ')'}}/>
                            </View>
                            <View className="view">
                                <div className="Viewpager-image"
                                     style={{backgroundImage: 'url(' + this.props.images[1] + ')'}}/>
                            </View>
                            <View className="view">
                                <div className="Viewpager-image"
                                     style={{backgroundImage: 'url(' + this.props.images[2] + ')'}}/>
                            </View>
                            <View className="view">
                                <div className="Viewpager-image"
                                     style={{backgroundImage: 'url(' + this.props.images[3] + ')'}}/>
                            </View>
                            <View className="view">
                                <div className="Viewpager-image"
                                     style={{backgroundImage: 'url(' + this.props.images[4] + ')'}}/>
                            </View>
                            <View className="view">
                                <div className="Viewpager-image"
                                     style={{backgroundImage: 'url(' + this.props.images[5] + ')'}}/>
                            </View>
                            <View className="view">
                                <div className="Viewpager-image"
                                     style={{backgroundImage: 'url(' + this.props.images[6] + ')'}}/>
                            </View>
                        </Track>
                    </Frame>
                </ViewPager>
            </div>
        );
    }
}

var html = "<!-- LightWidget WIDGET --><script src=\"https://cdn.lightwidget.com/widgets/lightwidget.js\"></script><iframe src=\"//lightwidget.com/widgets/d1b1279515ee5fcdb30d454042f510f5.html\" scrolling=\"auto\" allowtransparency=\"true\" " +
    "class=\"lightwidget-widget\" style=\"width: 100%; height:800px; overflow:hidden; border: 0; \"></iframe>\n"

class Portfolio extends Component {
    render() {
        return (

            <div className="P2-portfolio-container" dangerouslySetInnerHTML={{__html: html}}/>
        );
    }
}

export class PageTwo extends Component {
    constructor(props) {
        super(props);
        this.state = {width: 0, height: 0, pics: 3, posts: [], currentURL: wordpressurl, query: ''};
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
        if (window.innerWidth > 1000) {
            this.setState({pics: 3})
        } else {
            this.setState({pics: 1})
        }

    }

    setParentPosts(data) {
        axios.get(searchurl + data + "&per_page=" + 6).then(
            response => this.setState({query: data, posts: response.data, currentURL: searchurl})
        ).catch(e => {
            console.log(e);
        });
    };

    render() {
        const BlogPosts = this.state.posts.map((d) => <P2BlogPost parentPassesPost={d}/>);
        return (
            <Scrollbars style={{background:"#FFF", width: this.state.width, height: this.state.height}}>
                <div className="pagetwo">
                    <div onClick={this.props.nextclick} style={{top: this.state.height * .47}}
                         className="right-arrow right-arrow_b animate bounce"/>
                    <div onClick={this.props.prevclick} style={{top: this.state.height * .47}}
                         className="left-arrow left-arrow_b animate bounce"/>
                    <div className="P2-header-container">
                        <h1>TRUFFLE&TULLE</h1>
                        <hr/>
                        <br/>
                        <h3>A fashion blog about baking.</h3>
                    </div>
                    <Carousel pics={this.state.pics} images={kelseyImages}/>
                    <h1 className="P2-subtitle">What's New With Truffle&Tulle?</h1>
                    {BlogPosts}
                    <Carousel pics={this.state.pics} images={foodImages}/>
                    <div className="Instagram-header">
                        <hr/>
                        <h1>Follow Me On Instagram</h1>
                        <h3>
                            Check out all of my latest pictures on my very favorite social media platform!
                            <br/>
                            Thank You For Your Support :)
                        </h3>
                    </div>
                    <Portfolio/>
                </div>
            </Scrollbars>
        );
    }
}