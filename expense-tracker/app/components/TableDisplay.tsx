"use client"

import { useState } from "react";
import {UpdateExpense} from "../actions/UpdateExpense";
import { DeleteExpense } from "../actions/DeleteExpense";

interface Expense {
  _id: string;
  name: string;
  amount: number;
  category: string;
  date: string;
}
export default function TableDisplay({expenses}:{expenses : Expense[]}){

    const [selectedExpense,setSelectedExpense] = useState<Expense | null>(null);

    const handleEdit = async (selectedExpense:Expense) =>{
      await UpdateExpense(selectedExpense)
      setSelectedExpense(null);
    }

    const handleDelete = async (selectedExpense:Expense) =>{
      await DeleteExpense(selectedExpense)
    }

    return(
    <div style={{marginTop : "4rem"}}>
<h1>Expense List</h1>
    <table className="table-style">
        <thead>
          <tr>
            <th>Expense</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {
            expenses.map((exp)=>(
              <tr key={exp._id}>
                <td>{exp.name}</td>
                <td>{exp.amount}</td>
                <td>{exp.category}</td>
                <td>{exp.date}</td>
                <td><button className="table-button" onClick={()=>{setSelectedExpense(exp)}}>Edit</button></td>
                <td><button className="tablebuttonRed" onClick={()=>{handleDelete(exp)}}>Delete</button></td>
              </tr>
             
            ))
          }
        </tbody>
      </table>
      {selectedExpense && (
        <div className="modalOverlay">
        <div className="editModal">
          <button className="closeBtn" onClick={() => setSelectedExpense(null)}>✕</button>
        <div style={{fontSize : "2rem"}}>Edit Expense</div>
        <div className="editModalComps">
                <input  name="name" placeholder="Expense title" defaultValue={selectedExpense.name} required onChange={(e)=>{setSelectedExpense({...selectedExpense,name : e.target.value})}}/>
                <input  name="amount" type="number" placeholder="Amount" defaultValue={selectedExpense.amount} required onChange={(e)=>{setSelectedExpense({...selectedExpense, amount : Number(e.target.value)})}}/>
                <select  name="category" defaultValue={selectedExpense.category} onChange={(e)=>{setSelectedExpense({...selectedExpense,category : e.target.value})}}>
                  <option>Food</option>
                  <option>Travel</option>
                  <option>Medicine</option>
                  <option>Leisure</option>
                  <option>Investments</option>
                </select>
                <input name="date" type="date" defaultValue={selectedExpense.date} placeholder="Date" required onChange={(e)=>{setSelectedExpense({...selectedExpense,date : e.target.value})}} />
          
                <button className="editModalButton" onClick={()=>{handleEdit(selectedExpense)}}>Confirm</button>
        </div>
        </div>
        </div>
      )}
      </div>
    )
}