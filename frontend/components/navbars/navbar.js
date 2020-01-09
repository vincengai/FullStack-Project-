import React from 'react';
import { Link, NavLink, Route } from 'react-router-dom';


class navBar extends React.Component {
    constructor(props) {
        super(props);

        this.renderLoggedInTabs = this.renderLoggedInTabs.bind(this);
        this.renderLoggedOutTabs = this.renderLoggedOutTabs.bind(this);
        this.renderSessionTabs = this.renderSessionTabs.bind(this);
    }

    //NavLink vs Link to and 
    // ActiveClassName vs ClassName 

    renderLoggedInTabs() {
        return (
            <div>
                <li>
                    <Link to="/dashboard">Wallet</Link>
                </li>
                <li>
                    <Link to="/">Market</Link>
                </li>
                <li>
                    <Link onClick={this.props.logout} to="/">Sign Out</Link>
                </li>
            </div>
        )
    };

    renderLoggedOutTabs() {
        return (
            <div>
                <li>
                    <Link to="/">Market</Link>
                </li>
                <li>
                    <Link to="/login">Sign In</Link>
                </li>
                <li>
                    <Link to="/signup">Register</Link>
                </li>
            </div>
        )
    };

    renderSessionTabs() {
        if (this.props.currentUser) {
            return this.renderLoggedInTabs();
        } else {
            return this.renderLoggedOutTabs();
        }
        
    };

    render() {
        return (
            <>
                    <div id="nav-container">
                            <NavLink to="/" className="nav-logo">
                                <img src={window.imageUrl.binanceLogo} alt="binance-logo"/>
                            </NavLink>
                        <div className="nav-section" id="nav-left">
                            <ul>
                                <li>
                                    <a
                                        href="https://github.com/vincengai/FullStack-Project-"
                                        target="_blank">Github</a>
                                </li>
                                <li>
                                    <a
                                        href="https://www.linkedin.com/in/vince-ngai/"
                                    target="_blank">LinkedIn</a>
                                </li>
                            </ul>
                        </div>

                        <ul className="nav-section" id="nav-right">
                            {this.renderSessionTabs()}
                        </ul>
                    </div>
            </>
            
        )
    }
};

export default navBar; 

// render() {
//     if (this.props.currentUser) {
//         return this.renderLoggedInTabs();
//     } else {
//         return this.renderLoggedOutTabs();
//     }
// }