import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export const Todo = ({task, editToDo, deleteToDo, toggleComplete}) => {
  return (
    <div className="Todo">
        <p className={`${task.completed ? "completed" : "incompleted"}`} onClick={() => toggleComplete(task.id)}> {task.task}</p>
        <div>
            <FontAwesomeIcon className="edit-icon" onClick={() => editToDo(task.id)} icon={faPenToSquare} />
            <FontAwesomeIcon className="delete-icon" onClick={() => deleteToDo(task.id)} icon={faTrash} />

        </div>
    </div>
  )
}