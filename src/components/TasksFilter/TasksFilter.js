import React from 'react'
import PropTypes from 'prop-types'

import './TasksFilter.css'

const TasksFilter = ({ filteredTask, filter }) => {
  return (
    <ul className="filters">
      <li>
        <button type="button" onClick={() => filteredTask('all')} className={filter === 'all' ? 'selected' : ''}>
          All
        </button>
      </li>
      <li>
        <button type="button" onClick={() => filteredTask('active')} className={filter === 'active' ? 'selected' : ''}>
          Active
        </button>
      </li>
      <li>
        <button
          type="button"
          onClick={() => filteredTask('completed')}
          className={filter === 'completed' ? 'selected' : ''}
        >
          Completed
        </button>
      </li>
    </ul>
  )
}

TasksFilter.defaultProps = {
  filter: 'all',
}

TasksFilter.propTypes = {
  filter: PropTypes.string,
  filteredTask: PropTypes.func.isRequired,
}

export default TasksFilter
