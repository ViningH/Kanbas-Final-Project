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
    const handleAddQuestion = (question: any) => {
        client.addQuestion(quizId, question).then((question) => {
          dispatch(addQuestion(question));
        });
      };
    return (
        <>
            <hr />
            <ul className="nav nav-tabs wd-settings-links">
                <li className="nav-item">
                    <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}`} className="nav-link">Details</Link>
                </li>
                <li className="nav-item">
                    <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Questions`} className="nav-link active">Questions</Link>
                </li>
            </ul>
            < br />
            Link for Questions:
            <ul>
                {questionList.filter((question) => question.quiz === quizId).map((question) => (
                    <li><Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Questions/${question._id}`} onClick={() => dispatch(setQuestion(question))}>{question.title}</Link>
                        <br />
                        <div>
                            <button onClick={() => handleDelete(question._id)}>Delete</button>
                        </div>
                    </li>

                ))}
            </ul>
            <button onClick={()=>handleAddQuestion({...question, _id: Date.now()})}>New Question</button>
            <button>New Question Group</button>
            <button>Find Questions</button>
            <hr />
            <p className="wd-inline-align">
                <input type="checkbox" value="NOTIFYUSERS" name="notify-users" id="notify-users" />
                <label htmlFor="notify-users">&nbsp; Notify users that this quiz has changed</label>
                <span>
                    <Link to={`/Kanbas/Courses/${courseId}/Quizzes`}><button className="wd-standard-button">Cancel</button></Link>
                    <Link to={`/Kanbas/Courses/${courseId}/Quizzes`}><button className="wd-standard-button" >Save & Publish</button></Link>
                    <Link to={`/Kanbas/Courses/${courseId}/Quizzes`}><button className="wd-red-button" >Save</button></Link>
                </span>
            </p>
            <br />
            <hr />

        </>
    )
}
export default QuestionList;