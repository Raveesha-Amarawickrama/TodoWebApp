import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api'
import AddTask from '../components/AddTask'
import TaskList from '../components/TaskList'
import '../components/TaskStyles.css'

export default function TaskPage() {
  const [tasks, setTasks] = useState([])
  const navigate = useNavigate()

  const loadTasks = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await API.get('/tasks', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setTasks(response.data)
    } catch (error) {
      console.error('Failed to load tasks:', error)
    }
  }

  const addTask = async (task) => {
    try {
      const token = localStorage.getItem('token')
      const response = await API.post('/tasks', task, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setTasks(prev => [response.data, ...prev])
    } catch (error) {
      console.error('Failed to add task:', error)
    }
  }

  const onDone = async (id) => {
    try {
      const token = localStorage.getItem('token')
      await API.delete(`/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setTasks(prev => prev.filter(t => t.id !== id))
    } catch (error) {
      console.error('Failed to remove task:', error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  useEffect(() => {
    loadTasks()
  }, [])

  return (
    <div className="task-page">
      <header className="top-header">
        <h2>My Tasks</h2>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <div className="page-container">
        <div className="add-task-form">
          <AddTask onAdd={addTask} />
        </div>
        <TaskList tasks={tasks} onDone={onDone} />
      </div>
    </div>
  )
}
