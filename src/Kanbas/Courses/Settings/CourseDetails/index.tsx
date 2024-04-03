import "../index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useParams } from "react-router-dom";
import { courses } from "../../../Database";
function CourseDetails() {
    const { courseId } = useParams();
    const course = courses.find((course) => course._id === courseId);
    return (
        <>
            <ul className="nav nav-tabs wd-settings-links">
                <li className="nav-item">
                    <Link to={`/Kanbas/Courses/${courseId}/Settings/CourseDetails`} className="nav-link active"> Course
                        Details</Link>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Sections</a>
                </li>
                <li className="nav-item">
                    <Link to={`/Kanbas/Courses/${courseId}/Settings/Navigation`} className="nav-link"> Navigation
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
            <h2>Course Details</h2>
            <br />
            <div className="row">
                <div className="col-3">
                    <b><label>Image:</label></b>
                </div>
                <div className="col-8">
                    <input className="form-control" type="File" />
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col-3">
                    <b><label>Name:</label></b>
                </div>
                <div className="col-8">
                    {course?.number} 12631 {course?.name} {course?.semester} [BOS-1-TR]
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col-3">
                    <b><label>Course Code:</label></b>
                </div>
                <div className="col-8">
                    {course?.number}.12631.202410
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col-3">
                    <b><label>Blueprint Course:</label></b>
                </div>
                <div className="col-8">
                    No
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col-3">
                    <b><label>Course Template:</label></b>
                </div>
                <div className="col-8">
                    <input type="checkbox" name="template-enable" value="ENABLETEMPLATE" />
                    <label htmlFor="template-enable">Enable course as a Course Template</label>
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col-3">
                    <b><label>Time Zone:</label></b>
                </div>
                <div className="col-8">
                    <select className="form-control">
                        <option>Eastern Time (US & Canada) (-05:00/-04:00)</option>
                        <option>Central Time (US & Canada) (-06:00/-05:00)</option>
                        <option>Mountain Time (US & Canada) (-07:00/-06:00)</option>
                        <option>Pacific Time (US & Canada) (-08:00/-07:00)</option>
                    </select>
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col-3">
                    <b><label>SIS ID:</label></b>
                </div>
                <div className="col-8">
                    {course?.number}.12631.202410
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col-3">
                    <b><label>Subaccount:</label></b>
                </div>
                <div className="col-8 wd-settings-links">
                    <a href="#">CS Undergrad</a>
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col-3">
                    <b><label>Term:</label></b>
                </div>
                <div className="col-8">
                    202410_1 {course?.semester} Semester Full Term
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col-3">
                    <b><label>Participation:</label></b>
                </div>
                <div className="col-8">
                    <select className="form-control">
                        <option>Term</option>
                        <option>Semester</option>
                    </select>
                    <br />
                    Course participation is limited to term start and end dates.<br />
                    <br />
                    <label htmlFor="start">Start</label>
                    <br />
                    <input className="form-control" type="date" id="start" />
                    <br />
                    <br />
                    <label htmlFor="end">End</label>
                    <br />
                    <input className="form-control" type="date" id="end" />
                    <br />
                    <br />
                    <input type="checkbox" name="restrict-start" value="RESTRICTSTART" />
                    <label htmlFor="restrict-start"> Restrict students from viewing course content before term start
                        date</label>
                    <br />
                    <input type="checkbox" name="restrict-end" value="RESTRICTEND" />
                    <label htmlFor="restrict-end"> Restrict students from viewing course content after term end
                        date</label>
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col-3">
                    <b><label>Default due time:</label></b>
                </div>
                <div className="col-8">
                    <select className="form-control">
                        <option>Account default (11:59pm)</option>
                        <option>Custom Time</option>
                    </select>
                    <br />
                    This influences the user interface for setting due dates. It does not change the time due
                    for any
                    existing assignments.
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col-3">
                    <b><label>Language:</label></b>
                </div>
                <div className="col-8">
                    <select className="form-control">
                        <option>Not set (user-configurable, defaults to English)</option>
                    </select>
                    <br />
                    This will override any user/system language preferences. This is only recommended for
                    foreign
                    language courses.
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col-3">
                    <b><label>File Storage:</label></b>
                </div>
                <div className="col-8">
                    10000 megabytes
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col-3">
                    <b><label>Large Course:</label></b>
                </div>
                <div className="col-8">
                    <input type="checkbox" name="launch-speedgrader" value="LAUNCHSPEEDGRADER" />
                    <label htmlFor="launch-speedgrader"> Launch SpeedGrader Filtered by Student Group</label>
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col-3">
                    <b><label>Grading Scheme:</label></b>
                </div>
                <div className="col-8">
                    <input type="checkbox" name="enable-grading-scheme" value="ENABLEGRADINGSCHEME" />
                    <label htmlFor="enable-grading-scheme"> Enable course grading scheme</label>
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col-3">
                    <b><label>License:</label></b>
                </div>
                <div className="col-8">
                    <select className="form-control">
                        <option>Private (Copyrighted)</option>
                        <option>Public</option>
                    </select>
                </div>
                <div className="col-1"><button className="wd-standard-button">?</button></div>
            </div>
            <br />
            <div className="row">
                <div className="col-3">
                    <b><label>File Copyright:</label></b>
                </div>
                <div className="col-9">
                    <input type="checkbox" name="file-copyright" value="FILECOPYRIGHT" />
                    <label htmlFor="file-copyright"> Copyright and license information must be provided for files
                        before they
                        are
                        published.</label>
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col-3">
                    <b><label>Visibility:</label></b>
                </div>
                <div className="col-8">
                    If you need to make your course public please contact your administrator/support. <br />
                </div>
            </div>
            <div className="row">
                <div className="col-3"></div>
                <div className="col-8"><select className="form-control">
                    <option>Course</option>
                </select></div>
                <div className="col-1"><button className="wd-standard-button">?</button></div>
            </div>
            <div className="row">
                <div className="col-3"></div>
                <div className="col-8"><input type="checkbox" name="public-index" value="PUBLICINDEX" />
                    <label htmlFor="public-index"> Include this course in the public course index</label>
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col-3"><b><label>Format:</label></b></div>
                <div className="col-8">
                    <select className="form-control">
                        <option>On-Campus</option>
                        <option>Online</option>
                    </select>
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col-3">
                    <b><label>Mastery Paths:</label></b>
                </div>
                <div className="col-8">
                    <input type="checkbox" name="mastery-paths" value="MASTERYPATHS" />
                    <label htmlFor="mastery-paths"> Enable individual learning paths for students based on
                        assessment</label>
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col-3">
                    <b><label>Description:</label></b>
                </div>
                <div className="col-8 wd-settings-links">
                    <textarea className="form-control"></textarea><br />
                    <a href="#">more options</a>
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col-3">
                </div>
                <div className="col-8 wd-settings-links">

                </div>
            </div>
            <br />

            <hr />
            <div className="wd-align-right">
                <button className="wd-standard-button">Update Course Details</button>
            </div>
        </>
    );
}
export default CourseDetails;