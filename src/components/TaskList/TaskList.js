
import React, {Component} from 'react'
import Task from '../Task'
import './TaskList.css'

export default class TaskList extends Component {
    render() {
        const {labels, deleteTask, completedTask, editingTask, addEditTask} = this.props

        const ulEl = labels.map(item => {
            const {id, label, completed, editing} = item
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
                />
            )
        })

        return (
            <ul className="todo-list">
                {ulEl}
            </ul>
        )
    }
}