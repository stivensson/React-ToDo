
import React, { Component } from 'react'
import './Task.css'

export default class Task extends Component {
    render() {
        const {description, created} = this.props
        return (
            <div className="view">
                <input className="toggle" type="checkbox" />
                <label>
                    <span className="description">{description}</span>
                    <span className="created">{created}</span>
                </label>
                <button className="icon icon-edit"></button>
                <button className="icon icon-destroy"></button>
            </div>
        )
    }
}