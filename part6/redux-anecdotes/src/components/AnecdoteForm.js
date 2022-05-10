import { useDispatch } from "react-redux"
import { addAnecdote } from "../reducers/anecdoteReducer"
import { setNotification, unsetNotification } from "../reducers/notificationReducer"
import anecdoteService from "../services/anecdotes"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleAddingAnecdote = async (event) => {
    event.preventDefault()
    const anecdoteContent = event.target.newAnecdote.value
    event.target.newAnecdote.value = ''
    const anecdote = await anecdoteService.createNew(anecdoteContent)
    dispatch(addAnecdote(anecdote))
    dispatch(setNotification(`added anecdote ${anecdote.content}`))
    setTimeout(() => dispatch(unsetNotification()), 5000)
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