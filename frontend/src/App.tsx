import { useEffect, useState } from 'react'

function App() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    console.log('Fetching message from backend...')
    fetch('http://localhost:8000/ping')
      .then(res => res.json())
      .then(data => setMessage(data.message))
  }, [])

  return <h1>Backend says: {message}</h1>
}

export default App