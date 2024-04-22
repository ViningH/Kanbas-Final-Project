import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaCircleCheck } from "react-icons/fa6";
import { Editor } from '@tinymce/tinymce-react';
import { updateQuestion, setQuestion, setQuestions } from "../reducer";
import * as client from "../client";
import { KanbasState } from "../../../../store";
import "./index.css";
function QuestionEditor() {
    const { courseId, quizId } = useParams();
    const question = useSelector((state: KanbasState) => state.questionsReducer.question);
    const questionList = useSelector((state: KanbasState) => state.questionsReducer.questions);
    const [oneChoice, setChoice] = useState("New Choice");
    const [editedChoice, setEditedChoice] = useState({ choice_no: "N/A", choice_text: "Edit Choice" });
    const [newBlank, setNewBlank] = useState({ label: "New Label", answer: "New Answer" });
    const [editedBlank, setEditedBlank] = useState({ blank_no: "N/A", label: "Edit Label", answer: "Edit Answer" });
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
        dispatch(setQuestion({ ...question, choices: choices }));
    };
    const handleDeleteChoice = (choice_no: any) => {
        const newChoices = question.choices.filter((choices: { choice_no: any; }) => choices.choice_no !== choice_no);
        dispatch(setQuestion({ ...question, choices: newChoices }));
    };
    const handleEditChoice = (newChoice: any) => {
        if (newChoice.choice_no !== "N/A") {
            const newChoices = question.choices.map((choice: { choice_no: any; }) => {
                if (choice.choice_no === newChoice.choice_no) {
                    return newChoice;
                } else {
                    return choice;
                }
            });
            dispatch(setQuestion({ ...question, choices: newChoices }));
        }
    };
    const handleAddBlank = (blanks: any) => {
        dispatch(setQuestion({ ...question, blanks: blanks }));
    };
    const handleDeleteBlank = (blank_no: any) => {
        const newBlanks = question.blanks.filter((blanks: { blank_no: any; }) => blanks.blank_no !== blank_no);
        dispatch(setQuestion({ ...question, blanks: newBlanks }));
    };
    const handleEditBlank = (newBlank: any) => {
        if (newBlank.blank_no !== "N/A") {
            const newBlanks = question.blanks.map((blank: { blank_no: any; }) => {
                if (blank.blank_no === newBlank.blank_no) {
                    return newBlank;
                } else {
                    return blank;
                }
            });
            dispatch(setQuestion({ ...question, blanks: newBlanks }));
        }
    };
    return (
        <>
            <p className="wd-inline-align">
                <label htmlFor="qtitle">Question Title:&ensp;</label>
                <input id="qtitle" className="quiz-inputs-sizing quiz-input-width" value={question?.title} onChange={(e) => dispatch(setQuestion({ ...question, title: e.target.value }))}></input>
                &ensp;<select className="select-formatting quiz-inputs-sizing quiz-input-width" id="question-type-input" name="QUESTIONTYPE" value={question?.questiontype}
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
                <span>
                    pts: <input type="number" className="quiz-inputs-sizing points-input" value={question.points} onChange={(e) => dispatch(setQuestion({ ...question, points: e.target.value }))} />
                </span>
            </p>
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
            <br />
            <br />
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
                    <label htmlFor="trueanswer">&nbsp; True</label><br />
                    <input type="checkbox" id="falseanswer" checked={!question?.tf_answer}
                        onClick={(e) => dispatch(setQuestion({ ...question, tf_answer: false }))}></input>
                    <label htmlFor="falseanswer">&nbsp; False</label><br />
                    <br />
                </>
                :
                <></>}
            {question?.questiontype === "MULTIPLECHOICE" ?
                <>
                    <ul className="question-edit-lists">
                        {question?.choices?.map((choice: any) => (
                            <li>
                                <p className="wd-inline-align">
                                    {question?.multiple_answer === choice.choice_no ?
                                        <strong className="text-success label-padding">Correct Answer&nbsp;&nbsp; </strong>
                                        : <strong className="label-padding">Possible Answer&nbsp; </strong>}


                                    <input type="radio" name="correctanswer" checked={question?.multiple_answer === choice.choice_no}
                                        onClick={(e) => dispatch(setQuestion({ ...question, multiple_answer: choice.choice_no }))} />
                                    &emsp;
                                    {choice.choice_text}
                                    <span>
                                        <button className="wd-standard-button" onClick={() => setEditedChoice(choice)}>Edit</button>
                                        <button className="wd-red-button" onClick={() => handleDeleteChoice(choice.choice_no)}>Delete</button>
                                    </span>
                                </p>
                            </li>
                        ))}
                    </ul>
                    <div className="wd-align-right">
                        <input className="quiz-inputs-sizing edit-input-width" value={editedChoice.choice_text}
                            onChange={(e) => (setEditedChoice({ ...editedChoice, choice_text: e.target.value }))} />
                        <button className="add-choice-button" onClick={() => handleEditChoice(editedChoice)}>Update</button>
                        <br />
                        <input className="quiz-inputs-sizing edit-input-width" value={oneChoice}
                            onChange={(e) => (setChoice(e.target.value))} />
                        <button className="add-choice-button" onClick={() => handleAddChoice([...question.choices, { choice_no: (Date.now()), choice_text: oneChoice }])}>+ Add Another Answer</button>
                    </div>
                    <br />
                    <br />
                    <br />
                </>
                :
                <></>
            }
            {question?.questiontype === "FILLINBLANKS" ?
                <>
                    <ul className="question-edit-lists">
                        {question?.blanks?.map((blank: any) => (
                            <li>
                                <div className="d-flex">
                                    <div>
                                        <strong className="label-padding">Fill in Blanks Label:&nbsp; </strong>
                                        {blank.label}
                                        <br />
                                        <strong className="label-padding">Correct Answer for Blank:</strong>
                                        {blank.answer}
                                    </div>
                                    <div className="flex-fill"></div>
                                    <div>
                                        <span>

                                            <button className="wd-standard-button" onClick={() => setEditedBlank(blank)}>Edit</button>
                                            <button className="wd-red-button" onClick={() => handleDeleteBlank(blank.blank_no)}>Delete</button>
                                        </span>
                                    </div>
                                </div>
                                <br />
                            </li>
                        ))}
                    </ul>
                    <div className="wd-align-right">
                    Edit Label: &nbsp;
                    <input value={editedBlank.label} className= "quiz-input-width quiz-inputs-sizing"
                        onChange={(e) => (setEditedBlank({ ...editedBlank, label: e.target.value }))}
                    />
                    &nbsp;&nbsp;&nbsp;Edit Answer: &nbsp;
                    <input value={editedBlank.answer} className= "quiz-input-width quiz-inputs-sizing"
                        onChange={(e) => (setEditedBlank({ ...editedBlank, answer: e.target.value }))}
                    />
                    <button className="add-choice-button" onClick={() => handleEditBlank(editedBlank)}>Update</button>
                    <br />
                    New Label: &nbsp;
                    <input value={newBlank.label} className= "quiz-input-width quiz-inputs-sizing"
                        onChange={(e) => (setNewBlank({ ...newBlank, label: e.target.value }))}
                    />
                    &nbsp; New Answer: &nbsp;
                    <input value={newBlank.answer} className= "quiz-input-width quiz-inputs-sizing"
                        onChange={(e) => (setNewBlank({ ...newBlank, answer: e.target.value }))}
                    />
                    <button className="add-choice-button" onClick={() => handleAddBlank([...question.blanks, { blank_no: (Date.now()), label: newBlank.label, answer: newBlank.answer }])}>+ Add Another Answer</button>
                    </div>
                    <br />
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