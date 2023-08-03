
import React, {Component} from 'react'
import Task from '../Task'
import './TaskList.css'

export default class TaskList extends Component {
    render() {
        const {labels, deleteTask, completedTask} = this.props

        const ulEl = labels.map(item => {
            const {id, label, completed} = item
            return (
                <Task
                    key = {id}
                    text = {label}
                    deleteTask = {deleteTask}
                    completedTask = {completedTask}
                    completed = {completed}
                    id = {id}
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