import React, { useEffect, useState } from 'react'
import API from '../api'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
  const [profile, setProfile] = useState(null)
  const nav = useNavigate()

  useEffect(() => {
    API.get('/auth/me')
      .then(r => setProfile(r.data))
      .catch(() => {
        localStorage.removeItem('token')
        nav('/login')
      })
  }, [])

  const logout = () => {
    localStorage.removeItem('token')
    nav('/login')
  }

  if (!profile) return <div>Loading...</div>

  return (
    <div style={{ padding: 40 }}>
      <h2>Profile</h2>
      <p><strong>Name:</strong> {profile.name || profile.username || 'N/A'}</p>
      <p><strong>Email:</strong> {profile.email || 'N/A'}</p>
      {/* Add other profile fields you want to show */}
      <button onClick={logout}>Logout</button>
    </div>
  )
}
