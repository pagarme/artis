import React from 'react'

import style from './style.css'

const CardSample = ({ children, bgColor }) => (
  <div
    className={style.cardSample}
    style={{ backgroundColor: bgColor }}
  >
    {children}
  </div>
)

export default CardSample
