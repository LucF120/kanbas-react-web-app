import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as client from "./client";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
export default function Signup() {
    const [user, setUser] = useState<any>({});
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const signup = async () => {
        try {
            const currentUser = await client.signup(user);
            dispatch(setCurrentUser(currentUser));
            navigate("/Kanbas/Account/Profile");
        } catch (err: any) {
            setError(err.response.data.message);
        }
    };
    return (
        <div className="wd-signup-screen container">
            <h1>Sign up</h1>
            {error && <div className="wd-error alert alert-danger">{error}</div>}
            <input value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })}
                className="wd-username form-control mb-2 w-25" placeholder="username" />
            <input value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} type="password"
                className="wd-password form-control mb-2 w-25" placeholder="password" />
            <button onClick={signup} className="wd-signup-btn btn btn-primary mb-2 w-25"> Sign up </button><br />
            <Link to="/Kanbas/Account/Signin" className="wd-signin-link">Sign in</Link>
        </div>
    );
}
