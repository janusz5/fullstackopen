import { useDispatch } from "react-redux"
import { addAnecdote } from "../reducers/anecdoteReducer"

const AncdoteForm = () => {
  const dispatch = useDispatch()

  const handleAddingAnecdote = (event) => {
    event.preventDefault()
    const anecdote = event.target.newAnecdote.value
    event.target.newAnecdote.value = ''
    dispatch(addAnecdote(anecdote))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleAddingAnecdote}>
        <div><input name='newAnecdote' /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AncdoteForm