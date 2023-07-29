
import TasksFilter from "../TasksFilter"
import './Footer.css'

const Footer = ( {filters} ) => {
    return (
        <footer className="footer">
            <span className="todo-count">1 items left</span>
            <ul className="filters">
                <li>
                    <TasksFilter {...filters[0]} />
                </li>
                <li>
                    <TasksFilter {...filters[1]} />
                </li>
                <li>
                    <TasksFilter {...filters[2]} />
                </li>
            </ul>
            <button className="clear-completed">Clear completed</button>
        </footer>
    )
}

export default Footer