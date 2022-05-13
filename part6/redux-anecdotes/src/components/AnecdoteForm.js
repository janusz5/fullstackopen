import { connect } from "react-redux"
import { addAnecdote } from "../reducers/anecdoteReducer"
import { setNotification, unsetNotification } from "../reducers/notificationReducer"
import anecdoteService from "../services/anecdotes"

const AnecdoteForm = (props) => {
  const handleAddingAnecdote = async (event) => {
    event.preventDefault()
    const anecdoteContent = event.target.newAnecdote.value
    event.target.newAnecdote.value = ''
    const anecdote = await anecdoteService.createNew(anecdoteContent)
    props.addAnecdote(anecdote)
    const timeoutID = setTimeout(() => props.unsetNotification(), 5000)
    props.setNotification({message: `added anecdote ${anecdote.content}`, timeoutID}) 
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


export default connect(null, {addAnecdote, setNotification, unsetNotification})(AnecdoteForm)