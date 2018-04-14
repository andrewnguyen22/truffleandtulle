import React, {Component} from 'react'
import {Scrollbars} from 'react-custom-scrollbars';
import './Page3.css'

export class PageThree extends Component {
    constructor(props) {
        super(props);
        this.state = {width: 0, height: 0, loaded: 0};
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.handleYoutubeLoad = this.handleYoutubeLoad.bind(this)
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

    handleYoutubeLoad() {
        if (this.state.loaded === 4) {
            this.props.youtubeLoaded(true)
        }
        this.setState({loaded: this.state.loaded + 1})
    }

    render() {
        let style;
        if (this.state.width > 700) {
            style = {width: this.state.width + "px", height: this.state.height - 100 + "px"}
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
                            <div className="Youtube-primary-video">
                                <iframe onLoad={this.handleYoutubeLoad} width="100%" title="youtube1"
                                        allowFullScreen='true' height="100%"
                                        src="https://www.youtube.com/embed/videoseries?list=UUg8AlYqRz_eAGH_TL9_kgOw&index=0&t=0"/>
                            </div>
                        </div>
                        <div className="Youtube-column Youtube-column2"
                             style={{height: this.state.height - 200 + "px"}}>
                            <div className="Youtube-tile">
                                <div className="Youtube-primary-video">
                                    <iframe onLoad={this.handleYoutubeLoad} width="100%" title="youtube2"
                                            allowFullScreen='true' height="100%"
                                            src="https://www.youtube.com/embed/videoseries?list=UUg8AlYqRz_eAGH_TL9_kgOw&index=1&t=0"/>
                                </div>
                            </div>
                            <div className="Youtube-tile">
                                <div className="Youtube-primary-video">
                                    <iframe onLoad={this.handleYoutubeLoad} width="100%" title="youtube3"
                                            allowFullScreen='true' height="100%"
                                            src="https://www.youtube.com/embed/videoseries?list=UUg8AlYqRz_eAGH_TL9_kgOw&index=2&t=0"/>
                                </div>
                            </div>
                            <div className="Youtube-tile">
                                <div className="Youtube-primary-video">
                                    <iframe onLoad={this.handleYoutubeLoad} width="100%" title="youtube4"
                                            allowFullScreen="true" height="100%"
                                            src="https://www.youtube.com/embed/videoseries?list=UUg8AlYqRz_eAGH_TL9_kgOw&index=3&t=0"/>
                                </div>
                            </div>
                            <div className="Youtube-tile">
                                <div className="Youtube-primary-video">
                                    <iframe onLoad={this.handleYoutubeLoad} width="100%" title="youtube5"
                                            allowFullScreen='true' height="100%"
                                            src="https://www.youtube.com/embed/videoseries?list=UUg8AlYqRz_eAGH_TL9_kgOw&index=4&t=0"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Scrollbars>
        );
    }
}
