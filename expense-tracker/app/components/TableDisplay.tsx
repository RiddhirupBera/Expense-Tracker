"use client"

import { useState } from "react";
import { UpdateExpense } from "../actions/UpdateExpense";
import { DeleteExpense } from "../actions/DeleteExpense";
import { SplitExpense } from "../actions/SplitExpense";

interface Expense {
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

export default function TableDisplay({ expenses }: { expenses: Expense[] }) {
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [selectedExpenseSplit, setSelectedExpenseSplit] = useState<Expense | null>(null);
  const [borrowers, setBorrowers] = useState<Borrower[]>([
    { username: '', amount: 0 }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addBorrower = () => {
    setBorrowers([...borrowers, { username: '', amount: 0 }]);
  };

  const removeBorrower = (index: number) => {
    if (borrowers.length > 1) {
      setBorrowers(borrowers.filter((_, i) => i !== index));
    }
  };

  const updateBorrower = (index: number, field: 'username' | 'amount', value: string | number) => {
    const newBorrowers = [...borrowers];
    if (field === 'username') {
      newBorrowers[index].username = value as string;
    } else {
      newBorrowers[index].amount = Number(value);
    }
    setBorrowers(newBorrowers);
  };

  const handleEdit = async (selectedExpense: Expense) => {
    setIsSubmitting(true);
    try {
      await UpdateExpense(selectedExpense);
      setSelectedExpense(null);
    } catch (error) {
      alert("Failed to update expense");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (selectedExpense: Expense) => {
    if (confirm(`Are you sure you want to delete "${selectedExpense.name}"?`)) {
      try {
        await DeleteExpense(selectedExpense);
      } catch (error) {
        alert("Failed to delete expense");
      }
    }
  };

  const handleSplit = async (selectedExpense: Expense) => {
    const validBorrowers = borrowers.filter(b => b.username && b.amount > 0);
    
    if (validBorrowers.length === 0) {
      alert("Please add at least one valid borrower");
      return;
    }

    const totalBorrowed = validBorrowers.reduce((sum, b) => sum + b.amount, 0);
    if (totalBorrowed > selectedExpense.amount) {
      alert(`Total borrowed amount ($${totalBorrowed}) cannot exceed expense amount ($${selectedExpense.amount})`);
      return;
    }

    setIsSubmitting(true);
    try {
      await SplitExpense(selectedExpense, validBorrowers);
      setSelectedExpenseSplit(null);
      setBorrowers([{ username: '', amount: 0 }]);
      alert("Expense split successfully!");
    } catch (error) {
      alert("Failed to split expense");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ marginTop: "4rem", padding: "0 2rem" }}>
      <h1 style={{ marginBottom: "2rem", color: "#333" }}>Expense List</h1>
      
      <div style={{ overflowX: "auto" }}>
        <table className="table-style">
          <thead>
            <tr>
              <th>Expense</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((exp) => (
              <tr key={exp._id}>
                <td>{exp.name}</td>
                <td>${exp.amount.toFixed(2)}</td>
                <td>{exp.category}</td>
                <td>{new Date(exp.date).toLocaleDateString()}</td>
                <td>
                  <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}>
                    <button 
                      className="table-button" 
                      onClick={() => setSelectedExpense(exp)}
                      title="Edit expense"
                    >
                      ✏️ Edit
                    </button>
                    <button 
                      className="tablebuttonBlue" 
                      onClick={() => {
                        setSelectedExpenseSplit(exp);
                        setBorrowers([{ username: '', amount: 0 }]);
                      }}
                      title="Split expense"
                    >
                      💰 Split
                    </button>
                    <button 
                      className="tablebuttonRed" 
                      onClick={() => handleDelete(exp)}
                      title="Delete expense"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {selectedExpense && (
        <div className="modalOverlay">
          <div className="editModal">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h2 style={{ margin: 0 }}>Edit Expense</h2>
              <button 
                className="closeBtn" 
                onClick={() => setSelectedExpense(null)}
                disabled={isSubmitting}
              >
                ✕
              </button>
            </div>
            
            <div className="editModalComps">
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>
                  Expense Name
                </label>
                <input
                  name="name"
                  placeholder="Expense title"
                  defaultValue={selectedExpense.name}
                  required
                  onChange={(e) => setSelectedExpense({ ...selectedExpense, name: e.target.value })}
                />
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>
                  Amount ($)
                </label>
                <input
                  name="amount"
                  type="number"
                  step="0.01"
                  placeholder="Amount"
                  defaultValue={selectedExpense.amount}
                  required
                  onChange={(e) => setSelectedExpense({ ...selectedExpense, amount: Number(e.target.value) })}
                />
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>
                  Category
                </label>
                <select
                  name="category"
                  defaultValue={selectedExpense.category}
                  onChange={(e) => setSelectedExpense({ ...selectedExpense, category: e.target.value })}
                >
                  <option>Food</option>
                  <option>Travel</option>
                  <option>Medicine</option>
                  <option>Leisure</option>
                  <option>Investments</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>
                  Date
                </label>
                <input
                  name="date"
                  type="date"
                  defaultValue={selectedExpense.date}
                  placeholder="Date"
                  required
                  onChange={(e) => setSelectedExpense({ ...selectedExpense, date: e.target.value })}
                />
              </div>

              <button 
                className="editModalButton" 
                onClick={() => handleEdit(selectedExpense)}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Split Modal */}
      {selectedExpenseSplit && (
        <div className="modalOverlay">
          <div className="editModal" style={{ maxWidth: "600px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h2 style={{ margin: 0 }}>Split Expense</h2>
              <button 
                className="closeBtn" 
                onClick={() => {
                  setSelectedExpenseSplit(null);
                  setBorrowers([{ username: '', amount: 0 }]);
                }}
                disabled={isSubmitting}
              >
                ✕
              </button>
            </div>

            <div style={{ backgroundColor: "#f8f9fa", padding: "1rem", borderRadius: "8px", marginBottom: "1.5rem" }}>
              <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1.1rem" }}>{selectedExpenseSplit.name}</h3>
              <p style={{ margin: 0, fontSize: "1.5rem", fontWeight: "bold", color: "#28a745" }}>
                ${selectedExpenseSplit.amount.toFixed(2)}
              </p>
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <h3 style={{ margin: 0 }}>Borrowers</h3>
                <button
                  onClick={addBorrower}
                  style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "0.9rem"
                  }}
                >
                  + Add Borrower
                </button>
              </div>

              {borrowers.map((borrower, index) => (
                <div 
                  key={index} 
                  style={{ 
                    display: "flex", 
                    gap: "0.5rem", 
                    marginBottom: "0.75rem",
                    alignItems: "center"
                  }}
                >
                  <input
                    type="text"
                    placeholder="Username"
                    value={borrower.username}
                    onChange={(e) => updateBorrower(index, 'username', e.target.value)}
                    style={{ flex: 1 }}
                  />
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Amount"
                    value={borrower.amount || ''}
                    onChange={(e) => updateBorrower(index, 'amount', e.target.value)}
                    style={{ flex: 1 }}
                  />
                  {borrowers.length > 1 && (
                    <button
                      onClick={() => removeBorrower(index)}
                      style={{
                        padding: "0.5rem",
                        backgroundColor: "#dc3545",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        minWidth: "40px"
                      }}
                      title="Remove borrower"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}

              <div style={{ 
                marginTop: "1rem", 
                padding: "0.75rem", 
                backgroundColor: "#e9ecef", 
                borderRadius: "4px",
                fontSize: "0.9rem"
              }}>
                <strong>Total Split:</strong> ${borrowers.reduce((sum, b) => sum + (b.amount || 0), 0).toFixed(2)} / ${selectedExpenseSplit.amount.toFixed(2)}
              </div>
            </div>

            <button 
              className="editModalButton" 
              onClick={() => handleSplit(selectedExpenseSplit)}
              disabled={isSubmitting}
              style={{ width: "100%" }}
            >
              {isSubmitting ? "Processing..." : "Confirm Split"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}