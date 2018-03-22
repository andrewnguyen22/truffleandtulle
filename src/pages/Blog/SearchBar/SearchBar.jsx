import React, {Component} from 'react'
import axios from 'axios'
import './SearchBar.css'
class SearchBar extends Component {
    constructor(props ) {
        super(props );
        this.handleChange = this.handleChange.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.state = {
            inputField: ''
        };
    }

    submitHandler(evt) {
        evt.preventDefault();
        this.props.setParentPosts(this.state.inputField)
        this.setState({
            inputField: ''
        });
    }

    handleChange(event) {
        this.setState({
            inputField: event.target.value
        });
    }

    render() {
        return (
            <div className='searchbar-container'>
                <form className = "Searchbar-form" onSubmit={e => e.preventDefault()}>
                    <input className="Searchbar-input"
                           placeholder='Search My Posts'
                           onChange={this.handleChange}/>
                    <button className="Searchbar-button"
                        type='submit'
                        onClick={this.submitHandler}>
                        Search
                    </button>
                </form>
            </div>
        )
    }
}

export default SearchBar