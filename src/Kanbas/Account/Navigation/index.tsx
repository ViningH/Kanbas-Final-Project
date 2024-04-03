import { Link, useLocation } from "react-router-dom";
import "./index.css"; // feel free to use the CSS from previous assignments
function AccountNavigation() {
    const links = ["Notifications", "Profile", "Files", "Settings", "ePortfolios", "Shared Content", "The Hub", "Quickly Course Tools", "Global Annoucements"];
    const { pathname } = useLocation();
    return (
        <>
            <ul className="wd-navigation">
                {links.map((link, index) => (
                    <li key={index} className={pathname.includes(link) ? "wd-active" : ""}>
                        <Link to={link}>{link}</Link>
                    </li>
                ))}
            </ul>
        </>
    );
}
export default AccountNavigation;