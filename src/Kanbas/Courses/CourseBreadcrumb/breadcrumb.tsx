import CourseNavigation from "../Navigation";
import { courses } from "../../Database";
import { Navigate, Route, Routes, useParams, Link, useLocation } from "react-router-dom";
import { FaBook, FaGlasses, FaChevronDown, FaHome, FaConnectdevelop, FaInbox, FaPlug, FaRegCalendarAlt, FaRegClock, FaRegQuestionCircle, FaRegSquare, FaRegUserCircle, FaShareSquare, FaTachometerAlt, FaRocket, FaFile, FaUsers } from "react-icons/fa";
import { HiMiniBars3 } from "react-icons/hi2";
import { link } from "fs";
import "./index.css";
import { FaGear, FaPencil } from "react-icons/fa6";
function CourseBreadcrumb({course}: {
    course: any 
}) {
    const links = [
        { label: "Account", icon: <FaRegUserCircle className="fs-2" /> },
        { label: "Dashboard", icon: <FaTachometerAlt className="fs-2" /> },
        { label: "Courses", icon: <FaBook className="fs-2" /> },
        { label: "Calendar", icon: <FaRegCalendarAlt className="fs-2" /> },
        { label: "Inbox", icon: <FaInbox className="fs-2" /> },
        { label: "History", icon: <FaRegClock className="fs-2" /> },
        { label: "Studio", icon: <FaRegSquare className="fs-2" /> },
        { label: "Commons", icon: <FaShareSquare className="fs-2" /> },
        { label: "Help", icon: <FaRegQuestionCircle className="fs-2" /> },
    ];
    const courselinks = [
        { label: "Home", icon: <FaHome className="fs-2" /> },
        { label: "Modules", icon: <FaConnectdevelop className="fs-2" /> },
        { label: "Piazza", icon: <FaPlug className="fs-2" /> },
        { label: "Assignments", icon: <FaPencil className="fs-2" /> },
        { label: "Quizzes", icon: <FaRocket className="fs-2" /> },
        { label: "Grades", icon: <FaFile className="fs-2" /> },
        { label: "People", icon: <FaUsers className="fs-2" /> },
        { label: "Settings", icon: <FaGear className="fs-2" /> }];
    const { courseId } = useParams();
    const { pathname } = useLocation();
    
    const location = useLocation();
    const pathArray = location.pathname.split('/');
    pathArray.shift();
    var pathLinks = [];
    var previousLink = "";
    for (let pathIndex in pathArray) {
        pathLinks.push("" + previousLink + "/" + pathArray[pathIndex]);
        previousLink = pathLinks[pathIndex];
    };
    console.log(pathLinks);
    const currentPage = pathArray[pathArray.length - 1];
    console.log(pathArray);
    pathArray.shift();
    pathLinks.shift();
    pathArray.shift();
    pathLinks.shift();
    var breadCrumbLinks = [];
    for (let pathIndex in pathArray) {
        breadCrumbLinks.push({ _name: pathArray[pathIndex], _links: pathLinks[pathIndex] })
    };
    console.log()
    return (
        <>
            <nav className="wd-breadcrumb" aria-label="breadcrumb">
                <div>
                    <span className="float-end">
                        <div className="d-none d-md-block">
                        <button className="wd-standard-button"><FaGlasses /> Student View</button>
                        </div>
                        <div className="d-md-none">
                            <button className="wd-breadcrumb-button"><FaGlasses /></button>
                            <button className="wd-breadcrumb-button" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseCourseNavi"
                            ><FaChevronDown /></button>
                        </div>
                    </span>
                    <ol className="breadcrumb">
                        <button className="navbar-toggler wd-breadcrumb-button" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseKanbasNavi" aria-expanded="false"
                            aria-controls="collapseKanbasNavi"><HiMiniBars3 /></button>
                        {breadCrumbLinks.map(({ _name, _links }) => (<li className={"breadcrumb-item " + (_name == currentPage ? "active" : "")} >
                            {_name == currentPage ? _name : <Link to={_links}>{_name == courseId ? course?.number + " " + course?.name : _name}</Link>}
                        </li>))}
                    </ol>

                </div>
            </nav>
            <div className="collapse" id="collapseKanbasNavi">
                <ul className="wd-dropdown-navigation">
                    {links.map((link, index) => (
                        <li key={index} className="">
                            <Link to={`/Kanbas/${link.label}`}> <span className={link.label.includes("Account") ? "wd-account-navi-icon" : ""}>{link.icon}</span> {link.label} </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="collapse" id="collapseCourseNavi">
                <ul className="wd-dropdown-navigation">
                    {courselinks.map((clink, index) => (
                        <li key={index} className={pathname.includes(clink.label) ? "wd-active" : ""}>
                            <Link to={clink.label}>{clink.icon}{clink.label}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
export default CourseBreadcrumb;