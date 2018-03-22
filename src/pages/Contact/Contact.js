import React, {Component} from 'react'
import './Contact.css'
import Footer from "../../footer/Footer"

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
            <header className="Contact-container"
                    style={{width: this.state.width + "px", height: this.state.height + "px"}}>
                <div className="Contact-wrapper"
                     style={{width: this.state.width + "px", height: this.state.height + "px"}}>
                    <div className="Contact-content">
                        <h1>Gmail:</h1>
                        <h2>truffleandtulle@gmail.com</h2>
                        <h1>Facebook:</h1>
                        <h2>facebook.com/truffleandtulle</h2>
                        <h1>Instagram:</h1>
                        <h2>@truffleandtulle</h2>
                        <h1>Twitter:</h1>
                        <h2>@truffleandtulle</h2>
                        <h5 className="Contact-title">
                            Let's Get In Touch
                        </h5>
                    </div>
                </div>
            </header>
        );
    }
}

class Contact extends Component {
    render() {
        return (
            <div>
                <Header/>
                <Footer/>
            </div>
        );
    }
}

export default Contact;