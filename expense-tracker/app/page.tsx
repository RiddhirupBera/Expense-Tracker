import ExpenseForm from "@/app/components/ExpenseForm";
import ExpenseList from "@/app/components/ExpenseList";

export default function ExpensePage() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Expense Tracker</h1>
      <ExpenseForm />
      <ExpenseList />
    </main>
  );
}
