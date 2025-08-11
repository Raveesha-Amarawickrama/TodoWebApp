import React from 'react'

export default function WelcomeModal({ onClose }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, display: 'flex',
      alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.35)', zIndex: 50
    }}>
      <div style={{ width: 720, background: '#fff', padding: 28, borderRadius: 10, position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', right: 12, top: 12, background: 'transparent', border: 'none', fontSize: 18 }}>✕</button>
        <h1 style={{ color: '#041440', marginTop: 6 }}>Welcome to To Do!</h1>
        <div style={{ display: 'flex', gap: 18, marginTop: 18 }}>
          <div style={{ flex: 1 }}>
            <h4 style={{ color: '#041440' }}>One place for all your tasks</h4>
            <p>Plan your day effectively through smart integrations and simple lists.</p>
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ color: '#041440' }}>Access anywhere</h4>
            <p>Access your tasks anywhere, on-the-go, on all your devices.</p>
          </div>
          
        </div>
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <button onClick={onClose} className="primary-btn">Lets go!</button>
        </div>
      </div>
    </div>
  )
}
