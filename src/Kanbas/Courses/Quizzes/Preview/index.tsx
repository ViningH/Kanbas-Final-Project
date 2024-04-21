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
            <ol>
                {questionList.filter((question) => question.quiz === quizId).map((question) => (
                    <li>
                        <p className="wd-inline-align">
                            {question.title}
                            <span>{question.points} &ensp; pts</span>
                        </p>
                        <Editor
                            init={{
                                menubar: false,
                                toolbar: false,
                                branding: false,
                                height: 100
                            }}
                            value={question.details}
                            apiKey='u1u1m6dbp6lhdqlz8nc5bfub9phithmuzavtcs2b6cbusqj7'
                        />
                        {question?.questiontype === "MULTIPLECHOICE" ?
                            <>
                                {question?.choices?.map((choice: any) => (
                                    <>
                                        <input type="radio" value={choice.choice_text} name={question.multiple_answer} />
                                        &ensp;{choice.choice_text}
                                        <br />
                                    </>
                                ))}
                            </>
                            : <></>}
                        {question?.questiontype === "TRUEFALSE" ?
                            <>
                                <input type="radio" name={question._id} value="TRUE" /> &ensp; True
                                <br />
                                <input type="radio" name={question._id} value="FALSE" /> &ensp; False
                            </>
                            : <></>}
                        {question?.questiontype === "FILLINBLANKS" ?
                            <>
                                {question?.blanks?.map((blank: any) => (
                                    <>
                                        {blank.label}&ensp;
                                        <input />
                                        <br />
                                    </>
                                ))}
                            </>
                            : <></>}
                    </li>

                ))}
            </ol>
            <p className="wd-align-text-right quiz-preview-submit">
                <span>
                    Quiz saved at &ensp;{ }<Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}/Details`}>
                        <button className= "wd-standard-button">
                            Submit Quiz
                        </button>
                    </Link>
                </span>
            </p>
        </>
    )
}
export default QuizPreview;