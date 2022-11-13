import { createSlice } from "@reduxjs/toolkit"

const sortAnecdotes = (anecdotes) => anecdotes.sort((a, b) => a.votes < b.votes)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload
      return sortAnecdotes(state.map(anecdote => id !== anecdote.id ? anecdote : { ...anecdote, votes: anecdote.votes + 1 }))
    },
    addAnecdote(state, action) {
      const anecdote = action.payload
      state.push(anecdote)
    },
    setAnecdotes(state, action) {
      const anecdotes = action.payload
      return sortAnecdotes(anecdotes)
    }
  }
})

export const { voteAnecdote, addAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer