import React, {Component} from 'react'
import {Scrollbars} from 'react-custom-scrollbars';
import './Page3.css'

export class PageThree extends Component {
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
        const primary_vid = [
            "<iframe width=\"100%\" height=\"100%\" src=\"http://www.youtube.com/embed/videoseries?list=UU5SMcFSj_5ur-4iK9CginyQ&index=0&t=0\" " +
            "frameborder=\"0\" allow=\"autoplay; encrypted-media\" allowfullscreen></iframe>",
            "<iframe width=\"100%\" height=\"100%\" src=\"http://www.youtube.com/embed/videoseries?list=UU5SMcFSj_5ur-4iK9CginyQ&index=2&t=0\" " +
            "frameborder=\"0\" allow=\"autoplay; encrypted-media\" allowfullscreen></iframe>",
            "<iframe width=\"100%\" height=\"100%\" src=\"http://www.youtube.com/embed/videoseries?list=UU5SMcFSj_5ur-4iK9CginyQ&index=3&t=0\" " +
            "frameborder=\"0\" allow=\"autoplay; encrypted-media\" allowfullscreen></iframe>",
            "<iframe width=\"100%\" height=\"100%\" src=\"http://www.youtube.com/embed/videoseries?list=UU5SMcFSj_5ur-4iK9CginyQ&index=4&t=0\" " +
            "frameborder=\"0\" allow=\"autoplay; encrypted-media\" allowfullscreen></iframe>",
            "<iframe width=\"100%\" height=\"100%\" src=\"http://www.youtube.com/embed/videoseries?list=UU5SMcFSj_5ur-4iK9CginyQ&index=5&t=0\" " +
            "frameborder=\"0\" allow=\"autoplay; encrypted-media\" allowfullscreen></iframe>",
        ]
        let style;
        if (this.state.width > 700) {
            style = {width: this.state.width + "px", height: this.state.height-100 + "px"}
        }
        else {
            style = {width: "100%", height: "600px"};
        }
        return (
            <Scrollbars style={style}>
                <div className="pagethree" style={style}>
                    <div onClick={this.props.nextclick} style={{top: this.state.height * .47}}
                         className="right-arrow animate bounce"/>
                    <div onClick={this.props.prevclick} style={{top: this.state.height * .47}}
                         className="left-arrow animate bounce"/>
                    <div className="Youtube" style={style}>
                        <h1>RECENT VIDEOS</h1>
                        <a rel="noopener noreferrer" target="_blank"
                           href="https://www.youtube.com/channel/UCg8AlYqRz_eAGH_TL9_kgOw">SEE ALL VIDEOS</a>
                        <div className="Youtube-column" style={{height: this.state.height - 200 + "px"}}>
                            <div className="Youtube-primary-video" dangerouslySetInnerHTML={{__html: primary_vid[0]}}/>
                        </div>
                        <div className="Youtube-column Youtube-column2"
                             style={{height: this.state.height - 200 + "px"}}>
                            <div className="Youtube-tile">
                                <div className="Youtube-primary-video"
                                     dangerouslySetInnerHTML={{__html: primary_vid[1]}}/>
                            </div>
                            <div className="Youtube-tile">
                                <div className="Youtube-primary-video"
                                     dangerouslySetInnerHTML={{__html: primary_vid[2]}}/>
                            </div>
                            <div className="Youtube-tile">
                                <div className="Youtube-primary-video"
                                     dangerouslySetInnerHTML={{__html: primary_vid[3]}}/>
                            </div>
                            <div className="Youtube-tile">
                                <div className="Youtube-primary-video"
                                     dangerouslySetInnerHTML={{__html: primary_vid[4]}}/>
                            </div>
                        </div>
                    </div>
                </div>
            </Scrollbars>
        );
    }
}