import React, {Component} from 'react'
import Footer from '../../footer/Footer'
import ReactDOM from 'react-dom'
import './About.css'
import kelsey1 from '../../images/kelsey/kelsey1.jpeg'
import kelsey2 from '../../images/kelsey/kelsey12.jpeg'
import kelsey3 from '../../images/kelsey/kelsey10.jpeg'
import kelsey4 from '../../images/kelsey/kelsey4.jpeg'
import kelsey5 from '../../images/kelsey/kelsey7.jpeg'
import kelsey6 from '../../images/kelsey/kelsey14.jpeg'

const imgUrls = [
    kelsey1,
    kelsey2,
    kelsey3,
    kelsey4,
    kelsey5,
    kelsey6
];
const letters = [
    'K', 'E', 'L', 'S', 'E', 'Y'
];

class Gallery extends React.Component {

    constructor(props) {
        super(props);
        this.state = {currentIndex: null};
        this.renderImageContent = this.renderImageContent.bind(this);
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
        if(window.innerWidth<600&&window.innerWidth>500){
            this.setState({width: window.innerWidth, height: window.innerHeight*.85});
        }
        else {
            this.setState({width: window.innerWidth, height: window.innerHeight});
        }
    }

    renderImageContent(src, index) {
        return (
            <div className="gallery-image-container">
                <h1>{letters[index]}</h1>
                <img src={src} key={src}
                     style={{width: this.state.height * .3, height: this.state.height * .525 - 100 + "px"}}
                     className="gallery-grid-item"/>
            </div>
        )
    }

    render() {
        return (
            <div className="gallery-grid" style={{height: this.state.height * .525 - 100 + "px"}}>
                {imgUrls.map(this.renderImageContent)}
            </div>
        )
    }
}

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {currentIndex: null};
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
        if(window.innerWidth<500){
            console.log("YES");
            this.setState({width: window.innerWidth, height: window.innerHeight*1.5});
        }
        else {
            this.setState({width: window.innerWidth, height: window.innerHeight});
        }
    }

    render() {
        return (
            <div className="About-Header-container" style={{height: this.state.height - 100 + "px"}}>
                <Gallery/>
            </div>
        );

    }
}

class Content extends Component {

    render() {
        return (
            <div className="Content-container">
                <div className="Content-container-column">
                    <center><h1>About Me</h1></center>
                    <p>
                        Hello
                        <br /><br />
                        I'm Megan. I'm just a pastry cook from Vancouver, Canada that also happens to bake and blog on
                        my weekends!
                        <br /><br />
                        This humble blog of mine started as a fun little hobby while I was in university. I would sit in
                        class, pretending to be typing notes on Suetonius' The Twelve Caesars or the socio-economic
                        factors that led to the rise of Neo-Assyrian empire, when I was actually browsing food blogs and
                        day dreaming about starting my own. Around that time, I also decided that university wasn't for
                        me and I wanted to be a pastry chef. I started this blog to have some fun but also to convince
                        my parents (and myself) that I was serious about baking, at least enough for them to put me into
                        pastry school.
                        <br /><br />
                        The kitchen is my playground, where I have fun, and where I learn. It's where you should, too.
                    </p>
                </div>
                <div className="Content-container-column2">
                    <div className="Content-container-image"></div>
                </div>
            </div>
        );
    }
}

class About extends Component {
    render() {
        return (
            <div className="About-container">
                <Header/>
                <Content/>
                <Footer/>
            </div>
        );
    }
}

export default About;