import React, {Component} from 'react'
import './Home.css'
import Footer from "../../footer/Footer"
import {Parallax} from 'react-parallax';
import {ViewPager, Frame, Track, View} from 'react-view-pager'
import {SocialIcon} from 'react-social-icons';
import {PageTwo} from './Page2/Page2'
import {PageThree} from './Page3/Page3'
import {PageFour} from './Page4/Page4'
import '../../animations/animate.css'
import Meta from '../../meta/Meta'
import seoImage from '../../images/icons/TRUFFLE&TULLE_lg.png'

class SocialBar extends Component {
    constructor(props) {
        super(props);
        this.state = {width: 0};
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
        this.setState({width: window.innerWidth});
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
        this.handleLoaded = this.handleLoaded.bind(this)
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

    handleLoaded() {
        for (let i = 0; i < 3; ++i)
            this.props.nextclick();
        for (let i = 0; i < 3; ++i)
            this.props.prevclick();
        this.props.doneLoading()
    }

    render() {
        let style;
        if (this.state.width > 700) {
            style = {width: this.state.width + "px", height: this.state.height + "px"};
        }
        else {
            style = {width: "100%", height: "600px"};
        }
        return (
            <div>
                <div className='preload'>
                    <img src={require('../../images/kelsey/kelsey7-min.jpeg')} onLoad={this.handleLoaded}
                         alt='invisible'/>
                </div>
                <Parallax
                    className="header"
                    slowerScrollRate="true"
                    bgImage={require('../../images/kelsey/kelsey7-min.jpeg')}
                    bgImageAlt="kelsey"
                    bgStyle={{marginTop: "100px"}}
                    strength={100}
                >
                    <div style={style}>
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
        this.state = {props: '', width: 0, height: 0, loading: true, viewpager: ''};
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentWillMount() {
        this.props.setOnHome(true);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
        this.props.setOnHome(false);
        this.props.youtubeLoaded(false);
    }

    componentWillReceiveProps(props) {
        this.setState({props: props});
        this.updateWindowDimensions()
    }

    updateWindowDimensions() {
        let passProps;
        if (this.state.props !== undefined && this.state.props !== '')
            passProps = this.state.props;
        else {
            passProps = {...this.props};
        }
        if (window.innerWidth > 700) {
            this.setState({
                viewpager: <ViewPager tag="main">
                    <Frame className="frame">
                        <Track
                            ref={c => this.track = c}
                            viewsToShow={1}
                            className="track"
                        >
                            <View className="view">
                                <SocialBar/>
                                <Header {...passProps} nextclick={() => this.track.next()}
                                        prevclick={() => this.track.prev()}/>
                            </View>
                            <View className="view">
                                <PageTwo {...passProps} nextclick={() => this.track.next()}
                                         prevclick={() => this.track.prev()}/>
                            </View>
                            <View className="view">
                                <PageThree {...passProps} nextclick={() => this.track.next()}
                                           prevclick={() => this.track.prev()}/>
                            </View>
                            <View className="view">
                                <PageFour {...passProps} nextclick={() => this.track.next()}
                                          prevclick={() => this.track.prev()}/>
                            </View>
                        </Track>
                    </Frame>
                </ViewPager>,
                width: window.innerWidth, height: window.innerHeight
            });
        } else {
            this.setState({
                viewpager: <ViewPager tag="main">
                    <Frame className="frame">
                        <Track
                            ref={c => this.track = c}
                            viewsToShow={1}
                            className="track"
                        >
                            <View className="view">
                                <SocialBar/>
                                <Header {...passProps} nextclick={() => this.track.next()}
                                        prevclick={() => this.track.prev()}/>
                            </View>
                            <View className="view">
                                <PageFour {...passProps} nextclick={() => this.track.next()}
                                          prevclick={() => this.track.prev()}/>
                            </View>
                            <View className="view">
                                <PageThree {...passProps} nextclick={() => this.track.next()}
                                           prevclick={() => this.track.prev()}/>
                            </View>
                        </Track>
                    </Frame>
                </ViewPager>,
                width: window.innerWidth, height: window.innerHeight
            });
        }

    }

    render() {
        const description = 'Welcome to the homepage of Truffle&Tulle. ' +
            'Here you will find the latest posts, recipes, and photos.' +
            'I hope you enjoy my blog, you are always welcome here!'
        return (
            <div>
                <Meta title='Home' description={description} image={seoImage} url='truffleandtulle.com/'/>
                {this.state.viewpager}
                <Footer/>
            </div>
        );
    }
}

export default Home;