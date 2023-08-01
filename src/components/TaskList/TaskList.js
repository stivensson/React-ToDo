
import React, {Component} from 'react'
import Task from '../Task'
import './TaskList.css'

export default class TaskList extends Component {
    render() {
        const {labels, deleteTask} = this.props
        
        const ulEl = labels.map(item => {
            const {id, label} = item
            return (
                <li className = '' key = {id}>
                    <Task
                        text = {label}
                        deleteTask = {() => deleteTask(id)}
                    />
                </li>
            )
        })

        return (
            <ul className="todo-list">
                {ulEl}
            </ul>
        )
    }
}