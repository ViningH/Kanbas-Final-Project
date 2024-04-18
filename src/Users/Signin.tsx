import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "./client";
import * as client from "./client";
import "./index.css";
export default function Signin() {
  const [credentials, setCredentials] = useState<User>({ _id: "",
    username: "", password: "", firstName: "", lastName: "", role: "USER"
  });
  const navigate = useNavigate();
  const signin = async () => {
    try {
        const response = await client.signin(credentials);
        navigate("/Kanbas/Account/Profile");
    }
    catch (E) {alert("Username or Password Incorrect")}
    
  };
  return (
    <div>
      <h1>Signin</h1>
      <label htmlFor="username" className="label-space">Username:</label>
      <input id="username" className = "input-space input-width input-corners" value={credentials.username} onChange={(e) =>
        setCredentials({ ...credentials, username: e.target.value })}/>
        <br />
        <label htmlFor="password" className="label-space">Password:</label>
      <input id="password" className = "input-space input-width input-corners" value={credentials.password} onChange={(e) =>
        setCredentials({ ...credentials, password: e.target.value })}/>
        <br />
      <button className = "btn btn-primary wd-button-space" onClick={signin}> Signin </button>
      <Link to={`/Kanbas/Account/Signup`}><button className = "btn btn-primary wd-button-space">Go to Signup</button></Link>
    </div>
  );
}
