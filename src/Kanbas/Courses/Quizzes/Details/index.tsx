import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addQuiz, updateQuiz as reduxUpdateQuiz, setQuiz, setQuizzes } from "../reducer";
import { findQuizById, updateQuiz as clientUpdateQuiz } from '../client';
import { KanbasState } from "../../../store";
import './index.css';
import { FaCheckCircle } from 'react-icons/fa';

const QuizDetails: React.FC = () => {
    const params = useParams<{ courseId: string; quizId: string }>();
    const dispatch = useDispatch();
    const quizInfo = useSelector((state: KanbasState) => state.quizzesReducer.quiz);
    const navigate = useNavigate();

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

    const handleSaveAndPublish = (quizInfo: { _id: any; }) => {
        clientUpdateQuiz(quizInfo)
            .then(() => {
                dispatch(reduxUpdateQuiz(quizInfo));
                navigate(`/Kanbas/Courses/${params.courseId}/Quizzes`);
            })
            .catch(error => {
                console.error('Failed to update and publish quiz:', error);
            });
    };


    useEffect(() => {
        if (!params.quizId) {
            console.log("Quiz ID is not available");
            return;
        }

        const fetchQuizDetails = async () => {
            try {
                const data = await findQuizById(params.quizId);
                dispatch(setQuiz(data));
            } catch (error) {
                console.error('Failed to fetch quiz details:', error);
            }
        };

        fetchQuizDetails();
    }, [dispatch, params.quizId]);
    


    return (
        <div key={quizInfo.published} className="quiz-details-container">
            <div className="wd-align-right">
                <button className="wd-standard-button" onClick={() => navigate(`/Kanbas/Courses/${params.courseId}/Quizzes/${params.quizId}`)}>Edit</button>
                <button className="wd-standard-button" onClick={() => navigate(`/Kanbas/Courses/${params.courseId}/Quizzes/${params.quizId}/Preview`)}>Preview</button>
                <button className={quizInfo.published ? "publish-green-button" : "wd-standard-button"} onClick={togglePublish}>
                    {quizInfo.published ? <><FaCheckCircle /> Published</> : 'Unpublished'}
                </button>
                <Link to={`/Kanbas/Courses/${params.courseId}/Quizzes`}><button className="wd-standard-button" onClick={() => handleSaveAndPublish({ ...quizInfo, published: true })}>Save & Publish</button></Link>
            </div>
            <hr />
            <h1 className="quiz-title">{quizInfo.title}</h1>
            <div className="mb-3 row">
                <div className="col-3 details-text-right">
                    <strong>Quiz Type: </strong></div>
                <div className="col-3">
                    {quizInfo.quiztype === "GRADEDQUIZ" ? <>Graded Quiz</> : <></>}
                    {quizInfo.quiztype === "PRACTICEQUIZ" ? <>Practice Quiz</> : <></>}
                    {quizInfo.quiztype === "GRADEDSURVEY" ? <>Graded Survey</> : <></>}
                    {quizInfo.quiztype === "UNGRADEDSURVEY" ? <>Ungraded Survey</> : <></>}
                </div>
            </div>
            <div className="mb-3 row">
                <div className="col-3 details-text-right"><strong>Points:</strong></div>
                <div className="col-3"> {quizInfo.points}</div>
            </div>
            <div className="mb-3 row">
                <div className="col-3 details-text-right">
                    <strong>  Assignment Group: </strong>
                </div>
                <div className="col-3">
                    {quizInfo.group === "QUIZZES" ? <>Quizzes</> : <></>}
                    {quizInfo.group === "EXAMS" ? <>Exams</> : <></>}
                    {quizInfo.group === "ASSIGNMENTS" ? <>Assignments</> : <></>}
                    {quizInfo.group === "PROJECT" ? <>Projects</> : <></>}</div>

            </div>
            <div className="mb-3 row">
                <div className="col-3 details-text-right"><strong>Shuffle Answers:</strong></div>
                <div className="col-3">{quizInfo.shuffle ? <>Yes</> : <>No</>}</div>
            </div>
            <div className="mb-3 row">
                <div className="col-3 details-text-right"><strong>Time Limit:</strong></div>
                <div className="col-3">
                    {quizInfo.time_limit ? <>{quizInfo.time} Minutes</> : <>No</>}</div>
            </div>
            <div className="mb-3 row">
                <div className="col-3 details-text-right"><strong>Multiple Attempts:</strong></div>
                <div className="col-3">
                    {quizInfo.multiple_attempts ? <>Yes</> : <>No</>}</div>
            </div>
            <div className="mb-3 row">
                <div className="col-3 details-text-right"><strong>Show Correct Answers:</strong> </div>
                <div className="col-3">
                    {quizInfo.show_correct ? <>Yes</> : <>No</>}</div>
            </div>
            <div className="mb-3 row">
                <div className="col-3 details-text-right"><strong>Access Code:</strong> </div>
                <div className="col-3">{quizInfo.code}</div>
            </div>
            <div className="mb-3 row">
                <div className="col-3 details-text-right"><strong>One Question at a Time:</strong> </div>
                <div className="col-3">
                    {quizInfo.one_question ? <>Yes</> : <>No</>}</div>
            </div>
            <div className="mb-3 row">
                <div className="col-3 details-text-right"><strong>Webcam Required:</strong> </div>
                <div className="col-3">{quizInfo.webcam ? <>Yes</> : <>No</>}</div>
            </div>
            <div className="mb-3 row">
                <div className="col-3 details-text-right"><strong>Lock Questions After Answering:</strong></div>
                <div className="col-3">
                    {quizInfo.lock ? <>Yes</> : <>No</>}</div>
            </div>
            <div className="mb-3 row">
                <div className="col-3 details-text-right"><strong>Due Date:</strong>
                </div>
                <div className="col-3">
                    {quizInfo.due_date}</div>
            </div>
            <div className="mb-3 row">
                <div className="col-3 details-text-right"><strong>Available Date:</strong></div>
                <div className="col-3"> {quizInfo.start_date}</div>
            </div>
            <div className="mb-3 row">
                <div className="col-3 details-text-right"><strong>Until Date:</strong> </div>
                <div className="col-3">{quizInfo.until_date}</div>
            </div>
        </div>
    );
};

export default QuizDetails;