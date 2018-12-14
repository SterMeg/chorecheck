import React from 'react';
import Nav from './Nav';


const Navbar = (props) => {
    return (
        <div className="navbar box-shadow navbar--dark">
            <div className="navbar-brand"><i className="fas fa-user-check"></i>ChoreCheck</div>
            <Nav />
        </div>
    )
}

export default Navbar;