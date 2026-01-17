"use server"
import connectDB from "@/config/database";
import Expense from "@/models/Expense";
import { revalidatePath } from "next/cache";

interface ExpenseInterface {
  _id: string;
  name: string;
  amount: number;
  category: string;
  date: string;
}

export async function UpdateExpense(expense : ExpenseInterface){
    await connectDB();
    await Expense.findByIdAndUpdate(expense._id, {
    name: expense.name,
    amount: expense.amount,
    category: expense.category,
  });
  revalidatePath("/expense-list")

}