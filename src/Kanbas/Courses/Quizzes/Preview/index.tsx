import { useNavigate, useParams, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from "../../../store";
import * as clientQuestion from "../Questions/client";
import * as clientQuiz from "../client";
import { Editor } from '@tinymce/tinymce-react';
import {
    setQuestions,
} from "../Questions/reducer";
import {
    setQuiz,
} from "../reducer";
import "./index.css";
import { FaPencil } from "react-icons/fa6";
function QuizPreview() {
    const { courseId, quizId } = useParams();
    const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);
    const questionList = useSelector((state: KanbasState) => state.questionsReducer.questions);
    const question = useSelector((state: KanbasState) => state.questionsReducer.question);
    const dispatch = useDispatch();
    useEffect(() => {
        clientQuestion.findQuestionsForQuiz(quizId)
            .then((questions) => dispatch(setQuestions(questions)));
    }, [quizId]
    );
    useEffect(() => {
        clientQuiz.findQuizById(quizId)
            .then((quiz) => dispatch(setQuiz(quiz)));
    }, [quizId]
    );
    return (
        <>
            <h4>{quiz.title}</h4>
            <hr />
            <ol>
                {questionList.filter((question) => question.quiz === quizId).map((question) => (
                    <li className="preview-list">
                        <div className="top-preview">
                            <p className="wd-inline-align">
                                <h5>
                                    {question.title}

                                    <span>{question.points} &ensp; pts</span></h5>
                            </p>
                        </div>
                        <div className="inner-preview">
                            <Editor
                                init={{
                                    menubar: false,
                                    toolbar: false,
                                    branding: false,
                                }}
                                value={question.details}
                                apiKey='o2yp55qgdndao6orwojg9p1l6ycbq5zloiq66aa5yvjagb5n'
                            />
                            <hr />
                            {question?.questiontype === "MULTIPLECHOICE" ?
                                <>
                                    {question?.choices?.map((choice: any) => (
                                        <>
                                            <input type="radio" value={choice.choice_text} name={question.multiple_answer} />
                                            &ensp;{choice.choice_text}
                                            <hr />
                                        </>
                                    ))}
                                </>
                                : <></>}
                            {question?.questiontype === "TRUEFALSE" ?
                                <>
                                    <input type="radio" name={question._id} value="TRUE" /> &ensp; True
                                    <hr />
                                    <input type="radio" name={question._id} value="FALSE" /> &ensp; False
                                </>
                                : <></>}
                            {question?.questiontype === "FILLINBLANKS" ?
                                <>
                                    {question?.blanks?.map((blank: any) => (
                                        <>
                                        <div className="mb-3 row">
                                            <div className="col-2">
                                            {blank.label}&ensp;
                                            </div>
                                            <div className="col-4">
                                            <input className="form-control"/>
                                            </div>
                                            </div>
                                            <br />
                                        </>
                                    ))}
                                </>
                                : <></>}
                            <br />
                        </div>
                    </li>

                ))}
            </ol>
            <p className="wd-align-text-right quiz-preview-submit">
                <span>
                    Quiz saved at &ensp;{ }<Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}/Details`}>
                        <button className="wd-standard-button">
                            Submit Quiz
                        </button>
                    </Link>
                </span>
            </p>
            <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}`}><button className="long-button">
                <FaPencil />&ensp;Keep Editing This Quiz</button>
            </Link>
        </>
    )
}
export default QuizPreview;