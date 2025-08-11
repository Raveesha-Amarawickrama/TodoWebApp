import React from 'react'

export default function TaskList({ tasks = [], onDone }) {
  if (!tasks.length) return <div className="no-tasks">No tasks found.</div>

  // Show only the most recent 5
  const latestTasks = tasks.slice(0, 5)

  return (
    <div className="task-list">
      {latestTasks.map(t => (
        <div key={t.id} className="task-card">
          <div className="task-info">
            <div className="task-title">{t.title}</div>
            <div className="task-desc">{t.description}</div>
          </div>
          <div>
            <button className="done-btn" onClick={() => onDone(t.id)}>Done</button>
          </div>
        </div>
      ))}
    </div>
  )
}
