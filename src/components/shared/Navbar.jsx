import React from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <NavLink to='/' className="btn btn-ghost text-xl font-black">Shehjad Mobin</NavLink>
            </div>
            <div className="flex-none">
                {
                    user ?
                        <>
                            <div className='btn btn-sm mr-2'>{user?.email}</div>
                            <button onClick={logout} className="btn btn-sm btn-secondary">Logout</button>
                        </>
                        :
                        <>
                            <NavLink to='/login' className="btn btn-sm btn-secondary mr-2">Login</NavLink>
                            <NavLink to='/signup' className="btn btn-sm btn-primary">Sign Up</NavLink>
                        </>
                }

                {/* <ul className="menu menu-horizontal px-1">
                    <li><a>Link</a></li>
                    <li><a>Link</a></li>
                </ul> */}
            </div>
        </div>
    );
};

export default Navbar;