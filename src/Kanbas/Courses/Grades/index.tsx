import { assignments, enrollments, grades, users } from "../../Database";
import { useParams } from "react-router-dom";
import { FaFilter } from "react-icons/fa";
import { FaGear, FaFileImport } from "react-icons/fa6";
import "./index.css";
function Grades() {
  const { courseId } = useParams();
  const as = assignments.filter((assignment) => assignment.course === courseId);
  const es = enrollments.filter((enrollment) => enrollment.course === courseId);
  return (
    <div>
      <div className="wd-align-right">
                        <button className="wd-standard-button"><FaFileImport /> Import</button>
                        <select className="wd-standard-button">
                            <option><i className="fa-solid fa-file-export"></i>➦ Export</option>
                            <option>Export Current Gradebook View</option>
                            <option>Export Entire Gradebook</option>
                        </select>
                        <button className="wd-standard-button"><FaGear /></button>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <label><strong>Student Names</strong></label>
                        </div>
                        <div className="col-6">
                            <label><strong>Assignment Names</strong></label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <input className="form-control" type="text" name="student-dropdown"
                                placeholder="🔎︎ Search Students" />
                        </div>
                        <div className="col-6">
                            <input className="form-control" type="text" name="assignment-dropdown"
                                placeholder="🔎︎ Search Assignments" />
                        </div>
                    </div>
                    <br />
                    <button className="wd-standard-button"><FaFilter/> Apply Filters</button><br /><br />
      <h1>Grades</h1>
      <div className="table-responsive table-bordered">
        <table className="table table-striped table-bordered">
          <thead>
            <th>Student Name</th>
            {as.map((as) => (<th  className="wd-center-table-items">{as.title}<br /> Out of {as.points}</th>))}
          </thead>
          <tbody>
            {es.map((es) => {
              const user = users.find((user) => user._id === es.user);
              return (
                <tr>
                   <td className="wd-student-text">{user?.firstName} {user?.lastName}</td>
                   {as.map((as) => {
                     const grade = grades.find(
                       (grade) => grade.student === es.user && grade.assignment === as._id);
                       return (<td>{grade?.grade || ""}</td>);})}
                </tr>);
            })}
          </tbody></table>
      </div></div>);
}
export default Grades;