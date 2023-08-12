import React from 'react'
import PropTypes from 'prop-types'

import Task from '../Task'

import './TaskList.css'

const TaskList = ({ labels, deleteTask, completedTask, editingTask, addEditTask }) => {
  const ulEl = labels.map((item) => {
    const { id, label, completed, editing, date } = item

    return (
      <Task
        key={id}
        text={label}
        deleteTask={() => deleteTask(id)}
        completedTask={() => completedTask(id)}
        completed={completed}
        editingTask={() => editingTask(id)}
        editing={editing}
        addEditTask={(editText) => addEditTask(id, editText)}
        date={date}
      />
    )
  })

  return <ul className="todo-list">{ulEl}</ul>
}

TaskList.defaultProps = {
  labels: [],
}

TaskList.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.object),
  item: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
    completed: PropTypes.bool,
    editing: PropTypes.bool,
    date: PropTypes.instanceOf(Date),
  }),
  deleteTask: PropTypes.func.isRequired,
  completedTask: PropTypes.func.isRequired,
  editingTask: PropTypes.func.isRequired,
  addEditTask: PropTypes.func.isRequired,
}

export default TaskList
