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
        if (user.username && user.password && user.firstName && user.lastName) {
            try {
                const currentUser = await client.signup(user);
                dispatch(setCurrentUser(currentUser));
                navigate("/Kanbas/Account/Profile");
            } catch (err: any) {
                setError(err.response.data.message);
            }
        } else {
            setError("Please enter all fields");
        }

    };
    return (
        <div className="wd-signup-screen container">
            <h1>Sign up</h1>
            {error && <div className="wd-error alert alert-danger">{error}</div>}
            <input value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })}
                className="wd-username form-control mb-2 w-25" placeholder="username" 
                onKeyDown={(e) => {
                    if (e.key === "Enter") {signup(); }
                }} />
            <input value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} type="password"
                className="wd-password form-control mb-2 w-25" placeholder="password" 
                onKeyDown={(e) => {
                    if (e.key === "Enter") {signup(); }
                }} />
            <input value={user.firstName} onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                className="wd-firstname form-control mb-2 w-25" placeholder="first name" 
                onKeyDown={(e) => {
                    if (e.key === "Enter") {signup(); }
                }} />
            <input value={user.lastName} onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                className="wd-firstname form-control mb-2 w-25" placeholder="last name" 
                onKeyDown={(e) => {
                    if (e.key === "Enter") {signup(); }
                }} />
            <select value={user.role}
                onChange={(e) => setUser({ ...user, role: e.target.value })}
                className="wd-role form-select mb-2 w-25"
                onKeyDown={(e) => {
                    if (e.key === "Enter") {signup(); }
                }} >
                <option value="STUDENT">Student</option>
                <option value="FACULTY">Faculty</option>
            </select>
            <button onClick={signup} className="wd-signup-btn btn btn-primary mb-2 w-25"> Sign up </button><br />
            <Link to="/Kanbas/Account/Signin" className="wd-signin-link">Sign in</Link>
        </div>
    );
}
