/**
 * Módulo de Integração com SQLite no Navegador (sql.js / WASM)
 * Responsável por inicializar o banco de dados, executar o schema e expor métodos CRUD.
 */

let db = null;
const CHAVE_DB_LOCAL = "taskflow_sqlite_db";

// Inicializa a biblioteca sql.js e carrega/cria o banco de dados
async function initDatabase() {
    try {
        const SQL = await initSqlJs({
            locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`
        });

        const dbSalvo = localStorage.getItem(CHAVE_DB_LOCAL);

        if (dbSalvo) {
            const uInt8Array = new Uint8Array(JSON.parse(dbSalvo));
            db = new SQL.Database(uInt8Array);
            console.log("Banco de dados SQLite carregado do localStorage.");
        } else {
            db = new SQL.Database();
            criarSchemaInicial();
            salvarBancoLocal();
            console.log("Novo banco de dados SQLite inicializado.");
        }
    } catch (err) {
        console.error("Erro ao inicializar o SQLite:", err);
    }
}

// Cria a tabela tarefas caso não exista (Schema SQL)
function criarSchemaInicial() {
    const schemaSql = `
        CREATE TABLE IF NOT EXISTS tarefas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT NOT NULL,
            descricao TEXT CHECK(length(descricao) <= 200),
            prioridade TEXT NOT NULL CHECK(prioridade IN ('Baixa', 'Média', 'Alta')),
            data_limite DATE NOT NULL,
            concluida BOOLEAN NOT NULL DEFAULT 0,
            criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `;
    db.run(schemaSql);
}

// Persiste o estado do banco SQLite no localStorage
function salvarBancoLocal() {
    if (!db) return;
    const data = db.export();
    const arraySalvar = Array.from(data);
    localStorage.setItem(CHAVE_DB_LOCAL, JSON.stringify(arraySalvar));
}

// OPERAÇÃO SELECT: Listar tarefas por filtro
function dbObterTarefas(filtro = 'todas') {
    if (!db) return [];

    let query = "SELECT id, titulo, descricao, prioridade, data_limite AS dataLimite, concluida FROM tarefas";
    if (filtro === 'pendentes') {
        query += " WHERE concluida = 0";
    } else if (filtro === 'concluidas') {
        query += " WHERE concluida = 1";
    }
    query += " ORDER BY data_limite ASC";

    const stmt = db.prepare(query);
    const tarefas = [];

    while (stmt.step()) {
        const row = stmt.getAsObject();
        tarefas.push({
            id: row.id,
            titulo: row.titulo,
            descricao: row.descricao,
            prioridade: row.prioridade,
            dataLimite: row.dataLimite,
            concluida: Boolean(row.concluida)
        });
    }

    stmt.free();
    return tarefas;
}

// OPERAÇÃO INSERT: Adicionar nova tarefa
function dbAdicionarTarefa(titulo, prioridade, dataLimite, descricao) {
    if (!db) return;

    const query = `
        INSERT INTO tarefas (titulo, prioridade, data_limite, descricao, concluida)
        VALUES (?, ?, ?, ?, 0);
    `;
    db.run(query, [titulo, prioridade, dataLimite, descricao]);
    salvarBancoLocal();
}

// OPERAÇÃO UPDATE: Editar dados da tarefa
function dbAtualizarTarefa(id, titulo, prioridade, dataLimite, descricao) {
    if (!db) return;

    const query = `
        UPDATE tarefas 
        SET titulo = ?, prioridade = ?, data_limite = ?, descricao = ?
        WHERE id = ?;
    `;
    db.run(query, [titulo, prioridade, dataLimite, descricao, id]);
    salvarBancoLocal();
}

// OPERAÇÃO UPDATE: Alternar estado de conclusão
function dbAlternarConcluida(id, novoEstado) {
    if (!db) return;

    const query = "UPDATE tarefas SET concluida = ? WHERE id = ?;";
    db.run(query, [novoEstado ? 1 : 0, id]);
    salvarBancoLocal();
}

// OPERAÇÃO DELETE: Remover tarefa pelo ID
function dbRemoverTarefa(id) {
    if (!db) return;

    const query = "DELETE FROM tarefas WHERE id = ?;";
    db.run(query, [id]);
    salvarBancoLocal();
}