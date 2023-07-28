
import Task from './Task'
import EditTask from './EditTask'

const TaskList = ( {label} ) => {
    return (
        <ul className="todo-list">
            <li className="completed">
                <Task {...label[0]} />
            </li>
            <li className="editing">
                <EditTask />
            </li>
            <li>
                <Task {...label[1]} />
            </li>
        </ul>
    )
}

export default TaskList