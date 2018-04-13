import React, {Component} from 'react'
import './Footer.css'
import {Redirect} from 'react-router';
class Footer extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            redirect: 0,
            destination: ''
        };
    }

    handleClick = (dest) => {
        this.setState({redirect: 1, destination: dest});
    }

    render() {
        if (this.state.redirect === 1) {
            this.setState({redirect: 0});
            return (<Redirect to={{
                pathname: '/'+this.state.destination,
                state: {referrer: this.props.parentPassesPost}
            }}/>);
        }
        return (
            <div className="Footer-container">
                <div className="col col1">
                    <div className="innercol">
                        <p>
                            All Rights Reserved
                        </p>
                        <p>
                            March 2018
                        </p>
                        <p>
                            © TRUFFLEANDTULLE
                        </p>
                    </div>
                </div>
                <div className="col col2">
                    <div className="innercol">
                        <br/>
                        <a href="" onClick={() =>this.handleClick("blog")}>
                            Blog Page
                        </a>
                        <br/><br/>
                        <a href="" onClick={() =>this.handleClick("about")}>
                            About Page
                        </a>
                        <br/><br/>
                        <a href="" onClick={() =>this.handleClick("contact")}>
                            Contact Page
                        </a>
                    </div>
                </div>
                <div className="col col3">
                    <div className="innercol">
                        <br />
                        <a href="https://www.youtube.com/truffleandtulle">
                            Youtube
                        </a>
                        <br /><br />
                        <a href="https://www.pinterest.com/truffleandtulle">
                            Pinterest
                        </a>
                        <br /> <br />
                        <a href="" onClick={() =>this.handleClick("portfolio")}>
                            Portfolio Page
                        </a>
                    </div>
                </div>
                <div className="col col4">
                    <div className="innercol">

                        <br/>
                        <a href="https://twitter.com/truffleandtulle">
                            Twitter
                        </a>
                        <br/><br/>
                        <a href="https://www.instagram.com/truffleandtulle">
                            Instagram
                        </a>
                        <br/><br/>
                        <a href="https://www.facebook.com/truffleandtulle">
                            Facebook
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;