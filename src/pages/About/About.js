import React, {Component} from 'react'
import Footer from '../../footer/Footer'
import ReactDOM from 'react-dom'
import './About.css'
import kelsey1 from '../../images/kelsey/kelsey12-min.jpeg'
import kelsey2 from '../../images/kelsey/kelsey21-min.jpeg'
import kelsey3 from '../../images/kelsey/kelsey6-min.jpeg'
import kelsey4 from '../../images/kelsey/kelsey16-min.jpeg'
import kelsey5 from '../../images/kelsey/kelsey22-min.jpeg'
import kelsey6 from '../../images/kelsey/kelsey14-min.jpeg'

const imgUrls = [
    kelsey1,
    kelsey2,
    kelsey3,
    kelsey4,
    kelsey5,
    kelsey6
];

class GalleryTile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="gallery-grid-tile">
                <div className="gallery-grid-item-container" style={{
                    backgroundImage:
                    'url(' + this.props.backgroundi + ')'
                }}>
                    <h1 className="gallery-grid-item-letter">{this.props.letter}</h1>
                </div>
            </div>
        );
    }
}

class Gallery extends React.Component {

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
        if (window.innerWidth < 600 && window.innerWidth > 500) {
            this.setState({width: window.innerWidth, height: window.innerHeight * .85});
        }
        else {
            this.setState({width: window.innerWidth, height: window.innerHeight});
        }
    }

    render() {
        return (
            <div className="About-Header-container">
                <div className="gallery-grid">
                    <GalleryTile backgroundi={kelsey1} letter="K"/>
                    <GalleryTile backgroundi={kelsey2} letter="E"/>
                    <GalleryTile backgroundi={kelsey3} letter="L"/>
                    <GalleryTile backgroundi={kelsey4} letter="S"/>
                    <GalleryTile backgroundi={kelsey5} letter="E"/>
                    <GalleryTile backgroundi={kelsey6} letter="Y"/>
                    {/*{imgUrls.map(this.renderImageContent)}*/}
                </div>
            </div>
        )
    }
}

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {currentIndex: null};
        this.state = {width: 0, height: 0, offset: 100, multiplier: 1};
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
            <Gallery/>

        );

    }
}

class Content extends Component {

    render() {
        return (
            <div className="Content-container">
                <div className="Content-container-column">
                    <center><h1>About Kelsey</h1></center>
                    <p>
                        Writing a post about yourself is easier said than done. They say you’re supposed to
                        know yourself better than anyone else. So why is it that when I sit down to actually write,
                        I find myself coming up short?
                        <br/><br/>
                        Througout my life, I found myself diving head first into many different hobbies, because
                        challenging myself and testing the limits of my achievement has always been important to me.
                        Some people can't help but eat and breathe one particular passion. Among the many different
                        hobbies I had pursued, I wondered why I had never felt that feeling.
                        <br/><br/>
                        I stumbled upon baking and immediately knew that this was "it." This is what people felt and
                        talked about and wanted so badly. I had never seen myself as a creative person, but baking just
                        felt right to me, the dough felt natural in my hands, the fusion of art and science continually
                        left me in awe. I hope you enjoy my art, and I hope my passion inspires others to find theirs.
                        <br/><br/>
                        This is the true way to happiness.
                    </p>
                </div>
                <div className="Content-container-column2">
                    <div className="Content-container-image"/>
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