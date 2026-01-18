"use client";

import { useState } from "react";
import TableDisplay from "@/app/components/TableDisplay";

interface Expense {
  _id: string;
  name: string;
  amount: number;
  category: string;
  date: string;
}

export default function FilterExpenseClient({
  expenses,
}: {
  expenses: Expense[];
}) {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [category, setCategory] = useState("");

  const filteredExpenses = expenses.filter((exp) => {
    const expDate = new Date(exp.date);

    const fromOk = fromDate ? expDate >= new Date(fromDate) : true;
    const toOk = toDate ? expDate <= new Date(toDate) : true;
    const categoryOk = category ? exp.category === category : true;

    return fromOk && toOk && categoryOk;
  });

  return (
    <div
      style={{
        display: "flex",
        textAlign: "center",
        justifyContent: "center",
        padding: "4rem",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <h1>Filter Expenses</h1>

      <div>
        <div>Date Range</div>
        <input type="date" onChange={(e) => setFromDate(e.target.value)} />
        <input type="date" onChange={(e) => setToDate(e.target.value)} />
      </div>

      <div>
        <div>Category</div>
        <select onChange={(e) => setCategory(e.target.value)}>
          <option value="">All</option>
          <option>Food</option>
          <option>Travel</option>
          <option>Medicine</option>
          <option>Leisure</option>
          <option>Investments</option>
          <option>Daily Needs</option>
        </select>
      </div>

      <TableDisplay expenses={filteredExpenses} />
    </div>
  );
}
