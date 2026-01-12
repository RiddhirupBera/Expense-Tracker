// TableDisplay.tsx (SERVER)
import { getExpenses } from "../actions/getExpenses";
import { TableDisplay } from "./TableDisplay";

export default async function SetTableDisplay() {
  const expenses = await getExpenses();
  return <TableDisplay expenses={expenses} />;
}
