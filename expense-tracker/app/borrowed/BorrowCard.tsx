"use client"

interface BorrowedExpense {
  expenseId?: string;
  expenseName?: string;
  amount?: number;
  lender?: string;
  isPaid?: boolean;
  paidAt?: string;
}

export default function BorrowCard({ 
  borrowedExpenses, 
  currentUsername 
}: { 
  borrowedExpenses: BorrowedExpense[];
  currentUsername: string;
}) {
  const getTotalOwed = () => {
    return borrowedExpenses
      .filter(exp => !exp.isPaid)
      .reduce((sum, exp) => sum + (exp.amount || 0), 0);
  };

  const getTotalPaid = () => {
    return borrowedExpenses
      .filter(exp => exp.isPaid)
      .reduce((sum, exp) => sum + (exp.amount || 0), 0);
  };

  const totalOwed = getTotalOwed();
  const totalPaid = getTotalPaid();
  const totalBorrowed = totalOwed + totalPaid;

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "0.5rem", color: "#333" }}>
          Your Borrowed Expenses
        </h2>
        <p style={{ color: "#666", margin: 0 }}>
          Track money you owe to others
        </p>
      </div>

      {/* Summary Cards */}
      {borrowedExpenses.length > 0 && (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1.5rem",
          marginBottom: "2rem"
        }}>
          <div style={{
            backgroundColor: "#fff3cd",
            padding: "1.5rem",
            borderRadius: "12px",
            border: "2px solid #ffc107",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
          }}>
            <div style={{ fontSize: "0.9rem", color: "#856404", marginBottom: "0.5rem" }}>
              Total Owed
            </div>
            <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#856404" }}>
              ${totalOwed.toFixed(2)}
            </div>
          </div>

          <div style={{
            backgroundColor: "#d4edda",
            padding: "1.5rem",
            borderRadius: "12px",
            border: "2px solid #28a745",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
          }}>
            <div style={{ fontSize: "0.9rem", color: "#155724", marginBottom: "0.5rem" }}>
              Paid Back
            </div>
            <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#155724" }}>
              ${totalPaid.toFixed(2)}
            </div>
          </div>

          <div style={{
            backgroundColor: "#d1ecf1",
            padding: "1.5rem",
            borderRadius: "12px",
            border: "2px solid #17a2b8",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
          }}>
            <div style={{ fontSize: "0.9rem", color: "#0c5460", marginBottom: "0.5rem" }}>
              Total Borrowed
            </div>
            <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#0c5460" }}>
              ${totalBorrowed.toFixed(2)}
            </div>
          </div>
        </div>
      )}

      {borrowedExpenses.length === 0 ? (
        <div style={{
          textAlign: "center",
          padding: "3rem",
          backgroundColor: "#f8f9fa",
          borderRadius: "12px",
          border: "2px dashed #dee2e6"
        }}>
          <p style={{ fontSize: "1.2rem", color: "#6c757d", margin: 0 }}>
            🎉 No borrowed expenses found
          </p>
          <p style={{ color: "#adb5bd", marginTop: "0.5rem" }}>
            You don't owe anyone money right now!
          </p>
        </div>
      ) : (
        <div style={{ display: "grid", gap: "1.5rem" }}>
          {/* Unpaid Expenses */}
          {borrowedExpenses.some(exp => !exp.isPaid) && (
            <div>
              <h3 style={{ 
                fontSize: "1.3rem", 
                color: "#dc3545", 
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem"
              }}>
                ⚠️ Unpaid ({borrowedExpenses.filter(exp => !exp.isPaid).length})
              </h3>
              <div style={{ display: "grid", gap: "1rem" }}>
                {borrowedExpenses
                  .filter(exp => !exp.isPaid)
                  .map((expense, index) => (
                    <div 
                      key={expense.expenseId || index} 
                      style={{ 
                        border: '2px solid #dc3545',
                        padding: '1.5rem',
                        borderRadius: '12px',
                        backgroundColor: '#fff5f5',
                        boxShadow: '0 2px 8px rgba(220, 53, 69, 0.1)',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <div style={{ 
                        display: "flex", 
                        justifyContent: "space-between", 
                        alignItems: "start",
                        flexWrap: "wrap",
                        gap: "1rem"
                      }}>
                        <div style={{ flex: 1, minWidth: "200px" }}>
                          <div style={{ 
                            fontSize: "1.4rem", 
                            fontWeight: "600", 
                            color: "#333",
                            marginBottom: "0.5rem"
                          }}>
                            {expense.expenseName}
                          </div>
                          
                          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                            <span style={{ fontSize: "1.2rem" }}>👤</span>
                            <div>
                              <span style={{ color: "#6c757d", fontSize: "0.9rem" }}>Lender: </span>
                              <strong style={{ color: "#333" }}>{expense.lender}</strong>
                            </div>
                          </div>

                          <div style={{
                            display: "inline-block",
                            backgroundColor: "#dc3545",
                            color: "white",
                            padding: "0.5rem 1rem",
                            borderRadius: "8px",
                            fontSize: "1.3rem",
                            fontWeight: "bold",
                            marginTop: "0.5rem"
                          }}>
                            ${expense.amount?.toFixed(2)}
                          </div>
                        </div>

                        <div style={{
                          backgroundColor: "#fff",
                          border: "2px solid #dc3545",
                          borderRadius: "8px",
                          padding: "1rem",
                          textAlign: "center",
                          minWidth: "150px"
                        }}>
                          <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>⏳</div>
                          <div style={{ 
                            fontSize: "0.95rem", 
                            fontWeight: "600",
                            color: "#dc3545"
                          }}>
                            Waiting for {expense.lender} to mark as paid
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Paid Expenses */}
          {borrowedExpenses.some(exp => exp.isPaid) && (
            <div>
              <h3 style={{ 
                fontSize: "1.3rem", 
                color: "#28a745", 
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem"
              }}>
                ✓ Paid ({borrowedExpenses.filter(exp => exp.isPaid).length})
              </h3>
              <div style={{ display: "grid", gap: "1rem" }}>
                {borrowedExpenses
                  .filter(exp => exp.isPaid)
                  .map((expense, index) => (
                    <div 
                      key={expense.expenseId || index} 
                      style={{ 
                        border: '2px solid #28a745',
                        padding: '1.5rem',
                        borderRadius: '12px',
                        backgroundColor: '#d4edda',
                        boxShadow: '0 2px 8px rgba(40, 167, 69, 0.1)',
                        transition: 'all 0.3s ease',
                        opacity: 0.85
                      }}
                    >
                      <div style={{ 
                        display: "flex", 
                        justifyContent: "space-between", 
                        alignItems: "start",
                        flexWrap: "wrap",
                        gap: "1rem"
                      }}>
                        <div style={{ flex: 1, minWidth: "200px" }}>
                          <div style={{ 
                            fontSize: "1.4rem", 
                            fontWeight: "600", 
                            color: "#155724",
                            marginBottom: "0.5rem"
                          }}>
                            {expense.expenseName}
                          </div>
                          
                          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                            <span style={{ fontSize: "1.2rem" }}>👤</span>
                            <div>
                              <span style={{ color: "#155724", fontSize: "0.9rem" }}>Lender: </span>
                              <strong style={{ color: "#155724" }}>{expense.lender}</strong>
                            </div>
                          </div>

                          <div style={{
                            display: "inline-block",
                            backgroundColor: "#28a745",
                            color: "white",
                            padding: "0.5rem 1rem",
                            borderRadius: "8px",
                            fontSize: "1.3rem",
                            fontWeight: "bold",
                            marginTop: "0.5rem"
                          }}>
                            ${expense.amount?.toFixed(2)}
                          </div>

                          {expense.paidAt && (
                            <div style={{ 
                              marginTop: '1rem',
                              fontSize: '0.9rem',
                              color: '#155724',
                              display: "flex",
                              alignItems: "center",
                              gap: "0.5rem"
                            }}>
                              <span style={{ fontSize: "1.2rem" }}>✓</span>
                              <span>
                                Paid on {new Date(expense.paidAt).toLocaleDateString('en-US', { 
                                  year: 'numeric', 
                                  month: 'long', 
                                  day: 'numeric' 
                                })}
                              </span>
                            </div>
                          )}
                        </div>

                        <div style={{
                          backgroundColor: "#28a745",
                          color: "white",
                          borderRadius: "8px",
                          padding: "1rem",
                          textAlign: "center",
                          minWidth: "150px"
                        }}>
                          <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>✓</div>
                          <div style={{ 
                            fontSize: "0.95rem", 
                            fontWeight: "600"
                          }}>
                            PAID
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}