import React from 'react';
import './index.css';

function QuizDetails() {
    const quizInfo = {
        title: 'Q1 - HTML',
        quizType: 'Graded Quiz',
        points: 29,
        assignmentGroup: 'QUIZZES',
        shuffleAnswers: 'No',
        timeLimit: '30 Minutes',
        multipleAttempts: 'No',
        viewResponses: 'Always',
        showCorrectAnswers: 'Immediately',
        oneQuestionAtATime: 'Yes',
        requireRespondusLockDown: 'No',
        requiredToViewQuizResults: 'No',
        webcamRequired: 'No',
        lockQuestionsAfterAnswering: 'No',
        due: 'Sep 21 at 1pm',
        availableFrom: 'Sep 21 at 11:40am',
        until: 'Sep 21 at 1pm'
      };
    return (
        <div className="quiz-details-container">
        <h1 className="quiz-title">{quizInfo.title}</h1>
        <div className="quiz-detail"><strong>Quiz Type:</strong> {quizInfo.quizType}</div>
        <div className="quiz-detail"><strong>Points:</strong> {quizInfo.points}</div>
        <div className="quiz-detail"><strong>Assignment Group:</strong> {quizInfo.assignmentGroup}</div>
        <div className="quiz-detail"><strong>Shuffle Answers:</strong> {quizInfo.shuffleAnswers}</div>
        <div className="quiz-detail"><strong>Time Limit:</strong> {quizInfo.timeLimit}</div>
        <div className="quiz-detail"><strong>Multiple Attempts:</strong> {quizInfo.multipleAttempts}</div>
        <div className="quiz-detail"><strong>View Responses:</strong> {quizInfo.viewResponses}</div>
        <div className="quiz-detail"><strong>Show Correct Answers:</strong> {quizInfo.showCorrectAnswers}</div>
        <div className="quiz-detail"><strong>One Question at a Time:</strong> {quizInfo.oneQuestionAtATime}</div>
        <div className="quiz-detail"><strong>Require Respondus LockDown:</strong> {quizInfo.requireRespondusLockDown}</div>
        <div className="quiz-detail"><strong>Required to View Quiz Results:</strong> {quizInfo.requiredToViewQuizResults}</div>
        <div className="quiz-detail"><strong>Webcam Required:</strong> {quizInfo.webcamRequired}</div>
        <div className="quiz-detail"><strong>Lock Questions After Answering:</strong> {quizInfo.lockQuestionsAfterAnswering}</div>
        <div className="quiz-detail"><strong>Due:</strong> {quizInfo.due}</div>
        <div className="quiz-detail"><strong>For:</strong> Everyone</div>
        <div className="quiz-detail"><strong>Available from:</strong> {quizInfo.availableFrom}</div>
        <div className="quiz-detail"><strong>Until:</strong> {quizInfo.until}</div>
        <div className="quiz-controls">
          <button className="control-button green">Publish</button>
          <button className="control-button">Preview</button>
          <button className="control-button">Edit</button>
        </div>
      </div>
      );

}
export default QuizDetails;