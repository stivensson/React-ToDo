import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'
import classNames from 'classnames'

import './Task.css'

const Task = ({ text, min, sec, deleteTask, completedTask, editingTask, completed, date, editing, addEditTask }) => {
  const [label, setLabel] = useState(text)
  const [minutes, setMinutes] = useState(min)
  const [seconds, setSeconds] = useState(sec)
  const [running, setRunning] = useState(false)

  const onAddEditText = (e) => {
    setLabel(e.target.value.trimStart())
  }

  const onAddEditTask = (e) => {
    e.preventDefault()
    addEditTask(label)
  }

  const onRunTimer = () => {
    setRunning((r) => !r)
  }

  useEffect(() => {
    if (!running) return
    const timer = setInterval(() => {
      setSeconds((s) => s - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [running])

  useEffect(() => {
    if (seconds === -1 && minutes >= 1) {
      setMinutes((m) => m - 1)
      setSeconds(59)
    }

    if (completed) setRunning(false)

    if (minutes === 0 && seconds === 0) setRunning(false)
  })

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
              disabled={((minutes === 0 && seconds === 0) || completed) && true}
              className={classNames({
                'icon icon-play': !running,
                hidden: running || (minutes === 0 && seconds === 0) || completed,
              })}
              onClick={onRunTimer}
            ></button>
            <button
              disabled={minutes === 0 && seconds === 0 && true}
              className={classNames({
                'icon icon-pause': running,
                hidden: !running || (minutes === 0 && seconds === 0),
              })}
              onClick={onRunTimer}
            ></button>
            {minutes < 10 ? '0' + minutes : minutes}:{seconds < 10 ? '0' + seconds : seconds}
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
        <form onSubmit={onAddEditTask}>
          <input className="edit" type="text" value={label} onChange={onAddEditText} required />
        </form>
      ) : null}
    </li>
  )
  // }
}

Task.defaultProps = {
  label: '',
}

Task.propTypes = {
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

export default Task
