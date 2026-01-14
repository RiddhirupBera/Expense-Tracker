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

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const today = new Date();
  const currentMonthName = monthNames[today.getMonth()];

  const thisMonthExpenses = expenses.filter((exp) => {
  const d = new Date(exp.date); 
  return (
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()
  );
});

  let monthlyTotal = 0;
  let categoryMap = new Map();
  for(let i=0;i<thisMonthExpenses.length;i++){
    monthlyTotal = monthlyTotal + thisMonthExpenses[i].amount;
    if(categoryMap.get(thisMonthExpenses[i].category)){
      categoryMap.set(thisMonthExpenses[i].category, categoryMap.get(thisMonthExpenses[i].category ) + thisMonthExpenses[i].amount)
    }else{
      categoryMap.set(thisMonthExpenses[i].category, thisMonthExpenses[i].amount)
    }
  }

  console.log(categoryMap);






  return (
    <div>
      <h1>DASHBOARD</h1>
      <div className="basic-container">
      <div><span>{total}</span></div>
      <div><span>{monthlyTotal}</span></div>
      </div>
    </div>
  );
}
