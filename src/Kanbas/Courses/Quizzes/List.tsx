import React, { useEffect, useState } from "react";
import "./index.css";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle, FaExternalLinkAlt, FaLink, FaRocket, FaCaretDown, FaBan } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import { KanbasState } from "../../store";
import * as client from "./client";
import { setQuiz, setQuizzes, deleteQuiz, updateQuiz } from "./reducer";
import { current } from "@reduxjs/toolkit";
import * as clientQuestions from "./Questions/client";
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
    // const sortQuizByDate(quiz){
    //     quizzes._id.sort(function(a, b){

    //     })
    // }


    const togglePublish = (quiz: { _id: any, published: Boolean; }) => {
        const newPublishedState = !quiz.published;
        const updatedQuizInfo = { ...quiz, published: newPublishedState };

        client.updateQuiz(updatedQuizInfo)
            .then(() => {
                // Use setQuiz to manually update the local quiz state in Redux
                dispatch(updateQuiz(updatedQuizInfo));
                // Optionally, navigate or display a success message
            })
            .catch(error => {
                console.error('Failed to toggle publish status:', error);
                // Optionally, handle errors (e.g., by displaying an error message)
            });
    };
    const [isPublished, setIsPublished] = useState(quiz.published);
    const currentDate = new Date();
    var currentDay = currentDate.getDate();
    var currentMonth = currentDate.getMonth() + 1;
    var currentYear = currentDate.getFullYear();
    var stringDay = '' + currentDay;
    if (currentDay < 10) {
        stringDay = '0' + currentDay;
    }
    var stringMonth = '' + currentMonth;
    if (currentMonth < 10) {
        stringMonth = '0' + currentMonth;
    }
    var stringYear = '' + currentYear;
    var stringToday = stringYear + '-' + stringMonth + '-' + stringDay;
    const checkDate = (quiz: {
        start_date: string; until_date: string;
    }) => {
        if (quiz.until_date < stringToday) {
            return "Closed";
        } else if (quiz.start_date < stringToday) {
            return "Available";
        } else if (stringToday < quiz.start_date) {
            return "Not Available Until ";
        } else {
            return "No Date Added";
        }
    }

    return (
        <>
            <p className="wd-inline-align">
                <input placeholder="Search for Quiz" />
                <span>
                    <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${new Date().getTime().toString()}`}>
                        <button className="wd-red-button"
                            onClick={() => dispatch(setQuiz({
                                ...initialquiz,
                                course: courseId,
                                _id: new Date().getTime().toString()
                            }))}>
                            + Add Quiz
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
                            <li className={quiz.published ? "list-group-item" : "list-group-item wd-unpublished-leftBorder"}
                                onClick={() => setQuiz(quiz)} >

                                <div className="d-flex">
                                    <div className="wd-assignment-item-padding">
                                        <FaRocket className={quiz.published ? "wd-green-pencil" : "wd-unpublished-pencil"} />
                                    </div>
                                    <div className="flex-fill wd-quiz-text-padding">

                                        <h4><Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}/Details`} className="nav-link">{quiz.title}</Link></h4>
                                        <span>
                                            <strong>{checkDate(quiz)}</strong>{(checkDate(quiz) === "Not Available Until ") ? <>{quiz.start_date}</> : <></>}
                                            </span> | <strong>Due</strong> {quiz.due_date} at 11:59 pm |
                                        {quiz.points} pts | {} Questions <br />

                                    </div>
                                    <div className="wd-assignment-item-padding">
                                        {quiz.published ? <FaCheckCircle className="text-success" /> : <FaBan />}

                                        {/* toggle button */}
                                        <button type="button" data-bs-toggle="collapse" className=" wd-small-button"
                                            data-bs-target={"#" + quiz._id} aria-expanded="false" aria-controls={quiz._id}>
                                            <FaEllipsisV className="ms-2" /></button>
                                    </div>
                                    <div className="collapse" id={quiz._id}>
                                        <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}`}><button className="wd-standard-button"
                                            onClick={(e) => dispatch(setQuiz(quiz))}
                                        >Edit</button></Link><br />
                                        <button className="wd-standard-button" onClick={() => handleDelete(quiz._id)}>Delete</button><br />
                                        {/* <button className="wd-standard-button">Publish</button> */}
                                        <button className="wd-standard-button" onClick={() => togglePublish(quiz)}>
                                            {quiz.published ? 'Unpublish' : <>Publish</>}</button>
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