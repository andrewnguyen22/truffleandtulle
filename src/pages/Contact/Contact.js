import React, {Component} from 'react'
import './Contact.css'
import Footer from "../../footer/Footer"
import {ParallaxBackground} from "../Home/Parallax/ParallaxBackground.js"

var subscription_form = "<iframe width=\"540\" height=\"601\" src=\"https://my.sendinblue.com/users/subscribe/js_id/36pic/id/1\" frameborder=\"0\" scrolling=\"no\" allowfullscreen style=\"display: block;margin-left: auto;margin-right: auto; \"></iframe>"
var mobile_subs_form = "<iframe width=\"300\" height=\"560\" src=\"https://my.sendinblue.com/users/subscribe/js_id/36pic/id/2\" frameborder=\"0\" scrolling=\"no\" allowfullscreen style=\"display: block;margin-left: auto;margin-right: auto;\"></iframe>"

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {width: 0, height: 0, form: subscription_form};
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
        if (window.innerWidth < 500) {

            this.setState({form: mobile_subs_form})
        }
        else {
            this.setState({form: subscription_form})
        }
    }

    render() {
        let style;
        if (this.state.width > 700) {
            style = {width: this.state.width + "px", height: this.state.height + "px"}
        }
        else {
            style = {width: "100%", height: "600px"};
        }
        return (
            <div>
                <div className="Contact-header">
                    <div className="Contact-header-banner">
                        <div className="Contact-header-banner-content">
                            <h1>Get In Touch With Kelsey</h1>
                            <br/>
                            <div className="divider"/>
                        </div>
                    </div>
                    <div className="Contact-header-content">
                        <center><h1>CONTACT ME</h1></center>
                        <hr/>

                        <center><h1>Talk To Me | Collab With Me </h1></center>
                        <h3>If you’re new around here, the best place to get started is the Online Marketing Made Easy
                            Podcast.
                            <br/><br/>

                            If you’re ready to kick things up a notch, I invite you to check out one of my FREE online
                            marketing cheat sheets (with a focus on list building, course creation and webinars) to
                            start generating real momentum in your business.
                            <br/><br/>
                            For media + press inquiries or to request a podcast interview, please use this form.
                            <br/><br/>
                            For all other inquiries, please use the form below to contact us.</h3>
                        <br /><br />
                        <hr/>
                    </div>
                </div>
                <div className="Contact-wrapper"
                     style={style}>

                    <div style={{margin: "0 auto"}} className="Contact-form"
                         dangerouslySetInnerHTML={{__html: this.state.form}}>

                    </div>
                </div>

            </div>
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