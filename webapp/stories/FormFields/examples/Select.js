import React from 'react'

import Select from '../../../src/components/Select'

const options = [
  { name: 'SP', value: 'sp' },
  { name: 'RJ', value: 'rj' },
  { name: 'MG', value: 'mg' },
  { name: 'MT', value: 'mt' },
  { name: 'GO', value: 'go' },
  { name: 'MS', value: 'ms' },
  { name: 'PA', value: 'pa' },
]

const isBigScreen = true

const SelectExamples = () => (
  <div>
    <h2>Select input</h2>

    <section>
      <h3>Desktop Default</h3>
      <Select
        name="uf"
        label="UF"
        placeholder="Selecione o estado"
        options={options}
        isBigScreen={isBigScreen}
      />
    </section>

    <section>
      <h3>Mobile Default</h3>
      <Select
        name="uf"
        label="UF"
        placeholder="Selecione o estado"
        options={options}
        isBigScreen={!isBigScreen}
      />
    </section>

    <section>
      <h3>Hint</h3>
      <Select
        name="uf"
        label="UF"
        placeholder="Selecione o estado"
        options={options}
        hint="Estado brasileiro"
        isBigScreen={isBigScreen}
      />
    </section>

    <section>
      <h3>Error</h3>
      <Select
        name="uf"
        label="UF"
        placeholder="Selecione o estado"
        options={options}
        error="Estado inválido"
        isBigScreen={isBigScreen}
      />
    </section>
  </div>
)

export default SelectExamples
