import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../index.css";
import { Link } from 'react-router-dom';
import { FaPencil } from 'react-icons/fa6';
function Profile() {
    return (
        <div className="wd-main-content">
            Jose Annunziato's Profile<br />
            <br />
            <hr />
            <br />
            <div className="wd-align-right">
                <Link to={`/Kanbas/Account/Profile/Edit`}><button className="wd-standard-button"><FaPencil /> Edit Profile</button></Link>
            </div>
            <h2>Jose Annunziato</h2>
            <br />
            <h3>Contact</h3>
            No registered services, you can add some on the <a className="wd-red-link" href="#">settings</a> page.
            <br />
            <br />
            <h3>Biography</h3>
            Faculty, Software Engineer, AI, Space, and renewables enthusiast.
            <br />
            <br />
            <h3>Links</h3>
            <a className="wd-red-link" href="#">YouTube</a>
        </div>
    );
}
export default Profile;