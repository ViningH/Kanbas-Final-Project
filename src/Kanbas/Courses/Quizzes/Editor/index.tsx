import "./index.css";
import React, { useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaCircleCheck } from "react-icons/fa6";
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
            </div>
        </>
    );
}
export default QuizEditor;