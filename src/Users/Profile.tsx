import * as client from "./client";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";
export default function Profile() {
    const [profile, setProfile] = useState({
        username: "", password: "",
        firstName: "", lastName: "", dob: "", email: "", role: "USER"
    });
    const navigate = useNavigate();
    const fetchProfile = async () => {
        const account = await client.profile();
        setProfile(account);
    };
    const save = async () => {
        await client.updateUser(profile);
    };
    const signout = async () => {
        await client.signout();
        navigate("/Kanbas/Account/Signin");
    };
    useEffect(() => {
        fetchProfile();
    }, []);
    return (
        <div>
            <h1>Profile</h1>

            {profile && (
                <div>
                    <label htmlFor="username" className="label-space">Username:</label>
                    <input id="username" className="input-space input-width input-corners" value={profile.username} onChange={(e) =>
                        setProfile({ ...profile, username: e.target.value })} />
                    <br />
                    <label htmlFor="password" className="label-space">Password:</label>
                    <input id="password" className="input-space input-width input-corners" value={profile.password} onChange={(e) =>
                        setProfile({ ...profile, password: e.target.value })} />
                    <br />
                    <label htmlFor="first-name" className="label-space">First Name:</label>
                    <input id="first-name" className="input-space input-width input-corners" value={profile.firstName} onChange={(e) =>
                        setProfile({ ...profile, firstName: e.target.value })} />
                    <br />
                    <label htmlFor="last-name" className="label-space">Last Name:</label>
                    <input id="last-name" className="input-space input-width input-corners" value={profile.lastName} onChange={(e) =>
                        setProfile({ ...profile, lastName: e.target.value })} />
                    <br />
                    <label htmlFor="dob" className="label-space">Date of Birth:</label>
                    <input id="dob" className="input-space input-width input-corners" value={profile.dob} type="date" onChange={(e) =>
                        setProfile({ ...profile, dob: e.target.value })} />
                    <br />
                    <label htmlFor="email" className="label-space">Email:</label>
                    <input id="email" className="input-space input-width input-corners" value={profile.email} onChange={(e) =>
                        setProfile({ ...profile, email: e.target.value })} />
                    <br />
                    <label htmlFor="user-role" className="label-space">User Role:</label>
                    <select id="user-role" className="input-space input-width input-corners" onChange={(e) =>
                        setProfile({ ...profile, role: e.target.value })}>
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                        <option value="FACULTY">Faculty</option>
                        <option value="STUDENT">Student</option>
                    </select>
                </div>
            )}
            <div className="wd-align-right">
                <button className="btn input-green-button wd-button-space" onClick={save}>
                    Save
                </button>
                <button className="btn input-red-button wd-button-space" onClick={signout}>
                    Signout
                </button>
            </div>
            <br />
            <Link to="/Kanbas/Account/Admin/Users"
                className="btn btn-warning w-100">
                Users Table
            </Link>
        </div>
    );
}
