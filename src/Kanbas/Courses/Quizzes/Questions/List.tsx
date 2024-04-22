import React, { useEffect, useState } from "react";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle, FaExternalLinkAlt, FaLink, FaRocket, FaCaretDown } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import { KanbasState } from "../../../store";
import {
    setQuestion,
    deleteQuestion, setQuestions,
    addQuestion
} from "./reducer";
import * as client from "./client";
import "../index.css";
import * as clientQuiz from "../client";
import {
    setQuiz,
    updateQuiz,
    addQuiz,
} from "../reducer";
import { FaCircleCheck, FaPencil } from "react-icons/fa6";
function QuestionList() {
    const { courseId, quizId } = useParams();
    const questionList = useSelector((state: KanbasState) => state.questionsReducer.questions);
    const question = useSelector((state: KanbasState) => state.questionsReducer.question);
    const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);
    const quizList = useSelector((state: KanbasState) => state.quizzesReducer.quizzes);
    const dispatch = useDispatch();
    useEffect(() => {
        client.findQuestionsForQuiz(quizId)
            .then((questions) => dispatch(setQuestions(questions)));
    }, [quizId]
    );
    const navigate = useNavigate();
    const handleDelete = (questionId: any) => {
        if (window.confirm("Do you want to delete this question?")) {
            client.deleteQuestion(questionId).then((status) => {
                dispatch(deleteQuestion(questionId));
            });
        };
    };
    const handleAddQuestion = (question: any) => {
        client.addQuestion(quizId, question).then((question) => {
            dispatch(addQuestion(question));
        });
    };
    const handleSave = () => {
        if (quizList.filter(q => q._id === quiz._id).length > 0) {
            clientQuiz.updateQuiz(quiz).then(() => { dispatch(updateQuiz(quiz)) });
        } else {
            clientQuiz.addQuiz(courseId, quiz).then((quiz) => { dispatch(addQuiz(quiz)) });
        };
        navigate(`/Kanbas/Courses/${courseId}/Quizzes`);
    };
    const handleSaveAndPublish = (quiz: { _id: any; }) => {
        if (quizList.filter(q => q._id === quiz._id).length > 0) {
            clientQuiz.updateQuiz(quiz).then(() => { dispatch(updateQuiz(quiz)) });
        } else {
            clientQuiz.addQuiz(courseId, quiz).then((quiz) => { dispatch(addQuiz(quiz)) });
        };
        navigate(`/Kanbas/Courses/${courseId}/Quizzes`);
    };
    return (
        <>
            <div className="wd-align-right">
                Points {quiz?.points} &ensp;
                {quiz?.published ?
                    <strong className="text-success"> <FaCircleCheck /> Published &emsp;</strong> :
                    <strong>Unpublished</strong>
                }
                <button className="wd-standard-button" onClick={(e) => dispatch(setQuiz({ ...quiz, published: !quiz?.published }))}>⋮</button>
            </div>
            <hr />
            <ul className="nav nav-tabs wd-settings-links">
                <li className="nav-item">
                    <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}`} onClick={(e)=>dispatch(setQuiz(quiz))} className="nav-link">Details</Link>
                </li>
                <li className="nav-item">
                    <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Questions`} onClick={(e)=>dispatch(setQuiz(quiz))} className="nav-link active">Questions</Link>
                </li>
            </ul>
            < br />
            <ul className="list-group wd-modules">
                <li className="list-group-item">
                    <div>
                        <FaCaretDown className="me-2" /><strong>Quiz Questions</strong>
                    </div>
                    <ul className="list-group">
                        {questionList.filter((question) => question.quiz === quizId).map((question) => (
                            <li className="list-group-item">
                                <div className="d-flex">
                                    <div className="wd-assignment-item-padding">
                                        <FaPencil className="wd-green-pencil" />
                                    </div>
                                    <div className="flex-fill wd-quiz-text-padding">
                                        <h4>
                                            <Link className="nav-link"
                                                to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Questions/${question._id}`}
                                                onClick={() => dispatch(setQuestion(question))}>
                                                {question.title}
                                            </Link>

                                        </h4>
                                        <span>
                                            {question.questiontype === "MULTIPLECHOICE" ? <>Multiple Choice</> : <></>}
                                            {question.questiontype === "FILLINBLANKS" ? <>Fill In Blanks</> : <></>}
                                            {question.questiontype === "TRUEFALSE" ? <>True or False</> : <></>}
                                        </span> | {question.points} pts
                                    </div>
                                    <div className="wd-assignment-item-padding">
                                        <button className="wd-standard-button" onClick={() => handleDelete(question._id)}>Delete</button>
                                    </div>
                                </div>
                            </li>

                        ))}
                    </ul>
                </li>
            </ul>
            <button className="wd-standard-button" onClick={() => handleAddQuestion({ ...question, _id: Date.now() })}>+ New Question</button>
            <button className="wd-standard-button">+ New Question Group</button>
            <button className="wd-standard-button">Find Questions</button>
            <hr />
            <p className="wd-inline-align">
                <input type="checkbox" value="NOTIFYUSERS" name="notify-users" id="notify-users" />
                <label htmlFor="notify-users">&nbsp; Notify users that this quiz has changed</label>
                <span>
                    <Link to={`/Kanbas/Courses/${courseId}/Quizzes`}><button className="wd-standard-button">Cancel</button></Link>
                    <Link to={`/Kanbas/Courses/${courseId}/Quizzes`}><button className="wd-standard-button" onClick={() => handleSaveAndPublish({...quiz, published: true})}>Save & Publish</button></Link>
                    <Link to={`/Kanbas/Courses/${courseId}/Quizzes`}><button className="wd-red-button" onClick={handleSave}>Save</button></Link>
                </span>
            </p>
            <br />
            <hr />

        </>
    )
}
export default QuestionList;