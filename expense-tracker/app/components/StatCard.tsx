"use client"

export default function StatCard({ 
  title, 
  amount, 
  icon, 
  color 
}: { 
  title: string; 
  amount: number; 
  icon: string; 
  color: string;
}) {
  return (
    <div style={{
      backgroundColor: 'white',
      padding: '1.5rem',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      borderLeft: `4px solid ${color}`,
      transition: 'transform 0.2s ease',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <div style={{
            fontSize: '0.9rem',
            color: '#7f8c8d',
            marginBottom: '0.5rem'
          }}>
            {title}
          </div>
          <div style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#2c3e50'
          }}>
            ${amount.toFixed(2)}
          </div>
        </div>
        <div style={{
          fontSize: '3rem',
          opacity: 0.3
        }}>
          {icon}
        </div>
      </div>
    </div>
  );
}