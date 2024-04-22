import React, { useEffect, useState } from "react";
import "./index.css";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle, FaExternalLinkAlt, FaLink, FaRocket, FaCaretDown, FaBan } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import { KanbasState } from "../../store";
import * as client from "./client";
import { setQuiz, setQuizzes, deleteQuiz } from "./reducer";
import { findQuizById, updateQuiz as clientUpdateQuiz } from './client';

function QuizList() {
    const { courseId } = useParams();
    const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);
    const quizList = useSelector((state: KanbasState) => state.quizzesReducer.quizzes);
    const dispatch = useDispatch();

    const params = useParams<{ courseId: string; quizId: string }>();
    const navigate = useNavigate();

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
    const initialquiz = {
        title: "New Quiz",
        published: false,
        quiztype: "GRADEDQUIZ",
        group: "QUIZZES",
        shuffle: true,
        time_limit: true,
        time: 20,
        multiple_attempts: false,
        show_correct: false,
        one_question: true,
        webcam: false,
        lock: false
    };

    
    const quizInfo = useSelector((state: KanbasState) => state.quizzesReducer.quiz);
    const togglePublish = () => {
        const newPublishedState = !quizInfo.published;
        const updatedQuizInfo = { ...quizInfo, published: newPublishedState };

        clientUpdateQuiz(updatedQuizInfo)
            .then(() => {
                // Use setQuiz to manually update the local quiz state in Redux
                dispatch(setQuiz(updatedQuizInfo));
                // Optionally, navigate or display a success message
            })
            .catch(error => {
                console.error('Failed to toggle publish status:', error);
                // Optionally, handle errors (e.g., by displaying an error message)
            });
    };
    

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
                        <li className={quizInfo.published ? "list-group-item" : "list-group-item wd-unpublished-leftBorder"}
                                onClick={() => setQuiz(quiz)} >

                            <div className="d-flex">
                                <div className="wd-assignment-item-padding">
                                    <FaRocket className={quizInfo.published ? "wd-green-pencil" : "wd-unpublished-pencil"  } />
                                </div>
                                <div className="flex-fill wd-quiz-text-padding">
                                    
                                    <h4><Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}/Details`} className="nav-link">{quiz.title}</Link></h4>
                                    <span><strong>Closed</strong></span> | <strong>Due</strong> {quiz.due_date} at 11:59 pm |
                                    {quiz.points} pts | 11 Questions <br />

                                </div>
                                <div className="wd-assignment-item-padding">                             
                                    {quizInfo.published ? <FaCheckCircle className="text-success" /> : <FaBan /> }

                                    {/* toggle button */}
                                    <button type="button" data-bs-toggle="collapse" 
                                        data-bs-target="#collapseQuizList" aria-expanded="false" aria-controls="collapseQuizList">
                                    <FaEllipsisV className="ms-2" /></button>
                                </div>
                                <div className="collapse" id="collapseQuizList">
                                    <button className="wd-standard-button" onClick={() => navigate(`/Kanbas/Courses/${params.courseId}/Quizzes/${params.quizId}`)}>Edit</button><br />
                                    <button className="wd-standard-button" onClick={() => handleDelete(quiz._id)}>Delete</button><br />
                                    {/* <button className="wd-standard-button">Publish</button> */}
                                    <button className="wd-standard-button" onClick={togglePublish}>
                                        {quizInfo.published ? 'Unpublish': <>Publish</>}</button>
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