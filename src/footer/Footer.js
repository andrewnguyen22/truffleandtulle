import React, {Component} from 'react'
import './Footer.css'

class Footer extends Component {
    render() {
        return (
            <div className="Footer-container">
                <div className="col col1">
                    <div className="innercol">
                        <p>
                            Mailing List
                        </p>
                        <input placeholder="Name">

                        </input>
                        <br/><br/>
                        <input placeholder="Email">

                        </input>
                        <br/> <br/>
                        <button>
                            Subscribe
                        </button>
                    </div>
                </div>
                <div className="col col2">
                    <div className="innercol">
                        <p>
                            Truffle And Tulle
                        </p>
                        <p>
                            475 TENTH AVENUE
                        </p>
                        <p>
                            NEW YORK NY 10018
                        </p>
                    </div>
                </div>
                <div className="col col3">
                    <div className="innercol">
                        <p>
                            Sponsors
                        </p>
                        <p>
                            Buddy Brew Coffee
                        </p>
                        <p>
                            Random Dude On Insta
                        </p>
                    </div>
                </div>
                <div className="col col4">
                    <div className="innercol">

                        <br/>
                        <a href="https://www.google.com">
                            Twitter
                        </a>
                        <br/><br/>
                        <a href="https://www.google.com">
                            Instagram
                        </a>
                        <br/><br/>
                        <a href="https://www.google.com">
                            Facebook
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;