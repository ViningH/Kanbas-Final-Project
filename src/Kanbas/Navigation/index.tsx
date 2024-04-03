import { Link, useLocation } from "react-router-dom";
import "./index.css";
import { FaTachometerAlt, FaRegUserCircle, FaBook, FaRegCalendarAlt, FaInbox, FaRegClock, FaRegSquare, FaShareSquare, FaRegQuestionCircle } from "react-icons/fa";
function KanbasNavigation() {
    const links = [
        { label: "Account", icon: <FaRegUserCircle className="fs-2"/> },
        { label: "Dashboard", icon: <FaTachometerAlt className="fs-2" /> },
        { label: "Courses", icon: <FaBook className="fs-2" /> },
        { label: "Calendar", icon: <FaRegCalendarAlt className="fs-2" /> },
        { label: "Inbox", icon: <FaInbox className="fs-2" /> },
        { label: "History", icon: <FaRegClock className="fs-2" /> },
        { label: "Studio", icon: <FaRegSquare className="fs-2" /> },
        { label: "Commons", icon: <FaShareSquare className="fs-2" /> },
        { label: "Help", icon: <FaRegQuestionCircle className="fs-2" /> },
    ];
    const { pathname } = useLocation();
    return (
        <ul className="wd-kanbas-navigation wd-page-height">
            <li>
            <a className="wd-n-text" href="http://northeastern.edu">N</a>
            </li>
            {links.map((link, index) => (
                <li key={index} className={pathname.includes(link.label) ? "wd-active" : ""}>
                    <Link to={`/Kanbas/${link.label}`}> <span className={link.label.includes("Account") ? "account-icons" : "regular-icons"}>{link.icon}</span> <div>{link.label}</div> </Link>
                </li>
            ))}
        </ul>
    );
}
export default KanbasNavigation;