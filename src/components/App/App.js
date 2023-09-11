import React, { useState } from 'react'

import NewTaskForm from '../NewTaskForm'
import TaskList from '../TaskList'
import Footer from '../Footer'

import './App.css'

const App = () => {
  const [taskData, setTaskData] = useState([])
  const [filter, setFilter] = useState('all')
  const [idNumber, setIdNumber] = useState(1)

  const indexFn = (id, taskData) => {
    const index = taskData.findIndex((item) => item.id === id)

    return index
  }

  const addTask = (text, min, sec) => {
    const newTask = {
      label: text,
      min: min,
      sec: sec,
      completed: false,
      editing: false,
      date: new Date(),
      id: idNumber,
    }

    setTaskData((taskData) => {
      const newTaskData = [...taskData, newTask]

      return newTaskData
    })

    setIdNumber((i) => i + 1)
  }

  const filteringTask = () => {
    if (filter === 'active') {
      return taskData.filter((item) => !item.completed)
    }
    if (filter === 'completed') {
      return taskData.filter((item) => item.completed)
    }

    return taskData
  }

  const filteredTask = (status) => {
    setFilter(status)
  }

  const addEditTask = (id, editText) => {
    setTaskData((taskData) => {
      const oldEl = taskData[indexFn(id, taskData)]
      const newEl = { ...oldEl, editing: !oldEl.editing, label: editText }
      const newTaskData = taskData.toSpliced(indexFn(id, taskData), 1, newEl)

      return newTaskData
    })
  }

  const deleteTask = (id) => {
    setTaskData((taskData) => {
      const newTaskData = taskData.toSpliced(indexFn(id, taskData), 1)

      return newTaskData
    })
  }

  const toggleProperty = (data, id, property) => {
    const oldEl = data[indexFn(id, data)]

    const newEl = { ...oldEl, [property]: !oldEl[property] }

    return data.toSpliced(indexFn(id, data), 1, newEl)
  }

  const completedTask = (id) => {
    setTaskData((taskData) => toggleProperty(taskData, id, 'completed'))
  }

  const editingTask = (id) => {
    setTaskData((taskData) => toggleProperty(taskData, id, 'editing'))
  }

  const clearCompleted = () => {
    setTaskData((taskData) => taskData.filter((item) => !item.completed))
  }

  const taskCount = () => {
    const count = taskData.filter((item) => !item.completed)
    return count.length
  }

  return (
    <section className="todoapp">
      <NewTaskForm addTask={addTask} />
      <section className="main">
        <TaskList
          labels={filteringTask()}
          deleteTask={deleteTask}
          completedTask={completedTask}
          editingTask={editingTask}
          addEditTask={addEditTask}
        />
        <Footer taskCount={taskCount()} filteredTask={filteredTask} filter={filter} clearCompleted={clearCompleted} />
      </section>
    </section>
  )
}

export default App
