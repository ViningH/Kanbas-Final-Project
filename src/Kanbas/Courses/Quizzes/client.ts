import axios from "axios";
const API_BASE = process.env.REACT_APP_BASE_API_URL;
const COURSES_API = `${API_BASE}/api/courses`;
const QUIZZES_API = `${API_BASE}/api/quizzes`;
export const updateQuiz = async (quiz: { _id: any; }) => {
    const response = await axios.
      put(`${QUIZZES_API }/${quiz._id}`, quiz);
    return response.data;
  };
  

export const deleteQuiz = async (quizId: any) => {
  const response = await axios
    .delete(`${QUIZZES_API}/${quizId}`);
  return response.data;
};

export const addQuiz = async (courseId: any, quiz: any) => {
    const response = await axios.post(
      `${COURSES_API}/${courseId}/quizzes`,
      quiz
    );
    return response.data;
  };
  
export const findQuizzesForCourse = async (courseId: any) => {
  const response = await axios
    .get(`${COURSES_API}/${courseId}/quizzes`);
  return response.data;
};
