-- ============================================================================
-- SCRIPT DE CRIAÇÃO E EXEMPLOS DE COMANDOS SQLITE - TASKFLOW
-- ============================================================================

-- TAREFA 4: Criar tabela de tarefas com os campos mínimos requeridos
CREATE TABLE IF NOT EXISTS tarefas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    descricao TEXT CHECK(length(descricao) <= 200),
    prioridade TEXT NOT NULL CHECK(prioridade IN ('Baixa', 'Média', 'Alta')),
    data_limite DATE NOT NULL,
    concluida BOOLEAN NOT NULL DEFAULT 0,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- EXEMPLOS DE COMANDOS CRUD (INSERT, SELECT, UPDATE, DELETE)
-- ============================================================================

-- 1. INSERT: Inserir nova tarefa
INSERT INTO tarefas (titulo, descricao, prioridade, data_limite, concluida)
VALUES ('Finalizar relatório de entregas', 'Revisar os tópicos do relatório quinzenal', 'Alta', '2026-10-30', 0);

INSERT INTO tarefas (titulo, descricao, prioridade, data_limite, concluida)
VALUES ('Estudar conceitos de DOM e SQLite', 'Praticar manipulação de elementos com JS', 'Média', '2026-11-02', 0);

-- 2. SELECT: Listar tarefas (todas, por ID ou por status)
-- Selecionar todas as tarefas
SELECT * FROM tarefas ORDER BY data_limite ASC;

-- Selecionar apenas tarefas pendentes
SELECT * FROM tarefas WHERE concluida = 0;

-- Selecionar por ID específico
SELECT * FROM tarefas WHERE id = 1;

-- 3. UPDATE: Atualizar dados de uma tarefa (edição ou conclusão)
-- Alternar estado de conclusão
UPDATE tarefas 
SET concluida = 1 
WHERE id = 1;

-- Editar conteúdo de uma tarefa
UPDATE tarefas 
SET titulo = 'Finalizar relatório de entregas e enviar por e-mail',
    prioridade = 'Alta',
    descricao = 'Relatório revisado e aprovado'
WHERE id = 1;

-- 4. DELETE: Remover uma tarefa
DELETE FROM tarefas WHERE id = 1;