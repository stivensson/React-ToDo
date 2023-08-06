
import React from 'react'
import Task from '../Task'

import './TaskList.css'

const TaskList = ( {labels, deleteTask, completedTask, editingTask, addEditTask} ) => {
    const ulEl = labels.map(item => {
        const {id, label, completed, editing, date} = item
        return (
            <Task
                key = {id}
                id = {id}
                text = {label}
                deleteTask = {deleteTask}
                completedTask = {completedTask}
                completed = {completed}
                editingTask = {editingTask}
                editing = {editing}
                addEditTask = {addEditTask}
                date = {date}
            />
        )
    })

    return (
        <ul className="todo-list">
            {ulEl}
        </ul>
    )
}

export default TaskList