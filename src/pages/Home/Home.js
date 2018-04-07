import React, {Component} from 'react'
import './Home.css'
import Footer from "../../footer/Footer"
import {Parallax, Background} from 'react-parallax';
import {ViewPager, Frame, Track, View} from 'react-view-pager'
import {SocialIcon} from 'react-social-icons';
import {PageTwo} from './Page2/Page2'
import {PageThree} from './Page3/Page3'
import {PageFour} from './Page4/Page4'
import '../../animations/animate.css'
//TODO PAGE 4 make responsive and search
//TODO Social Media Share Posts Buttons on Page2 -> Update on Post Page
//TODO add in 'no results found for 0 results returned'
//TODO COMPRESS ALL WEBSITE IMAGES
//TODO FIX MOBILE BUG (Height resize)
//TODO PROGRESS BAR | LOAD PERFORMANCE
//TODO REMOVE ALL ERRORS AND WARNINGS FROM JS
//TODO MAKE INSTAGRAM | YOUTUBE | FACEBOOK POINT TO CORRECT LOCATION
//TODO BUY DOMAIN & HOSTING
//TODO DEPLOY On AWS
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
                                url="https://www.youtube.com/channel/UCg8AlYqRz_eAGH_TL9_kgOw"/>
                    <SocialIcon className="Sidebar-social" style={{width: "25px", height: "25px", margin: "10px"}}
                                color="white"
                                url="http://pinterest.com/truffleandtulle"/>
                </div>
            </div>
        );
    }
}

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {width: 0, height: 0, loading: true};
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
                <Parallax
                    className="header"
                    slowerScrollRate="true"
                    bgImage={require('../../images/kelsey/kelsey7-min.jpeg')}
                    bgImageAlt="kelsey"
                    bgStyle={{marginTop: "20px"}}
                    strength={200}
                >
                    <div style={{width: this.state.width + "px", height: this.state.height + "px"}}>
                        <h1>TrufflexTulle</h1>

                        <div className="right-arrow animated wobble" onClick={this.props.nextclick}
                             style={{top: this.state.height * .47 + "px"}}/>
                    </div>
                </Parallax>
            </div>
        );
    }
}


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {loading: true};
    }

    handleLoaded() {
        this.setState({
            loading: false
        });
    }
    componentDidMount(){

    }

    render() {
        return (
            <div>
                <ViewPager tag="main">
                    <Frame className="frame">
                        <Track
                            ref={c => this.track = c}
                            viewsToShow={1}
                            className="track"
                        >
                            <View className="view">
                                <Sidebar/>
                                <Header nextclick={() => this.track.next()}/>
                            </View>
                            <View className="view">
                                <PageTwo nextclick={() => this.track.next()} prevclick={() => this.track.prev()}/>
                            </View>
                            <View className="view">
                                <PageThree nextclick={() => this.track.next()} prevclick={() => this.track.prev()}/>
                            </View>
                            <View className="view">
                                <PageFour nextclick={() => this.track.next()} prevclick={() => this.track.prev()}/>
                            </View>
                        </Track>
                    </Frame>
                </ViewPager>
                <Footer/>
            </div>
        );
    }
}

export default Home;