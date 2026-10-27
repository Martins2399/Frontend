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

// Array de tarefas (inicialmente com dados de exemplo)
let tarefas = [
    {
        id: 1,
        titulo: "Finalizar relatório de entregas",
        descricao: "Revisar os tópicos do relatório quinzenal do projeto.",
        prioridade: "Alta",
        dataLimite: "2026-10-30",
        concluida: false
    },
    {
        id: 2,
        titulo: "Estudar conceitos de DOM e SQLite",
        descricao: "Ler a documentação e praticar a manipulação de elementos com JS.",
        prioridade: "Média",
        dataLimite: "2026-11-02",
        concluida: false
    },
    {
        id: 3,
        titulo: "Comprar suprimentos para o escritório",
        descricao: "Adquirir papéis, canetas e organizadores de mesa.",
        prioridade: "Baixa",
        dataLimite: "2026-11-05",
        concluida: true
    }
];

let filtroAtual = 'todas';

// Retorna badge de cor segundo a prioridade
function getBadgePrioridade(prioridade) {
    switch (prioridade) {
        case 'Alta': return 'bg-danger';
        case 'Média': return 'bg-warning text-dark';
        case 'Baixa': return 'bg-info text-dark';
        default: return 'bg-secondary';
    }
}

// Renderiza as tarefas aplicando os filtros ativos
function renderizarTarefas() {
    if (!listaTarefasContainer) return;

    listaTarefasContainer.innerHTML = '';

    // TAREFA 4: Filtragem
    let tarefasFiltradas = tarefas.filter(t => {
        if (filtroAtual === 'pendentes') return !t.concluida;
        if (filtroAtual === 'concluidas') return t.concluida;
        return true; // 'todas'
    });

    if (tarefasFiltradas.length === 0) {
        listaTarefasContainer.innerHTML = `
            <div class="col-12 text-center py-4 text-muted">
                <p class="h5">Nenhuma tarefa encontrada neste filtro.</p>
            </div>
        `;
        return;
    }

    tarefasFiltradas.forEach(tarefa => {
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

                    <!-- TAREFA 3: Botões de ação com handlers direcionados -->
                    <div class="d-flex gap-2 pt-2 border-top">
                        <button onclick="alternarConcluida(${tarefa.id})" class="btn btn-sm ${tarefa.concluida ? 'btn-secondary' : 'btn-success'} flex-fill">
                            ${tarefa.concluida ? 'Desmarcar' : 'Concluir'}
                        </button>
                        <button onclick="carregarParaEdicao(${tarefa.id})" class="btn btn-sm btn-outline-warning flex-fill">Editar</button>
                        <button onclick="removerTarefa(${tarefa.id})" class="btn btn-sm btn-outline-danger flex-fill">Remover</button>
                    </div>
                </div>
            </div>
        `;

        listaTarefasContainer.appendChild(col);
    });
}

// TAREFA 2: Função para adicionar ou salvar edição de tarefa
function salvarTarefa(event) {
    // TAREFA 1: Prevenir comportamento padrão do formulário
    event.preventDefault();

    const id = inputId.value;
    const titulo = inputTitulo.value.trim();
    const prioridade = inputPrioridade.value;
    const dataLimite = inputDataLimite.value;
    const descricao = inputDescricao.value.trim();

    if (!titulo || !dataLimite) return;

    if (id) {
        // Modo Edição (TAREFA 3)
        const tarefa = tarefas.find(t => t.id === parseInt(id));
        if (tarefa) {
            tarefa.titulo = titulo;
            tarefa.prioridade = prioridade;
            tarefa.dataLimite = dataLimite;
            tarefa.descricao = descricao;
        }
    } else {
        // TAREFA 2: Nova Tarefa com ID único
        const novaTarefa = {
            id: Date.now(),
            titulo,
            prioridade,
            dataLimite,
            descricao,
            concluida: false
        };
        tarefas.push(novaTarefa);
    }

    limparFormulario();
    renderizarTarefas();
}

// TAREFA 3: Alternar o estado concluída (true/false)
function alternarConcluida(id) {
    const tarefa = tarefas.find(t => t.id === id);
    if (tarefa) {
        tarefa.concluida = !tarefa.concluida;
        renderizarTarefas();
    }
}

// TAREFA 3: Remover a tarefa selecionada
function removerTarefa(id) {
    if (confirm("Deseja realmente remover esta tarefa?")) {
        tarefas = tarefas.filter(t => t.id !== id);
        renderizarTarefas();
    }
}

// TAREFA 3: Carregar dados da tarefa no formulário para edição
function carregarParaEdicao(id) {
    const tarefa = tarefas.find(t => t.id === id);
    if (!tarefa) return;

    inputId.value = tarefa.id;
    inputTitulo.value = tarefa.titulo;
    inputPrioridade.value = tarefa.prioridade;
    inputDataLimite.value = tarefa.dataLimite;
    inputDescricao.value = tarefa.descricao;

    formTitulo.innerText = 'Editar Tarefa';
    btnSalvar.innerText = 'Salvar Alterações';
    btnCancelarEdicao.classList.remove('d-none');
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Reseta o formulário para o estado padrão
function limparFormulario() {
    inputId.value = '';
    formTarefa.reset();
    inputPrioridade.value = 'Média';
    formTitulo.innerText = 'Nova Tarefa';
    btnSalvar.innerText = '+ Adicionar Tarefa';
    btnCancelarEdicao.classList.add('d-none');
}

// Configuração dos eventos de filtro
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

// TAREFA 1: Escutar o evento submit no formulário
document.addEventListener('DOMContentLoaded', () => {
    if (formTarefa) {
        formTarefa.addEventListener('submit', salvarTarefa);
    }

    if (btnCancelarEdicao) {
        btnCancelarEdicao.addEventListener('click', limparFormulario);
    }

    configurarFiltros();
    renderizarTarefas();
});