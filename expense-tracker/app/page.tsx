import ExpenseForm from "@/app/pages/ExpenseForm";
import ExpenseList from "@/app/pages/ExpenseList";
import { redirect } from "next/navigation";

export default function ExpensePage() {
  redirect("/pages/register");
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Expense Tracker</h1>
      <ExpenseForm />
      <ExpenseList />
    </main>
  );
}
