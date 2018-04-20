import React from 'react'

import { storiesOf } from '@storybook/react'

import { Button } from 'former-kit'

import CloseIcon from 'react-icons/lib/io/android-close'
import BackIcon from 'react-icons/lib/io/android-arrow-back'
import NavigateBack from './../../src/images/navigate_back.svg'
import NavigateNext from './../../src/images/navigate_next.svg'


import style from './style.css'

storiesOf('Buttons', module)
  .add('defaultTheme', () => (
    <div className={style.container}>
      <div>
        <h2>Default Button</h2>
        <Button>
          <b>Continuar</b>
        </Button>
        <Button>
              Ops
          <span><b>Voltar</b></span>
        </Button>
      </div>

      <div>
        <h2>Fill Gradient</h2>
        <Button fill="gradient">
              Label
        </Button>
      </div>

      <div>
        <h2>Fill Outline</h2>
        <Button fill="outline">Label</Button>
      </div>

      <div>
        <h2>Icons</h2>
        <Button
          fill="outline"
          icon={<NavigateBack />}
        >
          <span>Label</span>
        </Button>
        <Button
          fill="gradient"
          icon={<NavigateNext />}
          iconAlignment="right"
        >
          <span>Label</span>
        </Button>
      </div>

      <div>
        <h2>Disabled</h2>
        <Button disabled>Label</Button>
      </div>

      <div>
        <h2>Sizes</h2>
        <Button size="tiny">Tiny</Button>
        <Button>Default</Button>
        <Button size="huge">Huge</Button>
      </div>

      <div>
        <h2>Clean buttons for icons</h2>
        <Button fill="clean" relevance="low" icon={<BackIcon size={30} />} />
        <Button fill="clean" relevance="high" icon={<CloseIcon size={30} />} />
      </div>
    </div>
  ))
