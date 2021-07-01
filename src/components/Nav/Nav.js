import React from 'react';
import logo from './../../assets/logo.png';
import './Nav.css';

const Nav = () => {
    return (
        <div className="nav-container">
            <div className="nav-left">
                <img className="flash-logo" src={logo} alt="logo" />
                <p className="flash-logo-text">Typetap</p>
            </div>
            <div className="nav-right">
                <a
                    target="_blank"
                    className="nav-linkedin-link"
                    href="https://www.linkedin.com/in/rupali-verma-1a266517a"
                    rel="noreferrer"
                >
                    Portfolio
                </a>
            </div>
        </div>
    );
};

export default Nav;
