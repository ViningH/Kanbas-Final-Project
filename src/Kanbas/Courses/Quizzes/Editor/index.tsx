import "./index.css";
import React, { useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaCircleCheck } from "react-icons/fa6";
import { Editor } from '@tinymce/tinymce-react';
function QuizEditor() {
    return (
        <>
            <div>
                <div className="wd-align-right">
                    Points 0 &ensp;
                    <strong className="text-success"> <FaCircleCheck /> Published &emsp;</strong>
                    <button className="wd-standard-button">⋮</button>
                </div>
                <hr />
                <ul className="nav nav-tabs wd-settings-links">
                    <li className="nav-item">
                        <Link to={"/Quizzes/Details"} className="nav-link active">Details</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"#"} className="nav-link">Questions</Link>
                    </li>
                </ul>
                < br />
                <input className="form-control quiz-input-style" value="Unnamed Quiz" />
                < br />
                Quiz Instructions:
                <br />
                <Editor apiKey='u1u1m6dbp6lhdqlz8nc5bfub9phithmuzavtcs2b6cbusqj7'
                />
                <br />
                <div className="mb-3 row">
                    <label htmlFor="quiz-type-input" className="col-3 col-form-label wd-align-text-right">Quiz Type </label>
                    <div className="col-5">
                        <select className="form-control" id="quiz-type-input">
                            <option>
                                Graded Quiz
                            </option>
                            <option>
                                Practice Quiz
                            </option>
                            <option>
                                Graded Survey
                            </option>
                            <option>
                                Ungraded Survey
                            </option>
                        </select>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="points-input" className="col-3 col-form-label wd-align-text-right">Points </label>
                    <div className="col-5">
                        <input className="form-control" placeholder="100" id="points-input" />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="assignment-group-input" className="col-3 col-form-label wd-align-text-right">Quiz Type </label>
                    <div className="col-5">
                        <select className="form-control" id="assignment-group-input">
                            <option>
                                Quizzes
                            </option>
                            <option>
                                Exams
                            </option>
                            <option>
                                Assignments
                            </option>
                            <option>
                                Project
                            </option>
                        </select>
                    </div>
                </div>
                <div className="mb-3 row">
                    <div className="col-3">
                        &emsp;
                    </div>
                    <div className="col-7 wd-align-text-left">
                        <strong>Options</strong>
                    </div>
                </div>
                <div className="mb-3 row">
                    <div className="col-3">
                        &emsp;
                    </div>
                    <div className="col-7 wd-align-text-left">
                        <input type="checkbox" value="SHUFFLE" name="shuffle" id="shuffle" />
                        <label htmlFor="shuffle">&nbsp; Shuffle Answers</label>
                    </div>
                </div>
                <div className="mb-3 row">
                    <div className="col-3">
                        &emsp;
                    </div>
                    <div className="col-2 wd-align-text-left">
                        <input type="checkbox" value="TIMELIMIT" name="time-limit" id="time-limit" />
                        <label htmlFor="shuffle">&nbsp; Time Limit</label>
                    </div>
                    <div className="col-1">
                        <input id="time-amount" className="form-control" />
                    </div>
                    <div className="col-3">
                        <label htmlFor="time-amount">&nbsp; Minutes</label>
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
                            <input className="form-control" type="date" />
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
                                    <input className="form-control" type="date" id="available-from"
                                    />
                                </div>
                                <div className="col-6">
                                    <input className="form-control" type="date" id="until"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <i className="fa fa-plus ms-2"></i> Add
                        </div>
                    </div>
                </div>
                <br />
                <hr />
                <p className="wd-inline-align">
                    <input type="checkbox" value="NOTIFYUSERS" name="notify-users" id="notify-users" />
                    <label htmlFor="notify-users">&nbsp; Notify users that this content has changed</label>
                    <span>
                        <Link to="#"><button className="wd-standard-button">Cancel</button></Link>
                        <Link to="#"><button className="wd-standard-button">Save & Publish</button></Link>
                        <Link to="#"><button className="wd-red-button">Save</button></Link>
                    </span>
                </p>
                <hr />
            </div >
        </>
    );
}
export default QuizEdimport "./index.css";
import React, { useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaCircleCheck } from "react-icons/fa6";
import { Editor } from '@tinymce/tinymce-react';
function QuizEditor() {
    return (
        <>
            <div>
                <div className="wd-align-right">
                    Points 0 &ensp;
                    <strong className="text-success"> <FaCircleCheck /> Published &emsp;</strong>
                    <button className="wd-standard-button">⋮</button>
                </div>
                <hr />
                <ul className="nav nav-tabs wd-settings-links">
                    <li className="nav-item">
                        <Link to={"#"} className="nav-link active">Details</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"#"} className="nav-link">Questions</Link>
                    </li>
                </ul>
                < br />
                <input className="form-control quiz-input-style" value="Unnamed Quiz" />
                < br />
                Quiz Instructions:
                <br />
                <Editor apiKey='u1u1m6dbp6lhdqlz8nc5bfub9phithmuzavtcs2b6cbusqj7'
                />
                <br />
                <div className="mb-3 row">
                    <label htmlFor="quiz-type-input" className="col-3 col-form-label wd-align-text-right">Quiz Type </label>
                    <div className="col-5">
                        <select className="form-control" id="quiz-type-input">
                            <option>
                                Graded Quiz
                            </option>
                            <option>
                                Practice Quiz
                            </option>
                            <option>
                                Graded Survey
                            </option>
                            <option>
                                Ungraded Survey
                            </option>
                        </select>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="points-input" className="col-3 col-form-label wd-align-text-right">Points </label>
                    <div className="col-5">
                        <input className="form-control" placeholder="100" id="points-input" />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="assignment-group-input" className="col-3 col-form-label wd-align-text-right">Quiz Type </label>
                    <div className="col-5">
                        <select className="form-control" id="assignment-group-input">
                            <option>
                                Quizzes
                            </option>
                            <option>
                                Exams
                            </option>
                            <option>
                                Assignments
                            </option>
                            <option>
                                Project
                            </option>
                        </select>
                    </div>
                </div>
                <div className="mb-3 row">
                    <div className="col-3">
                        &emsp;
                    </div>
                    <div className="col-7 wd-align-text-left">
                        <strong>Options</strong>
                    </div>
                </div>
                <div className="mb-3 row">
                    <div className="col-3">
                        &emsp;
                    </div>
                    <div className="col-7 wd-align-text-left">
                        <input type="checkbox" value="SHUFFLE" name="shuffle" id="shuffle" />
                        <label htmlFor="shuffle">&nbsp; Shuffle Answers</label>
                    </div>
                </div>
                <div className="mb-3 row">
                    <div className="col-3">
                        &emsp;
                    </div>
                    <div className="col-2 wd-align-text-left">
                        <input type="checkbox" value="TIMELIMIT" name="time-limit" id="time-limit" />
                        <label htmlFor="shuffle">&nbsp; Time Limit</label>
                    </div>
                    <div className="col-1">
                        <input id="time-amount" className="form-control" />
                    </div>
                    <div className="col-3">
                        <label htmlFor="time-amount">&nbsp; Minutes</label>
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
                            <input className="form-control" type="date" />
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
                                    <input className="form-control" type="date" id="available-from"
                                    />
                                </div>
                                <div className="col-6">
                                    <input className="form-control" type="date" id="until"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <i className="fa fa-plus ms-2"></i> Add
                        </div>
                    </div>
                </div>
                <br />
                <hr />
                <p className="wd-inline-align">
                    <input type="checkbox" value="NOTIFYUSERS" name="notify-users" id="notify-users" />
                    <label htmlFor="notify-users">&nbsp; Notify users that this content has changed</label>
                    <span>
                        <Link to="#"><button className="wd-standard-button">Cancel</button></Link>
                        <Link to="#"><button className="wd-standard-button">Save & Publish</button></Link>
                        <Link to="#"><button className="wd-red-button">Save</button></Link>
                    </span>
                </p>
                <hr />
            </div >
        </>
    );
}
export default QuizEditor;