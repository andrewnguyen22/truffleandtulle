import React, {Component} from 'react'
import {Redirect} from 'react-router';
import './Post.css'
import axios from "axios/index";
import Footer from "../../footer/Footer";
import history from "../../history/History";
import Meta from '../../meta/Meta'
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
const commentsurl = "http://8.9.5.159//wp-json/wp/v2/comments?post=";
let postid = 0;

class Comment extends Component {
    render() {
        return (
            <div className="Comment-container">
                <h5 className="Comment-author">
                    {this.props.parentPassesComment.author_name}
                </h5>
                <h6 className="Comment-content"
                    dangerouslySetInnerHTML={{__html: this.props.parentPassesComment.content.rendered}}>
                </h6>
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
        const comments = this.state.retrievedComments.map((d, i) => <Comment parentPassesComment={d} key={i}/>);
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
    componentDidMount() {
        window.scrollTo(0, 0)
    }

    parseDate(s) {
        var b = s.split(/\D/);
        var d = (new Date(b[0], b[1] - 1, b[2], b[3], b[4], b[5]));
        return (MONTH_NAMES[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear())
    }

    render() {
        let post;
        if (this.props.location !== undefined) {
            post = this.props.location.state.referrer;
            var state = {name: "http://localhost:3000/blog", page: 'Blog'};
            window.history.pushState(state,
                "URL Rewrite", "http://localhost:3000/link?" +
                this.props.location.state.referrer.id);
            window.onpopstate = function (event) {
                history.push('blog');
                return (<Redirect to={{
                    pathname: '/blog'
                }}/>);
            };
        }
        else if (this.props.parentPassesPost !== undefined) {
            post = this.props.parentPassesPost
        }
        postid = post.id;
        return (
            <div className="Post-container">
                <Meta title={post.rendered}
                      description={'A post from Truffle and Tulle. Called "' + post.title.rendered + '" tagged: ' + post.acf.tags}
                      image={post.better_featured_image.source_url}
                      url={'truffleandtulle.com/link?'+post.id}/>
                <img alt="Featured From Post" className="Post-image" src={post.better_featured_image.source_url}/>
                <h1 className="Post-title">{post.title.rendered}</h1>
                <h3 className="Post-details">
                    <span className="Post-date">{this.parseDate(post.date)}</span>
                    <span className="Post-separator">/</span>
                    <span className="Post-tags">{post.acf.tags}</span>
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