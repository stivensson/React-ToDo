
import Task from '../Task'
import EditTask from '../EditTask'
import './TaskList.css'

const TaskList = ( {labels} ) => {
    return (
        <ul className="todo-list">
            <li className="completed">
                <Task {...labels[0]} />
            </li>
            <li className="editing">
                <EditTask />
            </li>
            <li>
                <Task {...labels[1]} />
            </li>
        </ul>
    )
}

export default TaskList