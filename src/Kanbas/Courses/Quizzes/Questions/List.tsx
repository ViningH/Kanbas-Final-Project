import React, { useEffect, useState } from "react";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle, FaExternalLinkAlt, FaLink, FaRocket, FaCaretDown } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import { KanbasState } from "../../../store";
import {
    setQuestion,
    deleteQuestion, setQuestions
} from "./reducer";
import * as client from "./client";
function QuestionList() {
    const { courseId, quizId } = useParams();
    const questionList = useSelector((state: KanbasState) => state.questionsReducer.questions);
    const question = useSelector((state: KanbasState) => state.questionsReducer.question);
    const dispatch = useDispatch();
    useEffect(() => {
        client.findQuestionsForQuiz(quizId)
            .then((questions) => dispatch(setQuestions(questions)));
    }, [quizId]
    );
    const handleDelete = (questionId: any) => {
        if (window.confirm("Do you want to delete this question?")) {
            client.deleteQuestion(questionId).then((status) => {
                dispatch(deleteQuestion(questionId));
            });
        };
    };
    return (
        <>
            <hr />
            <ul className="nav nav-tabs wd-settings-links">
                <li className="nav-item">
                    <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Details`} className="nav-link">Details</Link>
                </li>
                <li className="nav-item">
                    <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Questions`} className="nav-link active">Questions</Link>
                </li>
            </ul>
            < br />
            Link for Questions:
            <ul>
                {questionList.filter((question) => question.quiz === quizId).map((question) => (
                    <li><Link to={`/Kanbas/Courses/Quizzes/${quizId}/Questions/${question._id}`} onClick={() => dispatch(setQuestion(question))}>{question.title}</Link>
                        <br />
                        <div>
                            <button onClick={() => handleDelete(question._id)}>Delete</button>
                        </div>
                    </li>

                ))}
            </ul>

        </>
    )
}
export default QuestionList;