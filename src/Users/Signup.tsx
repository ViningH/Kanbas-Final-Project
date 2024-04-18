import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as client from "./client";
import "./index.css";
export default function Signup() {
  const [error, setError] = useState("");
  const [user, setUser] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const signup = async () => {
    try {
      await client.signup(user);
      navigate("/Kanbas/Account/Profile");
    } catch (err: any) {
      setError(err.response.data.message);
    }
  };
  return (
    <div>
      <h1>Signup</h1>
      {error && <div>{error}</div>}
      <label htmlFor="username" className="label-space">Username:</label>
      <input id="username" className = "input-space input-width input-corners" value={user.username} onChange={(e) => setUser({
          ...user, username: e.target.value })} />
           <br />
        <label htmlFor="password" className="label-space">Password:</label>
      <input id="password" className = "input-space input-width input-corners" value={user.password} onChange={(e) => setUser({
          ...user, password: e.target.value })} />
          <br />
      <button className = "btn btn-primary wd-button-space" onClick={signup}> Signup </button>
      <Link to={`/Kanbas/Account/Signin`}><button className = "btn btn-primary wd-button-space">Go to Signin</button></Link>
    </div>
  );
}
