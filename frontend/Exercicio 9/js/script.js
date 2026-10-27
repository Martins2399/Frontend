// Variável global para armazenar a instância do banco SQLite
let db = null;
const CHAVE_DB_LOCAL = "syscontrol_sqlite_db";

document.addEventListener('DOMContentLoaded', async () => {
    // TAREFA 3: Inicializar o banco SQLite no navegador
    await iniciarBanco();

    // Código das demais páginas (CEP, Cadastro, API Demo)
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
            
            // Exemplo de INSERT em cadastro ao submeter o formulário
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

    const listaDemoTarefas = document.querySelector('#listaDemoTarefas');
    if (listaDemoTarefas) {
        carregarTarefasDemo();
        const btnRecarregar = document.querySelector('#btnRecarregar');
        if (btnRecarregar) {
            btnRecarregar.addEventListener('click', carregarTarefasDemo);
        }
    }
});

// ==========================================
// PARTE 4: INTEGRACÃO SQLITE WEBASSEMBLY (sql.js)
// ==========================================

async function iniciarBanco() {
    try {
        // TAREFA 1 e 2: Carregamento do sql.js via CDN
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
            executarTestesIniciais();
            salvarBancoLocal();
            console.log("Novo banco SQLite criado e tabelas inicializadas.");
        }

        // TAREFA 8: Executar SELECT de teste e mostrar no console
        testarSelectConsole();

    } catch (error) {
        console.error("Erro ao inicializar o banco SQLite no navegador:", error);
    }
}

// TAREFA 4 e 5: Criação das tabelas cadastros e tarefas
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

// Persistência do banco SQLite binário no localStorage
function salvarBancoLocal() {
    if (!db) return;
    const data = db.export();
    localStorage.setItem(CHAVE_DB_LOCAL, JSON.stringify(Array.from(data)));
}

// TAREFA 6 e 7: Testes de INSERT para cadastro e tarefa
function executarTestesIniciais() {
    // Inserção de teste na tabela cadastros
    const insertCadastro = `
        INSERT INTO cadastros (nome, email, telefone, cep, rua, numero, bairro, cidade, estado, observacoes)
        VALUES ('Italo Carlos', 'italo@exemplo.com', '(31) 99999-9999', '30130-010', 'Avenida Afonso Pena', '1000', 'Centro', 'Belo Horizonte', 'MG', 'Usuário administrador de teste.');
    `;
    db.run(insertCadastro);

    // Inserção de teste na tabela tarefas
    const insertTarefa = `
        INSERT INTO tarefas (titulo, descricao, prioridade, concluida)
        VALUES ('Estudar SQLite WebAssembly', 'Validar funcionamento do sql.js no navegador', 'Alta', 0);
    `;
    db.run(insertTarefa);
}

// Inserção dinâmica de novos cadastros vindos do formulário
function salvarCadastroNoBanco(nome, email, telefone, cep, rua, numero, bairro, cidade, estado, observacoes) {
    if (!db) return;
    const query = `
        INSERT INTO cadastros (nome, email, telefone, cep, rua, numero, bairro, cidade, estado, observacoes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
    db.run(query, [nome, email, telefone, cep, rua, numero, bairro, cidade, estado, observacoes]);
    salvarBancoLocal();
    testarSelectConsole();
}

// TAREFA 8: SELECT para testar e exibir os registros no console
function testarSelectConsole() {
    if (!db) return;

    console.log("--- REGISTROS DA TABELA 'cadastros' ---");
    const stmtCadastros = db.prepare("SELECT * FROM cadastros;");
    while (stmtCadastros.step()) {
        console.log(stmtCadastros.getAsObject());
    }
    stmtCadastros.free();

    console.log("--- REGISTROS DA TABELA 'tarefas' ---");
    const stmtTarefas = db.prepare("SELECT * FROM tarefas;");
    while (stmtTarefas.step()) {
        console.log(stmtTarefas.getAsObject());
    }
    stmtTarefas.free();
}

// Funções anteriores mantidas (CEP e API Demo)...
async function consultarCEP(cep) {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Erro ao consultar o serviço de CEP.');
        const dados = await response.json();
        if (dados.erro) {
            mostrarAlertaCep("CEP não encontrado na base de dados dos Correios.", "warning");
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
        mostrarAlertaCep("Não foi possível realizar a consulta do CEP. Verifique sua conexão.", "danger");
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