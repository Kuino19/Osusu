import React from 'react';

export default function DashboardLoading() {
  return (
    <div style={{ padding: '2rem', minHeight: '100vh', background: '#090d16', color: 'white' }}>
      <div style={{ 
        height: '32px', 
        width: '300px', 
        background: 'rgba(255, 255, 255, 0.05)', 
        borderRadius: '8px', 
        marginBottom: '2rem',
        animation: 'pulse 1.5s infinite' 
      }} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        {[1, 2, 3, 4].map(i => (
          <div key={i} style={{ 
            height: '110px', 
            background: 'rgba(255, 255, 255, 0.03)', 
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            animation: 'pulse 1.5s infinite' 
          }} />
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem' }}>
        <div style={{ 
          height: '300px', 
          background: 'rgba(255, 255, 255, 0.03)', 
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '20px',
          animation: 'pulse 1.5s infinite' 
        }} />
        <div style={{ 
          height: '300px', 
          background: 'rgba(255, 255, 255, 0.03)', 
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '20px',
          animation: 'pulse 1.5s infinite' 
        }} />
      </div>

    </div>
  );
}
