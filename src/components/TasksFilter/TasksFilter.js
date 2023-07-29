
import React, { Component } from 'react'
import './TasksFilter.css'

export default class TasksFilter extends Component {
    render() {
        const {classFilter, description} = this.props
        return <button className={classFilter} type="button">{description}</button>
    }
}