import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        if (!res.ok) throw new Error('Veri alınamadı')
        return res.json()
      })
      .then((data) => {
        setUsers(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="container"><h2>Yükleniyor...</h2></div>
  if (error) return <div className="container"><h2>Hata: {error}</h2></div>

  return (
    <div className="container">
      <header>
        <h1>👥 Kullanıcı Listesi</h1>
        <p>JSONPlaceholder API'den çekilen kullanıcı bilgileri</p>
      </header>

      <div className="user-grid">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <div className="user-avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <h3>{user.name}</h3>
            <p className="username">@{user.username}</p>
            <div className="user-details">
              <p><strong>📧 E-posta:</strong> {user.email}</p>
              <p><strong>📞 Telefon:</strong> {user.phone}</p>
              <p><strong>🏢 Şirket:</strong> {user.company.name}</p>
              <p><strong>🌍 Web:</strong> {user.website}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App