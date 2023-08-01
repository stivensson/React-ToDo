
import TasksFilter from "../TasksFilter"
import './Footer.css'

const Footer = ( {todoCount} ) => {
    return (
        <footer className="footer">
            <span className="todo-count">{todoCount} items left</span>
            <TasksFilter />
            <button className="clear-completed">Clear completed</button>
        </footer>
    )
}

export default Footer