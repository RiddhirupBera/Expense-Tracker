export type Expense = {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
};

export const expenses: Expense[] = [
  {
    id: "1",
    title: "Groceries",
    amount: 1200,
    category: "Food",
    date: "2024-06-01",
  },
  {
    id: "2",
    title: "Gym",
    amount: 800,
    category: "Fitness",
    date: "2024-06-02",
  },
];
