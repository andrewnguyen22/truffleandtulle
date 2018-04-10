import React, {Component} from 'react'

import './Post.css'
import axios from "axios/index";
import Footer from "../../footer/Footer";

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
const commentsurl = "http://localhost:8888/wordpress/wp-json/wp/v2/comments?post=";
const tagsurl = "http://localhost:8888/wordpress/wp-json/wp/v2/tags?include=";
let postid = 0;

class Comment extends Component {
    render() {
        return (
            <div className="Comment-container">
                <h5 className="Comment-author">
                    {this.props.parentPassesComment.author_name}
                </h5>
                <h7 className="Comment-content"
                    dangerouslySetInnerHTML={{__html: this.props.parentPassesComment.content.rendered}}>
                </h7>
            </div>
        );
    }
}

class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            comment: '',
            retrievedComments: []
        };
    }

    updateName(evt) {
        this.setState({
            name: evt.target.value
        });
    }

    updateEmail(evt) {
        this.setState({
            email: evt.target.value
        });
    }

    updateComment(evt) {
        this.setState({
            comment: evt.target.value
        });
    }

    getComments() {
        axios.get(commentsurl + postid).then(
            response => this.setState({retrievedComments: response.data})
        ).catch(e => {
            console.log(e)
        });
    }

    postComment(name, email, comment) {
        console.log("CLICK");
        let commentstring = (
            postid + "&author_name=" + name + "&author_email=" + email + "&content=" + comment);
        axios.post(commentsurl + commentstring).then().catch(e => {
            console.log(e);
        });
        this.setState({
            name: '',
            email: '',
            comment: ''
        });
        this.getComments();
        this.forceUpdate()
    }

    render() {
        this.getComments();
        const comments = this.state.retrievedComments.map((d,i) => <Comment parentPassesComment={d} key={i}/>);
        return (
            <div className="Comments-container">
                <h1 className="Comments-title">
                    Comments
                </h1>
                <hr/>
                <br/>
                {comments}
                <center>Add A New Comment Below</center>
                <br/>
                <hr/>
                <div className="New-Comment-container">
                    <br/>
                    <label>Name</label>
                    <br/>
                    <br/>
                    <input value={this.state.name} onChange={evt => this.updateName(evt)}
                           title="name_input" className="Comment-input1"
                           type="text" id="name" name="name" placeholder="(Required) Your name.."/>
                    <br/>
                    <br/>
                    <label>Email</label>
                    <br/>
                    <br/>
                    <input value={this.state.email} onChange={evt => this.updateEmail(evt)}
                           title="email_input" className="Comment-input1"
                           type="text" id="name" name="name" placeholder="(Required) Your email.."/>
                    <br/>
                    <br/>
                    <label>Comment</label>
                    <br/>
                    <br/>
                    <textarea value={this.state.comment} onChange={evt => this.updateComment(evt)}
                              title="comment_input" className="Comment-input2" id="comment" name="comment"
                              placeholder="Write something.."/>
                    <br/>
                    <br/>
                    <button onClick={() => this.postComment(
                        this.state.name,
                        this.state.email,
                        this.state.comment
                    )} className="Comment-button">SUBMIT
                    </button>
                    <br/>
                    <br/>
                </div>
            </div>
        );
    }
}

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: ''
        };
    }

    setTags(response) {
        let tags = '';
        for (let i = 0; i < response.length; ++i) {
            if (i === 0) {
                tags = response[i].name;
            }
            else {
                tags = tags + '+' + response[i].name;
            }
        }
        this.setState({tags: tags});
    }

    parseDate(s) {
        var b = s.split(/\D/);
        var d = (new Date(b[0], b[1] - 1, b[2], b[3], b[4], b[5]));
        return (MONTH_NAMES[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear())
    }

    render() {
        let post;
        if (typeof this.props.location !== 'undefined') {
            post = this.props.location.state.referrer;
        }
        else {
            post = this.props.parentPassesPost;
        }
        postid = post.id;
        axios.get(tagsurl + post.tags).then(
            response => this.setTags(response.data)
        ).catch(e => {
            console.log(e);
        });
        return (
            <div className="Post-container">
                <img alt="Featured From Post" className="Post-image" src={post.better_featured_image.source_url}/>
                <h1 className="Post-title">{post.title.rendered}</h1>
                <h3 className="Post-details">
                    <span className="Post-date">{this.parseDate(post.date)}</span>
                    <span className="Post-separator">/</span>
                    <span className="Post-tags">{this.state.tags}</span>
                </h3>
                <div className="Post-content" dangerouslySetInnerHTML={{__html: post.content.rendered}}>
                </div>
                <Comments/>
                <Footer/>
            </div>
        );
    }
}

export default Post;