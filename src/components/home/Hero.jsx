import React from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Hero = () => {
    const { user } = useAuth();

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Hello there</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    <div className="flex-none">
                        {
                            user ?
                                <NavLink to='/profile' className="btn btn-primary">Modify User</NavLink>
                                :
                                <>
                                    <NavLink to='/login' className="btn btn-secondary mr-2">Login</NavLink>
                                    <NavLink to='/signup' className="btn btn-primary">Sign Up</NavLink>
                                </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;