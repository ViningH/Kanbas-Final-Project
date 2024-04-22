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

    const [isPublished, setIsPublished] = useState(quizInfo.published);

    useEffect(() => {
        setIsPublished(quizInfo.published);
    }, [quizInfo.published]);

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

    if (!quizInfo) {
        return <div>Loading...</div>;
    }

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
            <h1 className="quiz
-title">{quizInfo.title}</h1>
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
            <div><strong>Shuffle Answers:</strong> {quizInfo.shuffle ? <>Yes</> : <>No</>}</div>
            <div><strong>Time Limit:</strong> {quizInfo.time_limit ? <>{quizInfo.time} Minutes</> : <>No</>}</div>
            <div><strong>Multiple Attempts:</strong> {quizInfo.multiple_attempts ? <>Yes</> : <>No</>}</div>
            <div><strong>Show Correct Answers:</strong> {quizInfo.show_correct ? <>Yes</> : <>No</>}</div>
            <div><strong>Access Code:</strong> {quizInfo.code}</div>
            <div><strong>One Question at a Time:</strong> {quizInfo.one_question ? <>Yes</> : <>No</>}</div>
            <div><strong>Webcam Required:</strong> {quizInfo.webcam ? <>Yes</> : <>No</>}</div>
            <div><strong>Lock Questions After Answering:</strong> {quizInfo.lock ? <>Yes</> : <>No</>}</div>
            <div><strong>Due date:</strong> {quizInfo.due_date}</div>
            <div><strong>Available Date:</strong> {quizInfo.start_date}</div>
            <div><strong>Until Date:</strong> {quizInfo.until_date}</div>
        </div>
    );
};

export default QuizDetails;
