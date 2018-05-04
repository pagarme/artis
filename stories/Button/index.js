import React from 'react'

import { storiesOf } from '@storybook/react'

import { Button } from 'former-kit'

import CloseIcon from 'react-icons/lib/io/android-close'
import BackIcon from 'react-icons/lib/io/android-arrow-back'
import NavigateNext from './../../src/images/navigate_next.svg'
import NavigateBack from './../../src/images/navigate_back.svg'
import style from './style.css'

storiesOf('Buttons', module)
  .add('defaultTheme', () => (
    <div className={style.container}>
      <div>
        <h2>Default Button</h2>
        <Button>
          Continuar
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
          fill="gradient"
          icon={<NavigateNext />}
          iconAlignment="end"
        >
          Label
        </Button>
        <Button
          fill="outline"
          icon={<NavigateBack />}
        >
          Voltar
        </Button>
        <Button
          fill="outline"
          icon={<NavigateNext />}
          iconAlignment="end"
        >
          Continuar
        </Button>
      </div>

      <div>
        <h2>Disabled</h2>
        <Button disabled>Label</Button>
        <Button
          fill="gradient"
          icon={<NavigateNext />}
          iconAlignment="end"
          disabled
        >
          disabled
        </Button>
      </div>

      <div>
        <h2>Sizes</h2>
        <Button size="tiny">Tiny</Button>
        <Button>Default</Button>
        <Button size="huge">Huge</Button>
      </div>

      <div>
        <h2>Clean buttons for icons</h2>
        <Button fill="clean" icon={<BackIcon size={30} />} />
        <Button fill="clean" icon={<CloseIcon size={30} />} />
      </div>
    </div>
  ))
