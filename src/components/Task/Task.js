import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'
import classNames from 'classnames'

import './Task.css'

export default class Task extends Component {
  static defaultProps = {
    label: '',
  }

  static propTypes = {
    text: PropTypes.string,
    min: PropTypes.number,
    sec: PropTypes.number,
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
    this.props.addEditTask(this.state.label)
  }

  render() {
    const {
      text,
      deleteTask,
      completedTask,
      editingTask,
      completed,
      date,
      editing,
      runTimer,
      stopTimer,
      running,
      min,
      sec,
    } = this.props

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
            <span
              className={classNames({
                'description-timer': !completed,
                'description-timer__completed': completed,
              })}
            >
              <button
                disabled={((min === 0 && sec === 0) || completed) && true}
                className={classNames({
                  'icon icon-play': !running,
                  hidden: running || (min === 0 && sec === 0) || completed,
                })}
                onClick={runTimer}
              ></button>
              <button
                disabled={min === 0 && sec === 0 && true}
                className={classNames({
                  'icon icon-pause': running,
                  hidden: !running || (min === 0 && sec === 0),
                })}
                onClick={stopTimer}
              ></button>
              {min < 10 ? '0' + min : min}:{sec < 10 ? '0' + sec : sec}
            </span>
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
