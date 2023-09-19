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
      running: false,
      timer: null,
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
    const { timer } = taskData.find((item) => item.id === id)
    clearInterval(timer)

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

  const taskCount = taskData.filter((item) => !item.completed).length

  const stopTimer = (id) => {
    const { timer } = taskData.find((item) => item.id === id)

    setTaskData((taskData) => toggleProperty(taskData, id, 'running'))

    clearInterval(timer)
  }

  const runTimer = (id) => {
    let timer = null
    const { running } = taskData.find((item) => item.id === id)
    if (!running) {
      timer = setInterval(() => {
        console.log('tick')
        setTaskData((taskData) => {
          const newTaskData = taskData.map((item) => {
            if (item.id === id) {
              if (item.sec === 1 && item.min === 0) clearInterval(timer)
              if (item.completed) {
                item.running = false
                clearInterval(timer)
              }
              if (item.sec === 0 && item.min >= 1) {
                item.min -= 1
                item.sec = 59
              } else {
                item.sec -= 1
              }
            }
            return item
          })
          return newTaskData
        })
      }, 1000)
      setTaskData((taskData) => {
        const indexTask = indexFn(id, taskData)
        const newTaskData = [...taskData]
        newTaskData[indexTask].timer = timer
        newTaskData[indexTask].running = true
        return newTaskData
      })
    }
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
          runTimer={runTimer}
          stopTimer={stopTimer}
        />
        <Footer taskCount={taskCount} filteredTask={filteredTask} filter={filter} clearCompleted={clearCompleted} />
      </section>
    </section>
  )
}

export default App
