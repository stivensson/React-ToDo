
import React, { Component } from 'react'
import './TasksFilter.css'

export default class TasksFilter extends Component {
    render() {
        return (
            <ul className='filters'>
                <li>
                    <button type='button' className='selected'>All</button>
                </li>
                <li>
                    <button type='button'>Active</button>
                </li>
                <li>
                    <button type='button'>Completed</button>
                </li>
            </ul>
        )
    }
}