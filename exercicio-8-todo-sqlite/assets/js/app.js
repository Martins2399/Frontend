// TAREFA 1: Selecionar elementos do DOM usando document.querySelector
const formTarefa = document.querySelector('#formTarefa');
const inputTitulo = document.querySelector('#tituloTarefa');
const inputPrioridade = document.querySelector('#prioridadeTarefa');
const inputDataLimite = document.querySelector('#dataLimiteTarefa');
const inputDescricao = document.querySelector('#descricaoTarefa');
const listaTarefasContainer = document.querySelector('#listaTarefas');

// TAREFA 2: Criar dados temporários (array de tarefas com 3 objetos)
const tarefas = [
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

// Função auxiliar para retornar a cor da prioridade
function getBadgePrioridade(prioridade) {
    switch (prioridade) {
        case 'Alta': return 'bg-danger';
        case 'Média': return 'bg-warning text-dark';
        case 'Baixa': return 'bg-info text-dark';
        default: return 'bg-secondary';
    }
}

// TAREFA 3: Renderizar as tarefas no HTML dinamicamente
function renderizarTarefas() {
    if (!listaTarefasContainer) return;

    // Limpar o conteúdo anterior da lista
    listaTarefasContainer.innerHTML = '';

    if (tarefas.length === 0) {
        listaTarefasContainer.innerHTML = `
            <div class="col-12 text-center py-4 text-muted">
                <p class="h5">Nenhuma tarefa encontrada.</p>
            </div>
        `;
        return;
    }

    // TAREFA 4: Loop para percorrer o array e gerar os cards responsivos
    tarefas.forEach(tarefa => {
        const col = document.createElement('div');
        // Responsividade: 1 coluna no celular (col-12), 2 colunas no desktop/tablet (col-md-6)
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
                        <p class="card-text text-muted small mb-2">${tarefa.descricao}</p>
                        <p class="text-muted small mb-3">
                            <small>📅 Data Limite: <strong>${tarefa.dataLimite.split('-').reverse().join('/')}</strong></small>
                        </p>
                    </div>

                    <!-- Botões visuais de ação -->
                    <div class="d-flex gap-2 pt-2 border-top">
                        <button class="btn btn-sm ${tarefa.concluida ? 'btn-secondary' : 'btn-success'} flex-fill">
                            ${tarefa.concluida ? 'Desmarcar' : 'Concluir'}
                        </button>
                        <button class="btn btn-sm btn-outline-warning flex-fill">Editar</button>
                        <button class="btn btn-sm btn-outline-danger flex-fill">Remover</button>
                    </div>
                </div>
            </div>
        `;

        listaTarefasContainer.appendChild(col);
    });
}

// Inicializar a renderização após o carregamento do DOM
document.addEventListener('DOMContentLoaded', () => {
    renderizarTarefas();
});