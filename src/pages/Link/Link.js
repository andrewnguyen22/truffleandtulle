import React, {Component} from 'react'

import './Link.css'
import axios from "axios/index";
import Post from "../Post/Post";

const wordpressurl = "http://8.9.5.159:8080/wp-json/wp/v2/posts?include[]=";

class Link extends Component {
    constructor(props) {
        super(props);
        this.state = {post: ''};
    }

    componentDidMount() {
        let url = window.location.href;
        let id = url.split('?')[1];
        axios.get(wordpressurl + id).then(
            response => this.setState({post: <Post parentPassesPost={response.data[0]}/>})
        ).catch(e => {
            console.log(e);
        });
    }

    render() {
        return (
            <div className="Link_container">
                {this.state.post}
            </div>
        );
    }
}

export default Link;