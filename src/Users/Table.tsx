import React, { useState, useEffect } from "react";
import { BsFillCheckCircleFill, BsPencil, BsTrash3Fill, BsPlusCircleFill } from "react-icons/bs";
import * as client from "./client";
import { User } from "./client";
import "./index.css";
export default function UserTable() {
    const [users, setUsers] = useState<User[]>([]);
    const [user, setUser] = useState<User>({
        _id: "", username: "", password: "", firstName: "",
        lastName: "", role: "USER"
    });
    const createUser = async () => {
        try {
            const newUser = await client.createUser(user);
            setUsers([newUser, ...users]);
        } catch (err) {
            console.log(err);
        }
    };
    const deleteUser = async (user: User) => {
        try {
            await client.deleteUser(user);
            setUsers(users.filter((u) => u._id !== user._id));
        } catch (err) {
            console.log(err);
        }
    };
    const selectUser = async (user: User) => {
        try {
            const u = await client.findUserById(user._id);
            setUser(u);
        } catch (err) {
            console.log(err);
        }
    };
    const updateUser = async () => {
        try {
            const status = await client.updateUser(user);
            setUsers(users.map((u) =>
                (u._id === user._id ? user : u)));
        } catch (err) {
            console.log(err);
        }
    };
    const [role, setRole] = useState("USER");
    const fetchUsersByRole = async (role: string) => {
        const users = await client.findUsersByRole(role);
        setRole(role);
        setUsers(users);
    };
    const fetchUsers = async () => {
        const users = await client.findAllUsers();
        setUsers(users);
    };
    useEffect(() => { fetchUsers(); }, []);
    return (
        <div>
            <div className="wd-align-right">
                <label htmlFor="fetch-role">Fetch by Role:</label>
                <select
                    id="fetch-role"
                    onChange={(e) => fetchUsersByRole(e.target.value)}
                    value={role || "USER"}
                    className="w-25 float-end input-corners input-space"
                >
                    <option value="USER">User</option>
                    <option value="ADMIN">Admin</option>
                    <option value="FACULTY">Faculty</option>
                    <option value="STUDENT">Student</option>
                </select>
            </div>
            <h1>User Table</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Password (for new)</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Role</th>
                        <th>&nbsp;</th>
                        <th>&nbsp;</th>
                    </tr>
                    <tr>
                        <td>
                            <input className="input-small input-corners" value={user.username} onChange={(e) =>
                                setUser({ ...user, username: e.target.value })} />

                        </td>
                        <td>
                            <input className="input-small input-corners" value={user.password} onChange={(e) =>
                                setUser({ ...user, password: e.target.value })} />
                        </td>
                        <td>
                            <input className="input-small input-corners" value={user.firstName} onChange={(e) =>
                                setUser({ ...user, firstName: e.target.value })} />
                        </td>
                        <td>
                            <input className="input-small input-corners" value={user.lastName} onChange={(e) =>
                                setUser({ ...user, lastName: e.target.value })} />
                        </td>
                        <td>
                            <select value={user.role} onChange={(e) =>
                                setUser({ ...user, role: e.target.value })}>
                                <option value="USER">User</option>
                                <option value="ADMIN">Admin</option>
                                <option value="FACULTY">Faculty</option>
                                <option value="STUDENT">Student</option>
                            </select>
                        </td>
                        <td className="text-nowrap">
                            <BsFillCheckCircleFill
                                onClick={updateUser}
                                className="me-2 text-success fs-1 text"
                            />
                        </td>
                        <td>
                            <BsPlusCircleFill onClick={createUser} className="me-2 text-success fs-1 text" />
                        </td>
                    </tr>

                </thead>
                <tbody>
                    {users.map((user: any) => (
                        <tr key={user._id}>
                            <td>{user.username}</td>
                            <td>&nbsp;</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.role}</td>
                            <td>
                                <button className="btn input-red-button me-2" onClick={() => deleteUser(user)}>
                                    <BsTrash3Fill />
                                </button>

                            </td>
                            <td>
                                <button className="btn btn-warning me-2">
                                    <BsPencil onClick={() => selectUser(user)} />
                                </button>
                            </td>
                        </tr>))}
                </tbody>
            </table>
        </div>
    );
}
