import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { findQuizById, updateQuiz } from '../client'; 
import './index.css';


interface Quiz {
    _id: string;
    title: string;
    points: number;
    quiztype: string;
    group: string;
    shuffle: boolean;
    time: number;
    multiple_attempts: boolean;
    show_correct: boolean;
    show_correct_date: string;
    code: string;
    one_question: boolean;
    webcam: boolean;
    lock: boolean;
    due_date: string;
    start_date: string;
    until_date: string;
    published: boolean;
}

const defaultQuiz: Quiz = {
    _id: '',
    title: '',
    points: 0, // This would be calculated dynamically if needed
    quiztype: 'Graded Quiz',
    group: 'Quizzes',
    shuffle: true,
    time: 20,
    multiple_attempts: false,
    show_correct: false,
    show_correct_date: '',
    code: '',
    one_question: true,
    webcam: false,
    lock: false,
    due_date: '',
    start_date: '',
    until_date: '',
    published: false
};

const QuizDetails: React.FC = () => {
    const params = useParams<{ courseId: string; quizId: string }>();
    const [quizInfo, setQuizInfo] = useState<Quiz>(defaultQuiz); // Initialize state with defaultQuiz
    const navigate = useNavigate();

    useEffect(() => {
        if (!params.quizId) {
            console.log("Quiz ID is not available");
            return;
        }

        const fetchQuizDetails = async () => {
            try {
                const data = await findQuizById(params.quizId);
                setQuizInfo({ ...defaultQuiz, ...data }); // Merge fetched data with default values
            } catch (error) {
                console.error('Failed to fetch quiz details:', error);
            }
        };

        fetchQuizDetails();
    }, [params.quizId]);

    const handlePublishToggle = async () => {
        if (quizInfo) {
            // Toggle the current published status
            const updatedQuiz = {
                ...quizInfo,
                published: !quizInfo.published
            };
    
            // Update quiz on the server
            try {
                const data = await updateQuiz(updatedQuiz);
                setQuizInfo(data); // Update local state with the new data from the server
            } catch (error) {
                console.error('Failed to update quiz publication status:', error);
            }
        }
    };
    

    const navigateToPreview = () => {
        if (params.quizId && params.courseId) {
            navigate(`/Kanbas/Courses/${params.courseId}/Quizzes/${params.quizId}/Preview`);
        }
    };

    if (!quizInfo) {
        return <div>Loading...</div>;
    }

    const handleEdit = () => {
        navigate(`/Kanbas/Courses/${params.courseId}/Quizzes/${params.quizId}`);
    };

    return (
        <div className="quiz-details-container">
            <h1 className="quiz-title">{quizInfo.title}</h1>
            <div className="quiz-detail"><strong>Quiz Type:</strong> {quizInfo.quiztype}</div>
            <div className="quiz-detail"><strong>Points:</strong> {quizInfo.points}</div>
            <div className="quiz-detail"><strong>Assignment Group:</strong> {quizInfo.group}</div>
            <div className="quiz-detail"><strong>Shuffle Answers:</strong> {quizInfo.shuffle ? 'Yes' : 'No'}</div>
            <div className="quiz-detail"><strong>Time Limit:</strong> {quizInfo.time} Minutes</div>
            <div className="quiz-detail"><strong>Multiple Attempts:</strong> {quizInfo.multiple_attempts ? 'Yes' : 'No'}</div>
            <div className="quiz-detail"><strong>Show Correct Answers:</strong> {quizInfo.show_correct ? 'Yes' : 'No'}</div>
            <div className="quiz-detail"><strong>Access Code:</strong> {quizInfo.code}</div>
            <div className="quiz-detail"><strong>One Question at a Time:</strong> {quizInfo.one_question ? 'Yes' : 'No'}</div>
            <div className="quiz-detail"><strong>Webcam Required:</strong> {quizInfo.webcam ? 'Yes' : 'No'}</div>
            <div className="quiz-detail"><strong>Lock Questions After Answering:</strong> {quizInfo.lock ? 'Yes' : 'No'}</div>
            <div className="quiz-detail"><strong>Due Date:</strong> {quizInfo.due_date}</div>
            <div className="quiz-detail"><strong>Available From:</strong> {quizInfo.start_date}</div>
            <div className="quiz-detail"><strong>Until:</strong> {quizInfo.until_date}</div>
            <div className="quiz-controls">
            <button className="control-button green" onClick={handlePublishToggle}>
        {quizInfo.published ? 'Unpublish' : 'Publish'}
    </button>
    <button className="control-button" onClick={navigateToPreview}>
        Preview
    </button>
    <button className="control-button" onClick={handleEdit}>
        Edit
    </button>
            </div>
        </div>
    );
}

export default QuizDetails;
