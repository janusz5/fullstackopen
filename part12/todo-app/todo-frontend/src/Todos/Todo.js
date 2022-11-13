import React from 'react'

const Todo = ({todo, deleteTodo, completeTodo}) => {
    const onClickDelete = (todo) => () => {
        deleteTodo(todo)
      }
    
      const onClickComplete = (todo) => () => {
        completeTodo(todo)
      }

      return (
        <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '70%', margin: 'auto' }}>
          <span>
            {todo.text} 
          </span>
          <span>
            This todo is {todo.done ? "" : "not"} done
          </span>
          <span>
            <button onClick={onClickDelete(todo)}> Delete </button>
            {todo.done ? "" : (<button onClick={onClickComplete(todo)}> Set as done </button>)}
          </span>
        </div>
      )
}

export default Todo