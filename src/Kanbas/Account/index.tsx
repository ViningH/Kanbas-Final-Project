import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Navigate, Route, Routes } from "react-router-dom";
import AccountBreadcrumb from "./AccountBreadcrumb/breadcrumb";
import AccountNavigation from "./Navigation";
import Profile from './Profile';
import "./index.css";
import ProfileEdit from './Profile/Edit';
function Account() {
    return (
        <div className="wd-main-content">
            <AccountBreadcrumb />
            <div className="d-flex">
                <div className="d-none d-md-block">
                    <AccountNavigation />
                </div>
                <div className="wd-internal-content" >
                    <Routes>
                        <Route path="/" element={<Navigate to="Profile" />} />
                        <Route path="/Profile" element={<Profile />} />
                        <Route path="/Profile/Edit" element={<ProfileEdit />} />
                        <Route path="Notifications" element={<h1>Notifications</h1>} />
                        <Route path="Files" element={<h1>Files</h1>} />
                        <Route path="Settings" element={<h1>Settings</h1>} />
                        <Route path="ePortfolios" element={<h1>ePortfolios</h1>} />
                        <Route path="SharedContent" element={<h1>SharedContent</h1>} />
                        <Route path="TheHub" element={<h1>TheHub</h1>} />
                        <Route path="Qwickly" element={<h1>Qwickly</h1>} />
                        <Route path="Announcements" element={<h1>Announcements</h1>} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}
export default Account;