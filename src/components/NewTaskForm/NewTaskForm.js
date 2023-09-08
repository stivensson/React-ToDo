import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './NewTaskForm.css'

export default class NewTaskForm extends Component {
  static defaultProps = {
    onInputText: () => {},
    onInputMin: () => {},
    onInputSec: () => {},
    onAddTask: () => {},
  }

  static propTypes = {
    onInputText: PropTypes.func.isRequired,
    onInputMin: PropTypes.func.isRequired,
    onInputSec: PropTypes.func.isRequired,
    onAddTask: PropTypes.func.isRequired,
    addTask: PropTypes.func.isRequired,
  }

  state = {
    label: '',
    min: '',
    sec: '',
  }

  onInputText = (e) => {
    this.setState({
      label: e.target.value.trimStart(),
    })
  }

  onInputMin = (e) => {
    let minutes = Math.min(59, Math.max(0, e.target.value))
    if (minutes === -1) minutes = ''
    this.setState({
      min: minutes,
    })
  }

  onInputSec = (e) => {
    let seconds = Math.min(59, Math.max(0, e.target.value))
    if (seconds === 0) seconds = ''
    this.setState({
      sec: seconds,
    })
  }

  onAddTask = (e) => {
    e.preventDefault()
    this.props.addTask(this.state.label, this.state.min, this.state.sec)
    this.setState({
      label: '',
      min: '',
      sec: '',
    })
    this.inputRef.focus()
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form" onSubmit={this.onAddTask}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            type="text"
            onChange={this.onInputText}
            value={this.state.label}
            required
            ref={(inputRef) => (this.inputRef = inputRef)}
          />
          <input
            className="new-todo-form__timer"
            placeholder="Min"
            type="number"
            onChange={this.onInputMin}
            value={this.state.min}
            required
          />
          <input
            className="new-todo-form__timer"
            placeholder="Sec"
            type="number"
            onChange={this.onInputSec}
            value={this.state.sec}
            required
          />
          <button></button>
        </form>
      </header>
    )
  }
}
