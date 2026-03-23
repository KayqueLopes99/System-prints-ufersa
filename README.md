#  Sistema de Gerenciamento de Impressões (Full-Stack)

Este é o projeto completo (Front-End e Back-End) do **Sistema de Gerenciamento e Administração de Impressões para Estudantes**, desenvolvido para facilitar a solicitação, acompanhamento e gerenciamento de serviços de impressão e encadernação universitária.

## Funcionalidades (Em desenvolvimento):



## Tecnologias Utilizadas
O projeto foi construído utilizando as seguintes tecnologias:

* **React**.
* **Java 21**
* **Spring Boot 3.x**.
* **PostgreSQL**.

## Pré-requisitos

Antes de rodar o projeto localmente, certifique-se de ter as seguintes ferramentas instaladas:

* [Node.js](https://nodejs.org/) (Necessário para rodar o Front-End).
* [Java Development Kit (JDK) 21+](https://adoptium.net/) (Necessário para rodar o Back-End).
* [PostgreSQL](https://www.postgresql.org/download/) instalado e rodando na sua máquina.
* Uma IDE de sua preferência (VS Code, IntelliJ IDEA).

## Configuração do Banco de Dados

1. Abra o **pgAdmin** ou o terminal do seu PostgreSQL.
2. Crie um banco de dados vazio com o nome exato de: `sistema_impressoes`.
3. Navegue até a pasta do backend, abra o arquivo `src/main/resources/application.properties` e confirme se o usuário e senha correspondem aos do seu banco local:

```properties
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha
```

## Como executar o projeto

### 1. Rodando o Back-End (Spring Boot)
Abra um **novo** terminal, navegue até a pasta do frontend e execute os comandos:
```bash
npm install
npm run dev
```
*(O site abrirá no seu navegador, geralmente no link `http://localhost:5173`)*

---
