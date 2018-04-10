import React, {Component} from 'react'
import './ParallaxBackground.css'
export class ParallaxBackground extends Component {
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

    handleScroll() {
        if (window.scrollY < (this.state.height) * 3 - 20) {
            this.setState({style: "parallax1 parallax1-before"})
        }
        else if (window.scrollY < (this.state.height) * 5 - 20)
            this.setState({style: "parallax1 parallax2-before"});
        else
            this.setState({style: "parallax1 parallax3-before"})

    }

    render() {
        return (
            <div>
                <div className={this.state.style} style={{minHeight: this.state.height + "px",
                    backgroundImage: 'url(' + this.props.background + ')'}}/>
                <div className="Parallax1-header parallax" style={{minHeight: this.state.height + "px"}}>
                    <h1>{this.props.message}
                    </h1>
                    {this.props.content}
                </div>
            </div>
        );
    }
}