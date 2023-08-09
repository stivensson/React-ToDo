import React from 'react'
import PropTypes from 'prop-types'

import TasksFilter from '../TasksFilter'

import './Footer.css'

const Footer = ({ taskCount, filteredTask, filter, clearCompleted }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{taskCount} items left</span>
      <TasksFilter filteredTask={filteredTask} filter={filter} />
      <button className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.defaultProps = {
  taskCount: 0,
  filter: 'all',
}

Footer.propTypes = {
  taskCount: PropTypes.number,
  filter: PropTypes.string,
  filteredTask: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired,
}

export default Footer
