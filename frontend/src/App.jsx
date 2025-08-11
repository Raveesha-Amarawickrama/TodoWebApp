import React, { useState } from 'react'
import TaskPage from './pages/TaskPage'
import WelcomeModal from './components/WelcomeModal'

export default function App() {
  const [showWelcome, setShowWelcome] = useState(() => !localStorage.getItem('welcome_shown'))

  return (
    <div className="container">
      {showWelcome && (
        <WelcomeModal
          onClose={() => {
            localStorage.setItem('welcome_shown', '1')
            setShowWelcome(false)
          }}
        />
      )}
      <TaskPage />
    </div>
  )
}
