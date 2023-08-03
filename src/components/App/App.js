
import React, {Component} from 'react'
import NewTaskForm from '../NewTaskForm'
import TaskList from '../TaskList'
import Footer from '../Footer'
import './App.css'

export default class App extends Component {
  state = {
    taskData: []
  }

  idNumber = 1

  indexFn = (id, taskData) => {
    const index = taskData.findIndex(item => item.id === id)

    return index
  }

  addTask = (text) => {
    const newTask = {
      label: text,
      completed: false,
      editing: false,
      id: this.idNumber++
    }

    this.setState(( {taskData} ) => {
      const newTaskData = [...taskData, newTask]

      return {
        taskData: newTaskData
      }
    })
  }

  deleteTask = (id) => {
    this.setState(( {taskData} ) => {
      const newTaskData = taskData.toSpliced(this.indexFn(id, taskData), 1)

      return {
        taskData: newTaskData
      }
    })
  }

  completedTask = (id) => {
    this.setState(( {taskData} ) => {
      const oldEl = taskData[this.indexFn(id, taskData)]

      const newEl = {...oldEl, completed: !oldEl.completed}

      const newTaskData = taskData.toSpliced(this.indexFn(id, taskData), 1, newEl)

      return {
        taskData: newTaskData
      }
    })
  }

  render() {
    const taskCount = this.state.taskData.length

    return (
      <section className = 'todoapp'>
        <NewTaskForm
          addTask = {this.addTask}
        />
        <section className = 'main'>
          <TaskList 
            labels = {this.state.taskData}
            deleteTask = {this.deleteTask}
            completedTask = {this.completedTask}
          />
          <Footer todoCount = {taskCount}/>
        </section>
      </section>
    )
  }
}