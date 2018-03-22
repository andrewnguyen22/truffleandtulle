import React, {Component} from 'react'
import './Home.css'
import Footer from "../../footer/Footer"
import {Parallax, Background} from 'react-parallax';
import Gallery from 'react-photo-gallery';
import {Redirect} from 'react-router';
import Measure from 'react-measure';
import {SocialIcon} from 'react-social-icons';
import CarouselImg1 from '../../images/kelsey/kelsey24.jpeg'
import CarouselImg2 from '../../images/kelsey/kelsey23.jpeg'
import CarouselImg3 from '../../images/kelsey/kelsey17.jpeg'
import CarouselImg4 from '../../images/kelsey/kelsey22.jpeg'
import CarouselImg5 from '../../images/kelsey/kelsey29.jpeg'
import CarouselImg6 from '../../images/kelsey/kelsey21.jpeg'
import FoodImg1 from '../../images/background6.png'
import FoodImg2 from '../../images/background6.png'
import FoodImg3 from '../../images/background6.png'
import FoodImg4 from '../../images/background6.png'
import FoodImg5 from '../../images/background6.png'
import FoodImg6 from '../../images/background6.png'
import history from "../../history/History";

var kelseyphotos = [
    CarouselImg1,
    CarouselImg2,
    CarouselImg3,
    CarouselImg4,
    CarouselImg5,
    CarouselImg6,
];

var foodphotos = [
    FoodImg1,
    FoodImg2,
    FoodImg3,
    FoodImg4,
    FoodImg5,
    FoodImg6,
];

class Header extends Component {
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
            <div style={{background: "white"}}>
                <Parallax
                    className="header"
                    slowerScrollRate="true"
                    bgImage={require('../../images/kelsey/kelsey7.jpeg')}
                    bgImageAlt="kelsey"
                    bgStyle={{marginTop: "20px"}}
                    strength={200}
                >
                    <div style={{width: this.state.width + "px", height: this.state.height + "px"}}>
                        <h1>TrufflexTulle</h1>
                    </div>
                </Parallax>
            </div>
        );
    }
}

class Parallax1 extends Component {
    constructor(props) {
        super(props);
        this.state = {width: 0, height: 0, style: "parallax1 parallax1-before"};
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        window.addEventListener('scroll', this.handleScroll)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
        window.addEventListener('scroll', this.handleScroll)
    }

    updateWindowDimensions() {
        this.setState({width: window.innerWidth, height: window.innerHeight});
    }

    handleScroll(event) {
        if (window.scrollY < (this.state.height) * 3 - 20) {
            this.setState({style: "parallax1 parallax1-before"})
        }
        else if (window.scrollY < (this.state.height) * 5 - 20)
            this.setState({style: "parallax1 parallax2-before"})
        else
            this.setState({style: "parallax1 parallax3-before"})

    }

    render() {
        return (
            <div>
                <div className={this.state.style} style={{minHeight: this.state.height + "px"}}/>
                <div className="Parallax1-header parallax" style={{minHeight: this.state.height + "px"}}>
                    <h1>Let's Create Together
                    </h1>

                </div>
            </div>
        );
    }
}

class Sidebar extends Component {
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
            <div>
                <div className="Home-sidebar" style={{width: this.state.width - 30 + "px"}}>
                    <SocialIcon className="Sidebar-social" style={{width: "25px", height: "25px", margin: "10px"}}
                                color="white"
                                url="http://twitter.com/truffleandtulle"/>
                    <SocialIcon className="Sidebar-social" style={{width: "25px", height: "25px", margin: "10px"}}
                                color="white"
                                url="http://instagram.com/truffleandtulle"/>
                    <SocialIcon className="Sidebar-social" style={{width: "25px", height: "25px", margin: "10px"}}
                                color="white"
                                url="http://facebook.com/truffleandtulle"/>
                    <SocialIcon className="Sidebar-social" style={{width: "25px", height: "25px", margin: "10px"}}
                                color="white"
                                url="http://youtube.com/truffleandtulle"/>
                    <SocialIcon className="Sidebar-social" style={{width: "25px", height: "25px", margin: "10px"}}
                                color="white"
                                url="http://pinterest.com/truffleandtulle"/>
                </div>
            </div>
        );
    }
}

class Explainer extends Component {
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
            <div>
                <div className="Explainer-container"
                     style={{width: this.state.width + "px", height: this.state.height + "px", overflow: "hidden"}}>
                    <div className="Explainer-content"
                         style={{
                             width: this.state.width + "px", height: this.state.height + "px",
                             display: "table-cell", verticalAlign: "middle", position: "relative", top: "-50px"
                         }}>
                        <div className="Explainer-col">
                            <h1>What is Truffle & Tulle?</h1>
                            <h5>
                                I would like to introduce to you Truffle and Tulle: my very own
                                baking blog where I upload my recipes as well as post about my
                                life as a baker.
                                <br/><br/>
                                Born out of a love of the culinary arts,
                                Truffle and Tulle is an all encompassing baking blog
                                that will contain many recipes as well as my experiences
                                that accompany them.
                                I sincerely hope that you enjoy this blog and I fully commit to
                                be as transparent and helpful as possible with every post.

                                <br/> <br/>
                                Happy Baking :)
                            </h5>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class ImageGal extends Component {
    constructor() {
        super();
        this.state = {width: -1,redirect:0};
    }

    handleClick = () => {
        this.setState({redirect: 1});
    }

    render() {
        if (this.state.redirect === 1) {
            this.setState({redirect: 0});
            history.push('/home');
            return (<Redirect to={{
                pathname: '/blog'
            }}/>);
        }
        var photos;
        const width = this.state.width;
        return (
            <Measure bounds onResize={(contentRect) => this.setState({width: contentRect.bounds.width})}>
                {
                    ({measureRef}) => {
                        if (width < 1) {
                            return <div ref={measureRef}></div>;
                        }
                        let columns = 2;
                        photos = [
                            {src: this.props.pics[0], width: 3, height: 4},
                            {src: this.props.pics[1], width: 3, height: 4}
                        ];
                        if (width >= 480) {
                            columns = 4;
                            photos = [
                                {src: this.props.pics[0], width: 3, height: 4},
                                {src: this.props.pics[1], width: 3, height: 4},
                                {src: this.props.pics[2], width: 3, height: 4},
                                {src: this.props.pics[3], width: 3, height: 4}
                            ];
                        }
                        if (width >= 1024) {
                            columns = 6;
                            photos = [
                                {src: this.props.pics[0], width: 3, height: 4},
                                {src: this.props.pics[1], width: 3, height: 4},
                                {src: this.props.pics[2], width: 3, height: 4},
                                {src: this.props.pics[3], width: 3, height: 4},
                                {src: this.props.pics[4], width: 3, height: 4},
                                {src: this.props.pics[5], width: 3, height: 4}
                            ];
                        }
                        return <div onClick={this.handleClick} style={{background: "black"}} ref={measureRef}><Gallery
                            photos={photos} rows={1} columns={columns}/></div>
                    }
                }
            </Measure>
        )
    }
}

class RecentComponent extends Component {
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
            <div className="Recent-container">
                <div className="Recent-image-slideshow-container">
                    <div className="Recent-image-slideshow2">
                        <div className="imagegal2">
                            <ImageGal pics={foodphotos}/>
                        </div>
                    </div>
                </div>
                <div className="Recent-posts-container">
                    <div className="Recent-posts-col">
                        <div className="Recent-posts-content">
                        </div>
                    </div>
                    <div className="Recent-posts-col Rpcol2">
                        <div className="Recent-posts-content">

                        </div>
                    </div>
                </div>
                <div className="Recent-image-slideshow-container">
                    <div className="Recent-image-slideshow2">
                        <div className="imagegal2">
                            <ImageGal pics={kelseyphotos}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class Home extends Component {
    render() {
        return (
            <div>
                <div className="preload" style={{display: "block"}}>
                    <div className="parallax1 parallax1-before"/>
                    <div className="parallax1 parallax2-before"/>
                    <div className="parallax1 parallax3-before"/>
                </div>
                <Sidebar/>
                <Header/>
                <RecentComponent/>
                <Parallax1/>
                {/*YOUTUBE COMPONENT TO REPLACE EXPLAINER*/}
                <Explainer/>
                <Parallax1/>
                <Explainer/>
                <Parallax1/>
                <Footer/>
            </div>
        );
    }
}

export default Home;