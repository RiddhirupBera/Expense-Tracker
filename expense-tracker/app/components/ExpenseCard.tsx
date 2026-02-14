"use client"

export default function ExpenseCard({
  name,
  amount,
  category,
  rank
}: {
  name: string;
  amount: number;
  category: string;
  rank: number;
}) {
  const getMedalEmoji = (rank: number) => {
    switch(rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return '🏅';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Food': '#e74c3c',
      'Travel': '#3498db',
      'Medicine': '#2ecc71',
      'Leisure': '#9b59b6',
      'Investments': '#f39c12'
    };
    return colors[category] || '#95a5a6';
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      border: '2px solid #e9ecef',
      transition: 'all 0.2s ease'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = getCategoryColor(category);
      e.currentTarget.style.transform = 'scale(1.02)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = '#e9ecef';
      e.currentTarget.style.transform = 'scale(1)';
    }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ fontSize: '1.5rem' }}>{getMedalEmoji(rank)}</span>
        <div>
          <div style={{ fontWeight: 'bold', color: '#2c3e50' }}>{name}</div>
          <div style={{
            fontSize: '0.8rem',
            color: 'white',
            backgroundColor: getCategoryColor(category),
            padding: '0.2rem 0.6rem',
            borderRadius: '12px',
            display: 'inline-block',
            marginTop: '0.25rem'
          }}>
            {category}
          </div>
        </div>
      </div>
      <div style={{
        fontSize: '1.2rem',
        fontWeight: 'bold',
        color: getCategoryColor(category)
      }}>
        ${amount.toFixed(2)}
      </div>
    </div>
  );
}