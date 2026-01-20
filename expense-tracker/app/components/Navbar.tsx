import Link from "next/link";
import NavLinks from "./NavLinks";
import { getCurrentUser } from "@/app/actions/auth";

export default async function Navbar() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <nav className="topNav">
        <h3>Expense Tracker</h3>
        <div style={{ display: "flex", gap: "1rem" }}>
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
        </div>
      </nav>
    );
  }

  return (
    <nav className="topNav">
      <h3>Expense Tracker</h3>
      <NavLinks username={user.username} />
    </nav>
  );
}