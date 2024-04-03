import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    assignments: <any>[],
    assignment: {
        title: "New Assignment", 
        description: "New Assignment Description",
        points: 100,
        start: "2024-01-01",
        due: "2024-12-31",
        end: "2025-01-01"
}
};

const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        setAssignments: (state, action) => {
            state.assignments = action.payload;
          },      
        addAssignment: (state, action) => {
            state.assignments = [
                action.payload, 
                ...state.assignments
            ];
        },
        deleteAssignment: (state, action) => {
            state.assignments = state.assignments.filter(
                (assignment: { _id: any; }) => assignment._id !== action.payload
            );
        },
        updateAssignment: (state, action) => {
            state.assignments = state.assignments.map((assignment: { _id: any; }) => {
                if (assignment._id === action.payload._id) {
                    return action.payload;
                } else {
                    return assignment;
                }
            });
        },
        setAssignment: (state, action) => {
            state.assignment = action.payload;
        }
    }
});

export const {addAssignment, deleteAssignment, 
    updateAssignment, setAssignment, setAssignments} = assignmentsSlice.actions;
export default assignmentsSlice.reducer;