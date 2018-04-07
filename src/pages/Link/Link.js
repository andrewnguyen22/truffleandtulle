import React, {Component} from 'react'

import './Link.css'
import axios from "axios/index";
import Post from "../Post/Post";

const wordpressurl = "http://localhost:8888/wordpress/wp-json/wp/v2/posts?include[]=";

class Link extends Component {
    constructor(props) {
        super(props);
        this.state = {post: ''};
    }

    componentDidMount() {
        var url = window.location.href;
        var id = url.split('?')[1];
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