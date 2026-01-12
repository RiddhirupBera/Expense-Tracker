"use server"
import { getExpenses } from "@/app/actions/getExpenses";
import SetTableDisplay from "@/app/components/SetTableDisplay";

export default async function Dashboard() {
  const expenses = await getExpenses();
  let total = 0;
  for(let i=0 ;i<expenses.length;i++){
    console.log(expenses[i].amount)
    total+=expenses[i].amount
  }
  return (
    <div>
      
      <div className="basic-container">
        <div><h1>Dashboard</h1></div>
        <SetTableDisplay/>
      
      <div><span>{total}</span></div>
      </div>
    </div>
  );
}
