"use server";

import Expense from "@/models/Expense";
import connectDB from "@/config/database";
import { getCurrentUser } from "./auth";
import { revalidatePath } from "next/cache";

export async function addExpense(formData: FormData) {
  await connectDB();

  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const title = formData.get("title") as string;
  const amount = Number(formData.get("amount"));
  const category = formData.get("category") as string;
  const date = formData.get("date");

  const expense = new Expense({
    username: user.username,
    name: title,
    amount,
    category,
    date,
  });

  try {
    await expense.save();
    console.log("✅ Expense saved");
    revalidatePath("/dashboard");
    revalidatePath("/expense-list");
    return { success: true };
  } catch (err) {
    console.error("❌ Error saving expense:", err);
    return { success: false, error: "Failed to save expense" };
  }
}