import React from 'react'
import { storiesOf } from '@storybook/react'
import classNames from 'classnames'

import { checkout } from '../../src/themes/default/index.css'
import style from './style.css'

storiesOf('Typography', module)
  .add('Styles', () => (
    <div className={
      classNames(
        checkout,
        style.wrapper
      )
    }
    >
      <div>
        <span>h1</span>
        <h1>
         Roboto, sans-serif 28
        </h1>
      </div>
      <div>
        <span>h2</span>
        <h2>
          Roboto, sans-serif 24
        </h2>
      </div>
      <div>
        <span>h3</span>
        <h3>
         Roboto, sans-serif 18
        </h3>
      </div>
      <hr />
      <div>
        <span>body</span>
        <div>
          <div>
            Roboto, sans-serif 16 normal
          </div>
          <div>
            <i>Roboto, sans-serif 16 italic</i>
          </div>
          <div>
            <b>Roboto, sans-serif 16 bold</b>
          </div>
        </div>
      </div>
      <hr />
      <div>
        <span>paragraph</span>
        <div>
          <h3>SOME H3 TITLE</h3>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
            It has survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
            It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus PageMaker
            including versions of Lorem Ipsum.
          </p>

          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
            It has survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
            It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus PageMaker
            including versions of Lorem Ipsum.
          </p>
        </div>
      </div>
      <hr />
      <div>
        <span>lists</span>
        <div>
          <ul>
            <li>Lorem ipsum dolor sit amet</li>
            <ul>
              <li>Lorem ipsum dolor sit amet</li>
              <ul>
                <li>Lorem ipsum dolor sit amet</li>
              </ul>
            </ul>
            <li>Lorem ipsum dolor sit amet</li>
          </ul>
        </div>
      </div>
    </div>
  ))
