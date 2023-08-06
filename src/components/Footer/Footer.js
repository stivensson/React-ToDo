
import TasksFilter from "../TasksFilter"
import './Footer.css'

const Footer = ( {taskCount, filteredTask, filter} ) => {
    return (
        <footer className="footer">
            <span className="todo-count">{taskCount} items left</span>
            <TasksFilter
                filteredTask = {filteredTask}
                filter = {filter}
            />
            <button className="clear-completed">Clear completed</button>
        </footer>
    )
}

export default Footer