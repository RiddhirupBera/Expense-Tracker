"use client";

import { addExpense } from "@/app/actions/addExpense";

export default function ExpenseForm() {
  return (
    <form
      action={addExpense}
      style={{
        display: "flex",
        gap: "1rem",
        marginTop: "2rem",
      }}
    >
      <input name="title" placeholder="Expense title" required />
      <input name="amount" type="number" placeholder="Amount" required />
      <select name="category">
        <option>Food</option>
        <option>Travel</option>
        <option>Medicine</option>
        <option>Leisure</option>
        <option>Investments</option>
        <option>Daily Needs</option>
      </select>
      <input name="date" type="date" placeholder="Date" required/>
      <button type="submit">Add</button>
    </form>
  );
}
