"use client";

import { addUser } from "@/app/actions/addUser";

export default function Register() {
  return (
    <form action={addUser}>
      <input
        name="username"
        placeholder="Username"
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        required
      />

      <button type="submit">Register</button>
    </form>
  );
}
