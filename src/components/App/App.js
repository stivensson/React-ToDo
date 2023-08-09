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

  addTask = (text) => {
    const newTask = {
      label: text,
      completed: false,
      editing: false,
      date: new Date(),
      id: this.idNumber++,
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

      if (editText) {
        return {
          taskData: newTaskData,
        }
      }
    })
  }

  deleteTask = (id) => {
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
  let name = 12
}
