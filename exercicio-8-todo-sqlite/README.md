# TaskFlow - To-Do List com SQLite no Navegador

## Objetivo do Projeto
O **TaskFlow** é uma aplicação To-Do List responsiva projetada para o gerenciamento de tarefas do dia a dia, utilizando um banco de dados **SQLite** executado diretamente no navegador web através de WebAssembly (via `sql.js`).

## Tecnologias Utilizadas
- **HTML5** Semântico
- **CSS3** Externo com **Bootstrap 5.3** (Grid e componentes responsivos)
- **JavaScript (ES6+)**
- **SQLite WASM (`sql.js`)** para persistência e consultas relacionais
- **LocalStorage** para salvamento do arquivo binário do SQLite

## Estrutura de Pastas
exercicio-8-todo-sqlite/
├── assets/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       ├── app.js (Interface, Validações e Eventos)
│       └── database.js (Inicialização e Operações CRUD no SQLite)
├── database/
│   └── schema.sql (Script de tabela e comandos de exemplo)
├── img/
│   └── prints/ (Screenshots da aplicação em execução)
├── index.html
└── README.md
## Como Abrir o Projeto
1. Clone ou baixe o repositório `Frontend`.
2. Navegue até a pasta `exercicio-8-todo-sqlite/`.
3. Abra o arquivo `index.html` em qualquer navegador web com suporte a WebAssembly (Chrome, Edge, Firefox, Safari).

## Comandos SQL Utilizados (CRUD)
- **Criação da Tabela:**
  ```sql
  CREATE TABLE IF NOT EXISTS tarefas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      descricao TEXT,
      prioridade TEXT NOT NULL,
      data_limite DATE NOT NULL,
      concluida BOOLEAN DEFAULT 0,
      criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
  );
INSERT (Adicionar): INSERT INTO tarefas (titulo, prioridade, data_limite, descricao, concluida) VALUES (?, ?, ?, ?, 0);

SELECT (Listar/Filtrar): SELECT * FROM tarefas ORDER BY data_limite ASC;

UPDATE (Editar/Concluir): UPDATE tarefas SET titulo = ?, prioridade = ?, data_limite = ?, descricao = ? WHERE id = ?;

DELETE (Remover): DELETE FROM tarefas WHERE id = ?;

---

### 2. Comandos no Terminal para Commit e Push (Git)

No terminal do VS Code, execute:

```bash
# Criar diretório para prints caso não exista
mkdir -p exercicio-8-todo-sqlite/img/prints

# Adicionar todos os arquivos e fazer o commit final
git add .
git commit -m "exercicio-8-parte-5-todo-list-sqlite-final"
git push origin main