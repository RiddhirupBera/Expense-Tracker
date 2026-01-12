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

    const [modal,setModal] = useState(false);

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
                <td><button className="table-button" onClick={()=>{setModal(true)}}>Edit</button></td>
                <td><button className="table-button">Delete</button></td>
              </tr>
             
            ))
          }
        </tbody>
      </table>
      {modal && (
        <div className="editModal">
          <button className="closeBtn" onClick={() => setModal(false)}>
    ✕
  </button>
          <div style={{fontSize : "2rem"}}>Edit Expense</div>
        <div className="editModalComps">
                <input  name="title" placeholder="Expense title" required />
                <input  name="amount" type="number" placeholder="Amount" required />
                <select  name="category">
                  <option>Food</option>
                  <option>Travel</option>
                  <option>Medicine</option>
                  <option>Leisure</option>
                  <option>Investments</option>
                </select>
          
                <button className="editModalButton" type="submit">Add</button>
        </div>
        </div>
      )}
      </>
    )
}