"use server"
import { getExpenses } from "@/app/actions/getExpenses";
import SetTableDisplay from "@/app/components/SetTableDisplay";
import BarChart from "@/app/components/BarChart";

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

  thisMonthExpenses.sort((a, b) => b.amount - a.amount);
  let len = 3;
  if(thisMonthExpenses.length<3){
    len = thisMonthExpenses.length;
  }
  let thisMonthExpensesDisplay = thisMonthExpenses.slice(0,len);

  expenses.sort((a, b) => b.amount - a.amount);
  let len1 = 3;
  if(expenses.length<3){
    len = expenses.length;
  }
  let expensesDisplay = expenses.slice(0,len1);

  let totalAll = 0;
  let categoryMapAll = new Map();
  for(let i=0;i<expenses.length;i++){
    totalAll = totalAll + expenses[i].amount;
    if(categoryMapAll.get(expenses[i].category)){
      categoryMapAll.set(expenses[i].category, categoryMapAll.get(expenses[i].category ) + expenses[i].amount)
    }else{
      categoryMapAll.set(expenses[i].category, expenses[i].amount)
    }
  }

  const categoryData = Object.fromEntries(categoryMap);
  const categoryDataAll = Object.fromEntries(categoryMapAll);

  console.log(categoryMap);

  return (
    <div className="main-content">
      <h1>DASHBOARD</h1>

      <div style={{display:"flex", gap : "2rem", justifyContent : "center", alignItems : "center", flexDirection : "column"}}>
      <div style={{display:"flex", gap : "2rem", justifyContent : "center", alignItems : "center", flexDirection : "column"}}>
        <h1>This Month ({currentMonthName})</h1>
      <div style={{display:"flex", gap : "2rem", justifyContent : "center", alignItems : "center"}}>
      <div className="card">
        <span>Expense : {monthlyTotal}</span>
      </div>
      <BarChart data={categoryData} />
      <div>
        <h4 style={{display : "flex", justifyContent : "center"}}>Top 3 Expenses</h4>
        <table className="tableStyle">
          <thead>
            <tr>
              <td>Expense</td>
              <td>Amount</td>
            </tr>
          </thead>
          <tbody>
            {thisMonthExpensesDisplay.map((m)=>(
              <tr>
              <td>{m.name}</td>
              <td>{m.amount}</td>
            </tr>
            ))}
            
          </tbody>
        </table>
      </div>

      </div>
      </div>
      <div style={{display:"flex", gap : "2rem", justifyContent : "center", alignItems : "center", flexDirection : "column"}}>
        <h1>Lifetime</h1>
      <div style={{display:"flex", gap : "2rem", justifyContent : "center", alignItems : "center"}}>
      <div className="card">
        <span>Expense : {total}</span>
      </div>
      <BarChart data={categoryDataAll} />
      <div>
        <h4 style={{display : "flex", justifyContent : "center"}}>Top 3 Expenses</h4>
        <table className="tableStyle">
          <thead>
            <tr>
              <td>Expense</td>
              <td>Amount</td>
            </tr>
          </thead>
          <tbody>
            {expensesDisplay.map((m)=>(
              <tr>
              <td>{m.name}</td>
              <td>{m.amount}</td>
            </tr>
            ))}
            
          </tbody>
        </table>
      </div>
      </div>
      </div>
      </div>

    </div>
  );
}
