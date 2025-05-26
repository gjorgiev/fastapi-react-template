import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native'
import type { components } from './src/types/api'
type Note = components['schemas']['Note']


const API_URL = 'http://192.168.178.37:8000'

export default function App() {
  const [notes, setNotes] = useState<Note[]>([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const fetchNotes = async () => {
    const res = await fetch(`${API_URL}/notes`)
    const data = await res.json()
    setNotes(data)
  }

  const createNote = async () => {
    const res = await fetch(`${API_URL}/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content })
    })
    if (res.ok) {
      setTitle('')
      setContent('')
      fetchNotes()
    }
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Notes (Mobile)</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Content"
        value={content}
        onChangeText={setContent}
      />
      <Button title="Add Note" onPress={createNote} />
      <FlatList
        data={notes}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.note}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.content}</Text>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 40,
    backgroundColor: '#ffffff',
    flex: 1
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    color: '#000000'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#ffffff',
    color: '#000000'
  },
  note: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#f0f0f0'
  },
  title: {
    fontWeight: 'bold',
    color: '#000000'
  }
})
