
import React, {Component} from 'react'
import './Task.css'

export default class Task extends Component {
    render() {
        const {id, text, deleteTask, completedTask, completed} = this.props

        return (
            <li className = {completed ? 'editing' : ''}>
                <div className = "view">
                    <input className = "toggle"
                           type = "checkbox"
                           onChange = {() => {completedTask(id)}}
                    />
                    <label>
                        <span className = "description">{text}</span>
                        <span className = "created"></span>
                    </label>
                    <button className = {completed ? 'hidden' : "icon icon-edit"}></button>
                    <button className = "icon icon-destroy"
                            onClick = {() => deleteTask(id)}>
                    </button>
                </div>
                <input className = "edit" type = "text" defaultValue = {text} />
            </li>
        )
    }
}