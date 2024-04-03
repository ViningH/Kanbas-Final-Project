import { Link } from "react-router-dom";

function ProfileEdit() {
    return (
        <>
            <div className="wd-align-right">
                <Link to={`/Kanbas/Account/Profile`}><button className="wd-standard-button">Cancel Editing</button></Link>
            </div>
            <br />
            <label>Name:* </label>
            <input className="form-control" value="Jose Annunziato" />
            <br />
            <label>Pronouns: </label>
            <select className="form-control">
                <option>None</option>
                <option>She/Her</option>
                <option>He/Him</option>
                <option>They/Them</option>
            </select>
            <br />
            <label>Title: </label><input className="form-control" />
            <br />
            <br />
            <h3>Contact</h3>
            No registered services, you can add some on the <a className="wd-red-link" href="#">settings</a> page.
            <br />
            <br />
            <h3>Biography</h3>
            <br />
            <textarea className="form-control">Faculty, Software Engineer, AI, Space, and renewables enthusiast.</textarea>
            <br />
            <br />
            <h3>Links</h3>
            <ul>
                <li><a className="wd-red-link" href="#">YouTube 🔗 Links to an external site.</a></li>
            </ul>
            <div className="row">
                <div className="col-3">
                    <strong>Title</strong>
                </div>
                <div className="col-1">
                    &emsp;
                </div>
                <div className="col-3">
                    <strong>URL</strong>
                </div>
            </div>
            <div className="row">
                <div className="col-3">
                    <input className="form-control" value="YouTube" />
                </div>
                <div className="col-1">
                    →
                </div>
                <div className="col-3">
                    <input className="form-control" value="https://www.youtube.com" />
                </div>
                <div className="col-1">
                    <a className="wd-red-link" href="#">Remove</a>
                </div>
            </div>
            <br />
            <button className="wd-standard-button">Add another link</button>
            <hr />
            <div className="wd-align-right">
                <Link to={`/Kanbas/Account/Profile`}><button className="wd-standard-button">Cancel</button></Link>
                <Link to={`/Kanbas/Account/Profile`}><button className="wd-standard-button">Save Profile</button></Link>
            </div>
        </>
    );
}
export default ProfileEdit;