// Seleção de elementos do DOM
const formTarefa = document.querySelector('#formTarefa');
const inputId = document.querySelector('#tarefaId');
const inputTitulo = document.querySelector('#tituloTarefa');
const inputPrioridade = document.querySelector('#prioridadeTarefa');
const inputDataLimite = document.querySelector('#dataLimiteTarefa');
const inputDescricao = document.querySelector('#descricaoTarefa');
const listaTarefasContainer = document.querySelector('#listaTarefas');
const formTitulo = document.querySelector('#formTitulo');
const btnSalvar = document.querySelector('#btnSalvar');
const btnCancelarEdicao = document.querySelector('#btnCancelarEdicao');
const botoesFiltro = document.querySelectorAll('[data-filtro]');
const alertaFormulario = document.querySelector('#alertaFormulario');
const contadorChars = document.querySelector('#contadorChars');

let filtroAtual = 'todas';

// Validação do Formulário com feedback visual
function validarFormulario() {
    let ehValido = true;
    const erros = [];

    limparErrosVisuais();

    const titulo = inputTitulo.value.trim();
    if (!titulo) {
        ehValido = false;
        marcarCampoInvalido(inputTitulo, 'O título é obrigatório.');
        erros.push('Informe o título da tarefa.');
    }

    const prioridade = inputPrioridade.value;
    const prioridadesValidas = ['Baixa', 'Média', 'Alta'];
    if (!prioridade || !prioridadesValidas.includes(prioridade)) {
        ehValido = false;
        marcarCampoInvalido(inputPrioridade, 'Selecione uma prioridade válida.');
        erros.push('Selecione uma prioridade válida.');
    }

    const dataLimite = inputDataLimite.value;
    if (!dataLimite || isNaN(Date.parse(dataLimite))) {
        ehValido = false;
        marcarCampoInvalido(inputDataLimite, 'Informe uma data limite válida.');
        erros.push('Informe uma data limite válida.');
    }

    const descricao = inputDescricao.value.trim();
    if (descricao.length > 200) {
        ehValido = false;
        marcarCampoInvalido(inputDescricao, 'A descrição deve ter no máximo 200 caracteres.');
        erros.push('Descrição excede 200 caracteres.');
    }

    if (!ehValido && alertaFormulario) {
        alertaFormulario.innerHTML = `<strong>Atenção!</strong> Corrija as pendências abaixo:<br>- ${erros.join('<br>- ')}`;
        alertaFormulario.classList.remove('d-none');
    }

    return ehValido;
}

function marcarCampoInvalido(elemento, mensagem) {
    elemento.classList.add('is-invalid');
    const divFeedback = elemento.nextElementSibling;
    if (divFeedback && divFeedback.classList.contains('invalid-feedback')) {
        divFeedback.innerText = mensagem;
    }
}

function limparErrosVisuais() {
    [inputTitulo, inputPrioridade, inputDataLimite, inputDescricao].forEach(el => {
        if (el) el.classList.remove('is-invalid');
    });
    if (alertaFormulario) {
        alertaFormulario.classList.add('d-none');
        alertaFormulario.innerHTML = '';
    }
}

function atualizarContadorChars() {
    if (inputDescricao && contadorChars) {
        contadorChars.innerText = inputDescricao.value.length;
    }
}

function getBadgePrioridade(prioridade) {
    switch (prioridade) {
        case 'Alta': return 'bg-danger';
        case 'Média': return 'bg-warning text-dark';
        case 'Baixa': return 'bg-info text-dark';
        default: return 'bg-secondary';
    }
}

// Renderizar Tarefas vindas do SQLite (SELECT)
function renderizarTarefas() {
    if (!listaTarefasContainer) return;

    listaTarefasContainer.innerHTML = '';

    // Chamada do SELECT via SQLite
    const tarefas = dbObterTarefas(filtroAtual);

    if (tarefas.length === 0) {
        listaTarefasContainer.innerHTML = `
            <div class="col-12 text-center py-4 text-muted">
                <p class="h5">Nenhuma tarefa encontrada neste filtro.</p>
            </div>
        `;
        return;
    }

    tarefas.forEach(tarefa => {
        const col = document.createElement('div');
        col.className = 'col-12 col-md-6';

        col.innerHTML = `
            <div class="card h-100 shadow-sm border-0 ${tarefa.concluida ? 'bg-light opacity-75' : ''}">
                <div class="card-body d-flex flex-column justify-content-between p-3">
                    <div>
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <h5 class="card-title fw-bold mb-0 ${tarefa.concluida ? 'text-decoration-line-through text-muted' : 'text-dark'}">
                                ${tarefa.titulo}
                            </h5>
                            <span class="badge ${getBadgePrioridade(tarefa.prioridade)}">${tarefa.prioridade}</span>
                        </div>
                        <p class="card-text text-muted small mb-2">${tarefa.descricao || 'Sem descrição.'}</p>
                        <p class="text-muted small mb-3">
                            <small>📅 Data Limite: <strong>${tarefa.dataLimite.split('-').reverse().join('/')}</strong></small>
                        </p>
                    </div>

                    <div class="d-flex gap-2 pt-2 border-top">
                        <button onclick="alternarConcluidaHandler(${tarefa.id}, ${tarefa.concluida})" class="btn btn-sm ${tarefa.concluida ? 'btn-secondary' : 'btn-success'} flex-fill">
                            ${tarefa.concluida ? 'Desmarcar' : 'Concluir'}
                        </button>
                        <button onclick="carregarParaEdicao(${tarefa.id})" class="btn btn-sm btn-outline-warning flex-fill">Editar</button>
                        <button onclick="removerTarefaHandler(${tarefa.id})" class="btn btn-sm btn-outline-danger flex-fill">Remover</button>
                    </div>
                </div>
            </div>
        `;

        listaTarefasContainer.appendChild(col);
    });
}

// Handler de Salvar (INSERT / UPDATE)
function salvarTarefa(event) {
    event.preventDefault();

    if (!validarFormulario()) return;

    const id = inputId.value;
    const titulo = inputTitulo.value.trim();
    const prioridade = inputPrioridade.value;
    const dataLimite = inputDataLimite.value;
    const descricao = inputDescricao.value.trim();

    if (id) {
        // UPDATE
        dbAtualizarTarefa(parseInt(id), titulo, prioridade, dataLimite, descricao);
    } else {
        // INSERT
        dbAdicionarTarefa(titulo, prioridade, dataLimite, descricao);
    }

    limparFormulario();
    renderizarTarefas();
}

// Handler para alternar conclusão (UPDATE)
function alternarConcluidaHandler(id, estadoAtual) {
    dbAlternarConcluida(id, !estadoAtual);
    renderizarTarefas();
}

// Handler para remover (DELETE)
function removerTarefaHandler(id) {
    if (confirm("Deseja realmente remover esta tarefa do banco SQLite?")) {
        dbRemoverTarefa(id);
        renderizarTarefas();
    }
}

// Carregar dados no formulário para edição
function carregarParaEdicao(id) {
    const tarefas = dbObterTarefas('todas');
    const tarefa = tarefas.find(t => t.id === id);
    if (!tarefa) return;

    limparErrosVisuais();

    inputId.value = tarefa.id;
    inputTitulo.value = tarefa.titulo;
    inputPrioridade.value = tarefa.prioridade;
    inputDataLimite.value = tarefa.dataLimite;
    inputDescricao.value = tarefa.descricao;

    formTitulo.innerText = 'Editar Tarefa';
    btnSalvar.innerText = 'Salvar Alterações';
    btnCancelarEdicao.classList.remove('d-none');
    
    atualizarContadorChars();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function limparFormulario() {
    inputId.value = '';
    formTarefa.reset();
    inputPrioridade.value = 'Média';
    formTitulo.innerText = 'Nova Tarefa';
    btnSalvar.innerText = '+ Adicionar Tarefa';
    btnCancelarEdicao.classList.add('d-none');
    limparErrosVisuais();
    atualizarContadorChars();
}

function configurarFiltros() {
    botoesFiltro.forEach(btn => {
        btn.addEventListener('click', (e) => {
            botoesFiltro.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            filtroAtual = e.target.dataset.filtro;
            renderizarTarefas();
        });
    });
}

// Inicialização da aplicação com SQLite
document.addEventListener('DOMContentLoaded', async () => {
    // Inicializa o banco SQLite
    await initDatabase();

    if (formTarefa) {
        formTarefa.addEventListener('submit', salvarTarefa);
    }

    if (btnCancelarEdicao) {
        btnCancelarEdicao.addEventListener('click', limparFormulario);
    }

    if (inputDescricao) {
        inputDescricao.addEventListener('input', atualizarContadorChars);
    }

    configurarFiltros();
    renderizarTarefas();
});