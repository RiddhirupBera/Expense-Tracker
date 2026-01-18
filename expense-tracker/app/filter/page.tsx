// "use client"
// import { useEffect } from "react";
// import { getExpenses } from "../actions/getExpenses"
// import TableDisplay from "../components/TableDisplay"
// export default async function FilterExpense(){
//     let expenseList=[];
//     useEffect(()=>{
//         let func = async()=>{
//             expenseList = await getExpenses();
//         }
//         func();
//     },[expenseList]);
//     return(
//         <div style={{display : "flex", textAlign : "center", justifyContent : "center", padding  : "10rem", flexDirection : "column",gap : "2rem"}}>
//             <div>
//                 <div>Date Range</div>
//                 <div>
//                     <input type="date"></input>
//                     <input type="date"></input>
//                 </div>
//             </div>
//             <div>
//                 <div>Category</div>
//                 <div><select name="category">
//                 <option>Food</option>
//                 <option>Travel</option>
//                 <option>Medicine</option>
//                 <option>Leisure</option>
//                 <option>Investments</option>
//                 <option>Daily Needs</option>
//             </select></div>
//             </div>
//             <div>
//                 <TableDisplay expenses={expenseList}/>
//             </div>
//         </div>
//     )
// }

import { getExpenses } from "@/app/actions/getExpenses";
import FilterExpenseClient from "./FilterExpenseClient";
export default async function FilterExpensePage() {
  const expenses = await getExpenses();

  return <FilterExpenseClient expenses={expenses} />;
}
