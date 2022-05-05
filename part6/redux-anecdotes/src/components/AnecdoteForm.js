import { useDispatch } from "react-redux"
import { addAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleAddingAnecdote = (event) => {
    event.preventDefault()
    const anecdote = event.target.newAnecdote.value
    event.target.newAnecdote.value = ''
    dispatch(addAnecdote(anecdote))
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={handleAddingAnecdote}>
        <div><input name='newAnecdote' /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm