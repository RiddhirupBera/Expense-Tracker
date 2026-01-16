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

export async function DeleteExpense(expense : ExpenseInterface){
    await connectDB();
    await Expense.findByIdAndDelete(expense._id);
    revalidatePath("/pages/expense-list")

}