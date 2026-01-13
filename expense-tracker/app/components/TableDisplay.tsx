"use client"

import { useState } from "react";

interface Expense {
  _id: string;
  name: string;
  amount: number;
  category: string;
  date: string;
}
export default function TableDisplay({expenses}:{expenses : Expense[]}){

    const [selectedExpense,setSelectedExpense] = useState<Expense | null>(null);

    return(
    <>
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
                <td><button className="table-button">Delete</button></td>
              </tr>
             
            ))
          }
        </tbody>
      </table>
      {selectedExpense && (
        <div className="editModal">
          <button className="closeBtn" onClick={() => setSelectedExpense(null)}>✕</button>
        <div style={{fontSize : "2rem"}}>Edit Expense</div>
        <div className="editModalComps">
                <input  name="name" placeholder="Expense title" defaultValue={selectedExpense.name} required />
                <input  name="amount" type="number" placeholder="Amount" defaultValue={selectedExpense.amount} required />
                <select  name="category" defaultValue={selectedExpense.category}>
                  <option>Food</option>
                  <option>Travel</option>
                  <option>Medicine</option>
                  <option>Leisure</option>
                  <option>Investments</option>
                </select>
          
                <button className="editModalButton" >Confirm</button>
        </div>
        </div>
      )}
      </>
    )
}