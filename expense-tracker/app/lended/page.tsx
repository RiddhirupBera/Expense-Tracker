import GetUser from "../actions/getUser";
import LendCard from "./LendCard";

export default async function LendedPage(){
    const userDetails = await GetUser();
    console.log("User Details in Lended Page:", userDetails);

    const lendedExpenses = userDetails?.lendedExpenses || [];

    console.log("Lended Expenses:", lendedExpenses);

    return(
        <div>
            <h1 style={{ padding: '2rem' }}>Lended Expenses Page</h1>
            {userDetails ? (
                <LendCard 
                    lendedExpenses={lendedExpenses} 
                    currentUsername={userDetails.username}
                />
            ) : (
                <p style={{ padding: '2rem' }}>Please log in to view lended expenses</p>
            )}
        </div>
    )
}