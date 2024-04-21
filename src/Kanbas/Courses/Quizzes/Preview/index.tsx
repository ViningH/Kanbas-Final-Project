import { useNavigate, useParams, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from "../../../store";
import * as client from "../Questions/client";
import { Editor } from '@tinymce/tinymce-react';
import {
    setQuestions,
} from "../Questions/reducer";
function QuizPreview() {
    const { courseId, quizId } = useParams();
    const questionList = useSelector((state: KanbasState) => state.questionsReducer.questions);
    const question = useSelector((state: KanbasState) => state.questionsReducer.question);
    const dispatch = useDispatch();
    useEffect(() => {
        client.findQuestionsForQuiz(quizId)
            .then((questions) => dispatch(setQuestions(questions)));
    }, [quizId]
    );
    return (
        <>
            <ul>
                {questionList.filter((question) => question.quiz === quizId).map((question) => (
                    <li>{question.title}
                        <br />
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
                            <input type="radio" name={question._id} value="TRUE"/> &ensp; True
                            <br />
                            <input type="radio" name={question._id} value="FALSE"/> &ensp; False
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
            </ul>
        </>
    )
}
export default QuizPreview;