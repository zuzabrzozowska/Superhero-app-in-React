import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

function Nav() {
    return (
        <nav>
            <Link to="/settings"><i className="fas fa-cog"></i></Link>
            <Link to="/user"><i className="fas fa-user-cog"></i></Link>
            <Link to="/favourites"><i className="fas fa-star"></i></Link>
        </nav>
    )
}

export default Nav;