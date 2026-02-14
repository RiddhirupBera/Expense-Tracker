"use server"
import connectDB from "@/config/database";
import User from "@/models/User";
import { revalidatePath } from "next/cache";

interface MarkAsPaidParams {
  expenseId: string;
  borrowerUsername: string;
  lenderUsername: string;
}

export async function MarkAsPaid({ expenseId, borrowerUsername, lenderUsername }: MarkAsPaidParams) {
    await connectDB();
    
    const paidDate = new Date();

    // Update the borrower's borrowedExpenses
    // await User.findOneAndUpdate(
    //     { 
    //         username: borrowerUsername,
    //         "borrowedExpenses.expenseId": expenseId,
    //         "borrowedExpenses.lender": lenderUsername
    //     },
    //     {
    //         $set: {
    //             "borrowedExpenses.$.isPaid": true,
    //             "borrowedExpenses.$.paidAt": paidDate
    //         }
    //     }
    // );



    const borrower = await User.findOne({ username: borrowerUsername });
    
    if (!borrower) {
      throw new Error(`Borrower ${borrowerUsername} not found`);
    }

    // Find and update the specific borrowed expense
    const expenseIndex = borrower.borrowedExpenses.findIndex(
      (exp: any) => 
        exp.expenseId.toString() === expenseId && 
        exp.lender === lenderUsername
    );

    if (expenseIndex === -1) {
      throw new Error("Borrowed expense not found in borrower's records");
    }

    borrower.borrowedExpenses[expenseIndex].isPaid = true;
    borrower.borrowedExpenses[expenseIndex].paidAt = new Date();
    
    await borrower.save();
    console.log("✓ Borrower updated successfully");




    // Update the lender's lendedExpenses
    await User.findOneAndUpdate(
        {
            username: lenderUsername,
            "lendedExpenses.expenseId": expenseId
        },
        {
            $set: {
                "lendedExpenses.$[expense].borrowers.$[borrower].isPaid": true,
                "lendedExpenses.$[expense].borrowers.$[borrower].paidAt": paidDate
            }
        },
        {
            arrayFilters: [
                { "expense.expenseId": expenseId },
                { "borrower.username": borrowerUsername }
            ]
        }
    );

    revalidatePath("/lended");
    revalidatePath("/borrowed");
}