import React from 'react'

import CloseIcon from 'react-icons/lib/io/android-close'
import BackIcon from 'react-icons/lib/io/android-arrow-back'

import { storiesOf } from '@storybook/react'

import Button from '../../src/components/Button'
import style from './style.css'

storiesOf('Buttons', module)
  .add('All', () => (
    <div className={style.container}>
      <div className={style.darkTheme}>
        <h1>Dark Theme</h1>
        <h2>Default Button</h2>

        <div className={style.spacing}>
          <Button base="dark" relevance="high">High relevance</Button>
        </div>

        <h2>Gradient</h2>
        <div className={style.spacing}>
          <Button base="dark" relevance="high" fill="gradient">Call to Action</Button>
        </div>

        <h2>Clean buttons with icons</h2>

        <div className={style.spacing}>
          <Button base="dark" relevance="normal" fill="clean"><BackIcon size={30} /></Button>
          <Button base="dark" relevance="high" fill="clean"><CloseIcon size={30} /></Button>
        </div>

        <h2>Sizes</h2>

        <div className={style.spacing}>
          <Button base="dark" size="extra-small" relevance="high">extra-small</Button>
        </div>

        <div className={style.spacing}>
          <Button base="dark" size="small" relevance="high">small</Button>
        </div>

        <div className={style.spacing}>
          <Button base="dark" relevance="high">Default</Button>
        </div>

        <div className={style.spacing}>
          <Button base="dark" size="large" relevance="high">Default</Button>
        </div>
      </div>

      <div className={style.lightTheme}>
        <h1>Light Theme</h1>
        <h2>Default Button</h2>

        <div className={style.spacing}>
          <Button base="light" relevance="high">High relevance</Button>
        </div>

        <h2>Gradient</h2>
        <div className={style.spacing}>
          <Button base="light" relevance="high" fill="gradient">Call to Action</Button>
        </div>

        <h2>Clean buttons with icons</h2>

        <div className={style.spacing}>
          <Button base="light" relevance="normal" fill="clean"><BackIcon size={30} /></Button>
          <Button base="light" relevance="high" fill="clean"><CloseIcon size={30} /></Button>
        </div>

        <h2>Sizes</h2>

        <div className={style.spacing}>
          <Button base="light" size="extra-small" relevance="high">extra-small</Button>
        </div>

        <div className={style.spacing}>
          <Button base="light" size="small" relevance="high">small</Button>
        </div>

        <div className={style.spacing}>
          <Button base="light" relevance="high">Default</Button>
        </div>

        <div className={style.spacing}>
          <Button base="light" size="large" relevance="high">Default</Button>
        </div>
      </div>
    </div>
  ))
