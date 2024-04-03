import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as db from "../Database";
import { FaPencilRuler } from "react-icons/fa";
import { TbFilePencil } from "react-icons/tb";
import "./index.css";
function Dashboard({ courses, course, setCourse, addNewCourse,
  deleteCourse, updateCourse }: {
    courses: any[]; course: any; setCourse: (course: any) => void;
    addNewCourse: () => void; deleteCourse: (course: any) => void;
    updateCourse: () => void;
  }) {
  return (
    <div className="p-4">
      <h1>Dashboard</h1>
      <div className="wd-course-add-box">
        <h5>Course</h5>
        <input value={course.name} className="form-control wd-add-item-padding"
          onChange={(e) => setCourse({ ...course, name: e.target.value })} />
        <input value={course.number} className="form-control wd-add-item-padding"
          onChange={(e) => setCourse({ ...course, number: e.target.value })} />
          Start Date:
        <input value={course.startDate} className="form-control wd-add-item-padding" type="date"
          onChange={(e) => setCourse({ ...course, startDate: e.target.value })} />
          End Date:
        <input value={course.endDate} className="form-control wd-add-item-padding" type="date"
          onChange={(e) => setCourse({ ...course, endDate: e.target.value })} />
        <div className="wd-btn-move-right">
          <button className="btn wd-green-dashboard-btn wd-dashboard-btn-padding wd-add-item-padding" onClick={addNewCourse} >
            Add
          </button>
          <button className="btn btn-primary wd-dashboard-btn-padding wd-add-item-padding" onClick={updateCourse} >
            Update
          </button>
        </div>
      </div>
      <hr />
      <h2>Published Courses ({courses.length})</h2> <hr />
      <div className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses.map((course) => (
            <div key={course._id} className="col" style={{ width: 300 }}>
              <div className="card">
                <img src={`/images/${course.image}`} className="card-img-top"
                  style={{ height: 150 }} />
                <div className="card-body">
                  <Link className="card-title" to={`/Kanbas/Courses/${course._id}/Home`}
                    style={{ textDecoration: "none", color: "dodgerblue", fontWeight: "bold" }}>
                    {course.number} {course.name} </Link>
                  <p className="card-text">{course.number}.{course._id} {course.name}</p>
                  <div>
                    <Link to={`/Kanbas/Courses/${course._id}/Home`} className="btn wd-dashboard-button">
                      <TbFilePencil style={{ fontSize: 25 }} /></Link>
                    <span className="wd-btn-move-right">

                      <button className="btn btn-primary wd-dashboard-btn-padding"
                        onClick={(event) => {
                          event.preventDefault();
                          setCourse(course);
                        }}>
                        Edit
                      </button>

                      <button className="btn wd-red-dashboard-btn wd-dashboard-btn-padding"
                        onClick={(event) => {
                          event.preventDefault();
                          deleteCourse(course._id);
                        }}>
                        Delete
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Dashboard;