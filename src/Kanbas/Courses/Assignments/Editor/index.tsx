import React, { useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./index.css";
import {
  addAssignment,
  updateAssignment,
  setAssignment,
  setAssignments,
} from "../reducer";
import { KanbasState } from "../../../store";
import { FaCircleCheck } from "react-icons/fa6";
import * as client from "../client";
function AssignmentEditor() {
  const assignment = useSelector((state: KanbasState) => state.assignmentsReducer.assignment);
  const assignmentList = useSelector((state: KanbasState) => state.assignmentsReducer.assignments);
  const dispatch = useDispatch();
  const { courseId } = useParams();
  useEffect(() => {
    client.findAssignmentsForCourse(courseId)
      .then((assignments) =>
        dispatch(setAssignments(assignments))
      );
  }, [courseId]);
  const navigate = useNavigate();

  const handleSave = () => {
    if (assignmentList.filter(a => a._id === assignment._id).length > 0) {
      console.log("Does this happen")
      console.log(assignment._id +"We are consoling assignment");
      client.updateAssignment(assignment).then(() => {dispatch(updateAssignment(assignment))});
    } else {
      console.log("Or does this")
      client.createAssignment(courseId, assignment).then((assignment) => { dispatch(addAssignment(assignment)) });
    };
    navigate(`/Kanbas/Courses/${courseId}/Assignments`);
  };
  return (
    <>
      <div>
        <div className="wd-align-right">
          <strong className="text-success"> <FaCircleCheck /> Published &emsp;</strong>
          <button className="wd-standard-button">⋮</button>
        </div>
        <hr />
        <div className="mb-3">
          <label htmlFor="assignment-name-input" className="form-label">
            Assignment Name</label>
          <input className="form-control" id="assignment-name-input"
            value={assignment?.title} onChange={(e) =>
              dispatch(setAssignment({ ...assignment, title: e.target.value }))} />
        </div>
        <div className="mb-3">
          <textarea className="form-control" id="assignment-text"
            onChange={(e) =>
              dispatch(setAssignment({ ...assignment, description: e.target.value }))}>
            {assignment?.description}
          </textarea>
        </div>
        <div style={{ textAlign: "center" }}>

          <div className="mb-3 row">
            <label htmlFor="points-input" className="col-3 col-form-label wd-align-text-right">Points </label>
            <div className="col-7"> <input className="form-control" placeholder={assignment?.points} id="points-input"
              onChange={(e) =>
                dispatch(setAssignment({ ...assignment, points: e.target.value }))} /> </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="assignment-group" className="col-3 col-form-label wd-align-text-right"> Assignment Group </label>
            <div className="col-7"> <select className="form-control" id="assignment-group">
              <option>
                ASSIGNMENTS
              </option>
              <option>
                QUIZZES
              </option>
            </select> </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="display-grade" className="col-3 col-form-label wd-align-text-right"> Display Grade as </label>
            <div className="col-7"> <select className="form-control" id="display-grade">
              <option>
                Percentage
              </option>
              <option>
                Points
              </option>
            </select> </div>
          </div>
          <div className="mb-3 row">
            <div className="col-3">
              &emsp;
            </div>
            <div className="col-7 wd-align-text-left">
              <input type="checkbox" value="NOTCOUNTED" name="not-counted" id="not-counted" />
              <label htmlFor="not-counted">&nbsp; Do not count this assignment towards the final grade.</label>
            </div>
          </div>
          <div className="mb-3 row">
            <div className="col-3">
              &emsp;
            </div>
            <div className="col-7">
              <hr />
            </div>
          </div>
          <div className="mb-3 row">
            <div className="col-3 wd-align-text-right">
              Submission Type
            </div>
            <div className="col-7 card">
              <div className="col-8 wd-inside-form-top">
                <select className="form-control">
                  <option>
                    Online
                  </option>
                  <option>
                    In Person
                  </option>
                </select>
              </div>
              <div className="col-8 wd-inside-form-card"><label><strong>Online Entry Options</strong></label></div>
              <div className="col-8 wd-inside-form-card"><input type="checkbox" value="TEXTENTRY" name="submission-check"
                id="text-entry" />
                <label htmlFor="text-entry">&nbsp;Text Entry</label>
              </div>
              <div className="col-8 wd-inside-form-card">
                <input type="checkbox" value="WEBSITEURL" name="submission-check" id="website-URL" />
                <label htmlFor="website-URL">&nbsp;Website URL</label>
              </div>
              <div className="col-8 wd-inside-form-card">
                <input type="checkbox" value="MEDIA" name="submission-check" id="media-recordings" />
                <label htmlFor="media-recordings">&nbsp;Media Recordings</label>
              </div>
              <div className="col-8 wd-inside-form-card">
                <input type="checkbox" value="ANNOTATION" name="submission-check" id="student-annotation" />
                <label htmlFor="student-annotation">&nbsp;Student Annotation</label>
              </div>
              <div className="col-8 wd-inside-form-card">
                <input type="checkbox" value="FILEUPLOAD" name="submission-check" id="file-uploads" />
                <label htmlFor="file-uploads">&nbsp;File Uploads</label>
              </div>
              <div className="col-8 wd-inside-form-card">
                &emsp;
                <input type="checkbox" value="FILEUPLOAD" name="submission-check" id="file-uploads" />
                <label htmlFor="file-uploads">&nbsp;Restrict Upload File Types</label>
              </div>
              <div className="col-8 wd-inside-form-card">

                <label><strong>Group Assignments</strong></label>
              </div>
              <div className="col-8 wd-inside-form-card">
                <input type="checkbox" value="ENABLEGROUP" name="group-assignment" id="enable-group" />
                <label htmlFor="enable-group">&nbsp;Enable Groups</label>
              </div>
              <div className="col-8 wd-inside-form-card">
                <label><strong>Peer Reviews</strong></label>
              </div>
              <div className="col-8 wd-inside-form-bottom">
                <input type="checkbox" value="PEERREVIEW" name="peer-reviews" id="peer-review" />
                <label htmlFor="peer-review">&nbsp;Add Peer Review</label>
              </div>
            </div>
          </div>
          <div className="mb-3 row">
            <div className="col-3 wd-align-text-right">
              Assign
            </div>
            <div className="col-7 card">
              <div className="col-8 wd-inside-form-top">
                <label htmlFor="assign-to"><strong>Assign to</strong></label>
              </div>
              <div className="col-11 wd-inside-form-card">
                <input className="form-control" id="assign-to" value="Everyone" />
              </div>
              <div className="col-8 wd-inside-form-card">
                <label><strong>Due</strong></label>
              </div>
              <div className="col-11 wd-inside-form-card">
                <input className="form-control" type="date" value={assignment?.due}
                  onChange={(e) =>
                    dispatch(setAssignment({ ...assignment, due: e.target.value }))} />
              </div>
              <div className="col-11 wd-inside-form-card">
                <div className="row">
                  <div className="col-6">
                    <label htmlFor="available-from"><strong>Available from</strong></label>
                  </div>
                  <div className="col-6">
                    <label htmlFor="until"><strong>Until</strong></label>
                  </div>
                </div>
              </div>
              <div className="col-11 wd-inside-form-bottom">
                <div className="row">
                  <div className="col-6">
                    <input className="form-control" type="date" id="available-from" value={assignment?.start}
                      onChange={(e) =>
                        dispatch(setAssignment({ ...assignment, start: e.target.value }))} />
                  </div>
                  <div className="col-6">
                    <input className="form-control" type="date" id="until" value={assignment?.end}
                      onChange={(e) =>
                        dispatch(setAssignment({ ...assignment, end: e.target.value }))} />
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <i className="fa fa-plus ms-2"></i> Add
              </div>
            </div>
          </div>
        </div>
        <br />
        <hr />
        <p className="wd-inline-align">
          <input type="checkbox" value="NOTIFYUSERS" name="notify-users" id="notify-users" />
          <label htmlFor="notify-users">&nbsp; Notify users that this content has changed</label>
          <span>
            <Link to={`/Kanbas/Courses/${courseId}/Assignments`}><button className="wd-standard-button">Cancel</button></Link>
            <Link to={`/Kanbas/Courses/${courseId}/Assignments`}><button onClick={handleSave} className="wd-red-button">Save</button></Link>
          </span>
        </p>
        <br />
      </div>
    </>
  );
}
export default AssignmentEditor;