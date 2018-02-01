import React, { Component } from 'react'

import style from './style.css'

export default class BuggyCounter extends Component {
  constructor (props) {
    super(props)
    this.state = { counter: 0 }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    this.setState(({ counter }) => ({
      counter: counter + 1,
    }))
  }

  render () {
    if (this.state.counter === 3) {
      throw new Error('I crashed!')
    }

    return (
      <div className={style.buggyCounter}>
        <h1>Click 3 times in this button to trigger an exception</h1>
        <button onClick={this.handleClick}>{this.state.counter}</button>
      </div>
    )
  }
}
