import Link from "next/link";

interface NavProps{
    username : string;
}

export default function NavLinks({username}:NavProps){
    return(
        <div style={styles.links}>
        <Link href="/dashboard">Dashboard</Link>
        <span>Hi, {username}</span>
        <Link href="/login">Logout</Link>
      </div>
    )
}

const styles = {
  
  links: {
    display: "flex",
    gap: "1rem",
  },
};