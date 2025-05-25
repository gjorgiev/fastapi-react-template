import { useEffect, useState } from 'react'
import type { components } from './types/api'
type Note = components['schemas']['Note']


const API_URL = import.meta.env.VITE_API_URL


function App() {
  const [notes, setNotes] = useState<Note[]>([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const fetchNotes = () => {
    fetch(`${API_URL}/notes`)
      .then(res => res.json())
      .then(data => setNotes(data))
      .catch(err => console.error('Fetch error:', err))
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch(`${API_URL}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, content })
    })
    if (res.ok) {
      setTitle('')
      setContent('')
      fetchNotes()
    }
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>My Notes</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <div>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            style={{ width: '300px', padding: '0.5rem', marginBottom: '1rem' }}
          />
        </div>
        <div>
          <textarea
            placeholder="Content"
            value={content}
            onChange={e => setContent(e.target.value)}
            required
            rows={4}
            style={{ width: '300px', padding: '0.5rem' }}
          />
        </div>
        <button type="submit" style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>
          Add Note
        </button>
      </form>

      <ul>
        {notes.map(note => (
          <li key={note.id} style={{ marginBottom: '1rem' }}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App