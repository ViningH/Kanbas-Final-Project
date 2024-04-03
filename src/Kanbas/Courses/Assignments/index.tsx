import React, {useEffect} from "react";
import { FaCheckCircle, FaEllipsisV, FaPlusCircle } from "react-icons/fa";
import { TbFilePencil } from "react-icons/tb";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./index.css";
import { KanbasState } from "../../store";
import { setAssignment,
deleteAssignment, setAssignments } from "./reducer";
import * as client from "./client";
function Assignments() {
  const { courseId } = useParams();
  const assignmentList = useSelector((state: KanbasState) => state.assignmentsReducer.assignments);
  const assignment = useSelector((state: KanbasState) => state.assignmentsReducer.assignment);
  const dispatch = useDispatch();
  useEffect(() => {
    client.findAssignmentsForCourse(courseId)
      .then((assignments) =>
        dispatch(setAssignments(assignments))
    );
  }, [courseId]);
  const handleDelete = (assignmentID: any) => {
    if (window.confirm("Do you want to delete this assignment?")) {
      client.deleteAssignment(assignmentID).then((status) => {
      dispatch(deleteAssignment(assignmentID));});
    };    
  };
  return (
    <>
      <p className="wd-inline-align">
        <input placeholder="Search for Assignments" />
        <span>
          <button className="wd-standard-button">+ Group</button>
          <Link to={`/Kanbas/Courses/${courseId}/Assignments/NewAssignment`}>
            <button className="wd-red-button" onClick={() => dispatch(setAssignment({...assignment, 
              _id: new Date().getTime().toString(), 
              title: "New Assignment", description: "New Assignment Description",
              points: 100, start: "2024-01-01",
              due: "2024-12-31",
              end: "2025-01-01"  }))}>+ Assignment
            </button></Link>
          <button className="wd-standard-button">⋮</button></span>
      </p>
      <hr />
      <ul className="list-group wd-modules">
        <li className="list-group-item">
          <div>
            <FaEllipsisV className="me-2" /><strong>🞃 Assignments</strong>
            <span className="float-end">
              <button className="wd-assignment-button">40% of Total</button>
              <FaPlusCircle className="ms-2" /><FaEllipsisV className="ms-2" />
            </span>
          </div>
          <ul className="list-group">
            {assignmentList.filter((assignment) =>
              assignment.course === courseId).map((assignment) => (
                <li className="list-group-item">
                  <div className="d-flex">
                    <div className="wd-assignment-item-padding">
                      <FaEllipsisV className="me-2" />
                    </div>
                    <div className="wd-assignment-item-padding">
                      <TbFilePencil className="wd-green-pencil" />
                    </div>
                    <div className="flex-fill wd-assignment-text-padding">
                      <h4><Link
                        to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`} className="wd-assignment-title-link" onClick={() => dispatch(setAssignment(assignment))}>{assignment.title}</Link></h4>
                      <span className="wd-red-link">Multiple Modules</span> | Week starting on {assignment.start} |<br />
                      Due {assignment.due} at 11:59 PM | {assignment.points} pts
                    </div>
                    <div className="wd-assignment-item-padding">
                      <button className="wd-red-button" onClick={() => handleDelete(assignment._id)}>Delete</button>
                      <FaCheckCircle className="text-success" /><FaEllipsisV className="ms-2" /></div>
                  </div>
                </li>))}
          </ul>
        </li>
      </ul>
    </>
  );
}
export default Assignments;