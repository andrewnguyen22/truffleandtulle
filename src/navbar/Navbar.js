import React, {Component} from 'react';
import './Navbar.css';
import {
    Link
} from 'react-router-dom'

class NavComponent extends Component {
    burgerToggle() {
        let linksEl = document.querySelector('.narrowLinks');
        if (linksEl.style.display === 'block') {
            linksEl.style.display = 'none';
        } else {
            linksEl.style.display = 'block';
        }
    }

    render() {
        return (
                <nav>
                    <div className="navWide">
                        <div className="wideDiv">
                            <Link className="navbar-item" to="/">HOME</Link>
                            <Link className="navbar-item" to="/blog">BLOG</Link>
                            <Link className="navbar-item" to="/about">KELSEY</Link>
                            <Link className="navbar-item" to="/contact">CONTACT</Link>
                            <Link className="navbar-item" to="/portfolio">PORTFOLIO</Link>
                            <Link className="navbar-home" to="/">Truffle&Tulle</Link>
                            <br/>
                            <span className="navbar-attribute">By Kelsey Korfhage</span>
                        </div>
                    </div>
                    <div className="navNarrow">
                        <i className="fa fa-bars fa-2x" onClick={this.burgerToggle}></i>
                        <Link className="navbar-home" to="/">Truffle&Tulle</Link>
                        <br/>
                        <span className="navbar-attribute">By Kelsey Korfhage</span>
                        <div className="narrowLinks">
                            <Link className="navbar-item" to="/" onClick={this.burgerToggle}>HOME</Link>
                            <Link className="navbar-item" to="/blog" onClick={this.burgerToggle}>BLOG</Link>
                            <Link className="navbar-item" to="/about" onClick={this.burgerToggle}>KELSEY</Link>
                            <Link className="navbar-item" to="/contact" onClick={this.burgerToggle}>CONTACT</Link>
                            <Link className="navbar-item" to="/portfolio" onClick={this.burgerToggle}>PORTFOLIO</Link>
                            <Link style={{color: "black", fontSize: "25px"}} className=" navbar-item"
                                  to="/" onClick={this.burgerToggle}>Truffle&Tulle</Link>
                        </div>
                    </div>
                </nav>
        );
    }
};

export default NavComponent;