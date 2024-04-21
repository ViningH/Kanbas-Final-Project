import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaCircleCheck } from "react-icons/fa6";
import { Editor } from '@tinymce/tinymce-react';
import { updateQuestion, setQuestion, setQuestions } from "../reducer";
import * as client from "../client";
import { KanbasState } from "../../../../store";
function QuestionEditor() {
    const { courseId, quizId } = useParams();
    const question = useSelector((state: KanbasState) => state.questionsReducer.question);
    const questionList = useSelector((state: KanbasState) => state.questionsReducer.questions);
    const [oneChoice, setChoice] = useState("New Choice" )
    const dispatch = useDispatch();
    useEffect(() => {
        client.findQuestionsForQuiz(quizId).then((questions) =>
            dispatch(setQuestions(questions)));
    }, [quizId]);
    const navigate = useNavigate();
    const handleSave = () => {
        client.updateQuestion(question).then(() => { dispatch(updateQuestion(question)) });
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Questions`);
    };
    const handleAddChoice = (choices: any) => {
        console.log(question.choices);
        console.log(choices);
        console.log(question);
        dispatch(setQuestion({...question, choices: choices}));
    };
    return (
        <>
            <label>Question Title:&ensp;</label>
            <input value={question?.title} onChange={(e) => dispatch(setQuestion({ ...question, title: e.target.value }))}></input>
            &ensp;<select id="question-type-input" name="QUESTIONTYPE" value={question?.questiontype}
                onChange={(e) => dispatch(setQuestion({ ...question, questiontype: e.target.value }))} >
                <option value="MULTIPLECHOICE">
                    Multiple Choice Question
                </option>
                <option value="TRUEFALSE">
                    True False Question
                </option>
                <option value="FILLINBLANKS">
                    Fill In Blanks Question
                </option>
            </select>
            <hr />
            {question?.questiontype === "MULTIPLECHOICE" ?
                <>
                    Enter your question and multiple answers, then select the one correct answer.
                </>
                :
                <></>}
            {question?.questiontype === "TRUEFALSE" ?
                <>
                    Enter your question text, then select if True or False is the correct answer.
                </>
                :
                <></>}
            {question?.questiontype === "FILLINBLANKS" ?
                <>
                    <p>Enter your question text, then define all possible correct answers for the blank.</p>
                    <p>Students will see the question followed by a small text box to type their answer.</p>
                </>
                :
                <></>}
            <h4>Question:</h4>
            <Editor apiKey='u1u1m6dbp6lhdqlz8nc5bfub9phithmuzavtcs2b6cbusqj7'
                onEditorChange={(newValue, editor) => {
                    dispatch(setQuestion({ ...question, details: editor.getContent() }));
                }
                }
                value={question?.details} />
            <br />
            <h4>Answers:</h4>
            {question?.questiontype === "TRUEFALSE" ?
                <>
                    <input type="checkbox" id="trueanswer" checked={question?.tf_answer}
                        onClick={(e) => dispatch(setQuestion({ ...question, tf_answer: true }))}></input>
                    <label htmlFor="trueanswer">True</label><br />
                    <input type="checkbox" id="falseanswer" checked={!question?.tf_answer}
                        onClick={(e) => dispatch(setQuestion({ ...question, tf_answer: false }))}></input>
                    <label htmlFor="falseanswer">False</label><br />
                    <br />
                </>
                :
                <></>}
            {question?.questiontype === "MULTIPLECHOICE" ?
                <>
                    <ul>
                        {question?.choices?.map((choice: any) => (
                            <li>{choice.choice_text}</li>
                        ))}
                    </ul>
                    <input value={oneChoice} 
                    onChange={(e) => (setChoice(e.target.value))} />
                    <button onClick={() => handleAddChoice([...question.choices, {choice_no: Date.now.toString(), choice_text: oneChoice}])}>Add Choice</button>
                </>
                :
                <></>
            }
            <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Questions`}><button className="wd-standard-button">Cancel</button></Link>
            <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Questions`}><button className="wd-red-button" onClick={handleSave}>Update Question</button></Link>

        </>
    );
}
export default QuestionEditor;