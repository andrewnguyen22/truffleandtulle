import React, {Component} from 'react'
import {Redirect} from 'react-router';
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

import food0 from '../../../images/kelsey/food/food1-min.JPG'
import food1 from '../../../images/kelsey/food/food10-min.jpeg'
import food2 from '../../../images/kelsey/food/food3-min.jpeg'
import food3 from '../../../images/kelsey/food/food4-min.jpeg'
import food4 from '../../../images/kelsey/food/food5-min.jpeg'
import food5 from '../../../images/kelsey/food/food888-min.jpeg'
import food6 from '../../../images/kelsey/food/food6-min.jpeg'
import history from "../../../history/History";

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
        // noinspection JSUnresolvedVariable
        let html = this.props.parentPassesPost.excerpt.rendered;
        html = html.replace("href", "class");
        // noinspection JSUnresolvedVariable
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
                    <p className="Preview-date">{this.props.parseDate(this.props.parentPassesPost.date)}</p>
                    <div className="Preview-text" dangerouslySetInnerHTML={{__html: html}}>

                    </div>
                    <p>by Kelsey Korfhage</p>
                    <div className="Preview-share-icons">
                        <SocialIcon className="Sidebar-social" style={{
                            width: "25px", height: "25px",
                            margin: "10px", marginLeft: "0px"
                        }}
                                    color="black"
                                    url={"https://twitter.com/intent/tweet?text=Check%20Out%20This%20Post%20\"" + this.props.parentPassesPost.title.rendered + "\"On%20Truffle%20And%20Tulle%20At%20" +
                                    "http://truffleandtulle.com/link?" + this.props.parentPassesPost.id}/>
                        <SocialIcon className="Sidebar-social" style={{width: "25px", height: "25px", margin: "10px"}}
                                    color="black"
                                    url="http://instagram.com/truffleandtulle"/>
                        <SocialIcon className="Sidebar-social" style={{width: "25px", height: "25px", margin: "10px"}}
                                    color="black"
                                    network="facebook"
                                    url="http://#"
                                    onClick={
                                        () => window.open('https://www.facebook.com/sharer/sharer.php?u=' +
                                            "www.truffleandtulle.com/link?" + this.props.parentPassesPost.id,
                                            'facebook-share-dialog',
                                            'width=626,height=436')
                                    }
                        />
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
        }];
        // noinspection HtmlDeprecatedTag
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

// noinspection JSUnresolvedLibraryURL
let html = "<!-- LightWidget WIDGET --><script src=\"https://cdn.lightwidget.com/widgets/lightwidget.js\"></script><iframe src=\"//lightwidget.com/widgets/e95aa8509cbc52dc8ac9ba47621b0f2f.html\" scrolling=\"auto\" allowtransparency=\"true\" " +
    "class=\"lightwidget-widget\" style=\"width: 100%; height:800px; overflow:hidden; border: 0; \"></iframe>\n";

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
        this.state = {width: 0, height: 0, pics: 3, posts: [], query: ''};
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        if (this.props.posts !== undefined) {
            this.setState({
                posts: this.props.posts
            })
        }
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.posts !== undefined) {
            this.setState({
                posts: nextProps.posts
            })
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

    render() {
        let style;
        if (this.state.width > 0) {
            style = {width: this.state.width + "px", height: this.state.height + "px", background: "#FFF"}
        }
        else {
            style = {width: this.state.width + "px", height: "600px", background: "#FFF"};
        }
        const BlogPosts = this.props.posts.map((d, i) => <P2BlogPost {...this.props} parentPassesPost={d} key={i}/>);
        return (
            <Scrollbars style={style}>
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
