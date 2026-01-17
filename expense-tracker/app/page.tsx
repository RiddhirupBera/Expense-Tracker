import ExpenseForm from "@/app/ExpenseForm";
import ExpenseList from "@/app/ExpenseList";
import { redirect } from "next/navigation";
import { checkLoggedIn } from "./actions/checkLoggedIn";

export default async function ExpensePage() {
  //redirect("/register");
  //await checkLoggedIn();
  //redirect("/register");
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Expense Tracker</h1>
      {/* <ExpenseForm />
      <ExpenseList /> */}
    </main>
  );
}


// app/page.tsx
// import { redirect } from "next/navigation";

// export default function Home() {
//   redirect("/login"); // or /register or /dashboard
// }
