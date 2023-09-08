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
    minutes: this.props.min,
    seconds: this.props.sec,
    running: false,
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

  timer = null

  onRunTimer = () => {
    if (!this.state.running) {
      this.setState({
        running: true,
      })
      this.timer = setInterval(() => {
        if (this.state.seconds === 1 && this.state.minutes === 0) clearInterval(this.timer)
        if (this.state.seconds === 0 && this.state.minutes >= 1) {
          this.setState({
            minutes: this.state.minutes - 1,
            seconds: 59,
          })
        } else {
          this.setState({
            seconds: this.state.seconds - 1,
          })
        }
      }, 1000)
    } else {
      clearInterval(this.timer)
      this.setState({
        running: false,
      })
    }
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
            <span
              className={classNames({
                'description-timer': !completed,
                'description-timer__completed': completed,
              })}
            >
              <button
                disabled={((this.state.minutes === 0 && this.state.seconds === 0) || completed) && true}
                className={classNames({
                  'icon icon-play': !this.state.running,
                  hidden: this.state.running || (this.state.minutes === 0 && this.state.seconds === 0) || completed,
                })}
                onClick={this.onRunTimer}
              ></button>
              <button
                disabled={this.state.minutes === 0 && this.state.seconds === 0 && true}
                className={classNames({
                  'icon icon-pause': this.state.running,
                  hidden: !this.state.running || (this.state.minutes === 0 && this.state.seconds === 0),
                })}
                onClick={this.onRunTimer}
              ></button>
              {this.state.minutes < 10 ? '0' + this.state.minutes : this.state.minutes}:
              {this.state.seconds < 10 ? '0' + this.state.seconds : this.state.seconds}
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
