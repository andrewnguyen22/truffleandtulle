import React, {Component} from 'react'
import './Contact.css'
import Footer from "../../footer/Footer"
import Meta from '../../meta/Meta'
import seoImage from '../../images/kelsey/kelsey25-min.jpeg'

const subscription_form = "<iframe width=\"540\" height=\"601\" src=\"https://my.sendinblue.com/users/subscribe/js_id/36pic/id/1\" frameborder=\"0\" scrolling=\"no\" allowfullscreen style=\"display: block;margin-left: auto;margin-right: auto; \"></iframe>";
const mobile_subs_form = "<iframe width=\"300\" height=\"560\" src=\"https://my.sendinblue.com/users/subscribe/js_id/36pic/id/2\" frameborder=\"0\" scrolling=\"no\" allowfullscreen style=\"display: block;margin-left: auto;margin-right: auto;\"></iframe>";

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
                        <h3>I want to hear from you. Whether it is a simple hello or a business opportunity,
                            please contact me!
                            <br/><br/>

                            I know there are so many talented individuals out there, I am always ready to collaborate
                            with
                            another. As long as you have a passion for baking and a mind for business, we can be
                            great friends. Please do not hesitate to contact me :)
                            <br/><br/>
                            For general questions regarding collaborations and business: truffleandtulle@gmail.com
                            <br/><br/>
                            For keeping up with the latest Truffle and Tulle news, please use the form below</h3>
                        <br/><br/>
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
    componentDidMount() {
        window.scrollTo(0, 0)
    }

    render() {
        const description = 'Welcome to the contact page of Truffle&Tulle. ' +
            'Here you will find a few ways to get in touch with me!' +
            'I am always up for doing business and hope that you will reach out!';
        return (
            <div>
                <Meta title='Contact' description={description} image={seoImage} url='truffleandtulle.com/contact'/>
                <Header/>
                <Footer/>
            </div>
        );
    }
}

export default Contact;