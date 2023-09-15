import React, { Component } from 'react'

import NewTaskForm from '../NewTaskForm'
import TaskList from '../TaskList'
import Footer from '../Footer'

import './App.css'

export default class App extends Component {
  state = {
    taskData: [],
    filter: 'all',
  }

  idNumber = 1

  indexFn = (id, taskData) => {
    const index = taskData.findIndex((item) => item.id === id)

    return index
  }

  addTask = (text, min, sec) => {
    const newTask = {
      label: text,
      min: min,
      sec: sec,
      completed: false,
      editing: false,
      date: new Date(),
      id: this.idNumber++,
      running: false,
      timer: null,
    }

    this.setState(({ taskData }) => {
      const newTaskData = [...taskData, newTask]

      return {
        taskData: newTaskData,
      }
    })
  }

  filteringTask = () => {
    const { taskData, filter } = this.state

    if (filter === 'active') {
      return taskData.filter((item) => !item.completed)
    }
    if (filter === 'completed') {
      return taskData.filter((item) => item.completed)
    }

    return taskData
  }

  filteredTask = (status) => {
    this.setState({ filter: status })
  }

  addEditTask = (id, editText) => {
    this.setState(({ taskData }) => {
      const oldEl = taskData[this.indexFn(id, taskData)]

      const newEl = { ...oldEl, editing: !oldEl.editing, label: editText }

      const newTaskData = taskData.toSpliced(this.indexFn(id, taskData), 1, newEl)

      return {
        taskData: newTaskData,
      }
    })
  }

  deleteTask = (id) => {
    const { timer } = this.state.taskData.find((item) => item.id === id)
    clearInterval(timer)

    this.setState(({ taskData }) => {
      const newTaskData = taskData.toSpliced(this.indexFn(id, taskData), 1)

      return {
        taskData: newTaskData,
      }
    })
  }

  toggleProperty = (data, id, property) => {
    const oldEl = data[this.indexFn(id, data)]

    const newEl = { ...oldEl, [property]: !oldEl[property] }

    return data.toSpliced(this.indexFn(id, data), 1, newEl)
  }

  completedTask = (id) => {
    this.setState(({ taskData }) => {
      return {
        taskData: this.toggleProperty(taskData, id, 'completed'),
      }
    })
  }

  editingTask = (id) => {
    this.setState(({ taskData }) => {
      return {
        taskData: this.toggleProperty(taskData, id, 'editing'),
      }
    })
  }

  clearCompleted = () => {
    this.setState(({ taskData }) => {
      return {
        taskData: taskData.filter((item) => !item.completed),
      }
    })
  }

  taskCount = () => {
    const count = this.state.taskData.filter((item) => !item.completed)
    return count.length
  }

  stopTimer = (id) => {
    const { timer } = this.state.taskData.find((item) => item.id === id)

    this.setState(({ taskData }) => {
      return {
        taskData: this.toggleProperty(taskData, id, 'running'),
      }
    })

    clearInterval(timer)
  }

  runTimer = (id) => {
    let timer = null
    const { running } = this.state.taskData.find((item) => item.id === id)
    if (!running) {
      timer = setInterval(() => {
        this.setState(({ taskData }) => {
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
          return {
            taskData: newTaskData,
          }
        })
      }, 1000)
      this.setState(({ taskData }) => {
        const indexTask = this.indexFn(id, taskData)
        const newTaskData = [...taskData]
        newTaskData[indexTask].timer = timer
        newTaskData[indexTask].running = true
        return {
          taskData: newTaskData,
        }
      })
    }
  }

  render() {
    return (
      <section className="todoapp">
        <NewTaskForm addTask={this.addTask} />
        <section className="main">
          <TaskList
            labels={this.filteringTask()}
            deleteTask={this.deleteTask}
            completedTask={this.completedTask}
            editingTask={this.editingTask}
            addEditTask={this.addEditTask}
            runTimer={this.runTimer}
            stopTimer={this.stopTimer}
          />
          <Footer
            taskCount={this.taskCount()}
            filteredTask={this.filteredTask}
            filter={this.state.filter}
            clearCompleted={this.clearCompleted}
          />
        </section>
      </section>
    )
  }
}
