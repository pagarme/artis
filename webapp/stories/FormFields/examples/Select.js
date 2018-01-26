import React from 'react'

import Select from '../../../src/components/Select'

const choices = [
  { name: 'SP', value: 'sp' },
  { name: 'RJ', value: 'rj' },
  { name: 'MG', value: 'mg' },
  { name: 'MT', value: 'mt' },
  { name: 'GO', value: 'go' },
  { name: 'MS', value: 'ms' },
  { name: 'PA', value: 'pa' },
]

const SelectExamples = () => (
  <div>
    <h2>Select input</h2>

    <section>
      <h3>Default</h3>
      <Select
        name="uf"
        label="UF"
        placeholder="Selecione o estado"
        choices={choices}
      />
    </section>

    <section>
      <h3>Hint</h3>
      <Select
        name="uf"
        label="UF"
        placeholder="Selecione o estado"
        choices={choices}
        hint="Estado brasileiro"
      />
    </section>

    <section>
      <h3>Error</h3>
      <Select
        name="uf"
        label="UF"
        placeholder="Selecione o estado"
        choices={choices}
        error="Estado inválido"
      />
    </section>
  </div>
)

export default SelectExamples
