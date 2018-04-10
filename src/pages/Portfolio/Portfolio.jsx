import React, {Component} from 'react'

import './Portfolio.css'

let html = '<!-- LightWidget WIDGET -->' +
    '<script src="//lightwidget.com/widgets/lightwidget.js"></script>' +
    '<iframe src="//lightwidget.com/widgets/f128a333e9c856b78c978321cbaafa69.html" ' +
    'scrolling="no" allowtransparency="true" class="lightwidget-widget" ' +
    'style="width: 100%; height:200%; margin-top: 100px;border: 0; overflow: hidden;"></iframe>';

class Portfolio extends Component{
    render(){
        return (
            <div className="Portfolio-container">
                <div className="content" dangerouslySetInnerHTML={{__html: html}}/>
            </div>
        );
    }
}

export default Portfolio;