const {createSlice} = require("@reduxjs/toolkit");

const expenseSlice = createSlice({
    name : "expense",
    initialState : {
        expenseList  : []
    },
    reducers : {
        add(state,action){
            state.expenseList.push(action.payload);
        }
    }
})

export const {add} = expenseSlice.actions;
export const expenseReducer = expenseSlice.reducer;