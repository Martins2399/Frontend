# Sistema de Cadastro e Tarefas com Consulta CEP, APIs e SQLite - Exercício 9

## Objetivo do Projeto
Aplicação web responsiva desenvolvida para gerenciamento de cadastros de usuários, consulta automatizada de CEP via API ViaCEP, demonstração de consumo de API REST (JSONPlaceholder) e persistência de dados relacional utilizando **SQLite no navegador**.

## Execução do SQLite no Navegador (WebAssembly)
Como este é um projeto voltado para frontend hospedado via GitHub Pages / arquivos estáticos, o banco de dados **SQLite** é executado inteiramente no navegador do usuário utilizando a biblioteca **`sql.js` (SQLite compilado para WebAssembly)**. O arquivo binário do banco é sincronizado automaticamente com o `localStorage` do navegador para garantir a persistência dos dados entre recarregamentos de página.

## Tecnologias Utilizadas
- HTML5 Semântico e CSS3
- Bootstrap 5.3 (via CDN)
- JavaScript (ES6+ com async/await)
- SQLite WebAssembly (`sql.js`)
- APIs Públicas (ViaCEP e JSONPlaceholder)

## Estrutura do Projeto
frontend/Exercicio 9/
├── index.html
├── cadastro.html
├── tarefas.html
├── api-demo.html
├── README.md
├── css/
│   └── style.css
├── js/
│   └── script.js
└── img/

## Como Abrir o Projeto
1. Clone ou baixe este repositório (`frontend`).
2. Navegue até a pasta `frontend/Exercicio 9/`.
3. Abra o arquivo `index.html` utilizando um servidor local (como a extensão **Live Server** no VS Code) para garantir o carregamento correto do WebAssembly, ou acesse via GitHub Pages.