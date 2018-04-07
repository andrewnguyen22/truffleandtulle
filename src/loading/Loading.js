import React, {Component} from 'react'
import './Loading.css'
import '../animations/animate.css'
class Loading extends Component {
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
        return (
            <div className="Loading-Container" style={{width: this.state.width, height: this.state.height}}>
                <div className="Loading-Image animated bounce infinite"/>
            </div>
        );
    }
}

export default Loading;