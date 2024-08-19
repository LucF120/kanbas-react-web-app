import * as client from "./client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "./reducer";
export default function Profile() {
    const [profile, setProfile] = useState<any>({});
    const [errorMessage, setErrorMessage] = useState<string>();
    const [updateProfileMessage, setUpdateProfileMessage] = useState<string>();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const signout = async () => {
        await client.signout();
        dispatch(setCurrentUser(null));
        navigate("/Kanbas/Account/Signin");
    };
    const updateProfile = async () => {
        try {
            await client.updateProfile(profile._id, profile);
            dispatch(setCurrentUser(profile));
            setUpdateProfileMessage("Profile Updated Successfully");
        } catch (err: any) {
            setErrorMessage(err.response.data.message);
        }

    };
    const fetchProfile = async () => {
        try {
            const account = await client.profile();
            setProfile(account);
        } catch (err: any) {
            navigate("/Kanbas/Account/Signin");
        }
    };
    useEffect(() => { fetchProfile(); }, []);
    return (
        <div className="wd-profile-screen container">
            <h1>Profile</h1>
            {errorMessage && (
                <div id="wd-profile-error-message" className="alert alert-danger mb-2 mt-2">{errorMessage}</div>
            )}
            {updateProfileMessage && (
                <div id="wd-profile-success-message" className="alert alert-success mb-2 mt-2">{updateProfileMessage}</div>
            )}
            {profile && (
                <div className="row mt-4">
                    <div className="col-2 text-start">
                        <label>Username</label>

                    </div>
                    <div className="col-10">
                        <input className="wd-username form-control mb-2 w-25" value={profile.username}
                            onChange={(e) => setProfile({ ...profile, username: e.target.value })} />
                    </div>
                    <div className="col-2 text-start">
                        <label>Password</label>

                    </div>
                    <div className="col-10">
                        <input className="wd-password form-control mb-2 w-25" value={profile.password}
                            onChange={(e) => setProfile({ ...profile, password: e.target.value })} />
                    </div>
                    <div className="col-2 text-start">
                        <label>First Name</label>
                    </div>
                    <div className="col-10">
                        <input className="wd-firstname form-control mb-2 w-25" value={profile.firstName}
                            onChange={(e) => setProfile({ ...profile, firstName: e.target.value })} />
                    </div>

                    <div className="col-2 text-start">
                        <label>Last Name</label>
                    </div>
                    <div className="col-10">
                        <input className="wd-lastname form-control mb-2 w-25" value={profile.lastName}
                            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} />
                    </div>

                    <div className="col-2 text-start">
                        <label>Birthdate</label>
                    </div>
                    <div className="col-10">
                        <input className="wd-dob form-control mb-2 w-25"
                            value={profile.dob ? new Date(profile.dob).toISOString().split('T')[0] : ''}
                            onChange={(e) => setProfile({ ...profile, dob: e.target.value })} type="date" />
                    </div>

                    <div className="col-2 text-start">
                        <label>Email</label>
                    </div>
                    <div className="col-10">
                        <input className="wd-email form-control mb-2 w-25" value={profile.email}
                            onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
                    </div>

                    <div className="col-2 text-start">
                        <label>Role</label>
                    </div>
                    <div className="col-10">
                        <select className="wd-role form-select mb-2 w-25" onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                            value={profile.role}>
                            <option value="FACULTY">Faculty</option>      <option value="STUDENT">Student</option>
                        </select>
                    </div>
                    <div className="col-12 mt-4">
                        <button onClick={updateProfile} className="col-12 btn btn-success w-25">Update Information</button>
                    </div>
                    <div className="col-12 mt-4">
                        <button onClick={signout} className="col-12 wd-signout-btn btn btn-danger w-25">
                            Sign out
                        </button>
                    </div>


                </div>
            )}
        </div>
    );
}
