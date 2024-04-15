import React, { useEffect, useState } from "react";
import "./index.css";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle, FaExternalLinkAlt, FaLink, FaRocket, FaCaretDown } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";

function QuizList(){

    return(
        <>
            <p className="wd-inline-align">
                <input placeholder="Search for Quiz" />
                <span>
                    <button className="wd-red-button"> + Assignment </button>
                    <button className="wd-standard-button">⋮</button></span>
            </p>
            <hr />
            <ul className="list-group wd-modules">
                <li className="list-group-item">
                <div>
                    <FaCaretDown className="me-2" /><strong>Assignments Quizzes</strong>
                </div>
                <ul className="list-group">
                        <li className="list-group-item">
                        <div className="d-flex">
                            <div className="wd-assignment-item-padding">
                            <FaRocket className="wd-green-pencil" />
                            </div>
                            <div className="flex-fill wd-quiz-text-padding">
                                <h4><Link to={"#"} className="nav-link">Q1 - HTML</Link></h4>
                            <span><strong>Closed</strong></span> | <strong>Due</strong> Sep 21 at 1 pm |
                            29 pts | 11 Questions
                            </div>
                            <div className="wd-assignment-item-padding">
                            <FaCheckCircle className="text-success" /><FaEllipsisV className="ms-2" /></div>
                        </div>
                        </li>
                        {/* ))} */}
                </ul>
                </li>
      </ul>

        </>
    )
}
export default QuizList;