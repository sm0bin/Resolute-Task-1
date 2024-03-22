import React from 'react';
import useLoadDataSecure from '../../hooks/useLoadDataSecure';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { toast } from 'react-hot-toast';

const Profile = () => {
    const { user, loading } = useAuth();
    const [userData, isPendingUserData, refetchUserData, errorUserData] = useLoadDataSecure(`/users/${user?.email}`, 'profile');
    const axiosSecure = useAxiosSecure();
    console.log(userData);

    // Render loading indicator while user data is being fetched
    if (loading || isPendingUserData) {
        return <div className='flex justify-center items-center min-h-screen w-full'>
            <span className="loading loading-bars loading-sm"></span>
        </div>;
    }

    // Handle errors while fetching user data
    if (errorUserData) {
        return <div>Error: {errorUserData.message}</div>;
    }

    // Handle case when userData is not available yet
    if (!userData) {
        return <div>User data is not available yet.</div>;
    }

    // Handle user update
    const handleUserUpdate = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form[0].value;
        console.log(name);
        axiosSecure.put(`/users/${user?.email}`, { name })
            .then((res) => {
                console.log(res.data);
                toast.success('User data updated successfully');
                refetchUserData();
            })
            .catch((error) => {
                toast.error('Failed to update user data');
                console.error(error);
            });
    }

    const handleDeleteUser = () => {
        axiosSecure.delete(`/users/${user?.email}`)
            .then((res) => {
                console.log(res.data);
                toast.success('User data deleted successfully');
                refetchUserData();
            })
            .catch((error) => {
                toast.error('Failed to delete user data');
                console.error(error);
            });
    }

    // Render user data
    return (
        <div className='w-full min-h-screen flex justify-center items-center'>
            <div className='w-1/4 rounded-md shadow-md p-6 card gap-4'>
                <h2 className='font-medium text-lg'>Email: <span className='font-normal'>{userData.email}</span></h2>
                {/* <h2 className='font-medium text-lg'>Name: <span className='font-normal'>{userData.name}</span></h2> */}
                <form onSubmit={handleUserUpdate} className="join">
                    <input className="input input-bordered join-item w-full" defaultValue={userData?.name || 'Enter Name'} />
                    <button className="btn join-item rounded-r-full">Update</button>
                </form>

                <button onClick={handleDeleteUser} className="btn btn-error">Delete User Data</button>
            </div>
            {/* Render other user data as needed */}
        </div>
    );
};

export default Profile;
