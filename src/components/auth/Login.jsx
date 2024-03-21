import { toast } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";


const Login = () => {
    const { login, googleSignIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [btnLoading, setBtnLoading] = useState(false);

    const success = userCredential => {
        const user = userCredential.user;
        console.log(user);
        if (user) {
            toast.success("Login successful");
        }
        navigate(location?.state?.from?.pathname || "/", { replace: true });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        setBtnLoading(true);
        login(form.email.value, form.password.value)
            .then((userCredential) => {
                success(userCredential);
                setBtnLoading(false);
                form.reset();
            })
            .catch((error) => {
                toast.error(error.message);
                setBtnLoading(false);
            });
    };

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then((userCredential) => {
                toast.success("Login successful");
                setBtnLoading(false);
            })
            .catch((error) => {
                toast.error(error.message);
                setBtnLoading(false);
            });
    }



    return (
        <div className="card shrink-0 w-full max-w-lg shadow bg-base-100 p-6 mx-auto">
            <button onClick={handleGoogleSignIn} className="btn"><FcGoogle className="text-xl" />Continue With Google</button>
            <div className="divider">Or</div>
            <h3 className="text-center text-3xl text-blue-400 font-bold">Login Now</h3>
            <form onSubmit={handleSubmit} className="card-body p-0">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-info" disabled={btnLoading}>
                        {
                            btnLoading ?
                                <>
                                    <span className="loading loading-spinner"></span>
                                    Logging in...
                                </> : "Login"
                        }

                    </button>
                </div>
            </form>
            <div className="text-sm mt-4 font-medium">
                Not registered? <Link to="/signup" className="link link-info">Create Account</Link>
            </div>
        </div>
    );
};

export default Login;