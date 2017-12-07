Este projeto foi iniciado com [Create React App](https://github.com/facebookincubator/create-react-app) e recomendamos o uso do [Yarn](https://yarnpkg.com/en/) para o fluxo de desenvolvimento.

Os passos a seguir indicam alguns comandos atualmente disponíveis e para rodá-los lembre-se de navegar sempre para dentro da pasta `webapp`.

# Instalação

Para instalar as dependências do projeto usando `yarn`:
```sh
$ `yarn install`
```

Usando `npm`:
```sh
$ `npm i`
```

# Outos scripts disponíveis

## `start`

Este comando inicia o projeto em ambiente de desenvolvimento, você pode acessá-lo pela URL http://localhost:3000 em seu browser de preferência.

- *yarn*
```sh
$ `yarn start`
```

- *npm*
```sh
$ `npm start`
```

## `storybook`

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

## `coverage`

O script de `coverage` valida o código em `./webapp/src` e retorna tanto no próprio terminal quanto em uma página HTML (`./webapp/coverage/index.html`) um report final gerado pelo [Jest](https://facebook.github.io/jest/) em conjunto com o [nyc](https://www.npmjs.com/package/nyc)

- **yarn**
```sh
$ `yarn coverage`
```

- **npm**
```sh
$ `npm run coverage`
```

## `test-coverage`

Este comando está disponível caso você queira rodar somente o report de `coverage` no terminal, sem gerar o arquivo HTML.

- **yarn**
```sh
$ `yarn test-coverage`
```

- **npm**
```sh
$ `npm run test-coverage`
```

## `test`

O comando `test` usa o [Jest](https://facebook.github.io/jest/) para validar os testes definidos em arquivos `*.test.js` em modo _watch_ por padrão, ou seja, caso você altere o teste salve o arquivo, os testes serão revalidados automaticamente.

- **yarn**
```sh
$ `yarn test`
```

- **npm**
```sh
$ `npm t`
```

## `lint`

Este comando usa o [estlint](https://eslint.org) para validar a sintaxe de arquivos `.js` e o [stylelint](https://github.com/stylelint/stylelint) para validar arquivos `.css` e mantermos os padrões definidos nos arquivos de configuração (_.eslintrc_ e _.stylelintrc_, respectivamente).

- **yarn**
```sh
$ `yarn lint`
```

- **npm**
```sh
$ `npm run lint`
```

# Estrutura dos componentes

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
