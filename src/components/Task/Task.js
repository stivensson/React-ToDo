
import React, {Component} from 'react'
import './Task.css'

export default class Task extends Component {
    state = {
        label: this.props.text
    }

    onAddEditText = (e) => {
        this.setState({
            label: e.target.value.trimStart()
        })
    }

    onAddEditTask = (e) => {
        e.preventDefault()
        this.props.addEditTask(this.props.id, this.state.label)
    }

    render() {
        const {id,
               text,
               deleteTask,
               completedTask,
               editingTask,
               completed,
               editing} = this.props

        return (
            <li className = {completed ? 'completed' : editing ? 'editing' : ''}>
                <div className = "view">
                    <input className = "toggle"
                           type = "checkbox"
                           checked = {completed ? true : false}
                           onChange = {() => {completedTask(id)}}
                    />
                    <label>
                        <span className = "description">{text}</span>
                        <span className = "created"></span>
                    </label>
                    <button className = {completed ? 'hidden' : "icon icon-edit"}
                            onClick = {() => editingTask(id)}>
                    </button>
                    <button className = "icon icon-destroy"
                            onClick = {() => deleteTask(id)}>
                    </button>
                </div>
                {editing ? (
                    <form onSubmit = {this.onAddEditTask}>
                        <input className = "edit"
                            type = "text"
                            value = {this.state.label}
                            onChange = {this.onAddEditText}
                        />
                    </form>
                ) : null}
            </li>
        )
    }
}