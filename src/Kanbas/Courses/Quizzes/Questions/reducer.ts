import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    questions: <any>[],
    question: {
        title: "New Question",
        questiontype: "MULTIPLECHOICE"
    },
};


const questionsSlice = createSlice({
    name: "questions",
    initialState,
    reducers: {
        setQuestions: (state, action) => {
            state.questions = action.payload;
        },
        addQuestion: (state, action) => {
            state.questions = [action.payload, ...state.questions];
        },
        deleteQuestion: (state, action) => {
            state.questions = state.questions.filter((questions: { _id: any; }) => questions._id !== action.payload
            );
        },
        updateQuestion: (state, action) => {
            state.questions = state.questions.map((question: { _id: any; }) => {
                if (question._id === action.payload._id) {
                    return action.payload;
                } else {
                    return question;
                }
            });
        },
        setQuestion: (state, action) => {
            state.question = action.payload;
        },
    },
});


export const { addQuestion, deleteQuestion,
    updateQuestion, setQuestion, setQuestions } = questionsSlice.actions;
export default questionsSlice.reducer;