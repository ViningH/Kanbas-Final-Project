import axios from "axios";
const API_BASE = process.env.REACT_APP_BASE_API_URL;
const QUIZZES_API = `${API_BASE}/api/quizzes`;
const QUESTIONS_API = `${API_BASE}/api/questions`;

export const findQuestionById = async (questionId: string) => {
  const response = await axios.get(`${QUESTIONS_API}/${questionId}`);
  return response.data;
};


export const updateQuestion = async (question: { _id: any; }) => {
    const response = await axios.
      put(`${QUESTIONS_API }/${question._id}`, question);
    return response.data;
  };
  

export const deleteQuestion = async (questionId: any) => {
  const response = await axios
    .delete(`${QUESTIONS_API}/${questionId}`);
  return response.data;
};

export const addQuestion = async (quizId: any, question: any) => {
    const response = await axios.post(
      `${QUIZZES_API}/${quizId}/questions`,
      question
    );
    return response.data;
  };
  
export const findQuestionsForQuiz = async (quizId: any) => {
  const response = await axios
    .get(`${QUIZZES_API}/${quizId}/questions`);
  return response.data;
};
