import React from 'react'

const SomeButton = ({ children, onClick }) => (
  <button onClick={onClick}>{ children }</button>
)

export default SomeButton
