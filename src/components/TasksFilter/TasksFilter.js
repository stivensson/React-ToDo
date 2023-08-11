import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './TasksFilter.css'

const TasksFilter = ({ filteredTask, filter }) => {
  return (
    <ul className="filters">
      <li>
        <button
          type="button"
          onClick={() => filteredTask('all')}
          className={classNames({ selected: filter === 'all' })}
        >
          All
        </button>
      </li>
      <li>
        <button
          type="button"
          onClick={() => filteredTask('active')}
          className={classNames({ selected: filter === 'active' })}
        >
          Active
        </button>
      </li>
      <li>
        <button
          type="button"
          onClick={() => filteredTask('completed')}
          className={classNames({ selected: filter === 'completed' })}
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
