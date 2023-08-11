import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'
import classNames from 'classnames'

import './Task.css'

export default class Task extends Component {
  static propDefault = {
    label: '',
  }

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
    let stateTask = this.state.label
    e.preventDefault()
    this.props.addEditTask(stateTask)
  }

  render() {
    const { text, deleteTask, completedTask, editingTask, completed, date, editing } = this.props

    return (
      <li
        className={classNames({
          '': !completed && !editing,
          completed: completed,
          editing: editing,
        })}
      >
        <div className="view">
          <input className="toggle" type="checkbox" checked={completed ? true : false} onChange={completedTask} />
          <label>
            <span className="description">{text}</span>
            <span className="created">
              {`created ${formatDistanceToNow(date, {
                includeSeconds: true,
                addSuffix: true,
              })}`}
            </span>
          </label>
          <button
            className={classNames({
              'icon icon-edit': !completed,
              hidden: completed,
            })}
            onClick={editingTask}
          ></button>
          <button className="icon icon-destroy" onClick={deleteTask}></button>
        </div>
        {editing ? (
          <form onSubmit={this.onAddEditTask}>
            <input className="edit" type="text" value={this.state.label} onChange={this.onAddEditText} required />
          </form>
        ) : null}
      </li>
    )
  }
}
