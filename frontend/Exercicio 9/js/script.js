let db = null;
const CHAVE_DB_LOCAL = "syscontrol_sqlite_db";

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Inicializar SQLite WebAssembly
    await iniciarBanco();

    // 2. Eventos da página cadastro.html (Consulta CEP e Cadastro)
    const inputCep = document.querySelector('#cep');
    if (inputCep) {
        inputCep.addEventListener('blur', () => {
            const cepLimpo = inputCep.value.replace(/\D/g, '');
            if (cepLimpo.length === 8) {
                consultarCEP(cepLimpo);
            } else if (cepLimpo.length > 0) {
                mostrarAlertaCep("CEP inválido. Digite 8 dígitos numéricos.", "danger");
            }
        });
    }

    const formCadastro = document.querySelector('#formCadastro');
    if (formCadastro) {
        formCadastro.addEventListener('submit', (e) => {
            e.preventDefault();
            const nome = document.querySelector('#nome').value;
            const email = document.querySelector('#email').value;
            const telefone = document.querySelector('#telefone').value;
            const cep = document.querySelector('#cep').value;
            const rua = document.querySelector('#rua').value;
            const numero = document.querySelector('#numero').value;
            const bairro = document.querySelector('#bairro').value;
            const cidade = document.querySelector('#cidade').value;
            const estado = document.querySelector('#estado').value;
            const observacoes = document.querySelector('#observacoes').value;

            salvarCadastroNoBanco(nome, email, telefone, cep, rua, numero, bairro, cidade, estado, observacoes);
            alert('Cadastro salvo com sucesso no SQLite do navegador!');
            formCadastro.reset();
        });
    }

    // 3. Eventos da página api-demo.html
    const listaDemoTarefas = document.querySelector('#listaDemoTarefas');
    if (listaDemoTarefas) {
        carregarTarefasDemo();
        const btnRecarregar = document.querySelector('#btnRecarregar');
        if (btnRecarregar) {
            btnRecarregar.addEventListener('click', carregarTarefasDemo);
        }
    }

    // 4. Eventos da página tarefas.html (CRUD SQLite)
    const formTarefa = document.querySelector('#formTarefa');
    if (formTarefa) {
        formTarefa.addEventListener('submit', salvarTarefaSqlite);
        
        const btnCancelar = document.querySelector('#btnCancelarEdicao');
        if (btnCancelar) {
            btnCancelar.addEventListener('click', limparFormularioTarefa);
        }

        renderizarTarefasSqlite();
    }
});

// ==========================================
// SQLITE WEBASSEMBLY (sql.js)
// ==========================================

async function iniciarBanco() {
    try {
        const SQL = await initSqlJs({
            locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`
        });

        const dbSalvo = localStorage.getItem(CHAVE_DB_LOCAL);

        if (dbSalvo) {
            const uInt8Array = new Uint8Array(JSON.parse(dbSalvo));
            db = new SQL.Database(uInt8Array);
            console.log("Banco SQLite carregado do localStorage.");
        } else {
            db = new SQL.Database();
            criarTabelas();
            salvarBancoLocal();
            console.log("Novo banco SQLite criado.");
        }
    } catch (error) {
        console.error("Erro ao inicializar o banco SQLite:", error);
    }
}

function criarTabelas() {
    const sqlSchema = `
        CREATE TABLE IF NOT EXISTS cadastros (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT NOT NULL,
            telefone TEXT,
            cep TEXT,
            rua TEXT,
            numero TEXT,
            bairro TEXT,
            cidade TEXT,
            estado TEXT,
            observacoes TEXT,
            criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS tarefas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT NOT NULL,
            descricao TEXT,
            prioridade TEXT DEFAULT 'Média',
            concluida BOOLEAN DEFAULT 0,
            criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `;
    db.run(sqlSchema);
}

function salvarBancoLocal() {
    if (!db) return;
    const data = db.export();
    localStorage.setItem(CHAVE_DB_LOCAL, JSON.stringify(Array.from(data)));
}

// Inserir Cadastro (Formulário)
function salvarCadastroNoBanco(nome, email, telefone, cep, rua, numero, bairro, cidade, estado, observacoes) {
    if (!db) return;
    const query = `
        INSERT INTO cadastros (nome, email, telefone, cep, rua, numero, bairro, cidade, estado, observacoes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
    db.run(query, [nome, email, telefone, cep, rua, numero, bairro, cidade, estado, observacoes]);
    salvarBancoLocal();
}

// ==========================================
// CRUD DE TAREFAS (tarefas.html)
// ==========================================

function renderizarTarefasSqlite() {
    const container = document.querySelector('#listaTarefasSqlite');
    if (!container || !db) return;

    container.innerHTML = '';

    const stmt = db.prepare("SELECT * FROM tarefas ORDER BY id DESC;");
    const tarefas = [];
    while (stmt.step()) {
        tarefas.push(stmt.getAsObject());
    }
    stmt.free();

    if (tarefas.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center py-4 text-muted">
                <p class="h5">Nenhuma tarefa cadastrada no SQLite.</p>
            </div>
        `;
        return;
    }

    tarefas.forEach(tarefa => {
        const col = document.createElement('div');
        col.className = 'col-12 col-md-6';

        const badgePrioridade = tarefa.prioridade === 'Alta' ? 'bg-danger' : (tarefa.prioridade === 'Média' ? 'bg-warning text-dark' : 'bg-info text-dark');
        const statusBadge = tarefa.concluida ? '<span class="badge bg-success">Concluída</span>' : '<span class="badge bg-secondary">Pendente</span>';

        col.innerHTML = `
            <div class="card h-100 shadow-sm border-0 ${tarefa.concluida ? 'bg-light opacity-75' : ''}">
                <div class="card-body d-flex flex-column justify-content-between p-3">
                    <div>
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <h5 class="card-title fw-bold mb-0 ${tarefa.concluida ? 'text-decoration-line-through text-muted' : 'text-dark'}">
                                ${tarefa.titulo}
                            </h5>
                            <div>
                                <span class="badge ${badgePrioridade}">${tarefa.prioridade}</span>
                                ${statusBadge}
                            </div>
                        </div>
                        <p class="card-text text-muted small mb-3">${tarefa.descricao || 'Sem descrição.'}</p>
                    </div>

                    <div class="d-flex gap-2 pt-2 border-top">
                        <button onclick="alternarConcluidaSqlite(${tarefa.id}, ${tarefa.concluida})" class="btn btn-sm ${tarefa.concluida ? 'btn-secondary' : 'btn-success'} flex-fill">
                            ${tarefa.concluida ? 'Desmarcar' : 'Concluir'}
                        </button>
                        <button onclick="carregarEdicaoSqlite(${tarefa.id})" class="btn btn-sm btn-outline-warning flex-fill">Editar</button>
                        <button onclick="removerTarefaSqlite(${tarefa.id})" class="btn btn-sm btn-outline-danger flex-fill">Remover</button>
                    </div>
                </div>
            </div>
        `;

        container.appendChild(col);
    });
}

// Adicionar ou Atualizar Tarefa (INSERT / UPDATE)
function salvarTarefaSqlite(e) {
    e.preventDefault();
    if (!db) return;

    const id = document.querySelector('#tarefaId').value;
    const titulo = document.querySelector('#titulo').value.trim();
    const prioridade = document.querySelector('#prioridade').value;
    const descricao = document.querySelector('#descricao').value.trim();

    if (!titulo) return;

    if (id) {
        // UPDATE
        const query = "UPDATE tarefas SET titulo = ?, prioridade = ?, descricao = ? WHERE id = ?;";
        db.run(query, [titulo, prioridade, descricao, parseInt(id)]);
    } else {
        // INSERT
        const query = "INSERT INTO tarefas (titulo, descricao, prioridade, concluida) VALUES (?, ?, ?, 0);";
        db.run(query, [titulo, descricao, prioridade]);
    }

    salvarBancoLocal();
    limparFormularioTarefa();
    renderizarTarefasSqlite();
}

// Alternar Conclusão (UPDATE)
function alternarConcluidaSqlite(id, estadoAtual) {
    if (!db) return;
    const novoEstado = estadoAtual ? 0 : 1;
    db.run("UPDATE tarefas SET concluida = ? WHERE id = ?;", [novoEstado, id]);
    salvarBancoLocal();
    renderizarTarefasSqlite();
}

// Carregar para Edição
function carregarEdicaoSqlite(id) {
    if (!db) return;
    const stmt = db.prepare("SELECT * FROM tarefas WHERE id = ?;");
    stmt.bind([id]);
    if (stmt.step()) {
        const tarefa = stmt.getAsObject();
        document.querySelector('#tarefaId').value = tarefa.id;
        document.querySelector('#titulo').value = tarefa.titulo;
        document.querySelector('#prioridade').value = tarefa.prioridade;
        document.querySelector('#descricao').value = tarefa.descricao || '';

        document.querySelector('#formTituloTarefa').innerText = 'Editar Tarefa';
        document.querySelector('#btnSalvarTarefa').innerText = 'Salvar Alterações';
        document.querySelector('#btnCancelarEdicao').classList.remove('d-none');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    stmt.free();
}

// Remover Tarefa (DELETE)
function removerTarefaSqlite(id) {
    if (!db) return;
    if (confirm("Deseja realmente excluir esta tarefa?")) {
        db.run("DELETE FROM tarefas WHERE id = ?;", [id]);
        salvarBancoLocal();
        renderizarTarefasSqlite();
    }
}

function limparFormularioTarefa() {
    document.querySelector('#tarefaId').value = '';
    document.querySelector('#formTarefa').reset();
    document.querySelector('#prioridade').value = 'Média';
    document.querySelector('#formTituloTarefa').innerText = 'Nova Tarefa (SQLite)';
    document.querySelector('#btnSalvarTarefa').innerText = '+ Adicionar Tarefa';
    document.querySelector('#btnCancelarEdicao').classList.add('d-none');
}

// ==========================================
// CONSULTA CEP (cadastro.html)
// ==========================================

async function consultarCEP(cep) {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Erro ao consultar CEP.');
        const dados = await response.json();

        if (dados.erro) {
            mostrarAlertaCep("CEP não encontrado.", "warning");
            limparCamposEndereco();
            return;
        }

        document.querySelector('#rua').value = dados.logradouro || '';
        document.querySelector('#bairro').value = dados.bairro || '';
        document.querySelector('#cidade').value = dados.localidade || '';
        document.querySelector('#estado').value = dados.uf || '';
        ocultarAlertaCep();
    } catch (error) {
        console.error("Erro na requisição:", error);
        mostrarAlertaCep("Erro ao consultar o CEP.", "danger");
        limparCamposEndereco();
    }
}

function limparCamposEndereco() {
    document.querySelector('#rua').value = '';
    document.querySelector('#bairro').value = '';
    document.querySelector('#cidade').value = '';
    document.querySelector('#estado').value = '';
}

function mostrarAlertaCep(mensagem, tipo) {
    const alerta = document.querySelector('#alertaCep');
    if (alerta) {
        alerta.className = `alert alert-${tipo}`;
        alerta.innerText = mensagem;
        alerta.classList.remove('d-none');
    }
}

function ocultarAlertaCep() {
    const alerta = document.querySelector('#alertaCep');
    if (alerta) {
        alerta.classList.add('d-none');
        alerta.innerText = '';
    }
}

// ==========================================
// DEMO API REST (api-demo.html)
// ==========================================

async function carregarTarefasDemo() {
    const container = document.querySelector('#listaDemoTarefas');
    const alertaApi = document.querySelector('#alertaApi');
    if (!container) return;

    container.innerHTML = `
        <div class="col-12 text-center py-5">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Carregando...</span>
            </div>
            <p class="text-muted mt-2">Buscando tarefas da API...</p>
        </div>
    `;
    if (alertaApi) alertaApi.classList.add('d-none');

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        if (!response.ok) throw new Error(`Erro HTTP! Status: ${response.status}`);
        const todasTarefas = await response.json();
        const tarefasLimitadas = todasTarefas.slice(0, 6);

        container.innerHTML = '';
        tarefasLimitadas.forEach(tarefa => {
            const col = document.createElement('div');
            col.className = 'col-12 col-md-6 col-lg-4';
            const statusBadge = tarefa.completed 
                ? '<span class="badge bg-success">Concluída</span>' 
                : '<span class="badge bg-warning text-dark">Pendente</span>';

            col.innerHTML = `
                <div class="card h-100 shadow-sm border-0">
                    <div class="card-body d-flex flex-column justify-content-between p-3">
                        <div>
                            <div class="d-flex justify-content-between align-items-start mb-2">
                                <span class="text-muted small">ID: #${tarefa.id}</span>
                                ${statusBadge}
                            </div>
                            <h5 class="card-title text-dark fw-bold fs-6 mb-3">${tarefa.title}</h5>
                        </div>
                        <div class="pt-2 border-top text-muted small">
                            Usuário ID: ${tarefa.userId}
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(col);
        });
    } catch (error) {
        console.error("Erro ao carregar tarefas da API:", error);
        container.innerHTML = '';
        if (alertaApi) {
            alertaApi.className = "alert alert-danger";
            alertaApi.innerText = "Erro ao carregar dados da API externa.";
            alertaApi.classList.remove('d-none');
        }
    }
}