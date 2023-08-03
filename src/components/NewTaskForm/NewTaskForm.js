
import React, {Component} from 'react'
import './NewTaskForm.css'

export default class NewTaskForm extends Component {
    state = {
        label: ''
    }

    onInputText = (e) => {
        this.setState({
            label: e.target.value.trimStart()
        })
    }

    onAddTask = (e) => {
        e.preventDefault()
        if (this.state.label) this.props.addTask(this.state.label)
        this.setState({
            label: ''
        })
    }

    render() {
        return (
            <header className='header'>
                <h1>todos</h1>
                <form onSubmit={this.onAddTask}>
                    <input className = "new-todo" 
                        placeholder = "What needs to be done?" 
                        autoFocus
                        type = 'text'
                        onChange = {this.onInputText}
                        value = {this.state.label}
                    />
                </form>
            </header>
        )
    }
}