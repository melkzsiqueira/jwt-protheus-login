# JwtProtheusLogin
> Autenticação JWT com backend Protheus.

Este projeto foi construído com [Angular CLI](https://github.com/angular/angular-cli) versão 11.0.5.

![jwtprotheuslogin](https://user-images.githubusercontent.com/18331586/104857105-05a71580-58f5-11eb-9ce8-522fbbc2837b.gif)

## Setup do Projeto

* [Angular CLI](https://github.com/angular/angular-cli): 11.0.5
* [Node.js](https://github.com/nodejs/node): 14.13.1
* [Angular](https://github.com/angular/angular): 11.0.5
* [Bulma](https://github.com/jgthms/bulma): 0.9.1

## Pré-requisitos

Para que a autenticação JWT com o Protheus funcione, é preciso ter o seu [ambiente REST configurado](https://tdn.totvs.com/pages/releaseview.action?pageId=519719292) no `appserver.ini`.

Após [configurar seu ambiente REST](https://tdn.totvs.com/pages/releaseview.action?pageId=519719292), clone o projeto e altere a propriedade `baseURL` que está localizada dentro do arquivo `src/app/services/api.ts`, para o endereço e a porta do seu ambiente REST: `'http://localhost:8084/rest'`.

## Execução do Projeto

Após clonar o projeto, instale todas as dependencias executando o comando:

```sh
npm install
```

Em seguida execute:

```sh
ng serve
```

Navegue até o endereço:

```sh
http://localhost:4200
```

## Build

Execute `ng build` para fazer o build do projeto. Os artefatos do build vão ser armazenados no diretório `dist/`. Use a flag `--prod` para fazer o build em produção: `ng build --prod`.

## Unit tests

Execute `ng test` para executar testes unitários via [Karma](https://karma-runner.github.io).

## End-to-end tests

Execute `ng e2e` para executar testes end-to-end via [Protractor](http://www.protractortest.org/).
