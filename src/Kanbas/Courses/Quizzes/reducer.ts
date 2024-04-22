import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    quizzes: <any>[],
    quiz: {
        title: "New Quiz",
        published: false,
        quiztype: "GRADEDQUIZ",
        group: "QUIZZES",
        shuffle: true,
        time_limit: true,
        time: 20,
        multiple_attempts: false,
        show_correct: false,
        one_question: true,
        webcam: false,
        lock: false
    },
};


const quizzesSlice = createSlice({
    name: "quizzes",
    initialState,
    reducers: {
        setQuizzes: (state, action) => {
            state.quizzes = action.payload;
        },
        addQuiz: (state, action) => {
            state.quizzes = [action.payload, ...state.quizzes];
        },
        deleteQuiz: (state, action) => {
            state.quizzes = state.quizzes.filter((quizzes: { _id: any; }) => quizzes._id !== action.payload
            );
        },
        updateQuiz: (state, action) => {
            state.quizzes = state.quizzes.map((quiz: { _id: any; }) => {
                if (quiz._id === action.payload._id) {
                    return action.payload;
                    
                } else {
                    return quiz;
                }
            });
        },
        setQuiz: (state, action) => {
            state.quiz = action.payload;
        },
    },
});


export const { addQuiz, deleteQuiz,
    updateQuiz, setQuiz, setQuizzes } = quizzesSlice.actions;
export default quizzesSlice.reducer;