# Sistema de Cadastro e Tarefas com Consulta CEP, APIs e SQLite - Exercício 9

## Objetivo do Projeto
Aplicação web responsiva completa desarrollada para gerenciamento de cadastros de usuários com preenchimento automático de endereço via API ViaCEP, demonstração de consumo de API REST (JSONPlaceholder) e um sistema completo de CRUD de tarefas integrado a um banco de dados relacional **SQLite executado no navegador**.

## Como Abrir e Testar o Projeto
1. Clone ou baixe este repositório (`frontend`).
2. Navegue até a pasta `frontend/Exercicio 9/`.
3. Abra o arquivo `index.html`. 
   > **Observação Técnica importante:** Devido às restrições de segurança de CORS dos navegadores modernos para carregamento de arquivos binários de WebAssembly (`.wasm`), recomenda-se abrir o projeto utilizando um servidor de desenvolvimento local (como a extensão **Live Server** no VS Code) ou publicá-lo via **GitHub Pages**.

## Tecnologias Utilizadas
- HTML5 Semântico e CSS3
- Bootstrap 5.3 (via CDN)
- JavaScript (ES6+ com `async/await`, `fetch` e JSON)
- SQLite WebAssembly (`sql.js`) sincronizado com o `localStorage`
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