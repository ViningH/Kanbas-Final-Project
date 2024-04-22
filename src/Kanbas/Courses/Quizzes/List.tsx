import React, { useEffect, useState } from "react";
import "./index.css";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle, FaExternalLinkAlt, FaLink, FaRocket, FaCaretDown } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import { KanbasState } from "../../store";
import * as client from "./client";
import { setQuiz, setQuizzes, deleteQuiz } from "./reducer";
function QuizList() {
    const { courseId } = useParams();
    const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);
    const quizList = useSelector((state: KanbasState) => state.quizzesReducer.quizzes);
    const dispatch = useDispatch();
    useEffect(() => {
        client.findQuizzesForCourse(courseId)
            .then((quizzes) =>
                dispatch(setQuizzes(quizzes))
            );
    }, [courseId]);
    const handleDelete = (quizId: any) => {
        if (window.confirm("Do you want to delete this quiz?")) {
            client.deleteQuiz(quizId).then((status) => {
                dispatch(deleteQuiz(quizId));
            });
        }
    }

    // const sortQuizByDate(quiz){
    //     quizzes._id.sort(function(a, b){

    //     })
    // }

    return (
        <>
            <p className="wd-inline-align">
                <input placeholder="Search for Quiz" />
                <span>
                    <Link to={`/Kanbas/Courses/${courseId}/Quizzes/NewQuiz`}> 
                        <button className="wd-red-button"
                            onClick={() => dispatch(setQuiz({
                                ...quiz,
                                course: courseId,
                                _id: new Date().getTime().toString()
                            }))}>
                            + Assignment
                        </button>
                    </Link>
                    <button className="wd-standard-button">⋮</button></span>
            </p>
            <hr />
            <ul className="list-group wd-modules">
                <li className="list-group-item">
                    <div>
                        <FaCaretDown className="me-2" /><strong>Assignments Quizzes</strong>
                    </div>
                    <ul className="list-group">
                        {quizList.filter((quiz) => quiz.course === courseId).map((quiz) => (
                        <li className="list-group-item"
                                onClick={() => setQuiz(quiz)} >
                            <div className="d-flex">
                                <div className="wd-assignment-item-padding">
                                    <FaRocket className="wd-green-pencil" />
                                </div>
                                <div className="flex-fill wd-quiz-text-padding">
                                    
                                    <h4><Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}/Details`} className="nav-link">{quiz.title}</Link></h4>
                                    <span><strong>Closed</strong></span> | <strong>Due</strong> {quiz.due_date} at 11:59 pm |
                                    {quiz.points} pts | 11 Questions <br />
                                    <div>
                                        <button onClick={() => handleDelete(quiz._id)}>Delete</button>
                                    </div>

                                </div>
                                <div className="wd-assignment-item-padding">
                                    <FaCheckCircle className="text-success" />
                                    {/* <FaEllipsisV className="ms-2" /> */}


                                    {/* working on toggle button here */}
                                    <button className="btn btn-primary" type="button" data-bs-toggle="collapse" 
                                        data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                    <FaEllipsisV className="ms-2" /></button>
                                </div>
                                <div className="collapse" id="collapseExample">
                                    Edit
                                </div>
                            </div>
                        </li>
                        ))}
                    </ul>
                </li>
            </ul>
        </>
    )
}
export default QuizList;