"use server";

import Expense from "@/models/Expense";
import connectDB from "@/config/database";
import { getCurrentUser } from "./auth";

export async function getExpenses() {
  await connectDB();

  const user = await getCurrentUser();
  
  if (!user) {
    return [];
  }

  const expenses = await Expense.find({ username: user.username }).lean();

  return expenses.map(exp => ({
    _id: exp._id.toString(),
    name: exp.name,
    amount: exp.amount,
    category: exp.category,
    date: exp.date,
  }));
}