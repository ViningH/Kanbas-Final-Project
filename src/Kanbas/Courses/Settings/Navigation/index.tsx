import { Link, useParams } from "react-router-dom";
import "../../Modules/index.css";
import "../index.css";
import { FaCheckCircle, FaEllipsisV } from "react-icons/fa";

function CourseSettingsNavigation() {
    const { courseId } = useParams();
    return (
        <>
            <ul className="nav nav-tabs wd-settings-links">
                <li className="nav-item">
                    <Link to={`/Kanbas/Courses/${courseId}/Settings/CourseDetails`} className="nav-link"> Course
                        Details</Link>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Sections</a>
                </li>
                <li className="nav-item">
                    <Link to={`/Kanbas/Courses/${courseId}/Settings/Navigation`} className="nav-link active"> Navigation
                        </Link>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Apps</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Feature Options</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Integrations</a>
                </li>
            </ul>
            <br />
            <h5>Drag and drop items to reorder them in the course navigation.</h5>
            <br />
            <ul className="list-group">
                <li className="list-group-item">
                    <FaEllipsisV /> &emsp; Home
                    <span className="float-end">
                        <FaCheckCircle className="text-success" />
                        <FaEllipsisV className="ms-2"/>
                    </span>
                </li>
                <li className="list-group-item">
                    <FaEllipsisV /> &emsp; Module
                    
                    <span className="float-end">
                        <FaCheckCircle className="text-success" />
                        <FaEllipsisV className="ms-2"/>
                    </span>
                </li>
                <li className="list-group-item">
                    <FaEllipsisV /> &emsp; Piazza
                    <span className="float-end">
                        <FaCheckCircle className="text-success" />
                        <FaEllipsisV className="ms-2"/>
                    </span>
                </li>
                <li className="list-group-item">
                    <FaEllipsisV /> &emsp; Zoom Meetings
                    <span className="float-end">
                        <FaCheckCircle className="text-success" />
                        <FaEllipsisV className="ms-2"/>
                    </span>
                </li>
                <li className="list-group-item">
                    <FaEllipsisV /> &emsp; Assignments
                    <span className="float-end">
                        <FaCheckCircle className="text-success" />
                        <FaEllipsisV className="ms-2"/>
                    </span>
                </li>
                <li className="list-group-item">
                    <FaEllipsisV /> &emsp; Quizzes
                    <span className="float-end">
                        <FaCheckCircle className="text-success" />
                        <FaEllipsisV className="ms-2"/>
                    </span>
                </li>
                <li className="list-group-item">
                    <FaEllipsisV /> &emsp; Grades
                    <span className="float-end">
                        <FaCheckCircle className="text-success" />
                        <FaEllipsisV className="ms-2"/>
                    </span>
                </li>
                <li className="list-group-item">
                    <FaEllipsisV /> &emsp; People
                    <span className="float-end">
                        <FaCheckCircle className="text-success" />
                        <FaEllipsisV className="ms-2"/>
                    </span>
                </li>
                <li className="list-group-item">
                    <FaEllipsisV /> &emsp; Panopto Video
                    <span className="float-end">
                        <FaCheckCircle className="text-success" />
                        <FaEllipsisV className="ms-2"/>
                    </span>
                </li>
            </ul>

            <br />
            <h5>Drag items here to hide them from students.</h5>
            Disabling most pages will cause students who visit those pages to be redirected to the course home page.<br />
            <br />
            <ul className="list-group">
                <li className="list-group-item">
                    <FaEllipsisV /> &emsp; Chat
                    <span className="float-end">
                        <FaCheckCircle className="text-success" />
                        <FaEllipsisV className="ms-2"/>
                    </span>
                </li>
                <li className="list-group-item">
                    <FaEllipsisV /> &emsp; SCORM
                    <span className="float-end">
                        <FaCheckCircle className="text-success" />
                        <FaEllipsisV className="ms-2"/>
                    </span>
                </li>
                <li className="list-group-item">
                    <FaEllipsisV /> &emsp; Attendance
                    <span className="float-end">
                        <FaCheckCircle className="text-success" />
                        <FaEllipsisV className="ms-2"/>
                    </span>
                </li>
                <li className="list-group-item">
                    <FaEllipsisV /> &emsp; Barnes and Noble Bookstore
                    <span className="float-end">
                        <FaCheckCircle className="text-success" />
                        <FaEllipsisV className="ms-2"/>
                    </span>
                </li>
                <li className="list-group-item">
                    <FaEllipsisV /> &emsp; Digication
                    <span className="float-end">
                        <FaCheckCircle className="text-success" />
                        <FaEllipsisV className="ms-2"/>
                    </span>
                </li>
                <li className="list-group-item">
                    <FaEllipsisV /> &emsp; Top Hat
                    <span className="float-end">
                        <FaCheckCircle className="text-success" />
                        <FaEllipsisV className="ms-2"/>
                    </span>
                </li>
                <li className="list-group-item">
                    <FaEllipsisV /> &emsp; Syllabus
                    <span className="float-end">
                        <FaCheckCircle className="text-success" />
                        <FaEllipsisV className="ms-2"/>
                    </span>
                </li>
                <li className="list-group-item">
                    <FaEllipsisV /> &emsp; Perusall
                    <span className="float-end">
                        <FaCheckCircle className="text-success" />
                        <FaEllipsisV className="ms-2"/>
                    </span>
                </li>
                <li className="list-group-item">
                    <FaEllipsisV /> &emsp; Microsoft Teams Meetings
                    <span className="float-end">
                        <FaCheckCircle className="text-success" />
                        <FaEllipsisV className="ms-2"/>
                    </span>
                </li>
                <li className="list-group-item">
                    <FaEllipsisV /> &emsp; FACT Reporting and Photo Roster
                    <span className="float-end">
                        <FaCheckCircle className="text-success" />
                        <FaEllipsisV className="ms-2"/>
                    </span>
                </li>
                <li className="list-group-item">
                    <FaEllipsisV /> &emsp; Progress Reports (Navigate)
                    <span className="float-end">
                        <FaCheckCircle className="text-success" />
                        <FaEllipsisV className="ms-2"/>
                    </span>
                </li>
                <li className="list-group-item">
                    <FaEllipsisV /> &emsp; Microsoft Teams for Canvas
                    <span className="float-end">
                        <FaCheckCircle className="text-success" />
                        <FaEllipsisV className="ms-2"/>
                    </span>
                </li>
                <li className="list-group-item">
                    <FaEllipsisV /> &emsp; VHL Central
                    <span className="float-end">
                        <FaCheckCircle className="text-success" />
                        <FaEllipsisV className="ms-2"/>
                    </span>
                </li>
                <li className="list-group-item">
                    <FaEllipsisV /> &emsp; Gradescope 1.3
                    <span className="float-end">
                        <FaCheckCircle className="text-success" />
                        <FaEllipsisV className="ms-2"/>
                    </span>
                </li>
                <li className="list-group-item">
                    <FaEllipsisV /> &emsp; Credentials
                    <span className="float-end">
                        <FaCheckCircle className="text-success" />
                        <FaEllipsisV className="ms-2"/>
                    </span>
                </li>
                <li className="list-group-item">
                    <FaEllipsisV /> &emsp; iClicker
                    <span className="float-end">
                        <FaCheckCircle className="text-success" />
                        <FaEllipsisV className="ms-2"/>
                    </span>
                </li>
            </ul>
            <br />
            <button className="wd-red-button">Save</button>
        </>
    );
}
export default CourseSettingsNavigation;