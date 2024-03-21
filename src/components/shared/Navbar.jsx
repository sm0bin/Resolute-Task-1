import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl font-black">Shehjad Mobin</a>
            </div>
            <div className="flex-none">

                <NavLink to='/login' className="btn btn-sm btn-secondary mr-2">Login</NavLink>
                <NavLink to='/signup' className="btn btn-sm btn-primary">Sign Up</NavLink>
                {/* <ul className="menu menu-horizontal px-1">
                    <li><a>Link</a></li>
                    <li><a>Link</a></li>
                </ul> */}
            </div>
        </div>
    );
};

export default Navbar;