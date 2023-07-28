
import NewTaskForm from './NewTaskForm'
import TaskList from './TaskList'
import Footer from './Footer'

const App = () => {
  const taskData = [
    {description: 'Completed task', created: 'created 17 seconds ago'},
    {description: 'Active task', created: 'created 5 minutes ago'}
  ]

  return (
    <section className='todoapp'>
      <NewTaskForm />
      <section className='main'>
        <TaskList label = {taskData} />
        <Footer />
      </section>
    </section>
  )
}

export default App