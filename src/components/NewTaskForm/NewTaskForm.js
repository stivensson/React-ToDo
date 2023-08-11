import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './NewTaskForm.css'

export default class NewTaskForm extends Component {
  static defaultProps = {
    onInputText: () => {},
    onAddTask: () => {},
  }

  static propTypes = {
    onInputText: PropTypes.func.isRequired,
    onAddTask: PropTypes.func.isRequired,
    addTask: PropTypes.func.isRequired,
  }

  state = {
    label: '',
  }

  onInputText = (e) => {
    this.setState({
      label: e.target.value.trimStart(),
    })
  }

  onAddTask = (e) => {
    e.preventDefault()
    this.props.addTask(this.state.label)
    this.setState({
      label: '',
    })
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.onAddTask}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            type="text"
            onChange={this.onInputText}
            value={this.state.label}
            required
          />
        </form>
      </header>
    )
  }
}
