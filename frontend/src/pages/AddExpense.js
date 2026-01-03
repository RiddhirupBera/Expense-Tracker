import { useEffect, useState } from "react";
export const AddExpense = () =>{
    
    const [expenseName,setExpenseName] = useState("");
    const [expenseVal,setExpenseVal] = useState();
    const [expenseCategory,setExpenseCategory] = useState("Others");
    const [expenseDate,setExpenseDate] = useState("");

    const handleSubmit = () =>{
        let expenseObj = {
            name : expenseName,
            value : expenseVal,
            category : expenseCategory,
            date : expenseDate
        }
        console.log(expenseObj);
    }

    return(
        <>
            <div>
                <input id = "expenseName" type = "text" value = {expenseName} onChange = {(e)=>{setExpenseName(e.target.value)}}></input>
                <input id = "expenseVal" type = "text" value = {expenseVal} onChange = {(e)=>{setExpenseVal(e.target.value)}}></input>
                 <select value = {expenseCategory} onChange = {(e)=>{setExpenseCategory(e.target.value)}}>
                    <option value = "Food">Food</option>
                    <option value = "Entertainment">Entertainment</option>
                    <option value = "Medicine">Medicine</option>
                    <option value = "Fitness">Fitness</option>
                    <option value = "Travel">Travel </option>
                </select>
                <input id = "expenseDate" type = "date" value = {expenseDate} onChange = {(e)=>{setExpenseDate(e.target.value)}}></input>
                <button onClick = {handleSubmit}>➕</button>
            </div>
        </>
    )
}