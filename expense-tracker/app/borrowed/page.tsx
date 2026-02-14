import GetUser from "../actions/getUser";
import BorrowCard from "./BorrowCard";

export default async function BorrowedPage(){
    const userDetails = await GetUser();
    console.log("User Details in Borrowed Page:", userDetails);

    const borrowedExpenses = userDetails?.borrowedExpenses || [];

    console.log("Borrowed Expenses:", borrowedExpenses);

    return(
        <div>
            <h1 style={{ 
                padding: '2rem',
                fontSize: '2.5rem',
                color: '#2c3e50',
                marginBottom: 0
            }}>
                💳 Borrowed Expenses
            </h1>
            {userDetails ? (
                <BorrowCard 
                    borrowedExpenses={borrowedExpenses} 
                    currentUsername={userDetails.username}
                />
            ) : (
                <div style={{ 
                    padding: '2rem',
                    textAlign: 'center',
                    backgroundColor: '#f8f9fa',
                    margin: '2rem',
                    borderRadius: '12px',
                    border: '2px dashed #dee2e6'
                }}>
                    <p style={{ fontSize: '1.2rem', color: '#6c757d' }}>
                        Please log in to view borrowed expenses
                    </p>
                </div>
            )}
        </div>
    )
}