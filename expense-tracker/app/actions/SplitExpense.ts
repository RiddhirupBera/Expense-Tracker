"use server"
import connectDB from "@/config/database";
import Expense from "@/models/Expense";
import User from "@/models/User";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "./auth";

interface ExpenseInterface {
  _id: string;
  name: string;
  amount: number;
  category: string;
  date: string;
}

interface Borrower {
  username: string;
  amount: number;
}

export async function SplitExpense(expense: ExpenseInterface, borrowers: Borrower[]) {
    await connectDB();
    const user = await getCurrentUser();
    
    if (!user) {
        throw new Error("User not authenticated");
    }

    // Filter out empty borrowers
    const validBorrowers = borrowers.filter(b => b.username && b.amount > 0);
    
    if (validBorrowers.length === 0) {
        throw new Error("No valid borrowers provided");
    }

    // Update each borrower's borrowedExpenses
    for (const borrower of validBorrowers) {
        await User.findOneAndUpdate(
            { username: borrower.username },
            {
                $push: {
                    borrowedExpenses: {
                        expenseId: expense._id,
                        expenseName: expense.name,
                        amount: borrower.amount,
                        lender: user.username,
                        isPaid: false
                    }
                }
            }
        );
    }

    // Update the lender's lendedExpenses
    await User.findOneAndUpdate(
        { username: user.username },
        {
            $push: {
                lendedExpenses: {
                    expenseId: expense._id,
                    expenseName: expense.name,
                    amount: expense.amount,
                    borrowers: validBorrowers.map(b => ({
                        username: b.username,
                        amount: b.amount,
                        isPaid: false
                    }))
                }
            }
        }
    );

    revalidatePath("/expense-list");
    revalidatePath("/lended");
}