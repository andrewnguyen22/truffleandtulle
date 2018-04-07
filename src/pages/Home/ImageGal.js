import history from "../../history/History";
import {Component} from "react";
import Gallery from 'react-photo-gallery';
import {Redirect} from 'react-router';
import Measure from 'react-measure';
import 'ImageGal.css'

export class ImageGal extends Component {
    constructor() {
        super();
        this.state = {width: -1, redirect: 0};
    }

    handleClick = () => {
        this.setState({redirect: 1});
    }

    render() {
        if (this.state.redirect === 1) {
            this.setState({redirect: 0});
            history.push('/home');
            return (<Redirect to={{
                pathname: '/blog'
            }}/>);
        }
        var photos;
        const width = this.state.width;
        return (
            <Measure bounds onResize={(contentRect) => this.setState({width: contentRect.bounds.width})}>
                {
                    ({measureRef}) => {
                        if (width < 1) {
                            return <div ref={measureRef}/>;
                        }
                        let columns = 2;
                        photos = [
                            {src: this.props.pics[0], width: 3, height: 4},
                            {src: this.props.pics[1], width: 3, height: 4}
                        ];
                        if (width >= 480) {
                            columns = 4;
                            photos = [
                                {src: this.props.pics[0], width: 3, height: 4},
                                {src: this.props.pics[1], width: 3, height: 4},
                                {src: this.props.pics[2], width: 3, height: 4},
                                {src: this.props.pics[3], width: 3, height: 4}
                            ];
                        }
                        if (width >= 1024) {
                            columns = 6;
                            photos = [
                                {src: this.props.pics[0], width: 3, height: 4},
                                {src: this.props.pics[1], width: 3, height: 4},
                                {src: this.props.pics[2], width: 3, height: 4},
                                {src: this.props.pics[3], width: 3, height: 4},
                                {src: this.props.pics[4], width: 3, height: 4},
                                {src: this.props.pics[5], width: 3, height: 4}
                            ];
                        }
                        return <div onClick={this.handleClick} style={{background: "white"}} ref={measureRef}><Gallery
                            photos={photos} rows={1} columns={columns}/></div>
                    }
                }
            </Measure>
        )
    }
}