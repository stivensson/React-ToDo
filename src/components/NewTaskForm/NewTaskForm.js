import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'

import './NewTaskForm.css'

const NewTaskForm = ({ addTask }) => {
  const [label, setLabel] = useState('')
  const [min, setMin] = useState('')
  const [sec, setSec] = useState('')

  const onInputText = (e) => {
    setLabel(e.target.value.trimStart())
  }

  const onInputMin = (e) => {
    let minutes = Math.min(59, Math.max(0, e.target.value))
    if (minutes === -1) minutes = ''
    setMin(minutes)
  }

  const onInputSec = (e) => {
    let seconds = Math.min(59, Math.max(0, e.target.value))
    if (seconds === 0) seconds = ''
    setSec(seconds)
  }

  const inputRef = useRef()

  const onAddTask = (e) => {
    e.preventDefault()
    addTask(label, min, sec)
    setLabel('')
    setMin('')
    setSec('')
    inputRef.current.focus()
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form" onSubmit={onAddTask}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          type="text"
          onChange={onInputText}
          value={label}
          required
          ref={inputRef}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          type="number"
          onChange={onInputMin}
          value={min}
          required
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          type="number"
          onChange={onInputSec}
          value={sec}
          required
        />
        <button></button>
      </form>
    </header>
  )
}

NewTaskForm.defaultProps = {
  onInputText: () => {},
  onInputMin: () => {},
  onInputSec: () => {},
  onAddTask: () => {},
}

NewTaskForm.propTypes = {
  onInputText: PropTypes.func.isRequired,
  onInputMin: PropTypes.func.isRequired,
  onInputSec: PropTypes.func.isRequired,
  onAddTask: PropTypes.func.isRequired,
  addTask: PropTypes.func.isRequired,
}

export default NewTaskForm
