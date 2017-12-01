import React from 'react'

import IconAdd from 'react-icons/lib/fa/plus'

import { storiesOf } from '@storybook/react'

import Button from '../../src/components/Button'
import style from './style.css'

storiesOf('Buttons', module)
  .add('All', () => (
    <div className={style.container}>
      <div className={style.themeDark}>
        <h2>Theme Dark</h2>
        <h2>Default Button</h2>

        <div className={style.spacing}>
          <Button base="dark" relevance="high">Call to Action</Button>
          <Button base="dark">Call to Action</Button>
          <Button base="dark" relevance="low">Call to Action</Button>
        </div>

        <h2>Gradient</h2>
        <div className={style.spacing}>
          <Button base="dark" relevance="high" fill="gradient">Call to Action</Button>
          <Button base="dark" fill="gradient">Call to Action</Button>
        </div>

        <h2>Outline Button</h2>

        <div className={style.spacing}>
          <Button base="dark" relevance="high" fill="outline">Call to Action</Button>
          <Button base="dark" fill="outline">Call to Action</Button>
          <Button base="dark" relevance="low" fill="outline">Call to Action</Button>
        </div>

        <h2>Clean Button</h2>

        <div className={style.spacing}>
          <Button base="dark" relevance="high" fill="clean">Call to Action</Button>
          <Button base="dark" fill="clean">Call to Action</Button>
          <Button base="dark" relevance="low" fill="clean">Call to Action</Button>
        </div>

        <h2>All buttons with icons</h2>

        <div className={style.spacing}>
          <Button base="dark" relevance="high"><IconAdd />Call to Action</Button>
          <Button base="dark" ><IconAdd />Call to Action</Button>
          <Button base="dark" relevance="low"><IconAdd />Call to Action</Button>
        </div>

        <div className={style.spacing}>
          <Button base="dark" relevance="high" fill="gradient"><IconAdd />Call to Action</Button>
          <Button base="dark" fill="gradient"><IconAdd />Call to Action</Button>
        </div>

        <div className={style.spacing}>
          <Button base="dark" relevance="high" fill="outline"><IconAdd />Call to Action</Button>
          <Button base="dark" fill="outline"><IconAdd />Call to Action</Button>
          <Button base="dark" relevance="low" fill="outline"><IconAdd />Call to Action</Button>
        </div>

        <div className={style.spacing}>
          <Button base="dark" relevance="high" fill="clean"><IconAdd />Call to Action</Button>
          <Button base="dark" fill="clean"><IconAdd />Call to Action</Button>
          <Button base="dark" relevance="low" fill="clean"><IconAdd />Call to Action</Button>
        </div>

        <h2>Sizes</h2>

        <div className={style.spacing}>
          <Button base="dark" size="extra-small">extra-small</Button>
        </div>

        <div className={style.spacing}>
          <Button base="dark" size="small">small</Button>
        </div>

        <div className={style.spacing}>
          <Button base="dark">Default</Button>
        </div>

        <div className={style.spacing}>
          <Button base="dark" size="large">Default</Button>
        </div>

        <h2>All disabled</h2>

        <div className={style.spacing}>
          <Button base="dark" relevance="high" disabled><IconAdd />Call to Action</Button>
          <Button base="dark" disabled><IconAdd />Call to Action</Button>
          <Button base="dark" relevance="low" disabled><IconAdd />Call to Action</Button>
        </div>

        <div className={style.spacing}>
          <Button base="dark" relevance="high" fill="gradient" disabled><IconAdd />Call to Action</Button>
          <Button base="dark" fill="gradient" disabled><IconAdd />Call to Action</Button>
        </div>

        <div className={style.spacing}>
          <Button base="dark" relevance="high" fill="outline" disabled><IconAdd />Call to Action</Button>
          <Button base="dark" fill="outline" disabled><IconAdd />Call to Action</Button>
          <Button base="dark" relevance="low" fill="outline" disabled><IconAdd />Call to Action</Button>
        </div>

        <div className={style.spacing}>
          <Button base="dark" relevance="high" fill="clean" disabled><IconAdd />Call to Action</Button>
          <Button base="dark" fill="clean" disabled><IconAdd />Call to Action</Button>
          <Button base="dark" relevance="low" fill="clean" disabled><IconAdd />Call to Action</Button>
        </div>
      </div>

      <div className={style.themeLight}>
        <h2>Theme Light</h2>
        <h2>Default Button</h2>

        <div className={style.spacing}>
          <Button relevance="high">Call to Action</Button>
          <Button>Call to Action</Button>
          <Button relevance="low">Call to Action</Button>
        </div>

        <h2>Gradient</h2>
        <div className={style.spacing}>
          <Button relevance="high" fill="gradient">Call to Action</Button>
          <Button fill="gradient">Call to Action</Button>
        </div>

        <h2>Outline Button</h2>

        <div className={style.spacing}>
          <Button relevance="high" fill="outline">Call to Action</Button>
          <Button fill="outline">Call to Action</Button>
          <Button relevance="low" fill="outline">Call to Action</Button>
        </div>

        <h2>Clean Button</h2>

        <div className={style.spacing}>
          <Button relevance="high" fill="clean">Call to Action</Button>
          <Button fill="clean">Call to Action</Button>
          <Button relevance="low" fill="clean">Call to Action</Button>
        </div>

        <h2>All buttons with icons</h2>

        <div className={style.spacing}>
          <Button relevance="high"><IconAdd />Call to Action</Button>
          <Button><IconAdd />Call to Action</Button>
          <Button relevance="low"><IconAdd />Call to Action</Button>
        </div>

        <div className={style.spacing}>
          <Button relevance="high" fill="gradient"><IconAdd />Call to Action</Button>
          <Button fill="gradient"><IconAdd />Call to Action</Button>
        </div>

        <div className={style.spacing}>
          <Button relevance="high" fill="outline"><IconAdd />Call to Action</Button>
          <Button fill="outline"><IconAdd />Call to Action</Button>
          <Button relevance="low" fill="outline"><IconAdd />Call to Action</Button>
        </div>

        <div className={style.spacing}>
          <Button relevance="high" fill="clean"><IconAdd />Call to Action</Button>
          <Button fill="clean"><IconAdd />Call to Action</Button>
          <Button relevance="low" fill="clean"><IconAdd />Call to Action</Button>
        </div>

        <h2>Sizes</h2>

        <div className={style.spacing}>
          <Button size="extra-small">extra-small</Button>
        </div>

        <div className={style.spacing}>
          <Button size="small">small</Button>
        </div>

        <div className={style.spacing}>
          <Button>Default</Button>
        </div>

        <div className={style.spacing}>
          <Button size="large">Default</Button>
        </div>

        <h2>All disabled</h2>

        <div className={style.spacing}>
          <Button relevance="high" disabled><IconAdd />Call to Action</Button>
          <Button disabled><IconAdd />Call to Action</Button>
          <Button relevance="low" disabled><IconAdd />Call to Action</Button>
        </div>

        <div className={style.spacing}>
          <Button relevance="high" fill="gradient" disabled><IconAdd />Call to Action</Button>
          <Button fill="gradient" disabled><IconAdd />Call to Action</Button>
        </div>

        <div className={style.spacing}>
          <Button relevance="high" fill="outline" disabled><IconAdd />Call to Action</Button>
          <Button fill="outline" disabled><IconAdd />Call to Action</Button>
          <Button relevance="low" fill="outline" disabled><IconAdd />Call to Action</Button>
        </div>

        <div className={style.spacing}>
          <Button relevance="high" fill="clean" disabled><IconAdd />Call to Action</Button>
          <Button fill="clean" disabled><IconAdd />Call to Action</Button>
          <Button relevance="low" fill="clean" disabled><IconAdd />Call to Action</Button>
        </div>
      </div>
    </div>
  ))
