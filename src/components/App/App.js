
import NewTaskForm from '../NewTaskForm'
import TaskList from '../TaskList'
import Footer from '../Footer'
import './App.css'

const App = () => {
  const taskData = [
    {description: 'Completed task', created: 'created 17 seconds ago'},
    {description: 'Active task', created: 'created 5 minutes ago'}
  ]

  const filterData = [
    {classFilter: 'selected', description: 'All'},
    {description: 'Active'},
    {description: 'Completed'}
  ]

  return (
    <section className='todoapp'>
      <NewTaskForm />
      <section className='main'>
        <TaskList labels = {taskData} />
        <Footer filters = {filterData} />
      </section>
    </section>
  )
}

export default App