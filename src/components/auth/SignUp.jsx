import { toast } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useState } from "react";


const SignUp = () => {
    const { signUp, updateUser, googleSignIn, logout } = useAuth();
    const [signUpError, setSignUpError] = useState("");
    const navigate = useNavigate();
    // const location = useLocation();
    const axiosPublic = useAxiosPublic();
    const [btnLoading, setBtnLoading] = useState(false);

    const success = userCredential => {
        const user = userCredential.user;
        console.log(user);
        if (user) {
            toast.success("Sign Up successful");
        }
        // navigate(location?.state?.from?.pathname || "/", { replace: true });
    }

    const failed = error => {
        const errorMessage = error?.message;
        const errorCode = error?.code;

        toast.error(errorMessage);

        console.error(errorCode);
        console.error(errorMessage);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setBtnLoading(true);

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;


        if (password.length < 6) {
            setSignUpError('Password must be at least 6 characters long.');
            return;
        }
        else if (!/[a-z]/.test(password)) {
            setSignUpError('Password must contain at least one lowercase letter.');
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setSignUpError('Password must contain at least one uppercase letter.');
            return;
        }
        else if (!/[0-9]/.test(password)) {
            setSignUpError('Password must contain at least one number.');
            return;
        }
        else if (!/[!@#$%^&*()+=]/.test(password)) {
            setSignUpError('Password must contain at least one special character.');
            return;
        }

        signUp(email, password)
            .then((userCredential) => {
                success(userCredential);
                logout();
                setBtnLoading(false);
                console.log("Initial logout.");
                toast.success("Now Login with your email and password.");
                navigate("/login", { replace: true });
                form.reset();
            })
            .catch((error) => {
                failed(error);
                setBtnLoading(false);
            });
    }

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then((userCredential) => {
                success(userCredential);
            })
            .catch((error) => {
                failed(error);
            });
    }



    return (
        <div className="card shrink-0 w-full max-w-lg shadow bg-base-100 p-6 mx-auto">
            <button onClick={handleGoogleSignIn} className="btn"><FcGoogle className="text-xl" />Continue With Google</button>
            <div className="divider">Or</div>

            <h3 className="text-center font-bold text-3xl text-blue-400">Sign Up Now</h3>
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
                {
                    signUpError && <p className='my-4 font-medium text-rose-500'>{signUpError}</p>
                }
                <div className="form-control mt-6">
                    <button className="btn btn-info" disabled={btnLoading}>
                        {
                            btnLoading ?
                                <>
                                    <span className="loading loading-spinner"></span>
                                    Signing Up...
                                </> : "Sign Up"
                        }
                    </button>
                </div>
            </form>
            <div className="text-sm mt-4 font-medium ">
                Have an Account? <Link to="/login" className="link link-info link-hover">Login</Link>
            </div>
        </div>
    );
};

export default SignUp;