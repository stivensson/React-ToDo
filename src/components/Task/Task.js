
import React, {Component} from 'react'
import './Task.css'

export default class Task extends Component {
    render() {
        return (
            <div className="view">
                <input className="toggle" type="checkbox" />
                <label>
                    <span className="description">{this.props.text}</span>
                    <span className="created"></span>
                </label>
                <button className="icon icon-edit"></button>
                <button className="icon icon-destroy"
                        onClick={this.props.deleteTask}>
                </button>
            </div>
        )
    }
}