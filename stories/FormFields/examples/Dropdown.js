import React from 'react'
import { Dropdown } from 'former-kit'

const defaultOptions = [
  {
    name: '1x de R$ 100,00 sem juros',
    value: '100',
  },
  {
    name: '2x de R$ 50,00 sem juros',
    value: '100',
  },
  {
    name: '3x de R$ 33,33 sem juros',
    value: '100',
  },
  {
    name: '4x de R$ 30,00 com juros',
    value: '120',
  },
]

const DropdownExamples = () => (
  <div>
    <h2>Dropdown</h2>

    <section>
      <h3>Default</h3>
      <Dropdown
        options={defaultOptions}
        name="former-kit"
        placeholder="Em quantas parcelas?"
      />
    </section>

    <section>
      <h3>Default disabled</h3>
      <Dropdown
        options={defaultOptions}
        name="former-kit"
        placeholder="Em quantas parcelas?"
        disabled
      />
    </section>

    <section>
      <h3>Default error</h3>
      <Dropdown
        options={defaultOptions}
        name="former-kit"
        placeholder="Em quantas parcelas?"
        error="Esse campo é obrigatório"
      />
    </section>

  </div>
)

export default DropdownExamples
