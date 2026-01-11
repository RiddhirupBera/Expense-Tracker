import { expenses, Expense } from "@/lib/expenses";

export default function ExpenseList() {
  if (!expenses || expenses.length === 0) {
    return <p>No expenses yet</p>;
  }

  return (
    <section style={{ marginTop: "2rem" }}>
      <h2>Expenses</h2>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {expenses.map((expense: Expense) => (
          <li
            key={expense.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px",
              borderBottom: "1px solid #ccc",
            }}
          >
            <span>{expense.title}</span>
            <span>₹{expense.amount}</span>
            <span>{expense.category}</span>
            <span>{expense.date}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
