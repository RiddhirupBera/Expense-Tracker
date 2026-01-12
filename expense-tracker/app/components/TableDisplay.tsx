"use client"

interface Expense {
  _id: string;
  name: string;
  amount: number;
  category: string;
  date: string;
}
export async function TableDisplay({expenses}:{expenses : Expense[]}){

    return(
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
                <td><button className="table-button">Edit</button></td>
                <td><button className="table-button">Delete</button></td>
              </tr>
             
            ))
          }
        </tbody>
      </table>
    )
}