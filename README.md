# Artis Checkout | [![GitHub license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/pagarme/artis/blob/master/LICENSE) [![Travis CI Status](https://travis-ci.org/pagarme/artis.svg?branch=master)](https://travis-ci.org/pagarme/artis)
> Projeto em desenvolvimento em parceria entre Mundipagg e Pagar.me.

Este repositório está em fase de desenvolvimento, então muitas mudanças ainda podem acontecer. A ideia é construirmos um Checkout que possa ser facilmente integrado em diversos e-commerces do Brasil, de forma segura e confiável.

O desenvolvimento é *open source*, ou seja, todo o código fonte estará disponível para as pessoas que queiram conhecer, contribuir e melhorar este projeto.

Veja online os componentes desenvolvidos no nosso [Storybook](https://pagarme.github.io/artis)

## Rodando o projeto

Na pasta [webapp](webapp) você pode ver mais detalhes sobre como rodar o projeto.

## Implementando o modal de checkout

O checkout renderizará um modal contendo os passos necessários para habilitar o pagamento de diversas formas (boleto, cartões com opção de parcelamento, etc).

Nos arquivos [custom.html](./webapp/public/custom.html) e [simple.html](./webapp/public/simple.html) você pode ver um exemplo de como ficaria a implementação em cada um dos casos, a intenção é que ambas possibilitem uma implementação fácil, sendo que uma delas permite um nível de customização maior.

## Desenvolvimento

Este projeto foi iniciado com [Create React App](https://github.com/facebookincubator/create-react-app) e recomendamos o uso do [Yarn](https://yarnpkg.com/en/) para o fluxo de desenvolvimento.

### Instalação

Para instalar as dependências do projeto usando `yarn`:
```sh
$ `yarn install`
```

Usando `npm`:
```sh
$ `npm i`
```

### Outos scripts disponíveis

#### `start`

Este comando inicia o projeto em ambiente de desenvolvimento, você pode acessá-lo pela URL http://localhost:3000 em seu browser de preferência.

- *yarn*
```sh
$ `yarn start`
```

- *npm*
```sh
$ `npm start`
```

#### `storybook`

O [Storybook](https://storybook.js.org/) é um ambiente de desenvolvimento para testes de UI. Utilizamos essa ferramenta para renderizar componentes e verificar seus comportamentos.

Ao rodar o comando, acesse o Storybook pela URL http://localhost:6006.

- **yarn**
```sh
$ `yarn storybook`
```

- **npm**
```sh
$ `npm run storybook`
```

#### `coverage`

O script de `coverage` valida o código em `./webapp/src` e retorna tanto no próprio terminal quanto em uma página HTML (`./webapp/coverage/index.html`) um report final gerado pelo [Jest](https://facebook.github.io/jest/) em conjunto com o [nyc](https://www.npmjs.com/package/nyc)

- **yarn**
```sh
$ `yarn coverage`
```

- **npm**
```sh
$ `npm run coverage`
```

#### `test-coverage`

Este comando está disponível caso você queira rodar somente o report de `coverage` no terminal, sem gerar o arquivo HTML.

- **yarn**
```sh
$ `yarn test-coverage`
```

- **npm**
```sh
$ `npm run test-coverage`
```

#### `test`

O comando `test` usa o [Jest](https://facebook.github.io/jest/) para validar os testes definidos em arquivos `*.test.js` em modo _watch_ por padrão, ou seja, caso você altere o teste salve o arquivo, os testes serão revalidados automaticamente.

- **yarn**
```sh
$ `yarn test`
```

- **npm**
```sh
$ `npm t`
```

#### `lint`

Este comando usa o [estlint](https://eslint.org) para validar a sintaxe de arquivos `.js` e o [stylelint](https://github.com/stylelint/stylelint) para validar arquivos `.css` e mantermos os padrões definidos nos arquivos de configuração (_.eslintrc_ e _.stylelintrc_, respectivamente).

- **yarn**
```sh
$ `yarn lint`
```

- **npm**
```sh
$ `npm run lint`
```

#### `robrowser`

Este comando usa o [Robrowser](https://github.com/pagarme/robrowser) para validar a interface do Artis nos mais diversos dispositivos em uso no mercado.

Antes de executar o comando, certifique-se de iniciar o projeto em ambiente de desenvolvimento com `yarn start` em uma aba separada do terminal, o Robrowser vai precisar acessá-lo.

- **yarn**
```sh
$ `yarn robrowser`
```

- **npm**
```sh
$ `npm run robrowser`
```

### Estrutura dos componentes

Estamos usando o [Zeplin](https://zeplin.io/), em conjunto com o time de UX, para definir e seguir os layouts em desktop e mobile (somente pessoas com acesso conseguirão ver o conteúdo):

- Layout Mobile: https://app.zeplin.io/project/59e66a2ad508e5fb822f1776/screen/59e75a8daa565b58180d071b
- Layout Desktop: https://app.zeplin.io/project/59e66a2ad508e5fb822f1776/screen/59e75a07380b7f748505409e

E a estrutura inicial definida segue a seguinte composição dos principais componentes (pode sofrer alterações):

```js
<Header>
/*
  Contém logo e botões de navegação
*/
</Header>

<Content>
/*
  Será responsável por mostrar o contéudo em si de cada página
  Também lida com progress bar
*/
</Content>

<Footer>
/*
  Contém botão de navegação e valor total
*/
</Footer>
```

## Contribuindo

Para mais informações sobre como contribuir, [clique aqui](./.github/CONTRIBUTING.md).

## Licença

Este projeto está licenciado sob a [Licença MIT](./LICENSE), ou seja, você pode usá-lo da forma que preferir, incluindo suas próprias modificações em versões próprias.

## Equipe

| [<img src="https://avatars2.githubusercontent.com/u/12722087?v=4&s=115"><br><sub>Ieda Otero<br>Business Leader</sub>](https://github.com/IedaOtero) | [<img src="https://avatars0.githubusercontent.com/u/19213244?v=3&s=115"><br><sub>Thiago Medeiros<br>Developer</sub>](https://github.com/thiagommedeiros) | [<img src="https://avatars0.githubusercontent.com/u/10222646?v=3&s=115"><br><sub>Augusto Amaral<br>Developer</sub>](https://github.com/augusto-jm-amaral) | [<img src="https://avatars0.githubusercontent.com/u/14620121?v=3&s=115"><br><sub>Vitor Capretz<br>Developer</sub>](https://github.com/vcapretz) | [<img src="https://avatars1.githubusercontent.com/u/4103305?s=115&v=4"><br><sub>Allan Ramos<br>Developer</sub>](https://github.com/allangrds) |
| :---: |  :---: |  :---: | :---: | :---: |
