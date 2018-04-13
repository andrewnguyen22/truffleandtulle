import React, {Component} from 'react'

import './Portfolio.css'
import Meta from '../../meta/Meta'
import seoImage from '../../images/kelsey/kelsey5-min.jpeg'
let html = '<!-- LightWidget WIDGET -->' +
    '<script src="//lightwidget.com/widgets/lightwidget.js"></script>' +
    '<iframe src="//lightwidget.com/widgets/e95aa8509cbc52dc8ac9ba47621b0f2f.html" ' +
    'scrolling="no" allowtransparency="true" class="lightwidget-widget" ' +
    'style="width: 100%; height:200%; margin-top: 100px;border: 0; overflow: hidden;"></iframe>';

class Portfolio extends Component{
    componentDidMount() {
        window.scrollTo(0, 0)
    }
    render(){
        const description='Welcome to the portfolio portion of Truffle and Tulle.' +
            'It is here where you will find my latest instagram photos.' +
            "Don't forget to follow me :)";
        return (
            <div className="Portfolio-container">
                <Meta title='Portfolio' description={description} image={seoImage} url='truffleandtulle.com/portfolio'/>
                <div className="content" dangerouslySetInnerHTML={{__html: html}}/>
            </div>
        );
    }
}

export default Portfolio;