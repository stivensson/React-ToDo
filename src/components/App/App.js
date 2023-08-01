
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

  addTask = (text) => {
    const newTask = {
      label: text,
      id: this.idNumber++
    }

    this.setState(( {taskData} ) => {
      const newTaskData = [
        ...taskData,
        newTask
      ]

      return {
        taskData: newTaskData
      }
    })
  }

  deleteTask = (id) => {
    this.setState(( {taskData} ) => {
      const index = taskData.findIndex(item => item.id === id)

      const newTaskData = taskData.toSpliced(index, 1)

      return {
        taskData: newTaskData
      }
    })
  }

  render() {
    const taskCount = this.state.taskData.length

    return (
      <section className='todoapp'>
        <NewTaskForm
          addTask = {this.addTask}
        />
        <section className='main'>
          <TaskList 
            labels = {this.state.taskData}
            deleteTask = {this.deleteTask}
          />
          <Footer todoCount = {taskCount}/>
        </section>
      </section>
    )
  }
}