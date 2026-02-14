"use client"

import { MarkAsPaid } from "../actions/MarkAsPaid";
import { useState } from "react";

interface LendedExpense {
  expenseId?: string;
  expenseName?: string;
  amount?: number;
  borrowers: {
    username: string;
    amount: number;
    isPaid?: boolean;
    paidAt?: string;
  }[];
}

export default function LendCard({ 
  lendedExpenses, 
  currentUsername 
}: { 
  lendedExpenses: LendedExpense[];
  currentUsername: string;
}) {
  const [loading, setLoading] = useState<string | null>(null);

  const handleMarkAsPaid = async (expenseId: string, borrowerUsername: string) => {
    try {
      setLoading(`${expenseId}-${borrowerUsername}`);
      await MarkAsPaid({
        expenseId,
        borrowerUsername,
        lenderUsername: currentUsername
      });
    } catch (error) {
      console.error("Error marking as paid:", error);
      alert("Failed to mark as paid. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  const getTotalOwed = (expense: LendedExpense) => {
    return expense.borrowers
      .filter(b => !b.isPaid)
      .reduce((sum, b) => sum + b.amount, 0);
  };

  const getTotalPaid = (expense: LendedExpense) => {
    return expense.borrowers
      .filter(b => b.isPaid)
      .reduce((sum, b) => sum + b.amount, 0);
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "0.5rem", color: "#333" }}>
          Your Lended Expenses
        </h2>
        <p style={{ color: "#666", margin: 0 }}>
          Track money you've lent to others
        </p>
      </div>

      {lendedExpenses.length === 0 ? (
        <div style={{
          textAlign: "center",
          padding: "3rem",
          backgroundColor: "#f8f9fa",
          borderRadius: "12px",
          border: "2px dashed #dee2e6"
        }}>
          <p style={{ fontSize: "1.2rem", color: "#6c757d", margin: 0 }}>
            💸 No lended expenses found
          </p>
          <p style={{ color: "#adb5bd", marginTop: "0.5rem" }}>
            Split an expense to start tracking borrowed money
          </p>
        </div>
      ) : (
        <div style={{ display: "grid", gap: "1.5rem" }}>
          {lendedExpenses.map((expense, index) => {
            const totalOwed = getTotalOwed(expense);
            const totalPaid = getTotalPaid(expense);
            const allPaid = expense.borrowers.every(b => b.isPaid);

            return (
              <div 
                key={expense.expenseId || index} 
                style={{ 
                  border: allPaid ? '2px solid #28a745' : '2px solid #e9ecef',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  backgroundColor: allPaid ? '#d4edda' : 'white',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease'
                }}
              >
                {/* Header */}
                <div style={{ marginBottom: "1rem", paddingBottom: "1rem", borderBottom: "2px solid #e9ecef" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "0.5rem" }}>
                    <h3 style={{ margin: 0, fontSize: "1.4rem", color: "#333" }}>
                      {expense.expenseName}
                    </h3>
                    {allPaid && (
                      <span style={{
                        backgroundColor: "#28a745",
                        color: "white",
                        padding: "0.25rem 0.75rem",
                        borderRadius: "20px",
                        fontSize: "0.85rem",
                        fontWeight: "600"
                      }}>
                        ✓ Fully Paid
                      </span>
                    )}
                  </div>
                  
                  <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
                    <div>
                      <span style={{ color: "#6c757d", fontSize: "0.9rem" }}>Total Amount: </span>
                      <strong style={{ fontSize: "1.2rem", color: "#333" }}>
                        ${expense.amount?.toFixed(2)}
                      </strong>
                    </div>
                    
                    {!allPaid && (
                      <div>
                        <span style={{ color: "#6c757d", fontSize: "0.9rem" }}>Still Owed: </span>
                        <strong style={{ fontSize: "1.2rem", color: "#dc3545" }}>
                          ${totalOwed.toFixed(2)}
                        </strong>
                      </div>
                    )}
                    
                    {totalPaid > 0 && (
                      <div>
                        <span style={{ color: "#6c757d", fontSize: "0.9rem" }}>Paid Back: </span>
                        <strong style={{ fontSize: "1.2rem", color: "#28a745" }}>
                          ${totalPaid.toFixed(2)}
                        </strong>
                      </div>
                    )}
                  </div>
                </div>

                {/* Borrowers */}
                <div>
                  <h4 style={{ 
                    margin: "0 0 1rem 0", 
                    fontSize: "1.1rem",
                    color: "#495057" 
                  }}>
                    Borrowers ({expense.borrowers.length})
                  </h4>
                  
                  <div style={{ display: "grid", gap: "0.75rem" }}>
                    {expense.borrowers.map((borrower, idx) => (
                      <div 
                        key={idx} 
                        style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          alignItems: 'center',
                          padding: '1rem',
                          backgroundColor: borrower.isPaid ? '#d4edda' : '#f8f9fa',
                          borderRadius: '8px',
                          border: borrower.isPaid ? '1px solid #c3e6cb' : '1px solid #dee2e6',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <span style={{ 
                              fontSize: "1.5rem",
                              filter: borrower.isPaid ? "grayscale(0)" : "grayscale(100%)"
                            }}>
                              👤
                            </span>
                            <div>
                              <div style={{ fontWeight: "600", fontSize: "1.05rem", color: "#333" }}>
                                {borrower.username}
                              </div>
                              <div style={{ 
                                fontSize: "1.1rem", 
                                color: borrower.isPaid ? "#28a745" : "#dc3545",
                                fontWeight: "600"
                              }}>
                                ${borrower.amount.toFixed(2)}
                              </div>
                            </div>
                          </div>
                          
                          {borrower.isPaid && borrower.paidAt && (
                            <div style={{ 
                              marginTop: '0.5rem',
                              fontSize: '0.85rem',
                              color: '#28a745',
                              paddingLeft: "2.5rem"
                            }}>
                              ✓ Paid on {new Date(borrower.paidAt).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </div>
                          )}
                        </div>
                        
                        {!borrower.isPaid && (
                          <button
                            onClick={() => handleMarkAsPaid(expense.expenseId!, borrower.username)}
                            disabled={loading === `${expense.expenseId}-${borrower.username}`}
                            style={{
                              padding: '0.75rem 1.5rem',
                              backgroundColor: loading === `${expense.expenseId}-${borrower.username}` 
                                ? '#6c757d' 
                                : '#28a745',
                              color: 'white',
                              border: 'none',
                              borderRadius: '6px',
                              cursor: loading === `${expense.expenseId}-${borrower.username}` 
                                ? 'not-allowed' 
                                : 'pointer',
                              fontSize: '0.95rem',
                              fontWeight: '600',
                              transition: 'all 0.2s ease',
                              whiteSpace: 'nowrap'
                            }}
                            onMouseEnter={(e) => {
                              if (!loading) {
                                e.currentTarget.style.backgroundColor = '#218838';
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!loading) {
                                e.currentTarget.style.backgroundColor = '#28a745';
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                              }
                            }}
                          >
                            {loading === `${expense.expenseId}-${borrower.username}` 
                              ? '⏳ Processing...' 
                              : '✓ Mark as Paid'}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}