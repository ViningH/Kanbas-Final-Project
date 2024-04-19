import React, { useEffect, useState } from 'react';
import { findQuizById } from '../client'; // Ensure this path is correct
import { useParams } from 'react-router';
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
}


const QuizDetails: React.FC = () => {
  const { quizId } = useParams<{ quizId?: string }>();  
  const [quizInfo, setQuizInfo] = useState<Quiz | null>(null);

  useEffect(() => {
      if (!quizId) {
          console.log("Quiz ID is not available");
          return;
      }

      const fetchQuizDetails = async () => {
          try {
              const data = await findQuizById(quizId);
              setQuizInfo(data);
          } catch (error) {
              console.error('Failed to fetch quiz details:', error);
          }
      };

      fetchQuizDetails();
  }, [quizId]);

  if (!quizInfo) {
      return <div>Loading...</div>;
  }

  return (
      <div className="quiz-details-container">
          <h1 className="quiz-title">{quizInfo.title}</h1>
          <div className="quiz-detail"><strong>Quiz Type:</strong> {quizInfo.quiztype}</div>
          <div className="quiz-detail"><strong>Points:</strong> {quizInfo.points}</div>
          <div className="quiz-detail"><strong>Assignment Group:</strong> {quizInfo.group}</div>
          <div className="quiz-detail"><strong>Shuffle Answers:</strong> {quizInfo.shuffle ? 'Yes' : 'No'}</div>
          <div className="quiz-detail"><strong>Time Limit:</strong> {quizInfo.time} Minutes</div> 
          <div className="quiz-detail"><strong>Multiple Attempts:</strong> {quizInfo.multiple_attempts}</div>
          <div className="quiz-detail"><strong>Show Correct Answers:</strong> {quizInfo.show_correct}</div>
          <div className="quiz-detail"><strong>Access Code:</strong> {quizInfo.code}</div>
          <div className="quiz-detail"><strong>One Question at a Time:</strong> {quizInfo.one_question ? 'Yes' : 'No'}</div>
          <div className="quiz-detail"><strong>Webcam Required:</strong> {quizInfo.webcam ? 'No' : 'Yes'}</div>
          <div className="quiz-detail"><strong>Lock Questions After Answering:</strong> {quizInfo.lock ? 'No' : 'Yes'}</div>
          <div className="quiz-detail"><strong>Due Date</strong> {quizInfo.due_date}</div>
          <div className="quiz-detail"><strong>Available Date:</strong> {quizInfo.start_date}</div>
          <div className="quiz-detail"><strong>Until Date:</strong> {quizInfo.until_date}</div>










          <div className="quiz-controls">
              <button className="control-button green">Publish</button>
              <button className="control-button">Preview</button>
              <button className="control-button">Edit</button>
          </div>
      </div>
  );
}

export default QuizDetails;