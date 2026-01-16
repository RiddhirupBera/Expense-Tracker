"use server"
import Link from "next/link";
import NavLinks from "./NavLinks";
import { cookies } from "next/headers";

export default async function Navbar() {

  const cookieStore = await cookies();   
  const username = cookieStore.get("username")?.value ?? "";

  return (
    <nav className="topNav">
      <h3>Expense Tracker</h3>

      <NavLinks username={username}/>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "1rem 2rem",
    background: "#0f172a",
    color: "white",
  },
  links: {
    display: "flex",
    gap: "1rem",
  },
};
