import React, {Component} from 'react'
import {Helmet} from "react-helmet";
import genericSeoImage from '../images/icons/TRUFFLE&TULLE_lg.png'
import genericSeoImagesm from '../images/icons/TRUFFLE&TULLE.png'

class Meta extends Component {
    render() {
        return (
            <Helmet>
                <title>{this.props.title}</title>
                <meta charset="utf-8"/>
                <meta NAME="ROBOTS" CONTENT="NOODP"/>
                <meta name="description" content={this.props.description}/>
                <meta name='author' content='Kelsey Korfhage, truffleandtulle@gmail.com'/>
                <meta name='keywords' content='TruffleandTulle, Truffle&Tulle, TrufflexTulle, Kelsey Korfhage'/>
                <meta name='reply-to' content='truffleandtulle@gmail.com'/>
                <meta name='owner' content='Kelsey Korfhage'/>
                <meta name='designer' content='Andrew Nguyen'/>
                <link rel="canonical" href={this.props.url}/>
                <meta name='url' content={this.props.url}/>
                <meta name='identifier-URL' content={this.props.url}/>
                <meta name='date' content='April 12, 2018'/>
                <meta name='medium' content='blog'/>
                <meta name="apple-mobile-web-app-title" content={this.props.title}/>
                <meta name='apple-mobile-web-app-capable' content='yes'/>
                <meta name='apple-touch-fullscreen' content='yes'/>
                <link rel='logo' type='image/png' href={genericSeoImage}/>
                <link rel="mask-icon" href={genericSeoImagesm} color="black"/>
                <meta name='apple-mobile-web-app-status-bar-style' content='black'/>
                <meta name='format-detection' content='telephone=no'/>
                <meta property="og:title" content={this.props.title}/>
                <meta property="og:description" content={this.props.description}/>
                <meta property="og:url" content={this.props.url}/>
                <meta property="og:image" content={this.props.image}/>
                <meta property="og:see_also" content="https://www.truffleandtulle.com"/>
                <meta itemprop="name" content={this.props.title}/>
                <meta itemprop="description" content={this.props.description}/>
                <meta itemprop="image" content={this.props.image}/>
                <meta name="twitter:card" content="Truffle and Tulle"/>
                <meta name="twitter:site" content="@truffleandtulle"/>
                <meta name="twitter:creator" content="@kelseykorfhage"/>
                <meta name="twitter:title" content={this.props.title}/>
                <meta name="twitter:description" content={this.props.description}/>
                <meta name="twitter:image" content={this.props.image}/>

            </Helmet>
        );
    }
}

export default Meta;