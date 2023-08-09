import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

import './Task.css'

export default class Task extends Component {
  static propTypes = {
    id: PropTypes.number,
    text: PropTypes.string,
    completed: PropTypes.bool,
    editing: PropTypes.bool,
    date: PropTypes.instanceOf(Date),
    deleteTask: PropTypes.func.isRequired,
    completedTask: PropTypes.func.isRequired,
    editingTask: PropTypes.func.isRequired,
    addEditTask: PropTypes.func.isRequired,
  }

  state = {
    label: this.props.text,
  }

  onAddEditText = (e) => {
    this.setState({
      label: e.target.value.trimStart(),
    })
  }

  onAddEditTask = (e) => {
    e.preventDefault()
    this.props.addEditTask(this.props.id, this.state.label)
  }

  render() {
    const { id, text, deleteTask, completedTask, editingTask, completed, date, editing } = this.props

    return (
      <li className={completed ? 'completed' : editing ? 'editing' : ''}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={completed ? true : false}
            onChange={() => {
              completedTask(id)
            }}
          />
          <label>
            <span className="description">{text}</span>
            <span className="created">
              {`created ${formatDistanceToNow(date, {
                includeSeconds: true,
                addSuffix: true,
              })}`}
            </span>
          </label>
          <button className={completed ? 'hidden' : 'icon icon-edit'} onClick={() => editingTask(id)}></button>
          <button className="icon icon-destroy" onClick={() => deleteTask(id)}></button>
        </div>
        {editing ? (
          <form onSubmit={this.onAddEditTask}>
            <input className="edit" type="text" value={this.state.label} onChange={this.onAddEditText} />
          </form>
        ) : null}
      </li>
    )
  }
}
